# 🚀 Railway Setup for AIAR Image Editor

## ✅ GitHub Repository Ready!
**Repository**: https://github.com/designestjay/AIAR-image-Editor.git

## 🚀 Deploy Backend to Railway

### Step 1: Create Railway Account
1. Go to [Railway.app](https://railway.app)
2. Click "Sign up with GitHub"
3. Authorize Railway to access your repositories

### Step 2: Deploy Backend
1. **Click "New Project"**
2. **Select "Deploy from GitHub repo"**
3. **Choose your repository**: `designestjay/AIAR-image-Editor`
4. **Configure Deployment**:
   - **Root Directory**: `/backend` ⚠️ **IMPORTANT**
   - **Build Command**: `npm install` (auto-detected)
   - **Start Command**: `npm start` (auto-detected)
5. **Click "Deploy"**

### Step 3: Get Your Backend URL
After deployment (2-3 minutes):
1. Go to your Railway project dashboard
2. Click on your deployed service
3. **Copy the URL** (e.g., `https://aiar-image-editor-production.up.railway.app`)

### Step 4: Update Frontend
1. **Update API URL** in `public/script.js`:
   ```javascript
   const API_URL = 'https://your-railway-url.railway.app/api/enhance';
   ```

2. **Commit and push**:
   ```bash
   git add public/script.js
   git commit -m "Update API URL to Railway backend"
   git push origin main
   ```

3. **Redeploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

## 🎯 Expected Results

### ✅ After Railway Deployment:
- **Backend URL**: `https://your-app.railway.app`
- **Health Check**: `https://your-app.railway.app/health`
- **API Endpoint**: `https://your-app.railway.app/api/enhance`

### ✅ After Frontend Update:
- **No more demo mode**
- **Real Nano Banana AI processing**
- **Works on mobile and desktop**
- **Download functionality working**

## 🔧 Railway Configuration

### Environment Variables (Auto-set by Railway):
- `PORT` - Server port (Railway sets this automatically)
- `NODE_ENV` - Environment (production)

### Custom Domain (Optional):
1. Go to Railway project settings
2. Add custom domain
3. Update CORS in `backend/server.js`

## 📱 Testing Your Deployment

### 1. Test Backend
```bash
# Health check
curl https://your-railway-url.railway.app/health

# Expected response:
{"status":"OK","timestamp":"2024-01-01T00:00:00.000Z","service":"Nano Banana Backend"}
```

### 2. Test Frontend
- Visit: https://cursor-playground-ab79a.web.app
- Upload an image
- Check that it processes with real AI (no demo mode)

### 3. Test Mobile
- Open on your phone
- Upload an image
- Verify download works

## 🐛 Troubleshooting

### Railway Issues:
- **Build Fails**: Check Node.js version (18+ required)
- **Port Issues**: Railway sets PORT automatically
- **CORS Errors**: Update origin in `backend/server.js`

### Common Solutions:
```javascript
// In backend/server.js, update CORS:
app.use(cors({ 
    origin: ['https://cursor-playground-ab79a.web.app', 'https://your-railway-url.railway.app'],
    credentials: true
}));
```

## 🎉 Success Checklist

- [ ] Railway account created
- [ ] GitHub repository connected
- [ ] Backend deployed to Railway
- [ ] Backend URL obtained
- [ ] Frontend API URL updated
- [ ] Frontend redeployed to Firebase
- [ ] Health check working
- [ ] Mobile testing completed
- [ ] Real API processing working
- [ ] Download functionality working

## 📞 Support

- **Railway Docs**: https://docs.railway.app
- **Your Repository**: https://github.com/designestjay/AIAR-image-Editor
- **Live App**: https://cursor-playground-ab79a.web.app

**Your AIAR Image Editor will be fully functional with real AI processing!** 🎨✨
