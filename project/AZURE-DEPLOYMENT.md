# Azure Static Web Apps Deployment Guide

This document provides instructions for deploying this application to Microsoft Azure Static Web Apps.

## Prerequisites

- An Azure account with an active subscription
- GitHub account (for GitHub Actions deployment)

## Deployment Options

### 1. GitHub Actions (Recommended)

This repository includes a GitHub Actions workflow file (`.github/workflows/azure-deploy.yml`) that automates the deployment process.

To set up GitHub Actions deployment:

1. In the Azure Portal, create a new Static Web App
2. During creation, connect your GitHub repository
3. Azure will automatically create a GitHub Actions workflow file in your repository
4. If you're using our pre-configured workflow file, add the following secret to your GitHub repository:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: The deployment token from your Azure Static Web App

#### Setting up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click on "New repository secret"
4. Add the following secret:

   **For AZURE_STATIC_WEB_APPS_API_TOKEN:**
   - Name: `AZURE_STATIC_WEB_APPS_API_TOKEN`
   - Value: The deployment token from your Azure Static Web App
   
   To get the deployment token:
   1. Go to your Azure Static Web App in the Azure Portal
   2. Navigate to "Overview" > "Manage deployment token"
   3. Copy the token and paste it as the secret value

> **Note:** The GitHub Actions workflow uses the syntax `${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}` to access this secret. This is the correct syntax for GitHub Actions, even if your IDE might show warnings.

The workflow will automatically build and deploy your application when you push to the main branch.

### 2. Manual Deployment

To deploy manually using the Azure CLI:

1. Install the Azure CLI and the Static Web Apps extension:
   ```
   az extension add --name staticwebapps
   ```

2. Build the application:
   ```
   npm run build
   ```

3. Deploy using Azure CLI:
   ```
   az staticwebapp deploy --source dist --app-name <static-web-app-name> --token <deployment-token>
   ```

## Configuration

The deployment includes:

- GitHub Actions workflow file for automated deployment
- Proper configuration for a React application with client-side routing

## Troubleshooting

If you encounter issues with the deployment:

1. Check the GitHub Actions workflow logs for errors
2. Verify that your build output is correctly set to `dist` in the workflow file
3. Ensure the AZURE_STATIC_WEB_APPS_API_TOKEN secret is correctly set in your GitHub repository

For further assistance, refer to the [Azure Static Web Apps documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/)
