#!/bin/bash

echo "🚀 Deploying Supabase Edge Functions..."

# Check if Supabase CLI is installed
if ! command -v supabase &> /dev/null; then
    echo "❌ Supabase CLI not found. Installing..."
    npm install -g supabase
fi

# Login to Supabase
echo "🔐 Logging into Supabase..."
supabase login

# Link to project
echo "🔗 Linking to project..."
supabase link --project-ref vrckgepogdzdcodfcicv

# Deploy functions
echo "📦 Deploying enhance function..."
supabase functions deploy enhance

echo "📦 Deploying upload-image function..."
supabase functions deploy upload-image

echo "✅ Deployment complete!"
echo "🎯 Your functions are now available at:"
echo "   - https://vrckgepogdzdcodfcicv.supabase.co/functions/v1/enhance"
echo "   - https://vrckgepogdzdcodfcicv.supabase.co/functions/v1/upload-image"
echo ""
echo "🧪 Test your app at: https://cursor-playground-ab79a.web.app"
