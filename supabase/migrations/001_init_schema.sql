-- 启用必要的扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 用户表
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  wechat_openid VARCHAR(100) UNIQUE,
  wechat_unionid VARCHAR(100),
  nickname VARCHAR(255),
  avatar_url TEXT,
  email VARCHAR(255) UNIQUE,
  role VARCHAR(20) DEFAULT 'user',
  bio TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 文章表
CREATE TABLE public.articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  summary TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  category VARCHAR(50),
  tags JSONB DEFAULT '[]'::jsonb,
  status VARCHAR(20) DEFAULT 'draft',
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 文章图片表
CREATE TABLE public.article_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  filename VARCHAR(255),
  file_size INTEGER,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 创建索引
CREATE INDEX idx_articles_author ON public.articles(author_id);
CREATE INDEX idx_articles_status ON public.articles(status);
CREATE INDEX idx_articles_category ON public.articles(category);
CREATE INDEX idx_articles_published_at ON public.articles(published_at DESC);
CREATE INDEX idx_articles_slug ON public.articles(slug);
CREATE INDEX idx_users_wechat ON public.users(wechat_openid);

-- RLS (Row Level Security) 策略
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_images ENABLE ROW LEVEL SECURITY;

-- Users表的RLS策略
CREATE POLICY "Users can read public profiles" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Articles表的RLS策略
CREATE POLICY "Anyone can read published articles" ON public.articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Authors can read their own drafts" ON public.articles
  FOR SELECT USING (auth.uid() = author_id);

CREATE POLICY "Authors can insert their own articles" ON public.articles
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can update their own articles" ON public.articles
  FOR UPDATE USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Authors can delete their own articles" ON public.articles
  FOR DELETE USING (auth.uid() = author_id);

-- Article_images表的RLS策略
CREATE POLICY "Anyone can read published article images" ON public.article_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles 
      WHERE articles.id = article_images.article_id 
      AND articles.status = 'published'
    )
  );

CREATE POLICY "Authors can read their own article images" ON public.article_images
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.articles 
      WHERE articles.id = article_images.article_id 
      AND articles.author_id = auth.uid()
    )
  );

CREATE POLICY "Authors can insert article images" ON public.article_images
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.articles 
      WHERE articles.id = article_images.article_id 
      AND articles.author_id = auth.uid()
    )
  );
