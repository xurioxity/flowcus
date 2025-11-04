# Complete Beginner's Guide - Step by Step

## ✅ STEP 1: Dependencies Installed (DONE!)
You've already installed all the required packages. Great job!

---

## 📊 STEP 2: Set Up Supabase (Free Database)

### What is Supabase?
Supabase is a free database service that stores your employee progress data and makes it update in real-time across all devices.

### Step 2.1: Create Supabase Account

1. **Open your web browser** (Chrome, Edge, Firefox, etc.)

2. **Go to**: https://supabase.com

3. **Click "Start your project"** (big green button) or "Sign Up"

4. **Sign up with GitHub** (easiest option):
   - Click "Continue with GitHub"
   - Authorize Supabase
   - OR sign up with email if you prefer

### Step 2.2: Create a New Project

1. After signing in, you'll see a dashboard
2. Click the **"New Project"** button (top right, green button)
3. Fill in the form:
   - **Name**: `flowcus` (or any name you like)
   - **Database Password**: 
     - Create a STRONG password (save it somewhere safe!)
     - Example: `MyFlowcus2024!Secure`
     - You'll need this if you want to access the database directly later
   - **Region**: Choose the closest to you (e.g., "US East" if you're in USA)
4. Click **"Create new project"**
5. **Wait 2-3 minutes** - Supabase is setting up your database

### Step 2.3: Create the Database Table

Once your project is ready (green checkmark appears):

1. **Click "SQL Editor"** in the left sidebar (looks like a code icon `</>`

2. **Click "New Query"** button (top right)

3. **Open the file `supabase-schema.sql`** in this folder (you can open it with Notepad)

4. **Copy ALL the text** from `supabase-schema.sql` (Ctrl+A, then Ctrl+C)

5. **Paste it into the SQL Editor** in Supabase (Ctrl+V)

6. **Click "Run"** button (or press Ctrl+Enter)

7. You should see: **"Success. No rows returned"** ✅

### Step 2.4: Get Your API Keys

1. **Click "Settings"** (gear icon ⚙️) in the left sidebar

2. **Click "API"** in the settings menu

3. You'll see two important values:
   - **Project URL**: Looks like `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: A long string starting with `eyJ...`

4. **Copy both values** - you'll need them in the next step!

---

## 🔑 STEP 3: Create Environment Variables File

### Step 3.1: Create .env.local File

1. **In your Flowcus folder**, create a new file named `.env.local`
   - Right-click in the folder → New → Text Document
   - Name it exactly: `.env.local` (including the dot at the start!)
   - If Windows asks "Are you sure?", click Yes

2. **Open `.env.local`** with Notepad

3. **Paste this template**:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

4. **Fill in your values** from Step 2.4:
   - After `NEXT_PUBLIC_SUPABASE_URL=` paste your Project URL
   - After `NEXT_PUBLIC_SUPABASE_ANON_KEY=` paste your anon key

   **Example** (but use YOUR actual values):
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprbG1ub3AiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTIzNDU2NywiZXhwIjoxOTYwODEwNTY3fQ.abcdefghijklmnopqrstuvwxyz1234567890
   ```

5. **Save the file** (Ctrl+S)

**Important**: Make sure there are NO spaces around the `=` sign!

---

## 🚀 STEP 4: Test Your Website Locally

1. **Open PowerShell** in your Flowcus folder:
   - Right-click in the folder → "Open in Terminal" or "Open PowerShell window here"
   - OR press `Shift + Right-click` → "Open PowerShell window here"

2. **Run this command**:
   ```powershell
   npm run dev
   ```

3. **Wait for it to start** - you'll see:
   ```
   ▲ Next.js 14.x.x
   - Local:        http://localhost:3000
   ```

4. **Open your browser** and go to: **http://localhost:3000**

5. **You should see** the home page with 4 employee cards!

6. **Click on any employee** (e.g., "Bhimesh") to test

7. **Try updating progress** - enter a number and click "Update Progress"

8. **Open the same page in another browser tab** - you should see the update appear instantly! (Real-time! 🎉)

---

## 🌐 STEP 5: Deploy to Internet (Make it Accessible Online)

### Option A: Using GitHub + Vercel (Recommended - Easiest)

#### Step 5.1: Create GitHub Account & Repository

1. **Go to**: https://github.com
2. **Sign up** (if you don't have an account) - it's free
3. **Create a new repository**:
   - Click "+" icon (top right) → "New repository"
   - Name: `flowcus` (or any name)
   - Make it **Public** (so Vercel can access it)
   - **DO NOT** check "Add a README file"
   - Click "Create repository"

#### Step 5.2: Push Your Code to GitHub

1. **Open PowerShell** in your Flowcus folder

2. **Run these commands one by one**:

   ```powershell
   git init
   ```

   ```powershell
   git add .
   ```

   ```powershell
   git commit -m "Initial commit"
   ```

   ```powershell
   git branch -M main
   ```

   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/flowcus.git
   ```
   *(Replace YOUR_USERNAME with your actual GitHub username)*

   ```powershell
   git push -u origin main
   ```

3. **If asked for username/password**: Use your GitHub username and a Personal Access Token (not password)
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Generate new token
   - Give it permission to "repo"
   - Copy the token and use it as password

#### Step 5.3: Deploy to Vercel

1. **Go to**: https://vercel.com
2. **Sign up** with your GitHub account (click "Continue with GitHub")
3. **Click "Add New Project"**
4. **Import your repository** - select `flowcus` (or your repo name)
5. **Configure Project**:
   - Framework Preset: **Next.js** (should auto-detect)
   - **Add Environment Variables**:
     - Click "Environment Variables"
     - Add:
       - Name: `NEXT_PUBLIC_SUPABASE_URL`
       - Value: (paste your Supabase URL from Step 2.4)
     - Add another:
       - Name: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
       - Value: (paste your anon key from Step 2.4)
6. **Click "Deploy"**
7. **Wait 2-3 minutes** for deployment
8. **You'll get a URL** like: `https://flowcus.vercel.app` - **THIS IS YOUR LIVE WEBSITE!** 🎉

### Option B: Direct Vercel Deploy (Without GitHub)

If you don't want to use GitHub:

1. **Install Vercel CLI**:
   ```powershell
   npm install -g vercel
   ```

2. **In your Flowcus folder, run**:
   ```powershell
   vercel
   ```

3. **Follow the prompts**:
   - Login to Vercel
   - Link to existing project or create new
   - Add environment variables when asked

---

## ✅ You're Done!

Your website is now:
- ✅ Running locally at http://localhost:3000
- ✅ Deployed online at https://your-project.vercel.app
- ✅ Real-time updates working
- ✅ All employees can track their progress

## 🔧 Troubleshooting

### "Failed to update progress" error
- Check your `.env.local` file has correct Supabase URL and key
- Make sure you ran the SQL schema in Supabase
- Check Supabase dashboard → Table Editor → `employee_progress` table exists

### Website won't start
- Make sure you're in the Flowcus folder when running `npm run dev`
- Check that `.env.local` file exists and has correct values

### Real-time not working
- In Supabase Dashboard → Settings → API → Realtime
- Make sure "Enable Realtime" is ON

---

## 🎓 Need Help?

If you get stuck at any step, let me know which step number and what error message you see!

