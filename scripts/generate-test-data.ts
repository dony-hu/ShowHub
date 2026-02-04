import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 加载 .env 文件
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

// 从环境变量读取
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ 缺少环境变量：VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY');
  console.log('\n💡 请在 .env 文件中设置：');
  console.log('   VITE_SUPABASE_URL=你的Supabase项目URL');
  console.log('   VITE_SUPABASE_ANON_KEY=你的Supabase匿名密钥\n');
  process.exit(1);
}

// 使用 Service Role Key（如果可用）或 Anon Key
const apiKey = supabaseServiceKey || supabaseAnonKey;
const usingServiceKey = !!supabaseServiceKey;

const supabase = createClient(supabaseUrl, apiKey);

if (usingServiceKey) {
  console.log('🔓 使用 Service Role Key（绕过 RLS 限制）\n');
} else {
  console.log('⚠️  使用 Anon Key（受 RLS 限制）\n');
}

async function generateTestData() {
  console.log('🚀 开始生成测试数据...\n');

  if (!usingServiceKey) {
    console.log('⚠️  检测到使用 Anon Key，可能因 RLS 限制而失败');
    console.log('💡 如需绕过 RLS，请在 .env 添加：');
    console.log('   SUPABASE_SERVICE_ROLE_KEY=你的Service_Role_Key');
    console.log('\n📍 获取方式：');
    console.log('   Supabase Dashboard → Settings → API → service_role');
    console.log('\n🔄 尝试使用固定测试用户创建...\n');
  }

  // 先查询一个真实的用户ID
  const { data: users, error: userError } = await supabase
    .from('users')
    .select('id')
    .limit(1)
    .single();

  if (userError || !users) {
    console.error('❌ 无法找到用户，请先创建至少一个用户');
    process.exit(1);
  }

  const testUserId = users.id;
  console.log(`📌 使用用户ID: ${testUserId}\n`);
  
  const testArticles = [
    {
      title: '测试文章：包含图片和文本',
      slug: 'test-article-with-images',
      summary: '这是一篇用于测试图片渲染的文章',
      content: `# 测试文章

这是一篇包含图片的测试文章。

![测试图片](https://via.placeholder.com/800x400/4A90E2/FFFFFF?text=Test+Image)

## 图片展示

下面是另一张图片：

![示例图片](https://via.placeholder.com/600x300/E91E63/FFFFFF?text=Example+Image)

这是正文内容，用于测试文章的基本渲染功能。`,
      category: 'articles',
      author_id: testUserId,
      published_at: new Date().toISOString(),
      tags: ['测试', '图片', 'Markdown'],
      status: 'published',
    },
    {
      title: '测试文章：包含PDF链接',
      slug: 'test-article-with-pdf',
      summary: '这是一篇用于测试PDF链接和预览的文章',
      content: `# PDF文档测试

本文包含PDF文档链接，用于测试PDF查看功能。

## PDF链接示例

[示例PDF文档](https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf)

这是一个标准的PDF测试文件。

## 更多PDF链接

[技术文档](https://www.adobe.com/content/dam/acom/en/devnet/acrobat/pdfs/pdf_open_parameters.pdf)`,
      category: 'articles',
      author_id: testUserId,
      published_at: new Date().toISOString(),
      tags: ['测试', 'PDF', '文档'],
      status: 'published',
    },
    {
      title: '测试文章：包含图片链接',
      slug: 'test-article-with-image-links',
      summary: '这是一篇用于测试图片链接的文章',
      content: `# 图片链接测试

本文包含可点击的图片链接。

## 图片链接示例

[点击查看大图](https://via.placeholder.com/1920x1080/FF5722/FFFFFF?text=Large+Image)

[查看示例图片](https://via.placeholder.com/1600x900/009688/FFFFFF?text=Example+Photo)

点击上面的链接可以在新标签页打开图片。`,
      category: 'articles',
      author_id: testUserId,
      published_at: new Date().toISOString(),
      tags: ['测试', '图片链接'],
      status: 'published',
    },
    {
      title: '测试文章：综合内容',
      slug: 'test-article-comprehensive',
      summary: '包含图片、PDF、标签的综合测试文章',
      content: `# 综合测试文章

这篇文章包含多种类型的内容，用于全面测试渲染功能。

## 图片展示

![技术架构图](https://via.placeholder.com/800x600/3F51B5/FFFFFF?text=Architecture+Diagram)

## PDF文档

[项目文档](https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf)

## 图片链接

[查看高清截图](https://via.placeholder.com/2560x1440/673AB7/FFFFFF?text=Screenshot)

## 内容区域

这是一段正文内容，用于测试文章的完整渲染效果。

- 列表项1
- 列表项2
- 列表项3

### 代码示例

\`\`\`javascript
console.log('Hello, World!');
\`\`\`

**粗体文本** 和 *斜体文本*

这是一个非常完整的测试文章内容。`,
      category: 'articles',
      author_id: testUserId,
      published_at: new Date().toISOString(),
      tags: ['测试', '综合', 'Markdown', 'PDF', '图片'],
      status: 'published',
    },
  ];

  console.log('\n📄 文章列表：\n');
  testArticles.forEach((article, index) => {
    console.log(`${index + 1}. ${article.title}`);
    console.log(`   - Slug: ${article.slug}`);
    console.log(`   - 标签: ${article.tags.join(', ')}`);
    console.log(`   - 状态: ${article.status}\n`);
  });

  console.log('📝 正在创建测试文章...\n');

  const createdArticles = [];

  for (const article of testArticles) {
    const { data, error } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();

    if (error) {
      console.error(`❌ 创建文章失败: ${article.title}`);
      console.error(`   错误: ${error.message}`);
      if (error.code === '42501') {
        console.error('   原因: RLS 策略限制');
        console.error('   解决: 添加 SUPABASE_SERVICE_ROLE_KEY 到 .env 文件');
      } else if (error.code === '23503') {
        console.error('   原因: author_id 不存在');
        console.error(`   解决: 先在 users 表创建 ID 为 ${testUserId} 的用户`);
      }
    } else {
      console.log(`✅ 创建成功: ${article.title} (ID: ${data.id})`);
      createdArticles.push(data);
    }
  }

  console.log(`\n✨ 完成！共创建 ${createdArticles.length} 篇测试文章\n`);

  if (createdArticles.length === 0) {
    console.log('💡 创建失败？请尝试以下方式：');
    console.log('   1. 添加 SUPABASE_SERVICE_ROLE_KEY 到 .env');
    console.log('   2. 使用 Supabase Dashboard 手动创建');
    console.log('   3. 在浏览器登录后创建文章\n');
  } else {
    console.log('📋 文章ID列表：');
    createdArticles.forEach(article => {
      console.log(`  - ${article.title}: ${article.id}`);
    });
    console.log('\n🎯 现在可以运行测试了：npm run test:e2e');
  }
}

generateTestData().catch(console.error);
