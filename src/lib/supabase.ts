import { createClient } from '@supabase/supabase-js';

let rawUrl = (import.meta as any).env.VITE_SUPABASE_URL || 'https://rgqbelwbihcdvcbhnpze.supabase.co';
let rawKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJncWJlbHdiaWhjZHZjYmhucHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyNTE2NzUsImV4cCI6MjA5NzgyNzY3NX0.SCERd3MmcBkc-V9YBTdsV8KJW3EX_8Q_sehfyS6ekEA';

rawUrl = String(rawUrl).replace(/['"]/g, '').trim();
// Remove /rest/v1 or /rest/v1/ if the user accidentally included it
rawUrl = rawUrl.replace(/\/rest\/v1\/?$/, '');
rawUrl = rawUrl.replace(/\/+$/, '');
rawKey = String(rawKey).replace(/['"]/g, '').trim();

if (rawUrl && !rawUrl.startsWith('http')) {
  rawUrl = `https://${rawUrl}`;
}

const supabaseUrl = rawUrl;
const supabaseKey = rawKey;

// Create a single supabase client for interacting with your database
// It will only be initialized if the environment variables are provided
export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;
