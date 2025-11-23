# Firebase Deployment Guide

## Prerequisites
1. Install Firebase CLI globally: `npm install -g firebase-tools`
2. Login to Firebase: `firebase login`

## Setup Steps

### 1. Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it "university-management-sys" (or update `.firebaserc` with your project ID)
4. Enable Google Analytics (optional)

### 2. Initialize Firebase Hosting
```bash
cd "Paymaart Admin Web Application"
npm install
firebase init hosting
```

When prompted:
- Select "Use an existing project" and choose your project
- Set public directory to: `dist`
- Configure as single-page app: `Yes`
- Set up automatic builds with GitHub: `No` (for now)

### 3. Build and Deploy
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy

# Or use the combined command
npm run deploy
```

### 4. Environment Variables
- Development: Uses `http://localhost:3001/api`
- Production: Uses your Railway backend URL

Update `.env.production` with your actual Railway backend URL.

### 5. Custom Domain (Optional)
1. In Firebase Console, go to Hosting
2. Click "Add custom domain"
3. Follow the DNS setup instructions

## Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run deploy` - Build and deploy to Firebase
- `firebase serve` - Test production build locally
- `firebase hosting:channel:deploy preview` - Deploy to preview channel

## URLs
- Firebase Hosting URL: `https://university-management-sys.web.app`
- Custom domain: Configure in Firebase Console