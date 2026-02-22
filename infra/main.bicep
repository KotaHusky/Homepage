// Homepage — Azure Container Apps infrastructure
// Calls the shared aca-app module from cicd-toolkit.
//
// Bootstrap (one-time, run locally before CI secrets exist):
//   az login
//   az group create -n homepage-rg -l eastus
//   az deployment group create -g homepage-rg -f infra/main.bicep
//   # Capture outputs and set as GitHub repo secrets:
//   #   AZURE_CLIENT_ID     = identityClientId output
//   #   AZURE_TENANT_ID     = tenantId output
//   #   AZURE_SUBSCRIPTION_ID = subscriptionId output
//
// After bootstrap, use the aca-provision.yml workflow for Day-2 infra changes.
//
// TODO: pin to a cicd-toolkit release tag once available (e.g. @v1.0.0)

targetScope = 'resourceGroup'

module acaApp 'https://raw.githubusercontent.com/KotaHusky/cicd-toolkit/main/infra/modules/aca-app.bicep' = {
  name: 'homepage-aca'
  params: {
    appName: 'homepage'
    githubOrg: 'KotaHusky'
    githubRepo: 'Homepage'
    containerImage: 'ghcr.io/kotahusky/homepage:latest'
    targetPort: 3000
    cpu: '0.25'
    memory: '0.5Gi'
    minReplicas: 0
    maxReplicas: 3
  }
}

output fqdn string = acaApp.outputs.containerAppFqdn
output identityClientId string = acaApp.outputs.identityClientId
output tenantId string = acaApp.outputs.tenantId
output subscriptionId string = acaApp.outputs.subscriptionId
