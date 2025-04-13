# Azure Deployment Guide

This document provides instructions for deploying this application to Microsoft Azure.

## Prerequisites

- An Azure account with an active subscription
- Azure CLI installed locally (optional, for manual deployments)
- GitHub account (for GitHub Actions deployment)

## Deployment Options

### 1. GitHub Actions (Recommended)

This repository includes a GitHub Actions workflow file (`.github/workflows/azure-deploy.yml`) that automates the deployment process.

To set up GitHub Actions deployment:

1. In the Azure Portal, create a new Web App
2. Go to your Web App > Deployment Center > GitHub Actions
3. Connect your GitHub repository
4. Add the following secrets to your GitHub repository:
   - `AZURE_WEBAPP_NAME`: The name of your Azure Web App
   - `AZURE_WEBAPP_PUBLISH_PROFILE`: The publish profile from your Azure Web App

The workflow will automatically build and deploy your application when you push to the main branch.

### 2. Manual Deployment

To deploy manually:

1. Build the application:
   ```
   npm run azure-build
   ```

2. Deploy using Azure CLI:
   ```
   az webapp deployment source config-zip --resource-group <resource-group-name> --name <app-name> --src ./dist.zip
   ```

## Configuration

The deployment includes:

- `web.config`: Configures IIS to handle client-side routing and proper MIME types
- `.deployment`: Tells Azure App Service how to build and deploy the application
- `azure-deploy.js`: Handles post-build tasks specific to Azure deployment

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions workflow logs for errors
2. Verify that your Azure Web App is configured to use Node.js 18.x or higher
3. Ensure your Azure Web App has the correct application settings configured

For further assistance, refer to the [Azure Web App documentation](https://docs.microsoft.com/en-us/azure/app-service/).
