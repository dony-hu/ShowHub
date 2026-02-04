# 本地密钥管理方案总结

## 🔒 当前配置状态

```
✅ .env                    → 包含真实密钥（本地开发用）→ 在 .gitignore 中 ✓
✅ .env.local              → 本地覆盖配置           → 在 .gitignore 中 ✓
✅ .env.example            → 模板文件（占位符）      → Git 跟踪 ✓
✅ scripts/setup-env.sh    → 初始化脚本              → Git 跟踪 ✓
✅ package.json            → npm run setup:env      → Git 跟踪 ✓
```

## 🎯 工作流程

### 👤 开发者 A（首次入库）
```bash
# 1. 克隆项目
git clone <repo>
cd ShowHub

# 2. 初始化环境（可选，也可以手动复制）
npm run setup:env

# 3. 编辑 .env.local，填入实际密钥
vim .env.local
# 或
code .env.local

# 4. 本地密钥绝不会被提交
git status
# 查看：.env.local 在 untracked files 中，不在 Changes to be committed

# 5. 启动开发
npm run dev
```

### 👤 开发者 B（更新代码后）
```bash
# 1. 拉取最新代码
git pull origin main

# 2. 检查 .env.local 是否存在
ls .env.local  # 存在 → 继续开发
ls .env.local  # 不存在 → npm run setup:env 或 cp .env.example .env.local

# 3. 如果 .env.example 有更新，手动对比一下是否需要添加新密钥
diff .env.example .env.local

# 4. 启动开发
npm run dev
```

## 🛡️ 安全保障措施

| 措施 | 实现 | 作用 |
|------|------|------|
| 本地密钥 | `.env` + `.env.local` 在 `.gitignore` | 防止意外提交 |
| 模板管理 | `.env.example` 仅含占位符 | 团队参考，无真实密钥 |
| 脚本指导 | `setup-env.sh` + README | 新成员快速上手 |
| 环境隔离 | 不同环境不同密钥（开发/测试/生产） | 减少安全风险 |
| 权限管理 | Service Role Key 仅本地脚本使用 | 防止前端暴露 |

## 📋 检查清单

### ✅ 部署前检查
- [ ] `.env` 在 `.gitignore` 中
- [ ] `.env.local` 在 `.gitignore` 中
- [ ] `.env.example` 不含真实密钥
- [ ] 未提交任何含密钥的文件：`git log --all --grep="env\|key\|secret"`
- [ ] 脚本能正常运行：`npm run setup:env`

### ✅ 团队协作检查
- [ ] 每个成员有自己的 `.env.local`（本地私密）
- [ ] 密钥管理员维护 `.env.example` 模板
- [ ] 新增密钥时，同步更新 `.env.example`
- [ ] Code Review 时检查是否误提交密钥

## 🚨 应急处理

### 情景 1：不小心提交了密钥
```bash
# 立即撤销最后一次提交
git reset --soft HEAD~1
git reset HEAD .env
git restore .env

# 重新提交（不含 .env）
git commit -m "fix: remove sensitive .env file"
git push --force-with-lease

# 在 Supabase Dashboard 中轮换所有密钥！
```

### 情景 2：密钥泄露（如推送到公开仓库）
```bash
# 紧急处理步骤
1. 在 Supabase Dashboard 立即轮换所有密钥
2. 使用 git-filter-repo 或 BFG Repo-Cleaner 清除历史
3. 强制推送更新
4. 通知所有开发者重新拉取

# 示例（BFG）
bfg --delete-files .env --no-blob-protection
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

## 💡 最佳实践

### 密钥轮换频率
- **Development** (开发账户)：3个月 或 有风险提示时
- **Staging** (测试账户)：1个月
- **Production** (生产账户)：随时（如有泄露立即轮换）

### 密钥权限管理
- 使用最小权限原则（Principle of Least Privilege）
- Anon Key：只读权限 + RLS 限制
- Service Role Key：需要权限的后端操作

### 本地存储方案
优先级排序（从推荐到不推荐）：

1. **文件 + .gitignore**（当前方案）✅
   - 优点：简单、跨平台、无第三方依赖
   - 缺点：文件泄露风险

2. **系统密钥链**（macOS/Linux/Windows）
   ```bash
   # 示例（macOS Keychain）
   security add-generic-password -a developer -s ShowHub_SUPABASE_KEY -w "actual_key_value"
   ```

3. **密钥管理工具**（1Password、Vault 等）
   - 优点：企业级安全、加密存储、审计日志
   - 缺点：需要付费、增加复杂度

4. ~~环境变量（shell）~~ ❌
   - 风险：历史记录可见、进程可查询

## 🔗 相关资源

- [Supabase 安全最佳实践](https://supabase.com/docs/guides/api/security)
- [OWASP 密钥管理](https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [Git 密钥检测工具](https://github.com/Yelp/detect-secrets)

---

**最后提醒：** 安全是每个开发者的责任，代码审查时请务必检查是否有敏感信息泄露！🛡️
