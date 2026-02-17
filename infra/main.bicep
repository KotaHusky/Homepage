// Azure Container Apps deployment for Homepage
// Deployed by: npm run setup:aca

// ─── Parameters ──────────────────────────────────────────────────────────────

@description('Name of the Container App')
param appName string

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Full container image reference (e.g. ghcr.io/owner/repo:tag)')
param containerImage string

@description('Port the container listens on')
@minValue(1)
@maxValue(65535)
param targetPort int = 3000

@description('Minimum number of container replicas')
@minValue(0)
param minReplicas int = 0

@description('Maximum number of container replicas')
@minValue(1)
param maxReplicas int = 10

@description('CPU cores per replica (e.g. 0.25, 0.5, 0.75, 1.0, 1.5, 2.0)')
param cpuCores string = '0.25'

@description('Memory per replica (e.g. 0.5Gi, 1.0Gi, 1.5Gi, 2.0Gi, 3.0Gi, 4.0Gi)')
param memory string = '0.5Gi'

// ─── Log Analytics Workspace ─────────────────────────────────────────────────

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2022-10-01' = {
  name: '${appName}-logs'
  location: location
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

// ─── Container Apps Environment ──────────────────────────────────────────────

resource containerEnv 'Microsoft.App/managedEnvironments@2023-05-01' = {
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

// ─── Container App ───────────────────────────────────────────────────────────

resource containerApp 'Microsoft.App/containerApps@2023-05-01' = {
  name: appName
  location: location
  properties: {
    managedEnvironmentId: containerEnv.id
    configuration: {
      ingress: {
        external: true
        targetPort: targetPort
        transport: 'auto'
        allowInsecure: false
      }
      registries: []
    }
    template: {
      containers: [
        {
          name: appName
          image: containerImage
          resources: {
            cpu: json(cpuCores)
            memory: memory
          }
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
        rules: [
          {
            name: 'http-scaling'
            http: {
              metadata: {
                concurrentRequests: '50'
              }
            }
          }
        ]
      }
    }
  }
}

// ─── Outputs ─────────────────────────────────────────────────────────────────

@description('FQDN of the deployed Container App')
output fqdn string = containerApp.properties.configuration.ingress.fqdn

@description('URL of the deployed Container App')
output url string = 'https://${containerApp.properties.configuration.ingress.fqdn}'
