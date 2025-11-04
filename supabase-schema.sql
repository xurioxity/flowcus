-- Flowcus Employee Progress Tracker Database Schema
-- Run this in Supabase SQL Editor

-- Create employee_progress table
CREATE TABLE IF NOT EXISTS employee_progress (
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
CREATE INDEX IF NOT EXISTS idx_employee_week ON employee_progress(employee_name, week_key);

-- Enable Row Level Security
ALTER TABLE employee_progress ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations (since everyone can edit)
DROP POLICY IF EXISTS "Allow all operations" ON employee_progress;
CREATE POLICY "Allow all operations" ON employee_progress
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Enable real-time subscriptions
ALTER PUBLICATION supabase_realtime ADD TABLE employee_progress;

