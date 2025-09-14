# 🚀 Backend Deployment Instructions

## Quick Deploy to Railway (Recommended)

### Option 1: Railway CLI (Fastest)

1. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**:
   ```bash
   railway login
   ```

3. **Deploy from backend directory**:
   ```bash
   cd backend
   railway deploy
   ```

4. **Get your URL** and update the frontend

### Option 2: Railway Web Interface

1. **Go to** [Railway.app](https://railway.app)
2. **Sign up/Login** with GitHub
3. **Create New Project** → "Deploy from GitHub repo"
4. **Select your repository** and choose the `backend` folder
5. **Deploy** - Railway will auto-detect Node.js
6. **Get your URL** (e.g., `https://your-app.railway.app`)

### Option 3: Render.com (Alternative)

1. **Go to** [Render.com](https://render.com)
2. **Create New Web Service**
3. **Connect GitHub** and select your repo
4. **Configure**:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
5. **Deploy**

## Update Frontend

After getting your backend URL:

1. **Update API_URL** in `public/script.js`:
   ```javascript
   const API_URL = 'https://your-backend-url.railway.app/api/enhance';
   ```

2. **Redeploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

## Local Testing

To test the backend locally:

```bash
cd backend
npm install
npm start
```

Backend will run on `https://cursor-playground-ab79a.web.app` (or your deployed URL)

## Environment Variables

The backend uses these environment variables:
- `PORT` - Server port (auto-set by Railway/Render)
- No API keys needed in environment (hardcoded for simplicity)

## Features

- ✅ **Real Nano Banana API integration**
- ✅ **Image upload to Imgur**
- ✅ **CORS enabled for frontend**
- ✅ **Error handling and logging**
- ✅ **Health check endpoint**
- ✅ **Production ready**

## Troubleshooting

- **CORS errors**: Make sure your frontend URL is in the CORS origins
- **Image upload fails**: Check Imgur API limits
- **API timeouts**: Nano Banana API can take 30+ seconds
- **Deployment fails**: Check Node.js version (18+ required)
