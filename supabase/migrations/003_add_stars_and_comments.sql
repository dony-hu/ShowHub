-- 添加点赞（收藏）功能和评论功能

-- 用户点赞表
CREATE TABLE public.article_stars (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  UNIQUE(article_id, user_id)
);

-- 评论表
CREATE TABLE public.article_comments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  deleted_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 创建索引
CREATE INDEX idx_article_stars_article ON public.article_stars(article_id);
CREATE INDEX idx_article_stars_user ON public.article_stars(user_id);
CREATE INDEX idx_article_comments_article ON public.article_comments(article_id);
CREATE INDEX idx_article_comments_author ON public.article_comments(author_id);
CREATE INDEX idx_article_comments_created_at ON public.article_comments(created_at DESC);
CREATE INDEX idx_article_comments_deleted_at ON public.article_comments(deleted_at);

-- 启用 RLS
ALTER TABLE public.article_stars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_comments ENABLE ROW LEVEL SECURITY;

-- Article_stars 表的 RLS 策略
CREATE POLICY "Anyone can view article stars" ON public.article_stars
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can add stars" ON public.article_stars
  FOR INSERT WITH CHECK (auth.uid() = user_id AND auth.role() = 'authenticated');

CREATE POLICY "Users can remove their own stars" ON public.article_stars
  FOR DELETE USING (auth.uid() = user_id);

-- Article_comments 表的 RLS 策略
CREATE POLICY "Anyone can view non-deleted comments" ON public.article_comments
  FOR SELECT USING (deleted_at IS NULL);

CREATE POLICY "Authenticated users can add comments" ON public.article_comments
  FOR INSERT WITH CHECK (auth.uid() = author_id AND auth.role() = 'authenticated');

CREATE POLICY "Users can update their own comments" ON public.article_comments
  FOR UPDATE USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can soft delete their own comments" ON public.article_comments
  FOR DELETE USING (auth.uid() = author_id);

-- 添加视图用于快速查询活跃评论
CREATE OR REPLACE VIEW active_article_comments AS
SELECT * FROM public.article_comments WHERE deleted_at IS NULL;

-- 添加注释
COMMENT ON TABLE article_stars IS '用户对文章的点赞/收藏记录';
COMMENT ON TABLE article_comments IS '文章评论表，支持软删除';
COMMENT ON VIEW active_article_comments IS '仅显示未删除的活跃评论';
