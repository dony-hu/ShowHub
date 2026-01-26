# 黑板报功能增强 - 部署指南

## 版本更新内容

### 新增功能（2026年1月26日）

1. **⭐ 点赞/收藏功能**
   - 登陆用户可以对文章点赞
   - 点赞数实时显示
   - 点赞状态即时更新

2. **👁️ 浏览计数**
   - 每次打开文章详情自动增加浏览数
   - 黑板报列表和文章详情页显示浏览数

3. **💬 评论功能**
   - 登陆用户可以发表评论
   - 评论显示用户信息、头像、发布时间
   - 用户可以编辑自己的评论
   - 支持评论软删除

4. **🔒 管理员工具**
   - 管理员可以删除不当评论
   - 删除按钮仅在管理员账号显示

---

## 部署步骤

### 第一步：执行数据库迁移

1. 登录 [Supabase 控制台](https://app.supabase.io)
2. 选择相应的项目
3. 进入 **SQL Editor** 标签页
4. 创建新的 SQL 查询
5. 复制以下脚本内容并执行：

```sql
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
```

**注意：** 如果表已存在，会报错，可以忽略。如需重新创建，先删除表和相关对象再执行。

---

### 第二步：更新应用代码

1. 拉取最新代码：
```bash
git pull origin main
```

2. 安装依赖（如有新增）：
```bash
npm install
```

3. 本地测试：
```bash
npm run dev
```

4. 访问 http://localhost:5173 验证功能

---

### 第三步：部署到生产环境

#### 使用 Vercel（推荐）

1. 连接你的 GitHub 仓库
2. Vercel 会自动检测 `vite.config.ts` 和 `package.json`
3. 部署设置无需更改
4. 每次 push 到 main 分支自动部署

#### 使用其他平台

参考 [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)

---

## 功能使用指南

### 用户端

#### 点赞文章
1. 登陆账号
2. 打开任何已发布的文章
3. 在文章标题下方找到 ⭐ 按钮
4. 点击按钮即可点赞/取消点赞

#### 发表评论
1. 登陆账号
2. 打开任何已发布的文章
3. 滚动到页面下方的评论区
4. 在文本框中输入评论内容
5. 点击"发送评论"按钮

#### 编辑评论
1. 找到自己的评论
2. （功能待实现：添加编辑按钮）

#### 查看浏览数
- 打开任何文章，在标题下方显示 👁️ X 人浏览
- 黑板报列表中也显示浏览数

### 管理员端

#### 删除评论
1. 以管理员账号登陆
2. 打开任何文章
3. 在不当评论项右侧悬停，显示 ✕ 删除按钮
4. 点击删除按钮即可删除评论

**注意：** 删除是软删除，评论会被标记为已删除但不会从数据库移除。后续可添加恢复功能。

---

## 故障排查

### 问题：数据库迁移失败

**解决方案：**
1. 检查 Supabase 连接状态
2. 确保使用的是管理员密钥
3. 查看错误日志中是否有表/索引已存在的提示
4. 如需重建，使用 DROP 语句删除表后重试

### 问题：点赞和评论不显示

**解决方案：**
1. 检查是否执行了数据库迁移
2. 刷新浏览器页面
3. 打开浏览器开发者工具 (F12) 查看 Console 是否有错误
4. 检查网络标签页确保 API 调用成功

### 问题：权限相关错误（如无法发表评论）

**解决方案：**
1. 确保 Supabase RLS 策略已正确配置
2. 检查用户认证状态
3. 查看浏览器开发者工具的 Network 标签页，查看 API 返回的错误信息

---

## 性能优化

- 使用了数据库索引加快查询
- 列表查询使用分页（仅在需要时实现）
- 评论排序按 created_at 降序，最新评论在上

---

## 安全考虑

- 所有表都启用了 RLS（Row Level Security）
- 用户只能删除自己的评论（除了管理员）
- 点赞记录的唯一性约束防止重复点赞
- 所有 API 调用都经过身份验证

---

## 后续改进方向

- [ ] 评论编辑功能
- [ ] 评论删除恢复功能
- [ ] 评论点赞/点踩
- [ ] 评论回复/嵌套功能
- [ ] 评论审核队列（垃圾评论自动隐藏）
- [ ] 用户评论历史
- [ ] 邮件通知（评论被回复）

---

## 相关文件

- 数据库迁移：`/supabase/migrations/003_add_stars_and_comments.sql`
- 功能文档：`/FEATURE_COMMENTS_STARS.md`
- 更改文件：
  - `/src/services/supabase.ts`
  - `/src/pages/ArticleDetailPage.tsx`
  - `/src/pages/ArticleDetailPage.css`
  - `/src/pages/BlackboardPage.tsx`

---

## 联系支持

如有问题，请检查以下资源：
- [Supabase 文档](https://supabase.io/docs)
- [React 文档](https://react.dev)
- [Vite 文档](https://vitejs.dev)

