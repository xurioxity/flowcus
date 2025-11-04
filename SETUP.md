# Quick Setup Guide - Flowcus Employee Tracker

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Supabase (Free Database)

1. **Create Account**: Go to https://supabase.com and sign up (free)

2. **Create Project**: 
   - Click "New Project"
   - Choose organization (create one if needed)
   - Name: `flowcus` (or any name)
   - Database Password: (save this securely)
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

3. **Create Database Table**:
   - Once project is ready, go to **SQL Editor** (left sidebar)
   - Click **New Query**
   - Copy and paste the entire contents of `supabase-schema.sql`
   - Click **Run** (or press Ctrl+Enter)
   - You should see "Success. No rows returned"

4. **Get API Keys**:
   - Go to **Settings** (gear icon) → **API**
   - Copy these two values:
     - **Project URL** (looks like: `https://xxxxx.supabase.co`)
     - **anon public** key (long string starting with `eyJ...`)

## Step 3: Configure Environment Variables

1. Create a file named `.env.local` in the root folder (same level as `package.json`)

2. Add these lines (replace with your actual values):

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Important**: Never commit `.env.local` to git (it's already in .gitignore)

## Step 4: Run Locally

```bash
npm run dev
```

Open http://localhost:3000 in your browser

## Step 5: Deploy to Internet (Free on Vercel)

### Option A: Using GitHub + Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
   - Go to GitHub.com, create new repository
   - Copy the repository URL
   ```bash
   git remote add origin https://github.com/yourusername/flowcus.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel**:
   - Go to https://vercel.com, sign up/login with GitHub
   - Click "Add New Project"
   - Import your GitHub repository
   - Add Environment Variables:
     - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click "Deploy"
   - Wait ~2 minutes, your site will be live!

### Option B: Direct Vercel Deploy (No GitHub)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```
   - Follow prompts
   - Add environment variables when asked

## Troubleshooting

### "Failed to update progress" error
- Check your Supabase URL and key are correct in `.env.local`
- Make sure you ran the SQL schema in Supabase
- Check Supabase dashboard → Table Editor → `employee_progress` table exists

### Real-time updates not working
- In Supabase Dashboard → Settings → API → Realtime
- Make sure "Enable Realtime" is ON
- Check that you ran the SQL command: `ALTER PUBLICATION supabase_realtime ADD TABLE employee_progress;`

### CORS errors
- In Supabase Dashboard → Settings → API → CORS
- Add your Vercel domain (e.g., `https://your-project.vercel.app`)

## Weekly Reset

The system automatically treats each week as Monday-Sunday. Every Monday at 12:00 AM, the current week resets, but previous weeks' data is saved and viewable via the navigation arrows.

## Support

If you encounter issues:
1. Check browser console (F12) for errors
2. Verify Supabase connection in Supabase Dashboard → Logs
3. Make sure all environment variables are set correctly

