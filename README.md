# Flowcus - Employee Progress Tracker

A real-time progress tracking system for 3D printing company employees with weekly targets and historical data viewing.

## Features

- **Real-time Updates**: All progress updates are synchronized across all devices instantly
- **Weekly Targets**: Each employee has specific weekly targets (Monday to Sunday)
- **Historical Data**: View previous weeks' progress with navigation arrows
- **Individual Pages**: Dedicated pages for each employee
- **Visual Progress**: Progress bars and pie charts for easy visualization
- **Dark Mode**: Beautiful dark theme throughout

## Employees & Targets

1. **Bhimesh**: 50 action figures/weapons per week
2. **Shivaputra**: 750 e-commerce listings per week
3. **Sunanda**: 35 hours total (flexible mix of dummies: 7/hour, dragons: 4/hour)
4. **Anurag**: 5 Heygen videos + 5 reel shoots per week (1 each per day, 5 days)

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase Database

1. Go to [Supabase](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the following SQL:

```sql
-- Create employee_progress table
CREATE TABLE employee_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_name TEXT NOT NULL,
  week_key TEXT NOT NULL,
  current_value NUMERIC NOT NULL DEFAULT 0,
  target_value NUMERIC NOT NULL DEFAULT 0,
  extra_data JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(employee_name, week_key)
);

-- Create index for faster queries
CREATE INDEX idx_employee_week ON employee_progress(employee_name, week_key);

-- Enable Row Level Security (optional, for public access)
ALTER TABLE employee_progress ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since everyone can edit)
CREATE POLICY "Allow all operations" ON employee_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE employee_progress;
```

4. Go to Settings > API and copy your:
   - Project URL
   - Anon/Public key

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel (Free Hosting)

### Step 1: Push to GitHub

1. Create a new repository on GitHub
2. Initialize git and push:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/flowcus.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key
5. Click "Deploy"

Your site will be live at `https://your-project-name.vercel.app`!

### Step 3: Update Supabase CORS (if needed)

If you encounter CORS errors, go to Supabase Dashboard > Settings > API > CORS and add your Vercel domain.

## Weekly Reset

The system automatically resets progress every Monday at 12:00 AM. Previous weeks' data is preserved and can be viewed using the navigation arrows on each employee's page.

## Technology Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Real-time database
- **Recharts** - Data visualization
- **date-fns** - Date utilities

## Project Structure

```
├── app/
│   ├── bhimesh/        # Bhimesh's progress page
│   ├── shivaputra/     # Shivaputra's progress page
│   ├── sunanda/        # Sunanda's progress page
│   ├── anurag/         # Anurag's progress page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
├── hooks/              # Custom React hooks
├── lib/                # Utilities and Supabase client
└── types/              # TypeScript types
```

## License

MIT

