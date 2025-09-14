#!/bin/bash

echo "🚀 Pushing Nano Banana Image Editor to GitHub..."

# Check if git remote is set
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "❌ No GitHub remote set. Please run:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/nano-banana-image-editor.git"
    echo "   Then run this script again."
    exit 1
fi

# Add all changes
echo "📁 Adding all files..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Update: Ready for Railway deployment

- Complete Nano Banana Image Editor
- Backend ready for Railway
- Frontend deployed to Firebase
- Mobile responsive design
- Download functionality
- Real API integration"

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo "✅ Successfully pushed to GitHub!"
echo ""
echo "🎯 Next steps:"
echo "1. Go to https://railway.app"
echo "2. Sign up with GitHub"
echo "3. Create new project from your repo"
echo "4. Select 'backend' folder"
echo "5. Deploy!"
echo ""
echo "📖 See GITHUB_RAILWAY_SETUP.md for detailed instructions"
