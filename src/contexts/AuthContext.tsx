import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, authService, type User } from '../services/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 初始化时获取当前用户
    const initAuth = async () => {
      try {
        console.log('### AuthContext: initAuth 开始...');
        // 先快速获取会话中的基础用户信息，避免卡住
        const { data: { session } } = await supabase.auth.getSession();
        const sessionUser = session?.user || null;
        if (sessionUser) {
          console.log('### AuthContext: 会话用户存在，先设置临时用户并结束loading');
          setUser({
            id: sessionUser.id,
            email: sessionUser.email || undefined,
            nickname: sessionUser.email?.split('@')[0] || '用户',
            role: 'user',
            is_verified: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          } as any);
        }

        // 背景刷新真实档案（不等待，避免阻塞loading）
        authService.getCurrentUser()
          .then(currentUser => {
            console.log('### AuthContext: 背景刷新返回:', currentUser?.email || null);
            setUser(currentUser);
          })
          .catch(error => {
            console.error('### AuthContext: 背景刷新失败:', error);
          });
      } catch (error) {
        console.error('### AuthContext: 初始化用户失败:', error);
        setUser(null);
      } finally {
        console.log('### AuthContext: setLoading(false), 认证初始化完成');
        setLoading(false);
      }
    };

    console.log('### AuthContext: useEffect触发, 准备initAuth');
    initAuth();

    // 监听认证状态变化
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('认证状态变化:', event, session?.user?.email);
        if (session?.user) {
          try {
            // 先更新为临时用户，提升响应速度
            setUser({
              id: session.user.id,
              email: session.user.email || undefined,
              nickname: session.user.email?.split('@')[0] || '用户',
              role: 'user',
              is_verified: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            } as any);

            // 背景刷新真实档案（不等待）
            authService.getCurrentUser()
              .then(currentUser => setUser(currentUser))
              .catch(err => console.error('获取用户信息失败:', err));
          } catch (error) {
            console.error('获取用户信息失败:', error);
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('刷新用户信息失败:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        logout,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth必须在AuthProvider内使用');
  }
  return context;
};
