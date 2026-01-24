# ShowHub - 文档展示系统

一个现代化的Web应用，用于展示PPT和PDF文档。

## 项目目标

1. **对齐业界标准**：参考高德、百度、Google 等主流图商，推进 API 命名、路径、认证与错误反馈的标准化治理。
2. **透明反馈机制**：通过「地图纠错」与「产品缺陷」模块，建立从用户上报到研发修复的闭环流程。
3. **开发者深度共建**：依托「功能改进」建议池，由社区开发者投票决定产品演进优先级，打造更友好的 LBS 开发生态。
4. **极简集成体验**：持续优化文档质量，提供扁平、语义化、RESTful 的接口设计，降低多图商平台接入成本。

## 功能特性

### 🎯 PPT展示页面
- 幻灯片浏览器界面
- 上一页/下一页导航
- 缩略图快速跳转
- 显示当前页码
- 文档下载功能

### 📄 PDF展示页面
- 嵌入式PDF查看器
- 页码导航
- 全屏打开选项
- 文档下载功能

### 🎨 设计特点
- 现代化的UI设计，采用渐变色
- 响应式布局，支持移动设备
- 流畅的过渡动画
- 深色导航栏，浅色内容区

## 技术栈

- **React 18** - UI框架
- **TypeScript** - 类型安全
- **React Router** - 页面路由
- **Vite** - 构建工具
- **CSS3** - 样式和动画

## 文件结构

```
ShowHub/
├── src/
│   ├── pages/
│   │   ├── PPTPage.tsx      # PPT展示页面
│   │   ├── PPTPage.css      # PPT样式
│   │   ├── PDFPage.tsx      # PDF展示页面
│   │   └── PDFPage.css      # PDF样式
│   ├── App.tsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── main.tsx             # 入口文件
│   └── index.css            # 全局样式
├── index.html               # HTML模板
├── package.json             # 项目依赖
├── tsconfig.json            # TypeScript配置
├── vite.config.ts           # Vite配置
└── README.md                # 本文件
```

## 快速开始

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```

访问 `http://localhost:5173` 查看应用

### 构建生产版本
```bash
npm run build
```

### 预览生产版本
```bash
npm run preview
```

## 使用说明

### PPT展示
1. 点击导航栏的"PPT展示"进入PPT页面
2. 使用"上一页"和"下一页"按钮浏览幻灯片
3. 点击缩略图可直接跳转到相应页面
4. 点击"下载演示文稿"按钮下载PPT文件

### PDF展示
1. 点击导航栏的"PDF展示"进入PDF页面
2. 在PDF查看器中浏览文档
3. 使用页码输入框快速跳转到指定页面
4. 点击"全屏打开"在新标签页中打开PDF
5. 点击"下载PDF文档"按钮下载PDF文件

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 许可证

MIT
