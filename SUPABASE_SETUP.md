# 🚀 Supabase Setup Guide for AIAR Image Editor

## ✅ Why Supabase?

- ✅ **Edge Functions** - Perfect for API integration
- ✅ **Free Tier** - 500,000 function invocations/month
- ✅ **Fast Deployment** - Deploy in minutes
- ✅ **CORS Handled** - Built-in CORS support
- ✅ **TypeScript Support** - Modern development

## 🚀 Step 1: Create Supabase Project

1. **Go to**: https://supabase.com
2. **Sign up/Login** with GitHub
3. **Create New Project**:
   - **Name**: `AIAR Image Editor`
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to your users
4. **Wait for setup** (2-3 minutes)

## 🚀 Step 2: Deploy Edge Functions

### Option A: Using Supabase CLI (Recommended)

1. **Install Supabase CLI**:
   ```bash
   npm install -g supabase
   ```

2. **Login to Supabase**:
   ```bash
   supabase login
   ```

3. **Link to your project**:
   ```bash
   supabase link --project-ref YOUR_PROJECT_REF
   ```

4. **Deploy functions**:
   ```bash
   supabase functions deploy enhance
   supabase functions deploy upload-image
   ```

### Option B: Using Supabase Dashboard

1. **Go to your Supabase project dashboard**
2. **Navigate to Edge Functions**
3. **Create new function**: `enhance`
4. **Copy the code** from `supabase/functions/enhance/index.ts`
5. **Deploy**
6. **Repeat for** `upload-image` function

## 🚀 Step 3: Get Your Supabase URL

After deployment, you'll get URLs like:
- `https://YOUR_PROJECT_REF.supabase.co/functions/v1/enhance`
- `https://YOUR_PROJECT_REF.supabase.co/functions/v1/upload-image`

## 🚀 Step 4: Update Frontend

1. **Update API URL** in `public/script.js`:
   ```javascript
   const API_URL = 'https://YOUR_PROJECT_REF.supabase.co/functions/v1/enhance';
   ```

2. **Deploy frontend**:
   ```bash
   firebase deploy --only hosting
   ```

## 🎯 Expected Results

- ✅ **Real Nano Banana API** processing
- ✅ **No demo mode** - actual AI enhancement
- ✅ **Fast response** - Edge Functions are fast
- ✅ **Reliable** - Supabase infrastructure
- ✅ **Scalable** - Handles high traffic

## 🔧 Configuration

### Environment Variables (Optional)
In Supabase Dashboard → Settings → Edge Functions:
- `NANO_BANANA_API_KEY` - Your API key (optional, hardcoded for now)

### CORS Configuration
Already configured in the Edge Functions for:
- `https://cursor-playground-ab79a.web.app`

## 📱 Testing

1. **Test Edge Function**:
   ```bash
   curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/enhance \
     -H "Content-Type: application/json" \
     -d '{"prompt": "test", "image_urls": ["https://example.com/test.jpg"]}'
   ```

2. **Test Frontend**:
   - Visit: https://cursor-playground-ab79a.web.app
   - Upload image and test

## 🐛 Troubleshooting

### Common Issues:
- **CORS errors**: Check CORS headers in Edge Functions
- **Function timeout**: Increase timeout in Supabase settings
- **API key issues**: Verify Nano Banana API key

### Debugging:
- **Check Supabase logs**: Dashboard → Edge Functions → Logs
- **Check browser console**: F12 → Console tab

## 🎉 Benefits of Supabase

- ✅ **No server management** - Fully managed
- ✅ **Automatic scaling** - Handles traffic spikes
- ✅ **Global CDN** - Fast worldwide
- ✅ **Built-in monitoring** - Function logs and metrics
- ✅ **Free tier** - 500K function calls/month

**Your AIAR Image Editor will be fully functional with real AI processing!** 🎨✨
