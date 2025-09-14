#!/bin/bash

echo "🚀 Deploying Nano Banana Backend to Railway..."

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

# Login to Railway (if not already logged in)
echo "🔐 Logging into Railway..."
railway login

# Deploy from backend directory
echo "📦 Deploying backend..."
cd backend
railway deploy

echo "✅ Backend deployment complete!"
echo "📝 Don't forget to update the API_URL in public/script.js with your Railway URL"
echo "🔄 Then run: firebase deploy --only hosting"
