# 🚀 How to Host Your Website Live - Complete Guide

Follow these steps to make your Flowcus website accessible to everyone on the internet!

---

## **STEP 1: Push Code to GitHub**

### 1.1: Initialize Git (if not done)

Open PowerShell in your Flowcus folder and run:

```powershell
git init
```

### 1.2: Add All Files

```powershell
git add .
```

### 1.3: Create First Commit

```powershell
git commit -m "Initial commit - Flowcus employee tracker"
```

### 1.4: Create GitHub Repository

1. **Go to**: https://github.com
2. **Sign in** (or create account if you don't have one - it's free!)
3. **Click the "+" icon** (top right) → **"New repository"**
4. **Fill in**:
   - **Repository name**: `flowcus` (or any name you like)
   - **Visibility**: Choose **Public** (so Vercel can access it)
   - **DO NOT** check "Add a README file" (we already have files)
   - **DO NOT** add .gitignore or license
5. **Click "Create repository"**

### 1.5: Connect Local Code to GitHub

After creating the repository, GitHub will show you commands. Use these:

```powershell
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/flowcus.git
```

*(Replace YOUR_USERNAME with your actual GitHub username)*

### 1.6: Push Code to GitHub

```powershell
git push -u origin main
```

**If asked for username/password:**
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)
  - Go to: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  - Click "Generate new token (classic)"
  - Give it a name like "Vercel Deploy"
  - Check the **"repo"** checkbox
  - Click "Generate token"
  - **Copy the token** (you won't see it again!)
  - Use this token as your password

---

## **STEP 2: Deploy to Vercel (Free Hosting)**

### 2.1: Sign Up for Vercel

1. **Go to**: https://vercel.com
2. **Click "Sign Up"** (or "Log In" if you have an account)
3. **Sign up with GitHub** (easiest option - click "Continue with GitHub")
4. **Authorize Vercel** to access your GitHub account

### 2.2: Import Your Project

1. **After signing in**, you'll see the Vercel dashboard
2. **Click "Add New..."** → **"Project"**
3. **Click "Import Git Repository"**
4. **Find your `flowcus` repository** and click **"Import"**

### 2.3: Configure Project

1. **Framework Preset**: Should auto-detect **Next.js** ✅
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: Leave default (should be `npm run build`)
4. **Output Directory**: Leave default (should be `.next`)
5. **Install Command**: Leave default (should be `npm install`)

### 2.4: Add Environment Variables ⚠️ IMPORTANT!

1. **Click "Environment Variables"** section
2. **Add these two variables**:

   **Variable 1:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: `https://pghsjyaeevdvpfxzjoyc.supabase.co`
   - Click **"Add"**

   **Variable 2:**
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBnaHNqeWFlZXZkdnBmeHpqb3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIyODE5MTgsImV4cCI6MjA3Nzg1NzkxOH0.NMQvvT6iZ7bd7lbmA0f7M1mO_LmEwSX2qgrMSCH4DfM`
   - Click **"Add"**

### 2.5: Deploy!

1. **Click the big "Deploy" button** (bottom right)
2. **Wait 2-3 minutes** - Vercel is building your website
3. **You'll see progress** - it will show:
   - "Building..."
   - "Deploying..."
   - "Ready!"

### 2.6: Get Your Live URL! 🎉

Once deployment is complete:
1. **Click on your project** in the Vercel dashboard
2. **You'll see**: "Your site is live at: `https://flowcus-xxxxx.vercel.app`"
3. **This is your LIVE website URL!** Share it with anyone!

---

## **STEP 3: Update Your Domain (Optional)**

Vercel gives you a free domain like `flowcus.vercel.app`. You can also:
- Use your own custom domain (if you have one)
- Or just use the Vercel domain - it's free and works perfectly!

---

## **STEP 4: Future Updates**

Whenever you make changes to your code:

1. **Save your changes**
2. **In PowerShell**, run:
   ```powershell
   git add .
   git commit -m "Updated website"
   git push
   ```
3. **Vercel will automatically**:
   - Detect the changes
   - Rebuild your website
   - Deploy the new version
   - **Takes ~2 minutes**

---

## **Troubleshooting**

### ❌ "Build Failed" Error

**Check:**
- Did you add both environment variables correctly?
- Are the Supabase credentials correct?
- Check the "Build Logs" in Vercel dashboard for error details

### ❌ "Can't connect to Supabase"

**Check:**
- In Supabase Dashboard → Settings → API → CORS
- Add your Vercel domain: `https://your-project.vercel.app`

### ❌ Git Push Failed

**Try:**
- Make sure you're using Personal Access Token (not password)
- Check that your GitHub repository exists
- Verify the remote URL: `git remote -v`

---

## **Quick Commands Reference**

```powershell
# Initialize git (if needed)
git init

# Add all files
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Check status
git status
```

---

## **🎉 You're Done!**

Your website is now live on the internet! Share the Vercel URL with your employees and they can access it from anywhere in the world.

**Remember:**
- The URL looks like: `https://flowcus-xxxxx.vercel.app`
- Real-time updates work across all devices
- Changes auto-deploy when you push to GitHub
- It's completely free!

---

## **Need Help?**

If you get stuck at any step:
1. Check the error message carefully
2. Look at the Vercel build logs
3. Make sure all environment variables are set
4. Verify your Supabase project is active

Good luck! 🚀

