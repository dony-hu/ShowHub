# 软删除和管理员功能说明

## 功能概述

本系统已实现文章的软删除功能，并为管理员提供了查看和恢复已删除内容的能力。

## 主要功能

### 1. 软删除（Soft Delete）

- **原理**：删除文章时不会从数据库中真正删除，而是标记 `deleted_at` 时间戳
- **用户体验**：普通用户看不到已删除的文章，就像它们已经被永久删除一样
- **优势**：
  - 可以恢复误删的内容
  - 保留数据历史记录
  - 符合数据合规要求

### 2. 管理员权限

#### 管理员账号

- **管理员邮箱**：`dong.hu@gmail.com`
- **权限**：可以查看所有已删除的文章，并可以选择恢复或永久删除

#### 管理员功能入口

1. **黑板报页面入口**：管理员登录后，在黑板报页面的右上角会显示"🗑️ 已删除文章"按钮
2. **直接访问**：访问 `/admin/deleted-articles` 路径

### 3. 管理员操作界面

#### 已删除文章列表

- 显示所有被软删除的文章
- 每篇文章显示：
  - 标题和摘要
  - 封面图（如有）
  - 删除时间
  - 创建时间
  - 浏览量
  - 标签

#### 可用操作

1. **♻️ 恢复**：将文章恢复到正常状态，用户可以重新看到
2. **🗑️ 永久删除**：从数据库中彻底删除，无法恢复（需要二次确认）

## 技术实现

### 数据库更改

需要执行 SQL 迁移脚本添加 `deleted_at` 字段：

```bash
# 在 Supabase Dashboard 的 SQL Editor 中执行
database/migrations/add_soft_delete.sql
```

或者手动执行：

```sql
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_articles_deleted_at ON articles(deleted_at);
```

### 代码修改

#### 1. Article 类型定义

```typescript
export interface Article {
  // ... 其他字段
  deleted_at?: string;
}
```

#### 2. 查询方法自动过滤

所有查询方法都已更新，自动过滤 `deleted_at IS NULL` 的文章：
- `getPublishedArticles()`
- `getArticle()`
- `getMyArticles()`
- `getArticlesByCategory()`

#### 3. 删除方法改为软删除

```typescript
deleteArticle: async (id: string) => {
  return await supabase
    .from('articles')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id);
}
```

#### 4. 管理员专用方法

```typescript
// 获取已删除文章
getDeletedArticles: async (page = 1, pageSize = 20) => { ... }

// 恢复文章
restoreArticle: async (id: string) => { ... }

// 永久删除
permanentlyDeleteArticle: async (id: string) => { ... }
```

#### 5. 权限检查

```typescript
// 管理员邮箱列表
const ADMIN_EMAILS = ['dong.hu@gmail.com'];

// 检查函数
export const isAdmin = (user: User | null): boolean => {
  if (!user?.email) return false;
  return ADMIN_EMAILS.includes(user.email);
};
```

## 使用流程

### 普通用户删除文章

1. 在文章详情页点击"🗑️ 删除"按钮
2. 确认删除操作
3. 文章被标记为已删除，从列表中消失

### 管理员恢复文章

1. 以 `dong.hu@gmail.com` 账号登录
2. 访问黑板报页面，点击"🗑️ 已删除文章"按钮
3. 在列表中找到需要恢复的文章
4. 点击"♻️ 恢复"按钮
5. 文章恢复到正常状态，用户可以重新看到

### 管理员永久删除

1. 在已删除文章列表中找到文章
2. 点击"🗑️ 永久删除"按钮
3. 确认删除操作（会有警告提示）
4. 文章从数据库中彻底删除

## 添加新管理员

如需添加新的管理员账号，请修改以下文件：

```typescript
// src/services/supabase.ts
const ADMIN_EMAILS = [
  'dong.hu@gmail.com',
  'new.admin@example.com'  // 添加新管理员邮箱
];
```

## 注意事项

1. **永久删除不可恢复**：永久删除操作会从数据库中彻底删除数据，请谨慎操作
2. **权限验证**：前端和后端都应该验证管理员权限（当前仅前端验证）
3. **数据备份**：建议定期备份数据库，特别是在执行永久删除操作前
4. **性能优化**：`deleted_at` 字段已创建索引，确保查询性能

## 相关文件

- `/src/services/supabase.ts` - 核心服务和权限检查
- `/src/pages/AdminDeletedArticlesPage.tsx` - 管理员页面组件
- `/src/pages/AdminDeletedArticlesPage.css` - 管理员页面样式
- `/src/pages/BlackboardPage.tsx` - 黑板报页面（包含管理员入口）
- `/src/App.tsx` - 路由配置
- `/database/migrations/add_soft_delete.sql` - 数据库迁移脚本

## 未来改进

- [ ] 添加后端 Row Level Security (RLS) 策略确保数据安全
- [ ] 添加批量恢复/删除功能
- [ ] 添加自动清理功能（如：删除 30 天后自动永久删除）
- [ ] 添加删除原因记录
- [ ] 添加操作日志功能
