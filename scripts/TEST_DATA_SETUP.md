# 测试数据生成指南

## 方式一：自动生成（推荐）

如果你配置了 Supabase：

```bash
# 1. 确保 .env 文件包含 Supabase 配置
# VITE_SUPABASE_URL=https://xxx.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJxxx...

# 2. 先登录系统（在浏览器中）
# 访问 http://localhost:5173/login

# 3. 运行数据生成脚本
npm run test:data:generate

# 4. 运行测试
npm run test:e2e
```

## 方式二：手动创建

如果没有配置 Supabase 或自动生成失败，可以手动在数据库创建以下测试文章：

### 文章1：包含图片
- 标题：测试文章：包含图片和文本
- 状态：published
- 内容：包含至少2张图片（使用 `![alt](url)` 格式）

### 文章2：包含PDF链接
- 标题：测试文章：包含PDF链接
- 状态：published
- 内容：包含PDF链接（如 `[文档](https://example.com/doc.pdf)`）

### 文章3：包含图片链接
- 标题：测试文章：包含图片链接
- 状态：published
- 内容：包含图片格式链接（如 `[查看](https://example.com/image.jpg)`）

### 文章4：综合内容
- 标题：测试文章：综合内容
- 状态：published
- 标签：至少2个标签（不包含 `__internal`）
- 内容：混合包含图片、PDF链接、图片链接

## 验证

创建后访问 http://localhost:5173/blackboard 确认文章可见。
