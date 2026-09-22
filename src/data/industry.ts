export type Category = '核心零部件' | '软件与控制' | '整机与集成' | '应用场景';
export type RobotType = '工业机械臂' | '移动机器人' | '人形机器人';
export type Source = { title: string; url: string; publisher: string; checkedAt: string; accessed?: string; published?: string; verification: 'verified' | 'pending'; evidence: string; note?: string };
export type Company = { name: string; region: '中国' | '海外' | '开源社区'; product: string; source: Source };
export type Node = {
  id: string; name: string; subtitle: string; category: Category; types: RobotType[]; x: number; y: number;
  simple: string; role: string; upstream: string[]; downstream: string[]; challenges: string[]; metrics: string[];
  companies: Company[]; sources: Source[]; term?: string;
};
export type Relation = { from: string; to: string; type: '技术依赖' | '公开供货'; label: string };

// 核实仅覆盖 evidence 中的具体陈述，不证明企业供货、全部技术指标或性能。
const companies = (items: [string, Company['region'], string, Source][]): Company[] => items.map(([name, region, product, src]) => ({ name, region, product, source: src }));

const harmonic: Source = {
  "publisher": "绿的谐波（Leaderdrive）",
  "title": "LCS-Mini 杯形谐波减速器",
  "url": "https://www.leaderdrive.com/product/17.html",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网将 LCS-Mini 描述为紧凑轻量的谐波减速器，列出紧凑机器人关节应用，以及减速比、额定力矩、回差、刚度与传动精度表。",
  "checkedAt": "2026-09-22"
};

const nabtesco: Source = {
  "publisher": "Nabtesco",
  "title": "Product Lineup — RV 精密减速器",
  "url": "https://precision.nabtesco.com/en/products/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网列出 RV-N、RV-C、RV-E 精密减速器，以及带伺服电机执行器和 AGV 驱动单元。",
  "checkedAt": "2026-09-22"
};

const inovance: Source = {
  "publisher": "汇川技术（Inovance）",
  "title": "SV660 Series — 通用伺服驱动器",
  "url": "https://www.inovance.com/global/content/details_815_403229.html",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网标题为 General-purpose Servo Drive，列有通信协议及多台驱动器与上位控制器连接方式。",
  "checkedAt": "2026-09-22"
};

const maxon: Source = {
  "publisher": "maxon",
  "title": "IDX 70 无刷电机、EPOS4 控制器与 GB65 减速箱驱动系统",
  "url": "https://www.maxongroup.com/en-gb/news-and-events/news/maxon-launches-high-torque-density-drive-system-for-tough-environments-261574",
  "accessed": "2026-09-22",
  "published": "页面标为 Media Release 03/04/2025（保留原格式，未擅自解释月日顺序）",
  "verification": "verified",
  "evidence": "官网明确描述 IDX 70 无刷电机、EPOS4 位置控制器与 GB65 减速箱组合，用于机器人、自动化和物流，并说明位置与速度控制。",
  "checkedAt": "2026-09-22"
};

const keyence: Source = {
  "publisher": "KEYENCE",
  "title": "CV-X series — 机器视觉系统",
  "url": "https://www.keyence.com/products/vision/vision-sys/cv-x100/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "CV-X 官方产品页描述高速相机与照明系统，应用包含缺陷检测、装配验证、视觉引导机器人、测量和读码。",
  "checkedAt": "2026-09-22"
};

const intel: Source = {
  "publisher": "RealSense",
  "title": "D450 系列（含 D455 深度相机）",
  "url": "https://www.realsenseai.com/product-family/450-series/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网列明 D455，包含双目深度、全局快门 RGB 和 IMU，并解释移动机器人及空间感知应用。",
  "note": "RealSense 已于 2025-07-11 从 Intel 分拆独立；旧商标不代表当前公司归属。",
  "checkedAt": "2026-09-22"
};

const hesai: Source = {
  "publisher": "禾赛科技",
  "title": "激光雷达产品 — JT32/16 与 JT128/64P",
  "url": "https://www.hesaitech.com/cn/product/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官方目录将 JT32/16 和 JT128/64P 明确标为 3D 激光雷达，并列探测距离、视场角和点频。",
  "checkedAt": "2026-09-22"
};

const robotiq: Source = {
  "publisher": "Robotiq",
  "title": "2F-85 / 2F-140 官方说明书 — 产品概述",
  "url": "https://assets.robotiq.com/website-assets/support_documents/document/online/2F-85_2F-140_TM_InstructionManual_HTML5_20190206.zip/2F-85_2F-140_TM_InstructionManual_HTML5/Content/1.%20General_Presentation.htm",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "说明书明确产品为 Robotiq 两指自适应机器人夹爪，分 85 与 140 mm 开口版本，用作工业机器人末端抓取、放置和物件搬运工具；手指会适应物体形状。",
  "note": "旧版官方手册用于确认产品与用途，不代表最新全部规格。",
  "checkedAt": "2026-09-22"
};

const inovanceMotor: Source = {
  "publisher": "汇川技术（Inovance）",
  "title": "MS1-V6 Series — 伺服电机",
  "url": "https://www.inovance.com/global/content/details_815_595697.html",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网将 MS1-V6 标为 High-Performance Servo Motor，说明可按需求配编码器，用于位置、速度与力矩精确控制。",
  "checkedAt": "2026-09-22"
};

const ati: Source = {
  "publisher": "ATI Industrial Automation",
  "title": "Mini45 六轴力/力矩传感器",
  "url": "https://www.ati-ia.com/products/ft/ft_models.aspx?id=Mini45",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官方 Mini45 产品页列出 Fx、Fy、Fz 与 Tx、Ty、Tz 量程、分辨率和六轴测量限制，并明确硅应变片、机器人手及手指力研究应用。",
  "checkedAt": "2026-09-22"
};

const realsenseIndependence: Source = {
  "publisher": "RealSense",
  "title": "RealSense 从 Intel 分拆独立的官方公告",
  "url": "https://www.realsenseai.com/news-insights/news/realsense-completes-spin-out-from-intel-raises-50-million-to-accelerate-ai-powered-vision-for-robotics-and-biometrics/",
  "accessed": "2026-09-22",
  "published": "2025-07-11",
  "verification": "verified",
  "evidence": "官方公告说明 RealSense 已完成从 Intel 分拆，以独立公司运营。只据此修正归属，不采用同页份额或市场预测。",
  "checkedAt": "2026-09-22"
};

const atiPrinciple: Source = {
  "publisher": "ATI Industrial Automation",
  "title": "F/T Product Description and Features",
  "url": "https://www.ati-ia.com/products/ft/ft_productDesc.aspx",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官网解释力/力矩系统测量六个分量，并使用硅应变片感知力。",
  "checkedAt": "2026-09-22"
};

const nvidia: Source = {
  "publisher": "NVIDIA",
  "title": "NVIDIA Isaac — AI Robot Development Platform",
  "url": "https://developer.nvidia.com/isaac",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开正文包含 FoundationPose 6D 姿态估计与追踪、cuMotion 运动规划、Isaac ROS 基于 ROS 2 的 CUDA 加速软件包，以及 Isaac Sim 仿真。原有感知/仿真和 Isaac ROS 软件包说法有直接依据。",
  "checkedAt": "2026-09-22"
};

const ros: Source = {
  "publisher": "ROS 2 项目 / Open Source Robotics Foundation 与开源社区",
  "title": "ROS 2 官方项目介绍",
  "url": "https://github.com/ros2/ros2",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "ROS 2 官方仓库 README 明确描述机器人应用所用的开源软件库和工具，以及 OSRF 与开源贡献者支持。原 docs.ros.org 页面没有读到正文，不应把原链接本身标为已核实。",
  "checkedAt": "2026-09-22"
};

const abb: Source = {
  "publisher": "ABB",
  "title": "IRB 6730 industrial robot",
  "url": "https://www.abb.com/global/en/areas/robotics/products/robots/articulated-robots/large-robots/irb-6730",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开当前具体型号产品页，含 IRB 6730 变型表，并明确列出物料搬运、高精度装配、点焊和激光焊接等用途。",
  "checkedAt": "2026-09-22"
};

const geek: Source = {
  "publisher": "极智嘉 / Geekplus",
  "title": "Shelf-to-Person — P 系列货架到人方案",
  "url": "https://www.geekplus.com/solutions/shelf-to-person",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开货架到人页，正文列出 P500、P800、P1200 及工作站、货架和拣选方式。该页直接证明货架到人系统，不足以单独证明每款产品均以 SLAM 方式自主导航。",
  "checkedAt": "2026-09-22"
};

const geekAmr: Source = {
  "publisher": "极智嘉 / Geekplus",
  "title": "Intralogistics — M 系列搬运机器人",
  "url": "https://www.geekplus.com/solutions/intralogistics",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开正文 M Series Material Handling Robots 章节；列出 MP1000、M200C，说明支持 laser SLAM、QR code navigation 等导航方式。不能据此写成所有 M 系列配置都只用 SLAM。",
  "note": "导航方式按配置选择，不代表所有货到人机器人都采用 SLAM。",
  "checkedAt": "2026-09-22"
};

const geekAmrCase: Source = {
  "publisher": "极智嘉 / Geekplus",
  "title": "Geek+ implements first moving solutions project in Italy with Life365",
  "url": "https://www.geekplus.com/resources/news/geekplus-implements-first-moving-solutions-project-in-italy-with-life365",
  "accessed": "2026-09-22",
  "published": "2022-04-27",
  "verification": "verified",
  "evidence": "已打开官方案例正文，明确提到 M200C 搬运机器人，并直接用 AMR/AMRs 称呼该 M 系列方案。因此 AMR 分类有具体产品依据，无须从企业所属行业推断。",
  "checkedAt": "2026-09-22"
};

const unitree: Source = {
  "publisher": "宇树科技 / Unitree Robotics",
  "title": "Unitree G1 人形机器人",
  "url": "https://www.unitree.com/g1/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开 G1 产品页及参数表，页面明确为人形机器人，分 G1/G1 EDU 配置，列出腿/手臂自由度、深度相机与 3D 激光雷达。页尾说明部分演示功能仍在开发测试。",
  "note": "型号和配置不同；演示能力不等于已交付或规模商用。",
  "checkedAt": "2026-09-22"
};

const kuka: Source = {
  "publisher": "KUKA",
  "title": "Production systems from KUKA",
  "url": "https://www.kuka.com/en-de/products/production-systems",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开生产系统页，正文直接说明从单个生产单元到完整生产系统的系统集成，并列出汽车系统工程、设计与自动化、标准自动化产品。",
  "checkedAt": "2026-09-22"
};

const kukaManufacturing: Source = {
  "publisher": "KUKA",
  "title": "Systems engineering for the automotive industry",
  "url": "https://www.kuka.com/en-de/products/production-systems/automotive-systems-engineering",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开汽车系统工程页，明确包含连接、成形、装配和自动化生产技术；页面链接白车身生产系统。",
  "checkedAt": "2026-09-22"
};

const amazon: Source = {
  "publisher": "Amazon",
  "title": "Amazon uses robots that sort, lift, and carry packages — see them in action",
  "url": "https://www.aboutamazon.com/news/operations/amazon-robotics-robots-fulfillment-center",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开原文。Hercules 将货架单元送到拣选员工；Sparrow 机械臂抓取并搬运单件商品；Proteus 使用传感器检测避让障碍并移动料车。正文区分 Hercules/Titan 读取地面标记、受限区域运行与 Proteus 自主移动。",
  "checkedAt": "2026-09-22"
};

const nav2: Source = {
  "publisher": "Open Navigation / Nav2 开源社区",
  "title": "Nav2 — 自主导航框架",
  "url": "https://docs.nav2.org/rolling/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官方文档将 Nav2 定义为移动机器人自主导航框架；关于页列出 Open Navigation 的 Steve Macenski 为项目负责人；为社区项目，不能归为 Open Robotics 自有产品。",
  "checkedAt": "2026-09-22"
};

const slamTutorial: Source = {
  "publisher": "Open Navigation / Nav2 开源社区",
  "title": "Navigating while Mapping (SLAM)",
  "url": "https://docs.nav2.org/rolling/tutorials/general_tutorials/navigation2_with_slam/navigation2_with_slam/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "官方教程分别安装并启动 Nav2 与 SLAM Toolbox，SLAM 节点提供地图与 map→odom 变换，再由 Nav2 执行导航。直接证明 SLAM 与导航是协作模块而非同一算法。",
  "checkedAt": "2026-09-22"
};

const rosNavConcepts: Source = {
  "publisher": "Open Navigation / Nav2 开源社区",
  "title": "ROS 2 — Nav2 Navigation Concepts",
  "url": "https://docs.nav2.org/rolling/getting_started/navigation_concepts/ros2/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "Nav2 官方明确说 ROS 2 是其核心中间件，并说明通过 action 消息在行为树导航器、规划与控制服务间通信。",
  "checkedAt": "2026-09-22"
};

const moveit: Source = {
  "publisher": "MoveIt 社区 / PickNik Robotics",
  "title": "MoveIt Motion Planning Framework",
  "url": "https://moveit.ai/",
  "accessed": "2026-09-22",
  "verification": "verified",
  "evidence": "已打开主页，列出运动规划、操作、运动学、碰撞检测及轨迹接口。About 页说明由公开维护者会议治理，PickNik 负责组织领导及额外维护；Open Robotics 在历史说明中为顾问及 ROS/发布基础设施支持。",
  "checkedAt": "2026-09-22"
};

export const nodes: Node[] = [
  { id:'reducer', name:'精密减速器', subtitle:'把高速变成大力矩', category:'核心零部件', types:['工业机械臂','人形机器人'], x:100,y:90, term:'力矩：让物体转动的“拧劲”。', simple:'像自行车的低速挡：让输出转慢一些，却有更大的力矩。关节精度还取决于回差、刚度、反馈与控制。', role:'安装在旋转关节中，将电机的高速小力矩转换为低速大力矩。移动机器人也可能使用减速机构，但结构与机械臂关节并不相同。', upstream:['特种钢材','轴承','精密加工设备'], downstream:['关节模组','机械臂整机','人形机器人'], challenges:['齿形精密加工','低回差与长寿命兼顾','批量一致性'], metrics:['减速比','回差（arcmin）','额定力矩','传动效率与寿命'], companies:companies([['绿的谐波','中国','LCS-Mini 精密谐波减速器',harmonic],['Nabtesco','海外','RV-N / RV-C / RV-E 精密减速器',nabtesco]]), sources:[harmonic,nabtesco] },
  { id:'motor', name:'伺服电机', subtitle:'关节的“肌肉”', category:'核心零部件', types:['工业机械臂','移动机器人','人形机器人'], x:100,y:210, simple:'与驱动器、反馈传感器和控制器配合，按指令控制位置、速度或力矩的电机。电机本体并不等于完整伺服系统。', role:'为关节、轮子或执行机构提供可控动力；通常与驱动器和编码器形成闭环。', upstream:['磁性材料','铜线','功率半导体'], downstream:['伺服执行系统','关节模组','轮式底盘'], challenges:['高功率密度','散热','低齿槽转矩'], metrics:['额定/峰值力矩','功率密度','效率','温升'], companies:companies([['汇川技术','中国','MS1-V6 系列伺服电机',inovanceMotor],['maxon','海外','IDX 70 无刷电机与 EPOS4 位置控制器',maxon]]), sources:[inovanceMotor,maxon] },
  { id:'sensor', name:'视觉与力传感器', subtitle:'机器人的“眼睛与触觉”', category:'核心零部件', types:['工业机械臂','移动机器人','人形机器人'], x:100,y:330, simple:'摄像头获得颜色和深度，力/力矩传感器感知接触力，帮助机器人了解自身与环境。', role:'为定位、避障、抓取和安全控制提供测量数据；不同机器人会选择不同传感器组合。', upstream:['图像芯片','光学器件','应变片'], downstream:['感知算法','运动控制','安全系统'], challenges:['强光与遮挡','噪声和漂移','多传感器标定'], metrics:['分辨率/帧率','深度误差','量程与精度','延迟'], companies:companies([['KEYENCE','海外','CV-X 系列机器视觉系统',keyence],['RealSense','海外','D455 双目深度相机',intel],['ATI Industrial Automation','海外','Mini45 六轴力/力矩传感器',ati]]), sources:[keyence,intel,realsenseIndependence,ati,atiPrinciple] },
  { id:'lidar', name:'激光雷达', subtitle:'测出周围的距离轮廓', category:'核心零部件', types:['移动机器人','人形机器人'], x:100,y:450, simple:'用激光测量物体距离；常见飞行时间式雷达根据光往返所用时间测距，可为移动机器人建图和避障提供数据。', role:'向定位、建图和避障软件提供点云。它不是每台机器人必需，固定机械臂常依赖围栏与相机。', upstream:['激光器','探测器','光学与芯片'], downstream:['SLAM','移动底盘','无人搬运系统'], challenges:['远近物体兼顾','抗环境光与串扰','可靠性和成本'], metrics:['探测距离','视场角','测距精度','点频'], companies:companies([['禾赛科技','中国','JT32/16、JT128/64P 3D 激光雷达',hesai]]), sources:[hesai] },
  { id:'endeffector', name:'末端执行器', subtitle:'真正接触工件的“手”', category:'核心零部件', types:['工业机械臂','人形机器人'], x:100,y:570, simple:'装在机械臂最前端的工具，例如夹爪、焊枪、吸盘；任务不同，“手”也不同。', role:'把机器人的运动变成抓取、焊接、打磨等实际操作。', upstream:['气动元件','传感器','机械加工件'], downstream:['工作站','装配与搬运应用'], challenges:['抓取不同形状','轻量化','可靠检测是否抓牢'], metrics:['负载','行程','重复精度','开合时间'], companies:companies([['Robotiq','海外','2F-85/140 自适应夹爪',robotiq]]), sources:[robotiq] },
  { id:'controller', name:'控制器与伺服驱动', subtitle:'把计划变成电流与动作', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:110, simple:'控制器像指挥员，驱动器像翻译员：前者计算动作，后者把命令变成电机需要的电流。', role:'控制器协调任务与轨迹，驱动器调节电机电流并参与闭环控制；具体分工取决于系统。下列汇川产品仅作为伺服驱动器案例。', upstream:['控制芯片','实时操作系统','功率器件'], downstream:['机械臂','移动底盘','人形机器人'], challenges:['实时性','多轴同步','功能安全'], metrics:['控制周期','轴数','跟踪误差','安全等级'], companies:companies([['汇川技术','中国','SV660 系列伺服驱动器（驱动器案例）',inovance]]), sources:[inovance] },
  { id:'perception', name:'感知算法', subtitle:'把数据变成环境理解', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:250, simple:'将相机、雷达等原始数据变成“人在哪里、箱子多远、该抓哪个”的可用信息。', role:'完成检测、分割、姿态估计和传感器融合，为规划提供环境状态。', upstream:['相机/雷达数据','训练数据','算力平台'], downstream:['运动规划','抓取规划','自主导航'], challenges:['长尾场景','域差异','延迟与准确率平衡'], metrics:['准确率/召回率','姿态误差','推理延迟','鲁棒性'], companies:companies([['NVIDIA','海外','Isaac FoundationPose 姿态估计与 Isaac Sim 仿真工具',nvidia]]), sources:[nvidia] },
  { id:'slam', name:'SLAM 与导航', subtitle:'定位与建图，再规划怎么走', category:'软件与控制', types:['移动机器人','人形机器人'], x:385,y:390, term:'SLAM：同步定位与建图。', simple:'SLAM 一边建立地图，一边估计机器人在地图中的位置；导航再根据位置、目标和障碍物安排怎么走。', role:'SLAM 可利用相机、雷达或里程计等信息生成地图与位姿；导航利用定位结果规划路径并控制移动。已有地图时也可直接定位导航，不必每次重新建图。', upstream:['激光雷达','相机','惯性测量单元'], downstream:['AMR 整机','巡检与配送应用'], challenges:['动态人群','地图变化','累积误差'], metrics:['定位误差','重定位时间','路径效率','避障延迟'], companies:companies([['Nav2 开源社区','开源社区','Navigation2（Nav2）自主导航框架',nav2]]), sources:[nav2,slamTutorial] },
  { id:'planning', name:'运动规划与中间件', subtitle:'决定怎么动、让模块协作', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:530, simple:'规划器计算一条不碰撞的动作路径；中间件让传感器、算法和控制器交换消息。', role:'连接感知和控制，将任务目标转成可执行轨迹，并管理模块通信。', upstream:['环境模型','任务指令','机器人模型'], downstream:['控制器','整机软件','系统集成'], challenges:['高维空间实时规划','碰撞约束','软件接口一致性'], metrics:['规划成功率','计算时间','轨迹平滑度','通信延迟'], companies:companies([['ROS 2 开源社区','开源社区','ROS 2 通信与开发框架',ros],['MoveIt 开源社区','开源社区','MoveIt 2 运动规划与操作框架',moveit],['NVIDIA','海外','Isaac ROS 加速软件包与 cuMotion 运动规划',nvidia]]), sources:[ros,rosNavConcepts,moveit,nvidia] },
  { id:'arm', name:'工业机械臂', subtitle:'固定工位的精准操作专家', category:'整机与集成', types:['工业机械臂'], x:675,y:110, simple:'由多个旋转或直线关节组成，擅长在固定工位重复搬运、焊接、装配。', role:'集成关节、控制器和末端工具完成工业操作；它不能代表移动或人形机器人的全部结构。', upstream:['减速器与电机','控制器','末端执行器'], downstream:['机器人工作站','汽车/电子制造'], challenges:['速度、精度和负载权衡','安全协作','易编程'], metrics:['负载','工作半径','重复定位精度','节拍'], companies:companies([['ABB','海外','IRB 6730 工业机器人',abb]]), sources:[abb] },
  { id:'amr', name:'自主移动机器人 AMR', subtitle:'会自主绕路的移动底盘', category:'整机与集成', types:['移动机器人'], x:675,y:255, term:'AMR：自主移动机器人，通常能感知环境并动态规划路径。', simple:'像会看路的搬运车：无需固定轨道，能在地图中定位、避障并运送物料。', role:'整合底盘、能源、传感器和导航软件，承担室内物流或巡检。', upstream:['电机与电池','激光雷达','SLAM 与导航'], downstream:['仓储物流系统','工厂物料配送'], challenges:['复杂交通调度','人机混行安全','续航与充电'], metrics:['额定载荷','定位精度','运行时间','通过能力'], companies:companies([['极智嘉','中国','M 系列搬运机器人（导航方式按配置选择）',geekAmr]]), sources:[geekAmr,geekAmrCase] },
  { id:'humanoid', name:'人形机器人', subtitle:'用类人形态适配人类环境', category:'整机与集成', types:['人形机器人'], x:675,y:400, simple:'采用双腿、躯干和手臂等类人形态，目标是在为人设计的空间和工具中完成多种任务。', role:'把高自由度关节、感知、规划和平衡控制集成为通用形态；其技术成熟度和用途不可与工业机械臂混同。', upstream:['高功率密度关节','多模态传感器','控制与规划'], downstream:['科研教育','待验证的工业与服务应用'], challenges:['动态平衡','能耗与续航','灵巧操作','可靠与安全'], metrics:['自由度','续航','负载','行走速度与稳定性'], companies:companies([['宇树科技','中国','Unitree G1 / G1 EDU 人形机器人',unitree]]), sources:[unitree] },
  { id:'integration', name:'系统集成', subtitle:'让机器人在真实产线工作', category:'整机与集成', types:['工业机械臂','移动机器人','人形机器人'], x:675,y:545, simple:'不是买来机器人就能生产：还要设计夹具、安全围栏、流程和与工厂系统的接口。', role:'把机器人、工具、视觉、设备和业务流程组合成交付可用的系统。人形机器人应用也需集成，但方案仍在探索。', upstream:['机器人整机','末端工具','行业工艺'], downstream:['制造产线','仓储系统','运维服务'], challenges:['工艺知识沉淀','跨设备联调','安全验收'], metrics:['节拍与良率','系统可用率','换线时间','投资回收期'], companies:companies([['KUKA','海外','生产单元与整线系统集成',kuka]]), sources:[kuka] },
  { id:'warehouse', name:'仓储搬运', subtitle:'从订单到拣选的物流应用', category:'应用场景', types:['移动机器人','工业机械臂'], x:950,y:180, simple:'移动机器人把货架或料箱送到人/机械臂面前，减少人员走动；机械臂还可负责拆码垛。', role:'将机器人能力用于入库、搬运、拣选和出库，需要与仓库管理系统协同。货到人描述的是业务流程，所用机器人可能采用不同导航方式，并非全部都是 SLAM 型 AMR。', upstream:['AMR/机械臂','调度系统','系统集成'], downstream:['电商履约','制造业仓库'], challenges:['订单波峰','多机器人调度','消防与人机安全'], metrics:['每小时处理量','订单准确率','系统可用率','单位任务耗时'], companies:companies([['Amazon Robotics','海外','Hercules 货架搬运机器人与 Sparrow 拣选机械臂',amazon],['极智嘉','中国','P 系列货架到人拣选方案',geek]]), sources:[amazon,geek] },
  { id:'manufacturing', name:'焊接与装配', subtitle:'工业机械臂的成熟主场', category:'应用场景', types:['工业机械臂'], x:950,y:390, simple:'机械臂携带焊枪或夹具，按稳定轨迹重复作业；视觉可帮助定位存在偏差的工件。', role:'把机械臂、工艺设备、安全系统和质量检测组成自动化工作站。', upstream:['工业机械臂','末端执行器','系统集成'], downstream:['汽车制造','金属加工','电子装配'], challenges:['工艺参数与轨迹协同','柔性换产','质量追溯'], metrics:['节拍','一次合格率','设备综合效率','停机时间'], companies:companies([['ABB','海外','IRB 6730（装配与焊接应用）',abb],['KUKA','海外','汽车装配与生产系统工程',kukaManufacturing]]), sources:[abb,kukaManufacturing] }
];

export const relations: Relation[] = [
  ['reducer','arm','关节传动'],['controller','motor','受控电流驱动'],['controller','arm','多轴控制'],['sensor','perception','测量数据'],['lidar','slam','点云输入'],['perception','planning','环境状态'],['slam','amr','定位与路径'],['planning','controller','轨迹指令'],['motor','amr','底盘动力'],['reducer','humanoid','关节传动'],['sensor','humanoid','环境与接触感知'],['endeffector','arm','作业工具'],['arm','integration','设备集成'],['amr','warehouse','物料搬运'],['integration','warehouse','系统交付'],['integration','manufacturing','工作站交付'],['arm','manufacturing','焊接/装配']
].map(([from,to,label]) => ({ from, to, label, type:'技术依赖' as const }));

export const learningPath = [
  { node:'warehouse', title:'从一个订单开始', text:'订单来了：怎样少走路、快拣货？先观察仓储搬运的目标和指标。' },
  { node:'amr', title:'认识会走路的整机', text:'AMR 承担搬运，它与固定工位的机械臂不是同一种结构。' },
  { node:'slam', title:'它如何知道自己在哪', text:'先由定位或 SLAM 模块判断位置，导航软件再规划路线、避让障碍；已有地图时不必每次重新建图。' },
  { node:'lidar', title:'距离从哪里来', text:'激光雷达提供空间距离，但最终还要由算法理解数据。' },
  { node:'motor', title:'动作怎样发生', text:'伺服电机把电能变成可控运动，驱动轮子或关节。' },
  { node:'integration', title:'拼成真正可用的系统', text:'调度、充电、安全和仓库系统接口决定整套方案能否落地。' }
];

export const categories: Category[] = ['核心零部件','软件与控制','整机与集成','应用场景'];
export const robotTypes: RobotType[] = ['工业机械臂','移动机器人','人形机器人'];
