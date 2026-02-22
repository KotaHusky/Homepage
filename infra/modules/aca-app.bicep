// Reusable Bicep module: provisions Azure Container Apps infrastructure
// including a managed identity with GitHub Actions OIDC federated credentials.
//
// Usage: reference this module from your app repo's infra/main.bicep
// Pin to a cicd-toolkit release tag once available, e.g.:
//   'https://raw.githubusercontent.com/KotaHusky/cicd-toolkit/v1.0.0/infra/modules/aca-app.bicep'

@description('Name of the container app (also used as prefix for all resources)')
param appName string

@description('Azure region')
param location string = resourceGroup().location

@description('GitHub organization name for OIDC federated credential')
param githubOrg string

@description('GitHub repository name for OIDC federated credential')
param githubRepo string

@description('Initial container image reference')
param containerImage string = 'mcr.microsoft.com/azuredocs/containerapps-helloworld:latest'

@description('Container port to expose')
param targetPort int = 3000

@description('CPU cores (e.g. "0.25", "0.5", "1.0")')
param cpu string = '0.5'

@description('Memory (e.g. "0.5Gi", "1.0Gi")')
param memory string = '1.0Gi'

@description('Minimum replica count (0 = scale to zero)')
param minReplicas int = 0

@description('Maximum replica count')
param maxReplicas int = 3

// Log Analytics workspace for container logs
resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${appName}-logs'
  location: location
  properties: {
    sku: { name: 'PerGB2018' }
    retentionInDays: 30
  }
}

// Container Apps Environment
resource acaEnv 'Microsoft.App/managedEnvironments@2023-05-01' = {
  name: '${appName}-env'
  location: location
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

// User-assigned managed identity for GitHub Actions OIDC
resource identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${appName}-identity'
  location: location
}

// Federated credential: allows GitHub Actions on the main branch to authenticate
resource federatedCredential 'Microsoft.ManagedIdentity/userAssignedIdentities/federatedIdentityCredentials@2023-01-31' = {
  parent: identity
  name: 'github-actions-main'
  properties: {
    issuer: 'https://token.actions.githubusercontent.com'
    subject: 'repo:${githubOrg}/${githubRepo}:ref:refs/heads/main'
    audiences: ['api://AzureADTokenExchange']
  }
}

// Contributor role on the resource group for the managed identity
resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  name: guid(resourceGroup().id, identity.id, 'b24988ac-6180-42a0-ab88-20f7382dd24c')
  properties: {
    roleDefinitionId: subscriptionResourceId('Microsoft.Authorization/roleDefinitions', 'b24988ac-6180-42a0-ab88-20f7382dd24c')
    principalId: identity.properties.principalId
    principalType: 'ServicePrincipal'
  }
}

// Container App
resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: appName
  location: location
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${identity.id}': {}
    }
  }
  properties: {
    managedEnvironmentId: acaEnv.id
    configuration: {
      ingress: {
        external: true
        targetPort: targetPort
        transport: 'http'
      }
    }
    template: {
      containers: [
        {
          name: appName
          image: containerImage
          resources: {
            cpu: json(cpu)
            memory: memory
          }
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
      }
    }
  }
}

output containerAppFqdn string = containerApp.properties.configuration.ingress.fqdn
output identityClientId string = identity.properties.clientId
output tenantId string = subscription().tenantId
output subscriptionId string = subscription().subscriptionId
