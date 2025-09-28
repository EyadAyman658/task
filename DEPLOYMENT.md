# 🚀 Deployment Guide

## Quick Vercel Deployment

### Option 1: One-Click Deploy (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/thunder-task)

### Option 2: Manual Vercel Deployment

1. **Install Vercel CLI** (if not already installed)

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy**

   ```bash
   vercel --prod
   ```

4. **Environment Variables**
   Environment variables are automatically included from the committed `.env` file - no manual setup required!

### Option 3: GitHub Integration

1. **Push to GitHub**

   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/thunder-task.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically (environment variables included from `.env` file)

## Environment Variables

✅ **Automatically configured** - Environment variables are included from the committed `.env` file:

- `VITE_POLYGON_API_KEY` - Polygon.io API key
- `VITE_API_BASE_URL` - API base URL

## Build Settings

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`

## Live Demo URL

After deployment, your live demo will be available at:
`https://thunder-task-[random-id].vercel.app`

## Performance

- ⚡ Built with Vite for optimal performance
- 📦 Bundle size: ~233KB gzipped
- 🎯 Lighthouse score: 90+ performance
- 🔄 Automatic deployments on push
