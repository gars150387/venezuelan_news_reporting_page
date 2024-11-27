// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const SUPABASE_URL = import.meta.env.VITE_APP_SUPABASE_URL; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_APP_SUPABASE_ANON_KEY; // Replace with your Supabase anon key
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
