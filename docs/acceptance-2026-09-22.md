# PR #1 验收报告

验收日期：2026-09-22（Asia/Tokyo）。原始 PR 提交：`3fbb2a793b215bfb05e10d1ace1ac8e06a33c7c0`。仓库：kakakoko/robot_to_know，分支：codex。

## 结论与预览

第一版已完成本次功能验收、资料核实和必要修复。15 个节点保留，页面当前使用 26 个独立一手来源；这 26 条“已核实”仅覆盖各条证据摘要，不是对整个产业知识体系、所有性能指标或供货关系的全面背书。

本次使用本地生产构建预览（端口4173）。这是本机服务，需本机预览进程运行，不是公开部署地址。本次不合并 PR、不发布网站。截图和核验日志保存在仓库外的 outputs，未加入 Git。

## 已发现并修复的问题

| 问题 | 修复 |
|---|---|
| 地图 viewBox 1080，但最右节点延伸到1140，卡片被裁切 | 画布扩大到1180并调整列背景 |
| min-width 钳制缩放，窄桌面点击缩小只有数字变化 | 使用基础像素宽度乘倍率；复位还原滚动位置；实测920 → 644px |
| 窄窗口工具栏覆盖第四列标题 | 工具栏移到独立顶行，正式构建检查无重叠 |
| 步骤按钮立即弹出面板、遮住学习正文 | 步骤只切换正文，通过“查看详情”打开面板 |
| 详情缺少模态键盘管理 | 自动聚焦、Tab循环、Escape关闭、返回触发元素、锁定背景；SVG节点支持Space/Enter |
| 页面写死“待联网复核”，访问日期不能区分成功与尝试 | 每条资料独立显示状态、日期、证据、发布日期和适用边界；汇总按实际URL去重 |
| RealSense仍归Intel | 按官方独立公告修正公司名与发布方，保留历史说明 |
| 力传感器只有视觉引用 | 新增ATI Mini45六轴力/力矩传感器及技术说明 |
| 汇川产品目录被用于证明电机、驱动、机器人控制器 | 分别引用MS1-V6电机与SV660驱动器；撤下无直接依据的控制器产品泛称 |
| ROS2、Nav2、MoveIt来源和归属混用 | 分别列开源项目与原始文档，区分中间件、导航、运动规划 |
| SLAM与导航混为一谈 | 区分建图定位与路径规划控制，补已有地图导航说明 |
| 极智嘉货到人被泛化为AMR | AMR采用M系列及明确称AMR的M200C官方案例；仓储采用P系列，说明导航方式随配置不同 |
| ABB旧型号页跳到通用目录 | 产品名和来源一起改为已核实IRB6730 |
| 电机到驱动器关系方向不清 | 改为驱动器到电机的“受控电流驱动”，同步调整下游描述 |
| 2个moderate依赖告警 | 对应同一Vitest问题，定向升级到4.1.11并验证兼容；新npm ci和audit通过 |

## 验证结果

- 干净安装：`npm ci --cache ../npm-cache` 成功，Node 22.22.0 / npm 10.9.4。
- 自动测试：9/9通过，覆盖节点、搜索、组合筛选、空结果、学习步骤、键盘焦点、已核实/待核实混合数据、地图边界与缩放。
- `npm run build`：TypeScript和Vite生产构建通过。
- `npm audit`：0个已报告漏洞。升级依据：[Vitest官方安全公告](https://github.com/advisories/GHSA-82fw-gwwq-j7x9)。
- `git diff --check`：通过。提交前检查全部差异为文本文件。
- 实际浏览器：节点详情、相关节点跳转、宇树搜索（1节点）、产业环节+机器人类型筛选（核心零部件+移动机器人为3节点）、空结果恢复（15节点）、放大缩小复位、六步各自详情及前后切换均通过。
- 桌面实际CSS视口1440×1000，另测820×800窄桌面缩放；手机实际CSS视口390×844，列表、组合筛选、菜单、详情可用，页面没有横向溢出。视口基于页面实际测量，浏览器显示缩放未被改动。
- 最终静态构建已打开，来源计数26/26、独立Nav2证据、ATI证据和日期显示正确；捕获的浏览器警告/错误日志为空。
- 桌面及手机截图已保存；原先截图未修改。

## 原15个来源逐条结果

原URL的可访问情况与证据是否充分分开记录。旧URL打不开不等于该公司或产品不存在；已使用实际读过的有效一手替代页，旧失败记录保留在完整JSON中。

| 原来源ID | 原URL结果 | 当前采用的一手证据 | 陈述范围/处理 |
|---|---|---|---|
| harmonic | 无法通过本次 web 工具访问 | [LCS-Mini 杯形谐波减速器](https://www.leaderdrive.com/product/17.html) | LCS-Mini 精密谐波减速器 |
| nabtesco | 可访问 | [Product Lineup — RV 精密减速器](https://precision.nabtesco.com/en/products/) | RV-N / RV-C / RV-E 精密减速器 |
| inovance | 无法通过本次 web 工具访问 | [SV660 Series — 通用伺服驱动器](https://www.inovance.com/global/content/details_815_403229.html) | SV660 系列伺服驱动器 |
| maxon | 无法通过本次 web 工具访问 | [IDX 70 无刷电机、EPOS4 控制器与 GB65 减速箱驱动系统](https://www.maxongroup.com/en-gb/news-and-events/news/maxon-launches-high-torque-density-drive-system-for-tough-environments-261574) | IDX 70 无刷电机与 EPOS4 位置控制器 |
| keyence | 可访问 | [CV-X series — 机器视觉系统](https://www.keyence.com/products/vision/vision-sys/cv-x100/) | CV-X 系列机器视觉系统 |
| intel | 无法通过本次 web 工具访问 | [D450 系列（含 D455 深度相机）](https://www.realsenseai.com/product-family/450-series/) | D455 双目深度相机 |
| hesai | 可访问 | [激光雷达产品 — JT32/16 与 JT128/64P](https://www.hesaitech.com/cn/product/) | JT32/16、JT128/64P 3D 激光雷达 |
| robotiq | 可访问且重定向 | [2F-85 / 2F-140 官方说明书 — 产品概述](https://assets.robotiq.com/website-assets/support_documents/document/online/2F-85_2F-140_TM_InstructionManual_HTML5_20190206.zip/2F-85_2F-140_TM_InstructionManual_HTML5/Content/1.%20General_Presentation.htm) | 2F-85 / 2F-140 自适应夹爪 |
| nvidia | 可用 | [NVIDIA Isaac — AI Robot Development Platform](https://developer.nvidia.com/isaac) | 只采用审核记录所列直接支持的陈述 |
| ros | 无法核实：访问防护返回 Access Denied，不是内容不存在 | [ROS 2 官方项目介绍](https://github.com/ros2/ros2) | 只采用审核记录所列直接支持的陈述 |
| abb | 需更换：重定向到机器人产品总页，读到的正文不含 IRB 6700 型号 | [IRB 6730 industrial robot](https://www.abb.com/global/en/areas/robotics/products/robots/articulated-robots/large-robots/irb-6730) | 只采用审核记录所列直接支持的陈述 |
| geek | 无法访问：web 返回 URL 不可访问；不能据此断言站点不存在 | [Shelf-to-Person — P 系列货架到人方案](https://www.geekplus.com/solutions/shelf-to-person) | 只采用审核记录所列直接支持的陈述 |
| unitree | 可用：规范化到末尾带斜杠的 URL | [Unitree G1 人形机器人](https://www.unitree.com/g1/) | 只采用审核记录所列直接支持的陈述 |
| kuka | 可用，但为案例总目录，缺少具体系统产品说明 | [Production systems from KUKA](https://www.kuka.com/en-de/products/production-systems) | 只采用审核记录所列直接支持的陈述 |
| amazon | 可用 | [Amazon uses robots that sort, lift, and carry packages — see them in action](https://www.aboutamazon.com/news/operations/amazon-robotics-robots-fulfillment-center) | 只采用审核记录所列直接支持的陈述 |

完整记录包含原URL、失败原因、当前URL、证据、真实访问日期及边界，见 `docs/source-audit-2026-09-22.json`。原始7项系统来源和8项组件来源均有记录。

## 已知限制

- 使用厂商和开源项目一手说明验证有限产品、归属与功能陈述，没有独立测量产品性能；部分原链接本次仍无法读取，未将它们标记成成功核实。
- 当前没有已公开证实的企业间供货连线；所有图谱连线都是技术依赖。
- 手机验收为桌面浏览器窄视口模拟，未做实体手机Safari/Android测试；未覆盖所有浏览器、屏幕阅读器和长期使用场景。
- 网站引用外部字体，网络不可用时使用系统字体；企业官网未来可能改版，资料需持续复查。
- 本轮是初学者导览验收，不是完整机器人技术教材或投资/采购尽调。
