# 机器人产业链交互学习网站

面向初学者的中文交互图谱。从仓储搬运等真实应用出发，理解工业机械臂、移动机器人和人形机器人的整机、系统、软件及关键零部件。

## 启动

```bash
npm install
npm run dev
```

打开终端显示的本地地址（通常为 `http://localhost:5173`）。

## 测试与构建

```bash
npm test
npm run build
npm run preview
```

构建产物位于 `dist/`。项目不依赖后端、登录或数据库。

## 内容维护

全部事实性内容位于 `src/data/industry.ts`：

- `nodes`：知识节点，包括通俗解释、作用、上下游、难点、指标、企业产品与来源；
- `relations`：节点连线，明确区分“技术依赖”和“公开供货”；
- `learningPath`：新手学习路径。

请先阅读 [AGENTS.md](./AGENTS.md) 的引用和事实核实规则。修改后运行测试和构建，并逐一访问新增来源。当前首版来源的 URL 与内容基于一手资料线索整理，但因开发环境网络不可访问，统一标记为“待联网复核”。

## 静态部署

- **GitHub Pages / GitLab Pages**：发布 `npm run build` 生成的 `dist/`；Vite 已设置相对资源路径。
- **Netlify / Vercel**：构建命令 `npm run build`，输出目录 `dist`。
- **任意静态服务器**：直接上传 `dist/` 内容即可。

不需要环境变量。本站仅作学习导览，企业案例不构成采购或投资建议。
