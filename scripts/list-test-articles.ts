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

async function listTestArticles() {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug')
    .like('title', '%测试文章%')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ 查询失败:', error.message);
  } else {
    console.log('📋 测试文章列表：\n');
    data.forEach(article => {
      console.log(`  ${article.title}`);
      console.log(`    ID:   ${article.id}`);
      console.log(`    Slug: ${article.slug}\n`);
    });
  }
}

listTestArticles();
