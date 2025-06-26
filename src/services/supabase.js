import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://syqqhskdhsxqjlockmqj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cXFoc2tkaHN4cWpsb2NrbXFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1NDg0NTAsImV4cCI6MjA2NTEyNDQ1MH0.sLNLz4PqiM9sbr4cYAkFpeiCdtevslsePxNrRplLtBk'
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;