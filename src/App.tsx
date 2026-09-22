import { useMemo, useState } from 'react';
import { ArrowRight, BookOpen, Check, ChevronRight, ExternalLink, Filter, Info, Link2, Menu, Minus, Plus, RotateCcw, Search, X } from 'lucide-react';
import { categories, learningPath, nodes, relations, robotTypes, type Category, type Node, type RobotType } from './data/industry';

const colors: Record<Category,string> = { '核心零部件':'#ff8a5b','软件与控制':'#7b7cf6','整机与集成':'#14a68a','应用场景':'#e9af35' };

function Detail({ node, close, select }: { node: Node; close:()=>void; select:(id:string)=>void }) {
  const related = relations.filter(r=>r.from===node.id||r.to===node.id).map(r=>({ ...r, other:nodes.find(n=>n.id===(r.from===node.id?r.to:r.from))! }));
  return <aside className="detail" aria-label={`${node.name}详情`}>
    <button className="icon close" onClick={close} aria-label="关闭详情"><X/></button>
    <div className="eyebrow" style={{color:colors[node.category]}}>{node.category}</div><h2>{node.name}</h2><p className="lead">{node.subtitle}</p>
    <div className="tags">{node.types.map(t=><span key={t}>{t}</span>)}</div>
    <section><h3>一句话听懂</h3><p>{node.simple}</p>{node.term&&<p className="term"><Info/> <b>术语卡：</b>{node.term}</p>}</section>
    <section><h3>它在系统中做什么</h3><p>{node.role}</p></section>
    <div className="two-col"><section><h3>上游输入</h3><ul>{node.upstream.map(x=><li key={x}>{x}</li>)}</ul></section><section><h3>下游去向</h3><ul>{node.downstream.map(x=><li key={x}>{x}</li>)}</ul></section></div>
    <section><h3>技术难点</h3><ul>{node.challenges.map(x=><li key={x}>{x}</li>)}</ul></section>
    <section><h3>怎么评价</h3><div className="metrics">{node.metrics.map(x=><span key={x}>{x}</span>)}</div></section>
    <section><h3>相关节点 <small>均为技术依赖</small></h3>{related.map(r=><button className="related" onClick={()=>select(r.other.id)} key={r.other.id}><span>{r.other.name}<small>{r.label}</small></span><ChevronRight/></button>)}</section>
    <section><h3>企业与具体产品</h3>{node.companies.map(c=><article className="company" key={c.name}><div><b>{c.name}</b><span>{c.region}</span></div><p>{c.product}</p><a href={c.source.url} target="_blank" rel="noreferrer">产品原始资料 <ExternalLink/></a></article>)}</section>
    <section><h3>资料来源</h3><p className="source-note"><Info/> 当前开发环境无法联网，链接已记录但内容标为“待联网复核”，不代表已确认企业间供货。</p>{node.sources.map(s=><a className="source" key={s.url} href={s.url} target="_blank" rel="noreferrer"><span><b>{s.title}</b><small>{s.publisher} · 访问记录 {s.accessed} · 待联网复核</small></span><ExternalLink/></a>)}</section>
  </aside>
}

function Map({ visible, selected, select }: { visible:Node[]; selected?:string; select:(id:string)=>void }) {
  const [zoom,setZoom]=useState(1); const visibleIds=new Set(visible.map(n=>n.id));
  const related=new Set(relations.filter(r=>r.from===selected||r.to===selected).flatMap(r=>[r.from,r.to]));
  return <div className="map-wrap">
    <div className="map-tools"><button onClick={()=>setZoom(z=>Math.min(1.35,z+.15))} aria-label="放大"><Plus/></button><button onClick={()=>setZoom(z=>Math.max(.7,z-.15))} aria-label="缩小"><Minus/></button><button onClick={()=>setZoom(1)} aria-label="复位"><RotateCcw/></button><span>{Math.round(zoom*100)}%</span></div>
    <div className="map-scroll"><svg className="map" viewBox="0 0 1080 680" style={{width:`${zoom*100}%`}} role="group" aria-label="机器人产业链地图">
      <defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#aab2c0"/></marker></defs>
      {categories.map((c,i)=><g key={c}><rect x={i*285+18} y="18" width={i===3?225:260} height="644" rx="20" fill={colors[c]} opacity=".045"/><text x={i*285+38} y="53" className="column-title" fill={colors[c]}>{String(i+1).padStart(2,'0')} · {c}</text></g>)}
      {relations.filter(r=>visibleIds.has(r.from)&&visibleIds.has(r.to)).map((r,i)=>{const a=nodes.find(n=>n.id===r.from)!,b=nodes.find(n=>n.id===r.to)!;const hi=!selected||related.has(r.from)&&related.has(r.to);return <g key={i} opacity={hi?1:.12}><path d={`M${a.x+96},${a.y+27} C${a.x+155},${a.y+27} ${b.x-55},${b.y+27} ${b.x-8},${b.y+27}`} className="edge" markerEnd="url(#arrow)"/><title>{a.name} → {b.name}：{r.type} · {r.label}</title></g>})}
      {visible.map(n=>{const dim=selected && n.id!==selected&&!related.has(n.id);return <g role="button" aria-label={n.name} tabIndex={0} onKeyDown={e=>e.key==='Enter'&&select(n.id)} onClick={()=>select(n.id)} className="node" key={n.id} opacity={dim?.24:1} transform={`translate(${n.x},${n.y})`}><rect width="190" height="68" rx="13" fill="white" stroke={selected===n.id?colors[n.category]:'#dde2e9'} strokeWidth={selected===n.id?3:1.3}/><circle cx="20" cy="21" r="5" fill={colors[n.category]}/><text x="34" y="26" className="node-name">{n.name}</text><text x="20" y="49" className="node-sub">{n.subtitle}</text></g>})}
    </svg></div><div className="legend"><span><i className="line"/>技术依赖：系统组成或数据/动力流，不代表企业供货</span><span><i className="dash"/>公开供货：首版暂无经核实关系</span></div>
  </div>
}

function App(){
 const [query,setQuery]=useState(''); const [category,setCategory]=useState<Category|'全部'>('全部'); const [type,setType]=useState<RobotType|'全部'>('全部'); const [selected,setSelected]=useState<string>(); const [pathStep,setPathStep]=useState(0); const [mobileNav,setMobileNav]=useState(false);
 const visible=useMemo(()=>nodes.filter(n=>(category==='全部'||n.category===category)&&(type==='全部'||n.types.includes(type))&&(!query||`${n.name}${n.subtitle}${n.simple}${n.companies.map(c=>c.name+c.product)}`.toLowerCase().includes(query.toLowerCase()))),[query,category,type]);
 const selectedNode=nodes.find(n=>n.id===selected); const choose=(id:string)=>setSelected(id);
 return <div className="app"><header><a className="brand" href="#top"><span>ROBOT</span><b>知链</b></a><nav className={mobileNav?'open':''}><a href="#map" onClick={()=>setMobileNav(false)}>产业图谱</a><a href="#path" onClick={()=>setMobileNav(false)}>学习路径</a><a href="#method" onClick={()=>setMobileNav(false)}>阅读说明</a></nav><button className="menu" onClick={()=>setMobileNav(!mobileNav)} aria-label="菜单"><Menu/></button></header>
 <main id="top"><section className="hero"><div><p className="kicker">ROBOT INDUSTRY ATLAS · 第一版</p><h1>拆开一台机器人，<br/><em>看懂一条产业链。</em></h1><p className="intro">从零部件到真实应用，用 15 个关键节点建立机器人行业的系统认知。不是公司名单，而是一张讲清“为什么相连”的学习地图。</p><a className="primary" href="#map">开始探索 <ArrowRight/></a></div><div className="hero-card"><span>三类机器人，各有结构</span><div>{robotTypes.map((t,i)=><article key={t}><b>0{i+1}</b><p>{t}<small>{['固定工位 · 精准重复','自主行走 · 搬运巡检','类人形态 · 多任务探索'][i]}</small></p></article>)}</div><p><Info/> 不把机械臂结构泛化为所有机器人</p></div></section>
 <section id="map" className="explore"><div className="section-head"><div><p className="kicker">INTERACTIVE MAP</p><h2>产业链交互图谱</h2><p>点击节点查看通俗解释、指标、企业产品与原始资料。</p></div><span className="count">{visible.length}<small>/ {nodes.length} 个节点</small></span></div>
 <div className="filters"><label><Search/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="搜索节点、企业或产品…" aria-label="搜索"/>{query&&<button onClick={()=>setQuery('')} aria-label="清空搜索"><X/></button>}</label><div className="selects"><Filter/><select aria-label="按产业环节筛选" value={category} onChange={e=>setCategory(e.target.value as Category|'全部')}><option>全部</option>{categories.map(c=><option key={c}>{c}</option>)}</select><select aria-label="按机器人类型筛选" value={type} onChange={e=>setType(e.target.value as RobotType|'全部')}><option>全部</option>{robotTypes.map(t=><option key={t}>{t}</option>)}</select></div></div>
 {visible.length?<><div className="desktop-map"><Map visible={visible} selected={selected} select={choose}/></div><div className="mobile-list">{categories.map(c=>{const group=visible.filter(n=>n.category===c);return group.length?<section key={c}><h3 style={{color:colors[c]}}>{c}<span>{group.length}</span></h3>{group.map(n=><button key={n.id} onClick={()=>choose(n.id)}><i style={{background:colors[c]}}/><span><b>{n.name}</b><small>{n.subtitle}</small></span><ChevronRight/></button>)}</section>:null})}</div></>:<div className="empty"><Search/><h3>没有找到匹配节点</h3><button onClick={()=>{setQuery('');setCategory('全部');setType('全部')}}>清除全部筛选</button></div>}
 </section>
 <section id="path" className="path-section"><div className="section-head light"><div><p className="kicker">BEGINNER'S PATH</p><h2>一份订单，如何带动机器人？</h2><p>从仓储搬运出发，用 6 步串起应用、整机、软件和零部件。</p></div><BookOpen/></div><div className="path-content"><div className="path-steps">{learningPath.map((s,i)=><button className={i===pathStep?'active':''} onClick={()=>{setPathStep(i);choose(s.node)}} key={s.node}><span>{i<pathStep?<Check/>:i+1}</span><p><b>{s.title}</b><small>{nodes.find(n=>n.id===s.node)?.name}</small></p></button>)}</div><article className="lesson"><span>第 {pathStep+1} / {learningPath.length} 步</span><h3>{learningPath[pathStep].title}</h3><p>{learningPath[pathStep].text}</p><button onClick={()=>{choose(learningPath[pathStep].node);document.getElementById('map')?.scrollIntoView()}}>查看「{nodes.find(n=>n.id===learningPath[pathStep].node)?.name}」详情 <ArrowRight/></button><div><button disabled={pathStep===0} onClick={()=>setPathStep(x=>x-1)}>上一步</button><button disabled={pathStep===learningPath.length-1} onClick={()=>setPathStep(x=>x+1)}>下一步</button></div></article></div></section>
 <section id="method" className="method"><p className="kicker">HOW TO READ</p><h2>先看关系，再看公司</h2><div><article><Link2/><h3>技术依赖 ≠ 供货关系</h3><p>图中实线解释部件、数据和系统为何相连。只有企业原始资料明确披露时，才会标记“公开供货”。首版没有此类连线。</p></article><article><Info/><h3>来源透明</h3><p>每个企业产品都链接到原始资料。由于当前开发环境无法访问互联网，首版资料统一提示“待联网复核”，后续应逐条复核。</p></article><article><BookOpen/><h3>结构因类型而异</h3><p>机械臂强调关节与末端工具，移动机器人强调底盘和导航，人形机器人还要解决双足平衡；筛选器可分别查看。</p></article></div></section></main>
 <footer><div className="brand"><span>ROBOT</span><b>知链</b></div><p>面向初学者的机器人产业链学习地图 · 内容不构成采购或投资建议</p><a href="#top">回到顶部 ↑</a></footer>
 {selectedNode&&<div className="overlay" onMouseDown={e=>e.target===e.currentTarget&&setSelected(undefined)}><Detail node={selectedNode} close={()=>setSelected(undefined)} select={choose}/></div>}</div>
}
export default App;
