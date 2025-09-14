# 🚀 GitHub + Railway Setup Guide

## ✅ Step 1: Upload to GitHub

### Option A: Using GitHub Web Interface (Easiest)

1. **Go to GitHub**: https://github.com
2. **Sign in** to your account
3. **Click "New Repository"** (green button)
4. **Repository Settings**:
   - **Name**: `nano-banana-image-editor` (or your preferred name)
   - **Description**: `AI-powered image editor using Nano Banana model`
   - **Visibility**: Public (recommended for free hosting)
   - **Initialize**: ❌ Don't check any boxes (we already have files)
5. **Click "Create Repository"**

### Option B: Using Git Commands

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/nano-banana-image-editor.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## ✅ Step 2: Deploy Backend to Railway

### Method 1: Railway Web Interface (Recommended)

1. **Go to Railway**: https://railway.app
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `nano-banana-image-editor` repository
4. **Configure Deployment**:
   - **Root Directory**: `/backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. **Deploy**: Railway will automatically deploy your backend

### Method 2: Railway CLI (Alternative)

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Deploy from backend directory
cd backend
railway deploy
```

## ✅ Step 3: Get Your Backend URL

After Railway deployment:
1. **Go to your Railway project dashboard**
2. **Click on your service**
3. **Copy the URL** (e.g., `https://nano-banana-backend-production.up.railway.app`)

## ✅ Step 4: Update Frontend Configuration

1. **Update API URL** in `public/script.js`:
   ```javascript
   const API_URL = 'https://your-railway-url.railway.app/api/enhance';
   ```

2. **Commit and push changes**:
   ```bash
   git add public/script.js
   git commit -m "Update API URL to Railway backend"
   git push origin main
   ```

## ✅ Step 5: Redeploy Frontend

```bash
# Deploy updated frontend to Firebase
firebase deploy --only hosting
```

## 🎯 Final Result

- ✅ **GitHub Repository**: Your code is version controlled
- ✅ **Railway Backend**: Real API processing
- ✅ **Firebase Frontend**: Fast, global hosting
- ✅ **No Demo Mode**: Real Nano Banana AI processing
- ✅ **Mobile Compatible**: Works on all devices

## 🔧 Railway Configuration Details

### Environment Variables (Optional)
Railway will automatically set:
- `PORT` - Server port
- `NODE_ENV` - Environment

### Custom Domain (Optional)
1. Go to Railway project settings
2. Add custom domain
3. Update CORS in `backend/server.js`

## 📱 Testing Your Deployment

1. **Test Backend**: Visit `https://your-railway-url.railway.app/health`
2. **Test Frontend**: Visit `https://cursor-playground-ab79a.web.app`
3. **Upload Image**: Try the full workflow
4. **Check Mobile**: Test on your phone

## 🐛 Troubleshooting

### Railway Deployment Issues
- **Build Fails**: Check Node.js version (18+ required)
- **Port Issues**: Railway sets PORT automatically
- **CORS Errors**: Update origin in `backend/server.js`

### GitHub Issues
- **Permission Denied**: Check GitHub authentication
- **Repository Not Found**: Verify repository name and permissions

## 🎉 Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Railway project created
- [ ] Backend deployed to Railway
- [ ] Backend URL obtained
- [ ] Frontend API URL updated
- [ ] Frontend redeployed to Firebase
- [ ] Mobile testing completed
- [ ] Real API processing working
- [ ] Download functionality working

## 📞 Need Help?

- **Railway Docs**: https://docs.railway.app
- **GitHub Docs**: https://docs.github.com
- **Firebase Docs**: https://firebase.google.com/docs

**Your Nano Banana Image Editor will be fully functional with real AI processing!** 🍌✨
