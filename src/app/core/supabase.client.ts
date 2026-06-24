import { createClient } from '@supabase/supabase-js';
import { enviroments } from '../enviroments/enviroments';

export const supabase = createClient(
  enviroments.supabaseUrl,
  enviroments.supabaseKey
);