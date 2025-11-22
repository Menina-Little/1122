# 🎨 个人AI作品集 - 古风主题

一个融合中国古典美学与现代技术的个人AI作品展示网站。

## ✨ 核心特色

- **动态背景**: 采用Vanta.js实现飞鸟动画效果，营造古韵氛围
- **霓虹渐变**: 标题文字带有动态渐变和故障特效
- **交互设计**: 游戏卡片悬停时有发光和抬升效果
- **响应式布局**: 完美适配手机和电脑等各种设备屏幕

## 🎮 已实现功能

### 贪吃蛇游戏
- 经典游戏玩法
- 支持键盘方向键控制
- 支持触摸滑动控制（移动端）
- 难度随分数递增
- 精美的古风配色

## 🛠️ 技术栈

- **框架**: Next.js 14 (React)
- **样式**: Tailwind CSS
- **动画**: Vanta.js + Three.js
- **语言**: TypeScript
- **部署**: Vercel

## 📦 安装与运行

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://menina-ai.xyz` 查看网站

### 构建生产版本

```bash
npm run build
npm start
```

## 🚀 部署到Vercel

### 方式一: 通过GitHub (推荐)

1. 将代码推送到GitHub仓库
2. 访问 [Vercel](https://vercel.com)
3. 导入你的GitHub仓库
4. Vercel会自动检测Next.js项目并完成部署

### 方式二: 使用Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

## 🎯 项目结构

```
├── app/
│   ├── layout.tsx       # 根布局
│   ├── page.tsx         # 主页
│   └── globals.css      # 全局样式
├── components/
│   └── SnakeGame.tsx    # 贪吃蛇游戏组件
├── public/              # 静态资源
├── next.config.js       # Next.js配置
├── tailwind.config.js   # Tailwind配置
└── package.json         # 依赖配置
```

## 🎨 设计理念

网站采用古风主题设计，将中国传统美学元素与现代UI设计相结合：

- **配色**: 金色(#D4AF37)、朱红(#C8102E)、翡翠绿(#00A86B)
- **字体**: 使用楷体等传统中文字体
- **动效**: 飞鸟动画象征自由与创新
- **边框**: 古典装饰性边框设计

## 📱 响应式支持

- 手机 (< 768px): 单列布局
- 平板 (768px - 1024px): 双列布局
- 电脑 (> 1024px): 三列布局

## 🔮 未来计划

- [ ] AI绘画工具 - 水墨风格图像生成
- [ ] AI诗词创作 - 古诗词智能生成
- [ ] 更多互动小游戏
- [ ] 用户评论与分享功能

## 📄 许可证

MIT License

## 👨‍💻 作者

个人AI作品集项目

---

**🌟 如果喜欢这个项目，欢迎Star支持！**
