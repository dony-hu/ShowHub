import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Vite will only expose env vars prefixed with VITE_.
// In production (Vercel/Netlify), make sure to set:
//   VITE_SUPABASE_URL
//   VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // 更清晰的错误提示，避免在生产环境因变量命名不一致而迷惑
  throw new Error(
    '缺少环境变量: VITE_SUPABASE_URL 或 VITE_SUPABASE_ANON_KEY。请在 Vercel 的 Project → Settings → Environment Variables 中配置这两个变量，或在本地 .env(.local) 文件中设置后重新构建部署。'
  );
}

// 全局单例，避免 HMR 时重复创建
declare global {
  interface Window {
    __supabase?: SupabaseClient;
  }
}

if (!window.__supabase) {
  console.log('创建新的 Supabase 客户端实例');
  window.__supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    }
  });
}

export const supabase = window.__supabase;

// 管理员邮箱列表
const ADMIN_EMAILS = ['dong.hu@gmail.com'];

// 检查用户是否为管理员
export const isAdmin = (user: User | null): boolean => {
  if (!user?.email) return false;
  return ADMIN_EMAILS.includes(user.email);
};

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
  deleted_at?: string;
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

  // 获取当前用户（改用 getSession，避免 getUser 卡住）
  getCurrentUser: async () => {
    console.log('>>> getCurrentUser: 步骤1 - 开始获取...');
    try {
      console.log('>>> getCurrentUser: 步骤2 - 调用 supabase.auth.getSession()');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('>>> getCurrentUser: 步骤3 - getSession 完成, user:', session?.user?.email, 'error:', sessionError);
      
      if (sessionError) {
        console.error('>>> getCurrentUser: getSession 出错:', sessionError);
        throw sessionError;
      }
      
      const user = session?.user;
      if (!user) {
        console.log('>>> getCurrentUser: 步骤4 - 无用户，返回null');
        return null;
      }
      
      // 尝试读取用户档案
      console.log('>>> getCurrentUser: 步骤5 - 准备查询 users 表, user.id:', user.id);
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      console.log('>>> getCurrentUser: 步骤6 - users 表查询完成, data:', data?.email, 'error:', error?.code, error?.message);

    // 若不存在则自动创建档案（依赖插入策略）
    if (error && error.code === 'PGRST116') { // No rows returned
      console.log('>>> getCurrentUser: 步骤7 - 用户档案不存在(PGRST116)，准备自动创建, user.id:', user.id);
      const profile = {
        id: user.id,
        email: user.email,
        nickname: user.email?.split('@')[0] || '新用户',
        avatar_url: user.user_metadata?.avatar_url || '',
        role: 'user' as const,
        is_verified: false
      };

      console.log('>>> getCurrentUser: 步骤8 - 开始upsert profile');
      const { data: created, error: createError } = await supabase
        .from('users')
        .upsert(profile, { onConflict: 'id' })
        .select()
        .single();

      console.log('>>> getCurrentUser: 步骤9 - upsert完成, created:', created?.email, 'error:', createError);
      if (createError) {
        console.error('>>> getCurrentUser: 创建用户档案失败:', createError);
        throw createError;
      }

      console.log('>>> getCurrentUser: 步骤10 - 用户档案创建成功，返回');
      return created as User;
    }

    if (error) {
      console.error('>>> getCurrentUser: 步骤11 - 获取用户档案出错:', error);
      throw error;
    }

    console.log('>>> getCurrentUser: 步骤12 - 成功返回现有用户档案:', data.email);
    return data as User;
    } catch (err) {
      console.error('>>> getCurrentUser: CATCH块捕获异常:', err);
      // 返回最小用户以不中断流程
      try {
        const { data: { session } } = await supabase.auth.getSession();
        const u = session?.user;
        if (u) {
          return {
            id: u.id,
            email: u.email || undefined,
            nickname: u.email?.split('@')[0] || '用户',
            role: 'user',
            is_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as any as User;
        }
      } catch {}
      throw err;
    }
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
      .is('deleted_at', null)
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
      .is('deleted_at', null)
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

  // 删除文章（软删除）
  deleteArticle: async (id: string) => {
    return await supabase
      .from('articles')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id);
  },

  // 获取分类下的文章
  getArticlesByCategory: async (category: string) => {
    const { data } = await supabase
      .from('articles')
      .select('*')
      .eq('category', category)
      .eq('status', 'published')
      .is('deleted_at', null)
      .order('published_at', { ascending: false });

    return data || [];
  },

  // 管理员：获取已删除的文章
  getDeletedArticles: async (page = 1, pageSize = 20) => {
    const offset = (page - 1) * pageSize;

    const { data, count } = await supabase
      .from('articles')
      .select('*, users:author_id(*)', { count: 'exact' })
      .not('deleted_at', 'is', null)
      .order('deleted_at', { ascending: false })
      .range(offset, offset + pageSize - 1);

    return { articles: data || [], total: count || 0, page, pageSize };
  },

  // 管理员：恢复已删除的文章
  restoreArticle: async (id: string) => {
    return await supabase
      .from('articles')
      .update({ deleted_at: null })
      .eq('id', id);
  },

  // 管理员：永久删除文章
  permanentlyDeleteArticle: async (id: string) => {
    return await supabase
      .from('articles')
      .delete()
      .eq('id', id);
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

  ,
  // 上传用户头像
  uploadAvatar: async (file: File, userId: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${Date.now()}.${fileExt || 'png'}`;

    const { error } = await supabase.storage
      .from('avatars')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: true
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from('avatars')
      .getPublicUrl(fileName);

    return {
      url: data.publicUrl,
      fileName,
      size: file.size
    };
  }
};
