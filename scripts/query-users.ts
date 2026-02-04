import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function queryUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .limit(10);

  if (error) {
    console.error('❌ 查询失败:', error.message);
  } else {
    console.log('📋 用户列表：');
    if (data.length === 0) {
      console.log('   (没有用户)');
    } else {
      data.forEach(user => {
        console.log(`   -`, JSON.stringify(user, null, 2));
      });
    }
  }
}

queryUsers();
