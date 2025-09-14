# 🚀 Quick Backend Deployment Guide

## Why Demo Mode Shows on Mobile

The app shows "demo mode" because:
1. **No Backend Deployed**: The Firebase Functions require a paid plan
2. **API URL Points to Firebase**: But there's no backend running there
3. **Demo Mode Enabled**: I temporarily enabled it to fix mobile issues

## ✅ Solution: Deploy Backend to Railway (Free)

### Step 1: Deploy Backend
1. **Go to** [Railway.app](https://railway.app)
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository** and choose the `backend` folder
5. **Deploy** - Railway will auto-detect Node.js

### Step 2: Get Your Backend URL
After deployment, Railway will give you a URL like:
`https://your-app-name.railway.app`

### Step 3: Update Frontend
1. **Update API_URL** in `public/script.js`:
   ```javascript
   const API_URL = 'https://your-app-name.railway.app/api/enhance';
   ```

2. **Redeploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

## 🎯 Alternative: Use Render.com

1. **Go to** [Render.com](https://render.com)
2. **Create New Web Service**
3. **Connect GitHub** and select your repo
4. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. **Deploy**

## 🔧 Current Status

- ✅ **Frontend**: Deployed and working
- ✅ **Backend**: Ready to deploy (files in `backend/` folder)
- ✅ **Demo Mode**: Disabled (will use real API once backend is deployed)
- ✅ **Mobile**: Will work once backend is deployed

## 📱 After Backend Deployment

- ✅ **No more "demo mode"** message
- ✅ **Real API calls** to Nano Banana
- ✅ **Actual image processing**
- ✅ **Works on mobile** and desktop

**The backend files are ready in the `backend/` folder. Just deploy them to Railway or Render!**
