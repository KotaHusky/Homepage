#!/bin/bash

# Variables
ACR_NAME="kotahuskyacrshared"
ACR_LOGIN_SERVER="${ACR_NAME}.azurecr.io"
IMAGE_NAME="homepage"
IMAGE_TAG="latest"
NAMESPACE="webapps"
RESOURCE_GROUP="aks-shared"
AKS_CLUSTER="aks-shared-prod-cluster"

# Create a new builder instance
docker buildx create --use

# Build and push the multi-platform Docker image
echo "Building and pushing the multi-platform Docker image..."
docker buildx build --platform linux/amd64,linux/arm64 -t ${ACR_LOGIN_SERVER}/${IMAGE_NAME}:${IMAGE_TAG} --push .

# Check the effective outbound IPs for the AKS cluster
az aks show --resource-group $RESOURCE_GROUP --name $AKS_CLUSTER --query "networkProfile.loadBalancerProfile.effectiveOutboundIPs"

# List all public IP addresses in the resource group
az network public-ip list --resource-group $RESOURCE_GROUP --output table

# List all load balancers in the resource group
az network lb list --resource-group $RESOURCE_GROUP --output table

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