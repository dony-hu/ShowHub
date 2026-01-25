import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase URL和ANON_KEY必须在环境变量中配置');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 类型定义
export interface User {
  id: string;
  wechat_openid?: string;
  nickname: string;
  avatar_url?: string;
  email?: string;
  role: 'user' | 'admin';
  bio?: string;
  is_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  summary?: string;
  content: string;
  cover_image?: string;
  category?: string;
  tags?: string[];
  status: 'draft' | 'published' | 'archived';
  view_count: number;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

// 认证相关
export const authService = {
  // 微信登录（之后实现）
  loginWithWechat: async (code: string) => {
    // 调用后端API获取token
    const response = await fetch('/api/auth/wechat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    });
    return response.json();
  },

  // 获取当前用户
  getCurrentUser: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();
    
    return data as User;
  },

  // 登出
  logout: async () => {
    return await supabase.auth.signOut();
  },

  // 获取用户信息
  getUser: async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();
    
    return data as User;
  }
};

// 文章相关
export const articleService = {
  // 获取发布的文章列表
  getPublishedArticles: async (page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;
    
    const { data, count } = await supabase
      .from('articles')
      .select('*, users:author_id(nickname, avatar_url)', { count: 'exact' })
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    return { articles: data || [], total: count || 0, page, pageSize };
  },

  // 获取文章详情
  getArticle: async (id: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*, users:author_id(*)')
      .eq('id', id)
      .single();

    if (data && data.status === 'published') {
      // 增加浏览量
      await supabase
        .from('articles')
        .update({ view_count: data.view_count + 1 })
        .eq('id', id);
    }

    return data as Article;
  },

  // 获取我的文章（草稿+发布）
  getMyArticles: async (userId: string, page = 1, pageSize = 10) => {
    const offset = (page - 1) * pageSize;

    const { data, count } = await supabase
      .from('articles')
      .select('*', { count: 'exact' })
      .eq('author_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    return { articles: data || [], total: count || 0 };
  },

  // 创建文章
  createArticle: async (article: Partial<Article>) => {
    const { data } = await supabase
      .from('articles')
      .insert([article])
      .select()
      .single();

    return data as Article;
  },

  // 更新文章
  updateArticle: async (id: string, updates: Partial<Article>) => {
    const { data } = await supabase
      .from('articles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    return data as Article;
  },

  // 发布文章
  publishArticle: async (id: string) => {
    const { data } = await supabase
      .from('articles')
      .update({ 
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    return data as Article;
  },

  // 删除文章
  deleteArticle: async (id: string) => {
    return await supabase
      .from('articles')
      .delete()
      .eq('id', id);
  },

  // 获取分类下的文章
  getArticlesByCategory: async (category: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    return data || [];
  }
};

// 文件上传相关
export const uploadService = {
  // 上传文章图片到Storage
  uploadArticleImage: async (file: File, articleId: string) => {
    const fileName = `${articleId}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from('article-images')
      .upload(fileName, file);

    if (error) throw error;

    // 获取公开URL
    const { data } = supabase.storage
      .from('article-images')
      .getPublicUrl(fileName);

    return {
      url: data.publicUrl,
      fileName,
      size: file.size
    };
  },

  // 删除文章图片
  deleteArticleImage: async (filePath: string) => {
    return await supabase.storage
      .from('article-images')
      .remove([filePath]);
  }
};
