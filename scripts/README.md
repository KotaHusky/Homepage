# Azure Container Apps Setup Wizard

Interactive CLI wizard for deploying the **Homepage** app to [Azure Container Apps](https://learn.microsoft.com/en-us/azure/container-apps/overview). Replaces the original bash script with a cross-platform TypeScript CLI featuring arrow-key navigation, type-to-filter search, and live polling of your Azure and GitHub accounts.

## Quickstart

### Prerequisites

| Tool | Install |
|------|---------|
| **Node.js** >= 20 | [nvm](https://github.com/nvm-sh/nvm) or [nodejs.org](https://nodejs.org/) |
| **Azure CLI** (`az`) | [Install guide](https://aka.ms/install-azure-cli) |
| **GitHub CLI** (`gh`) | [Install guide](https://cli.github.com) |
| **Bicep template** | `infra/main.bicep` must exist in the repo root |

### 1. Install dependencies

```sh
npm install
```

### 2. Log in to Azure and GitHub

```sh
az login
gh auth login
```

### 3. Run the wizard

```sh
npm run setup:aca
```

The wizard will:

1. **Verify prerequisites** --- checks that `az` and `gh` are installed and authenticated
2. **Select your GitHub repo** --- polls your account and lists repos with arrow-key navigation
3. **Select an image tag** --- polls GHCR for published container versions (falls back to `latest`)
4. **Select an Azure region** --- common regions listed first, full list below a separator
5. **Configure the app** --- app name, resource group (existing or new), target port, minimum replicas
6. **Save your config** --- writes to `.setup-aca.env` so future runs pre-populate defaults
7. **Show a summary** --- review all selections before deploying
8. **Deploy** --- registers providers, creates resources, deploys the Bicep template, optionally sets up GitHub Actions credentials

### Re-running

Your selections are saved to `.setup-aca.env`. On the next run, previously chosen values appear as defaults. To start fresh, delete the file:

```sh
rm .setup-aca.env
```

### Cancelling

Press **Ctrl+C** at any prompt to exit cleanly. Your config is only saved after step 5 completes.

## What gets deployed

| Resource | Description |
|----------|-------------|
| **Resource group** | Created if it doesn't exist |
| **Container Apps Environment** | Managed environment for your app |
| **Container App** | Runs your GHCR image with the configured port and replicas |
| **Log Analytics Workspace** | Required by Container Apps for logging |
| **Service principal** *(optional)* | For GitHub Actions CI/CD via `AZURE_CREDENTIALS` secret |

## Configuration reference

The `.setup-aca.env` file uses simple `KEY="value"` format:

| Variable | Description | Example |
|----------|-------------|---------|
| `GITHUB_OWNER` | GitHub username or org | `KotaHusky` |
| `GITHUB_REPO` | Repository name | `Homepage` |
| `IMAGE_TAG` | Container image tag | `latest` |
| `AZURE_REGION` | Azure region name | `eastus` |
| `APP_NAME` | Container App name | `homepage` |
| `RESOURCE_GROUP` | Azure resource group | `rg-homepage` |
| `TARGET_PORT` | Port the container listens on | `3000` |
| `MIN_REPLICAS` | Minimum container instances | `0` |

## Terms of Service

By using this wizard you agree to the following:

1. **Azure costs.** This tool creates Azure resources that may incur charges on your Azure subscription. You are solely responsible for any costs incurred. Review [Azure Container Apps pricing](https://azure.microsoft.com/en-us/pricing/details/container-apps/) before deploying.

2. **Credentials.** The wizard accesses your Azure and GitHub accounts using credentials from `az login` and `gh auth login`. It may create a service principal with `contributor` access scoped to the target resource group. You are responsible for managing and rotating these credentials.

3. **No warranty.** This tool is provided "as is" without warranty of any kind. The authors are not liable for any damages arising from its use, including but not limited to data loss, service disruption, or unexpected charges.

4. **Open source.** This project is licensed under the [MIT License](../LICENSE). Contributions are welcome.

5. **Data.** The wizard does not transmit data to any third-party services beyond Azure and GitHub (via their respective CLIs). Configuration is stored locally in `.setup-aca.env`.
