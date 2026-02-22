# Azure Container Apps Infrastructure

Provisions the Homepage app on Azure Container Apps using the shared
[`aca-app` Bicep module](https://github.com/KotaHusky/cicd-toolkit/blob/main/infra/modules/aca-app.bicep)
from cicd-toolkit.

## Resources provisioned

- Resource group: `homepage-rg`
- Container Apps Environment: `homepage-env`
- Container App: `homepage`
- Log Analytics workspace: `homepage-logs`
- User-assigned managed identity: `homepage-identity`
- OIDC federated credential for GitHub Actions (no long-lived secrets)

## Bootstrap (one-time, run locally)

Prerequisites: [Azure CLI](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli), `az login`

```bash
# 1. Set subscription
az account set --subscription <your-subscription-id>

# 2. Create resource group
az group create -n homepage-rg -l eastus

# 3. Deploy infrastructure
az deployment group create \
  -g homepage-rg \
  -f infra/main.bicep \
  --query "properties.outputs" \
  -o json

# 4. Set GitHub secrets from deployment outputs
gh secret set AZURE_CLIENT_ID     --repo KotaHusky/Homepage --body "<identityClientId>"
gh secret set AZURE_TENANT_ID     --repo KotaHusky/Homepage --body "<tenantId>"
gh secret set AZURE_SUBSCRIPTION_ID --repo KotaHusky/Homepage --body "<subscriptionId>"
```

## Day-2 infra updates

After bootstrap, use the `aca-provision.yml` reusable workflow in cicd-toolkit
to apply changes without running locally:

```yaml
jobs:
  provision:
    uses: KotaHusky/cicd-toolkit/.github/workflows/aca-provision.yml@main
    with:
      resource-group: homepage-rg
    secrets:
      AZURE_CLIENT_ID: ${{ secrets.AZURE_CLIENT_ID }}
      AZURE_TENANT_ID: ${{ secrets.AZURE_TENANT_ID }}
      AZURE_SUBSCRIPTION_ID: ${{ secrets.AZURE_SUBSCRIPTION_ID }}
```

## Module parameters

See [`aca-app.bicep`](https://github.com/KotaHusky/cicd-toolkit/blob/main/infra/modules/aca-app.bicep)
for all available parameters. App-specific values are set in `main.bicep`.

> **Note:** The module is vendored locally in `infra/modules/aca-app.bicep` (copied from cicd-toolkit)
> because Bicep does not support `https://` module references. Once cicd-toolkit publishes to a
> Bicep registry (`br:`), update `main.bicep` to reference that instead.
>
> The module currently reflects `@main`. Once cicd-toolkit starts publishing releases,
> update to a version tag (e.g. `@v1.0.0`).
