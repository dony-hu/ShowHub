-- 为 articles 表添加 deleted_at 字段以支持软删除功能
-- 执行此脚本前请确保已备份数据库

-- 添加 deleted_at 字段
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

-- 创建索引以提高查询效率
CREATE INDEX IF NOT EXISTS idx_articles_deleted_at ON articles(deleted_at);

-- 创建一个视图用于快速查询未删除的文章
CREATE OR REPLACE VIEW active_articles AS
SELECT * FROM articles WHERE deleted_at IS NULL;

-- 注释说明
COMMENT ON COLUMN articles.deleted_at IS '软删除时间戳，NULL表示未删除';
COMMENT ON INDEX idx_articles_deleted_at IS '用于过滤已删除文章的索引';
COMMENT ON VIEW active_articles IS '仅显示未删除的活跃文章';

-- 验证更新
SELECT 
  column_name, 
  data_type, 
  is_nullable 
FROM information_schema.columns 
WHERE table_name = 'articles' AND column_name = 'deleted_at';
