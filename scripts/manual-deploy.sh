#!/bin/bash

# Variables
ACR_NAME="kotahuskyacrshared"
ACR_LOGIN_SERVER="${ACR_NAME}.azurecr.io"
IMAGE_NAME="homepage"
IMAGE_TAG="latest"
NAMESPACE="webapps"
RESOURCE_GROUP="aks-shared"
AKS_CLUSTER="aks-shared-cluster"
SKIP_BUILD=false

# Parse arguments
while [[ "$#" -gt 0 ]]; do
    case $1 in
        --skip-build|-s) SKIP_BUILD=true ;;
        *) echo "Unknown parameter passed: $1"; exit 1 ;;
    esac
    shift
done

# Login to Azure Container Registry
echo "Logging in to Azure Container Registry..."
az acr login --name $ACR_NAME

if [ "$SKIP_BUILD" = false ]; then
    # Create a new builder instance
    docker buildx create --use

    # Pull the latest image to use as cache
    docker pull ${ACR_LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG} || true

    # Build and push the multi-platform Docker image with cache
    echo "Building and pushing the multi-platform Docker image..."
    docker buildx build --platform linux/amd64,linux/arm64 \
        --cache-from=type=registry,ref=${ACR_LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG} \
        --cache-to=type=inline \
        -t ${ACR_LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG} --push .
else
    echo "Skipping Docker build and push..."
fi

# Check the effective outbound IPs for the AKS cluster
az aks show --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --query "networkProfile.loadBalancerProfile.effectiveOutboundIPs"

# List all public IP addresses in the resource group
az network public-ip list --resource-group $RESOURCE_GROUP --output table

# List all load balancers in the resource group
az network lb list --resource-group $RESOURCE_GROUP --output table

# Get AKS credentials
echo "Fetching AKS credentials..."
az aks get-credentials --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --overwrite-existing

# Apply the Kubernetes deployment file
echo "Applying the Kubernetes deployment file..."
kubectl apply -f k8s/deployment.yaml --namespace=${NAMESPACE}
kubectl apply -f k8s/service.yaml --namespace=${NAMESPACE}
kubectl apply -f k8s/ingress.yaml --namespace=${NAMESPACE}

# Check the status of the deployment
echo "Checking the status of the deployment..."
kubectl get pods --namespace=${NAMESPACE}
kubectl get services --namespace=${NAMESPACE}
kubectl get ingress --namespace=${NAMESPACE}

echo "==Deployment script finished=="