export type Category = '核心零部件' | '软件与控制' | '整机与集成' | '应用场景';
export type RobotType = '工业机械臂' | '移动机器人' | '人形机器人';
export type Source = { title: string; url: string; publisher: string; accessed: string; verification: 'verified' | 'pending' };
export type Company = { name: string; region: '中国' | '海外'; product: string; source: Source };
export type Node = {
  id: string; name: string; subtitle: string; category: Category; types: RobotType[]; x: number; y: number;
  simple: string; role: string; upstream: string[]; downstream: string[]; challenges: string[]; metrics: string[];
  companies: Company[]; sources: Source[]; term?: string;
};
export type Relation = { from: string; to: string; type: '技术依赖' | '公开供货'; label: string };

const accessed = '2026-09-22';
const source = (publisher: string, title: string, url: string): Source => ({ publisher, title, url, accessed, verification: 'pending' });
const companies = (items: [string, '中国' | '海外', string, Source][]): Company[] => items.map(([name, region, product, src]) => ({ name, region, product, source: src }));

const harmonic = source('绿的谐波', '精密谐波减速器产品', 'https://www.leaderdrive.com/product.html');
const nabtesco = source('Nabtesco', 'Precision reduction gears RV™', 'https://precision.nabtesco.com/en/products/');
const inovance = source('汇川技术', '工业机器人核心部件与整机', 'https://www.inovance.com/portal/product/index.html');
const maxon = source('maxon', 'Robotics drives', 'https://www.maxongroup.com/maxon/view/application/robotics');
const keyence = source('KEYENCE', 'Vision systems', 'https://www.keyence.com/products/vision/vision-sys/');
const intel = source('Intel', 'Intel RealSense Depth Cameras', 'https://www.intelrealsense.com/depth-camera-d455/');
const hesai = source('禾赛科技', '激光雷达产品', 'https://www.hesaitech.com/cn/product/');
const robotiq = source('Robotiq', '2F adaptive robot grippers', 'https://robotiq.com/products/2f85-140-adaptive-robot-gripper');
const nvidia = source('NVIDIA', 'NVIDIA Isaac robotics platform', 'https://developer.nvidia.com/isaac');
const ros = source('Open Robotics', 'ROS 2 Documentation', 'https://docs.ros.org/en/rolling/');
const abb = source('ABB', 'IRB 6700 industrial robot', 'https://new.abb.com/products/robotics/robots/articulated-robots/irb-6700');
const geek = source('极智嘉', '货到人机器人系统', 'https://www.geekplus.com/zh-cn/goods-to-person');
const unitree = source('宇树科技', 'Unitree G1 人形机器人', 'https://www.unitree.com/g1');
const kuka = source('KUKA', 'System integration overview', 'https://www.kuka.com/en-de/industries/solutions-database');
const amazon = source('Amazon', 'Amazon Robotics', 'https://www.aboutamazon.com/news/operations/amazon-robotics-robots-fulfillment-center');

export const nodes: Node[] = [
  { id:'reducer', name:'精密减速器', subtitle:'把高速变成大力矩', category:'核心零部件', types:['工业机械臂','人形机器人'], x:100,y:90, term:'力矩：让物体转动的“拧劲”。', simple:'像自行车变速器：让电机转慢一些，却更有劲，并提高关节定位精度。', role:'安装在旋转关节中，将电机的高速小力矩转换为低速大力矩。移动机器人也可能使用减速机构，但结构与机械臂关节并不相同。', upstream:['特种钢材','轴承','精密加工设备'], downstream:['关节模组','机械臂整机','人形机器人'], challenges:['齿形精密加工','低回差与长寿命兼顾','批量一致性'], metrics:['减速比','回差（arcmin）','额定力矩','传动效率与寿命'], companies:companies([['绿的谐波','中国','精密谐波减速器',harmonic],['Nabtesco','海外','RV™ 精密减速器',nabtesco]]), sources:[harmonic,nabtesco] },
  { id:'motor', name:'伺服电机', subtitle:'关节的“肌肉”', category:'核心零部件', types:['工业机械臂','移动机器人','人形机器人'], x:100,y:210, simple:'能按指令精确控制位置、速度和力矩的电机，而不只是简单地转起来。', role:'为关节、轮子或执行机构提供可控动力；通常与驱动器和编码器形成闭环。', upstream:['磁性材料','铜线','功率半导体'], downstream:['伺服驱动器','关节模组','轮式底盘'], challenges:['高功率密度','散热','低齿槽转矩'], metrics:['额定/峰值力矩','功率密度','效率','温升'], companies:companies([['汇川技术','中国','伺服电机与驱动器',inovance],['maxon','海外','机器人用无刷电机与驱动',maxon]]), sources:[inovance,maxon] },
  { id:'sensor', name:'视觉与力传感器', subtitle:'机器人的“眼睛与触觉”', category:'核心零部件', types:['工业机械臂','移动机器人','人形机器人'], x:100,y:330, simple:'摄像头获得颜色和深度，力/力矩传感器感知接触力，帮助机器人了解自身与环境。', role:'为定位、避障、抓取和安全控制提供测量数据；不同机器人会选择不同传感器组合。', upstream:['图像芯片','光学器件','应变片'], downstream:['感知算法','运动控制','安全系统'], challenges:['强光与遮挡','噪声和漂移','多传感器标定'], metrics:['分辨率/帧率','深度误差','量程与精度','延迟'], companies:companies([['KEYENCE','海外','机器视觉系统',keyence],['Intel RealSense','海外','D455 深度相机',intel]]), sources:[keyence,intel] },
  { id:'lidar', name:'激光雷达', subtitle:'测出周围的距离轮廓', category:'核心零部件', types:['移动机器人','人形机器人'], x:100,y:450, simple:'发出激光并测量返回时间，得到周围物体的距离；常用于移动机器人建图和避障。', role:'向定位、建图和避障软件提供点云。它不是每台机器人必需，固定机械臂常依赖围栏与相机。', upstream:['激光器','探测器','光学与芯片'], downstream:['SLAM','移动底盘','无人搬运系统'], challenges:['远近物体兼顾','抗环境光与串扰','可靠性和成本'], metrics:['探测距离','视场角','测距精度','点频'], companies:companies([['禾赛科技','中国','3D 激光雷达产品',hesai]]), sources:[hesai] },
  { id:'endeffector', name:'末端执行器', subtitle:'真正接触工件的“手”', category:'核心零部件', types:['工业机械臂','人形机器人'], x:100,y:570, simple:'装在机械臂最前端的工具，例如夹爪、焊枪、吸盘；任务不同，“手”也不同。', role:'把机器人的运动变成抓取、焊接、打磨等实际操作。', upstream:['气动元件','传感器','机械加工件'], downstream:['工作站','装配与搬运应用'], challenges:['抓取不同形状','轻量化','可靠检测是否抓牢'], metrics:['负载','行程','重复精度','开合时间'], companies:companies([['Robotiq','海外','2F-85/140 自适应夹爪',robotiq]]), sources:[robotiq] },
  { id:'controller', name:'控制器与伺服驱动', subtitle:'把计划变成电流与动作', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:110, simple:'控制器像指挥员，驱动器像翻译员：前者计算动作，后者把命令变成电机需要的电流。', role:'实时读取传感器、执行轨迹插补并闭环调节关节。', upstream:['控制芯片','实时操作系统','功率器件'], downstream:['机械臂','移动底盘','人形机器人'], challenges:['实时性','多轴同步','功能安全'], metrics:['控制周期','轴数','跟踪误差','安全等级'], companies:companies([['汇川技术','中国','机器人控制器与伺服系统',inovance]]), sources:[inovance] },
  { id:'perception', name:'感知算法', subtitle:'把数据变成环境理解', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:250, simple:'将相机、雷达等原始数据变成“人在哪里、箱子多远、该抓哪个”的可用信息。', role:'完成检测、分割、姿态估计和传感器融合，为规划提供环境状态。', upstream:['相机/雷达数据','训练数据','算力平台'], downstream:['运动规划','抓取规划','自主导航'], challenges:['长尾场景','域差异','延迟与准确率平衡'], metrics:['准确率/召回率','姿态误差','推理延迟','鲁棒性'], companies:companies([['NVIDIA','海外','Isaac 感知与仿真工具',nvidia]]), sources:[nvidia] },
  { id:'slam', name:'SLAM 与导航', subtitle:'边走边画地图并定位', category:'软件与控制', types:['移动机器人','人形机器人'], x:385,y:390, term:'SLAM：同步定位与建图。', simple:'机器人在陌生环境里一边建立地图，一边判断自己在地图中的位置。', role:'融合里程计、雷达和相机数据，规划安全路径；是自主移动的关键软件栈。', upstream:['激光雷达','相机','惯性测量单元'], downstream:['AMR 整机','巡检与配送应用'], challenges:['动态人群','地图变化','累积误差'], metrics:['定位误差','重定位时间','路径效率','避障延迟'], companies:companies([['Open Robotics','海外','ROS 2 / Navigation2 开源软件栈',ros]]), sources:[ros] },
  { id:'planning', name:'运动规划与中间件', subtitle:'决定怎么动、让模块协作', category:'软件与控制', types:['工业机械臂','移动机器人','人形机器人'], x:385,y:530, simple:'规划器计算一条不碰撞的动作路径；中间件让传感器、算法和控制器交换消息。', role:'连接感知和控制，将任务目标转成可执行轨迹，并管理模块通信。', upstream:['环境模型','任务指令','机器人模型'], downstream:['控制器','整机软件','系统集成'], challenges:['高维空间实时规划','碰撞约束','软件接口一致性'], metrics:['规划成功率','计算时间','轨迹平滑度','通信延迟'], companies:companies([['Open Robotics','海外','ROS 2 与 MoveIt 生态',ros],['NVIDIA','海外','Isaac ROS 软件包',nvidia]]), sources:[ros,nvidia] },
  { id:'arm', name:'工业机械臂', subtitle:'固定工位的精准操作专家', category:'整机与集成', types:['工业机械臂'], x:675,y:110, simple:'由多个旋转或直线关节组成，擅长在固定工位重复搬运、焊接、装配。', role:'集成关节、控制器和末端工具完成工业操作；它不能代表移动或人形机器人的全部结构。', upstream:['减速器与电机','控制器','末端执行器'], downstream:['机器人工作站','汽车/电子制造'], challenges:['速度、精度和负载权衡','安全协作','易编程'], metrics:['负载','工作半径','重复定位精度','节拍'], companies:companies([['ABB','海外','IRB 6700 工业机器人',abb]]), sources:[abb] },
  { id:'amr', name:'自主移动机器人 AMR', subtitle:'会自主绕路的移动底盘', category:'整机与集成', types:['移动机器人'], x:675,y:255, term:'AMR：自主移动机器人，通常能感知环境并动态规划路径。', simple:'像会看路的搬运车：无需固定轨道，能在地图中定位、避障并运送物料。', role:'整合底盘、能源、传感器和导航软件，承担室内物流或巡检。', upstream:['电机与电池','激光雷达','SLAM 与导航'], downstream:['仓储物流系统','工厂物料配送'], challenges:['复杂交通调度','人机混行安全','续航与充电'], metrics:['额定载荷','定位精度','运行时间','通过能力'], companies:companies([['极智嘉','中国','货到人移动机器人系统',geek]]), sources:[geek] },
  { id:'humanoid', name:'人形机器人', subtitle:'用类人形态适配人类环境', category:'整机与集成', types:['人形机器人'], x:675,y:400, simple:'采用双腿、躯干和手臂等类人形态，目标是在为人设计的空间和工具中完成多种任务。', role:'把高自由度关节、感知、规划和平衡控制集成为通用形态；其技术成熟度和用途不可与工业机械臂混同。', upstream:['高功率密度关节','多模态传感器','控制与规划'], downstream:['科研教育','待验证的工业与服务应用'], challenges:['动态平衡','能耗与续航','灵巧操作','可靠与安全'], metrics:['自由度','续航','负载','行走速度与稳定性'], companies:companies([['宇树科技','中国','Unitree G1 人形机器人',unitree]]), sources:[unitree] },
  { id:'integration', name:'系统集成', subtitle:'让机器人在真实产线工作', category:'整机与集成', types:['工业机械臂','移动机器人','人形机器人'], x:675,y:545, simple:'不是买来机器人就能生产：还要设计夹具、安全围栏、流程和与工厂系统的接口。', role:'把机器人、工具、视觉、设备和业务流程组合成交付可用的系统。人形机器人应用也需集成，但方案仍在探索。', upstream:['机器人整机','末端工具','行业工艺'], downstream:['制造产线','仓储系统','运维服务'], challenges:['工艺知识沉淀','跨设备联调','安全验收'], metrics:['节拍与良率','系统可用率','换线时间','投资回收期'], companies:companies([['KUKA','海外','行业自动化解决方案',kuka]]), sources:[kuka] },
  { id:'warehouse', name:'仓储搬运', subtitle:'从订单到拣选的物流应用', category:'应用场景', types:['移动机器人','工业机械臂'], x:950,y:180, simple:'移动机器人把货架或料箱送到人/机械臂面前，减少人员走动；机械臂还可负责拆码垛。', role:'将机器人能力转化为入库、搬运、拣选和出库效率，需要与仓库管理系统协同。', upstream:['AMR/机械臂','调度系统','系统集成'], downstream:['电商履约','制造业仓库'], challenges:['订单波峰','多机器人调度','消防与人机安全'], metrics:['每小时处理量','订单准确率','系统可用率','单位任务耗时'], companies:companies([['Amazon Robotics','海外','履约中心机器人系统',amazon],['极智嘉','中国','货到人解决方案',geek]]), sources:[amazon,geek] },
  { id:'manufacturing', name:'焊接与装配', subtitle:'工业机械臂的成熟主场', category:'应用场景', types:['工业机械臂'], x:950,y:390, simple:'机械臂携带焊枪或夹具，按稳定轨迹重复作业；视觉可帮助定位存在偏差的工件。', role:'把机械臂、工艺设备、安全系统和质量检测组成自动化工作站。', upstream:['工业机械臂','末端执行器','系统集成'], downstream:['汽车制造','金属加工','电子装配'], challenges:['工艺参数与轨迹协同','柔性换产','质量追溯'], metrics:['节拍','一次合格率','设备综合效率','停机时间'], companies:companies([['ABB','海外','工业机器人与制造解决方案',abb],['KUKA','海外','工业自动化解决方案',kuka]]), sources:[abb,kuka] }
];

export const relations: Relation[] = [
  ['reducer','arm','关节传动'],['motor','controller','闭环驱动'],['controller','arm','多轴控制'],['sensor','perception','测量数据'],['lidar','slam','点云输入'],['perception','planning','环境状态'],['slam','amr','定位与路径'],['planning','controller','轨迹指令'],['motor','amr','底盘动力'],['reducer','humanoid','关节传动'],['sensor','humanoid','环境与接触感知'],['endeffector','arm','作业工具'],['arm','integration','设备集成'],['amr','warehouse','物料搬运'],['integration','warehouse','系统交付'],['integration','manufacturing','工作站交付'],['arm','manufacturing','焊接/装配']
].map(([from,to,label]) => ({ from, to, label, type:'技术依赖' as const }));

export const learningPath = [
  { node:'warehouse', title:'从一个订单开始', text:'订单来了：怎样少走路、快拣货？先观察仓储搬运的目标和指标。' },
  { node:'amr', title:'认识会走路的整机', text:'AMR 承担搬运，它与固定工位的机械臂不是同一种结构。' },
  { node:'slam', title:'它如何知道自己在哪', text:'导航软件通过传感器边建图边定位，并规划路线。' },
  { node:'lidar', title:'距离从哪里来', text:'激光雷达提供空间距离，但最终还要由算法理解数据。' },
  { node:'motor', title:'动作怎样发生', text:'伺服电机把电能变成可控运动，驱动轮子或关节。' },
  { node:'integration', title:'拼成真正可用的系统', text:'调度、充电、安全和仓库系统接口决定整套方案能否落地。' }
];

export const categories: Category[] = ['核心零部件','软件与控制','整机与集成','应用场景'];
export const robotTypes: RobotType[] = ['工业机械臂','移动机器人','人形机器人'];
