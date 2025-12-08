# Vercel Deployment Guide for Song Presenter

This guide will walk you through deploying your Song Presenter app to Vercel.

## Prerequisites

1. A GitHub account (or GitLab/Bitbucket)
2. A Vercel account (free tier is sufficient)
3. Git installed on your computer

## Step 1: Create a GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the details:
   - **Repository name**: `song-presenter` (or your preferred name)
   - **Description**: "Modern lyrics presentation system with animated backgrounds"
   - **Visibility**: Public or Private (your choice)
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 2: Push Your Code to GitHub

Open your terminal in the project directory and run these commands:

```bash
# Initialize git repository (if not already initialized)
git init

# Add all files to git
git add .

# Create your first commit
git commit -m "Initial commit: Song Presenter with landing page"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/song-presenter.git

# Push to GitHub
git branch -M master
git push -u origin master
```

## Step 3: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended for first-time users)

1. Go to [Vercel](https://vercel.com) and sign up/sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository:
   - Click "Import" next to your `song-presenter` repository
   - If you don't see it, click "Adjust GitHub App Permissions"
4. Configure your project:
   - **Project Name**: `song-presenter` (or your preferred name)
   - **Framework Preset**: Vite (should auto-detect)
   - **Build Command**: `npm run build` (should be pre-filled)
   - **Output Directory**: `dist` (should be pre-filled)
   - **Install Command**: `npm install` (should be pre-filled)
5. Click "Deploy"
6. Wait 1-2 minutes for deployment to complete

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (run from project directory)
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? song-presenter
# - In which directory is your code located? ./
# - Auto-detected Project Settings - correct? Yes

# Deploy to production
vercel --prod
```

## Step 4: Access Your Deployed App

After deployment completes, Vercel will provide you with URLs:

- **Production URL**: `https://song-presenter.vercel.app` (or your custom domain)
- **Preview URLs**: Generated for each git push

## Step 5: Set Up Custom Domain (Optional)

1. In your Vercel project dashboard, go to "Settings" → "Domains"
2. Add your custom domain
3. Follow Vercel's instructions to configure DNS

## Important Notes

### Browser Storage
- The app uses browser localStorage for auto-saving
- Each browser/device has its own separate storage
- Data is NOT synced across devices
- Users should regularly export their collections as backup

### Dual-Screen Setup
For presentations with separate director and live screens:

1. **Director Screen**: Open `https://your-app.vercel.app/director`
2. **Live Screen**: Open `https://your-app.vercel.app/live` (on projector/second monitor)
3. Both screens sync in real-time via BroadcastChannel API

### URLs
- **Landing Page**: `https://your-app.vercel.app/`
- **Director**: `https://your-app.vercel.app/director`
- **Live Display**: `https://your-app.vercel.app/live`

## Continuous Deployment

Once connected to GitHub, Vercel automatically:
- Deploys every push to `master` branch to production
- Creates preview deployments for pull requests
- Provides deployment status in GitHub

## Build Configuration

Your project includes:
- `vercel.json` - Configures URL rewrites for React Router
- `package.json` - Build scripts (already configured)
- `vite.config.ts` - Vite build configuration

## Troubleshooting

### Build Fails
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

### Routes Don't Work
- Ensure `vercel.json` is present with rewrite rules
- This handles React Router client-side routing

### Environment Variables
If you need environment variables in the future:
1. Go to Project Settings → Environment Variables
2. Add variables (available as `import.meta.env.VITE_*`)

## Update and Redeploy

To update your deployed app:

```bash
# Make your changes
git add .
git commit -m "Description of changes"
git push origin master
```

Vercel will automatically detect the push and redeploy!

## Performance Optimization

The app is already optimized with:
- ✅ Vite build optimization
- ✅ React lazy loading ready
- ✅ Tailwind CSS purging
- ✅ Auto-minification

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Visit [Vercel Documentation](https://vercel.com/docs)
3. Check [Vite Documentation](https://vitejs.dev)

---

**Your Song Presenter app is now live! 🎉**

Share your Director and Live URLs with your team for presentations.
