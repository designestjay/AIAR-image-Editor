# 🍌 Nano Banana Image Editor

A modern web application for AI-powered image editing using the Nano Banana Edit model. Upload your images, describe your desired changes, and let AI transform them into amazing results.

![Nano Banana Image Editor](https://img.shields.io/badge/AI-Powered-blue) ![Firebase](https://img.shields.io/badge/Firebase-Hosting-orange) ![Railway](https://img.shields.io/badge/Railway-Backend-green)

## ✨ Features

- 🖼️ **Image Upload**: Drag & drop or click to upload images
- 🤖 **AI Processing**: Powered by Nano Banana Edit model
- 📱 **Mobile Responsive**: Works perfectly on all devices
- ⬇️ **Download Results**: One-click download of enhanced images
- 🎨 **Customizable**: Choose output format (PNG/JPEG) and image size
- 📊 **Progress Tracking**: Real-time progress bar during processing
- 🌐 **Live Demo**: [Try it now!](https://cursor-playground-ab79a.web.app)

## 🚀 Live Demo

**Frontend**: https://cursor-playground-ab79a.web.app

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations
- **JavaScript (ES6+)** - Interactive functionality
- **Firebase Hosting** - Fast, secure hosting

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **Axios** - HTTP client
- **Railway** - Backend hosting

### AI Integration
- **Nano Banana Edit API** - AI image processing
- **Imgur API** - Image hosting
- **CORS** - Cross-origin requests

## 📁 Project Structure

```
nano-banana-image-editor/
├── public/                 # Frontend files (Firebase Hosting)
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   ├── script.js          # JavaScript functionality
│   └── README.md          # Frontend documentation
├── backend/               # Backend server (Railway)
│   ├── server.js          # Express server
│   ├── package.json       # Backend dependencies
│   └── railway.json       # Railway configuration
├── api/                   # Vercel serverless functions
│   ├── enhance.js         # Image enhancement endpoint
│   └── upload-image.js    # Image upload endpoint
├── functions/             # Firebase Functions
│   ├── index.js           # Cloud Functions
│   └── package.json       # Functions dependencies
├── firebase.json          # Firebase configuration
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Firebase CLI
- Railway account (free)

### 1. Clone the Repository
```bash
git clone https://github.com/designestjay/AIAR-image-Editor.git
cd AIAR-image-Editor
```

### 2. Deploy Backend to Railway
1. Go to [Railway.app](https://railway.app)
2. Sign up with GitHub
3. Create New Project → "Deploy from GitHub repo"
4. Select this repository and choose the `backend` folder
5. Railway will auto-deploy your backend

### 3. Update Frontend Configuration
1. Get your Railway backend URL (e.g., `https://your-app.railway.app`)
2. Update `public/script.js`:
   ```javascript
   const API_URL = 'https://your-app.railway.app/api/enhance';
   ```

### 4. Deploy Frontend to Firebase
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init hosting

# Deploy
firebase deploy --only hosting
```

## 🔧 Local Development

### Frontend Development
```bash
# Serve frontend locally
cd public
python -m http.server 8000
# or
npx serve public
```

### Backend Development
```bash
# Install dependencies
cd backend
npm install

# Start development server
npm start
```

## 📱 Mobile Support

- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Touch Optimized**: 44px minimum touch targets
- ✅ **No Zoom on Input**: Prevents unwanted zooming
- ✅ **Smooth Scrolling**: Optimized for mobile browsers

## 🎨 Customization

### Changing AI Model
Update the model in `backend/server.js`:
```javascript
const requestData = {
    model: 'google/nano-banana-edit', // Change this
    input: { ... }
};
```

### Styling
Modify `public/styles.css` to customize the appearance:
- Color scheme
- Layout
- Animations
- Mobile responsiveness

## 🔑 API Configuration

### Nano Banana API Key
1. Get your API key from [kie.ai](https://kie.ai/api-key)
2. Update `backend/server.js`:
   ```javascript
   'Authorization': 'Bearer YOUR_API_KEY'
   ```

### Imgur API (Optional)
For image hosting, update the Imgur client ID in `backend/server.js`:
```javascript
'Authorization': 'Client-ID YOUR_IMGR_CLIENT_ID'
```

## 🚀 Deployment Options

### Option 1: Railway (Recommended)
- **Free tier**: 500 hours/month
- **Easy setup**: GitHub integration
- **Auto-deploy**: Push to deploy

### Option 2: Render
- **Free tier**: 750 hours/month
- **GitHub integration**
- **Custom domains**

### Option 3: Vercel
- **Free tier**: 100GB bandwidth
- **Serverless functions**
- **Edge network**

## 📊 Performance

- ⚡ **Fast Loading**: Optimized assets
- 🖼️ **Image Optimization**: Automatic compression
- 📱 **Mobile First**: Responsive design
- 🔄 **Real-time Updates**: Progress tracking

## 🐛 Troubleshooting

### Common Issues

**"Load Failed" on Mobile**
- Ensure backend is deployed and accessible
- Check CORS configuration
- Verify API URL is correct

**Image Upload Fails**
- Check file size (max 10MB)
- Verify file format (PNG, JPG, WEBP)
- Check Imgur API limits

**API Timeout**
- Nano Banana API can take 30+ seconds
- Check your API key and credits
- Verify network connectivity

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Nano Banana AI](https://kie.ai/nano-banana) for the AI model
- [Firebase](https://firebase.google.com) for hosting
- [Railway](https://railway.app) for backend hosting
- [Imgur](https://imgur.com) for image hosting

## 📞 Support

- 📧 **Email**: designestjay@example.com
- 🐛 **Issues**: [GitHub Issues](https://github.com/designestjay/AIAR-image-Editor/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/designestjay/AIAR-image-Editor/discussions)

---

**Made with ❤️ and AI**