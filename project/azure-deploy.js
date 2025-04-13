/**
 * Azure Deployment Script
 * 
 * This script handles post-deployment tasks for Azure App Service
 */

const fs = require('fs');
const path = require('path');

// Ensure the web.config is copied to the dist folder
try {
  const webConfigSource = path.join(__dirname, 'web.config');
  const webConfigDest = path.join(__dirname, 'dist', 'web.config');
  
  if (fs.existsSync(webConfigSource)) {
    fs.copyFileSync(webConfigSource, webConfigDest);
    console.log('✅ web.config copied to dist folder');
  } else {
    console.error('❌ web.config not found in project root');
  }
} catch (error) {
  console.error('Error copying web.config:', error);
}

console.log('🚀 Azure deployment preparation complete');
