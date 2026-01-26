-- 为 articles 表添加 visibility 字段以支持内部/公开文章区分
-- 执行此脚本前请确保已备份数据库

-- 添加 visibility 字段
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS visibility VARCHAR(20) DEFAULT 'public';

-- 添加约束，确保只能是 'public' 或 'internal'
-- 先删除旧约束（如果存在）
ALTER TABLE articles DROP CONSTRAINT IF EXISTS articles_visibility_check;
-- 再添加新约束
ALTER TABLE articles
ADD CONSTRAINT articles_visibility_check 
CHECK (visibility IN ('public', 'internal'));

-- 为已有的带 __internal 标签的文章更新 visibility 字段
UPDATE articles
SET visibility = 'internal'
WHERE tags::jsonb ? '__internal';

-- 创建索引以提高查询效率
CREATE INDEX IF NOT EXISTS idx_articles_visibility ON articles(visibility);

-- 注释说明
COMMENT ON COLUMN articles.visibility IS '文章可见性：public=公开，internal=内部';
COMMENT ON INDEX idx_articles_visibility IS '用于过滤文章可见性的索引';

-- 验证更新
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_name = 'articles' AND column_name = 'visibility';
