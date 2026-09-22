import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it } from 'vitest';
import App from './App';
afterEach(cleanup);

describe('交互图谱',()=>{
  it('点击节点打开并关闭详情',async()=>{ const user=userEvent.setup(); render(<App/>); await user.click(screen.getAllByRole('button',{name:'精密减速器'})[0]); expect(screen.getByRole('complementary',{name:'精密减速器详情'})).toBeInTheDocument(); await user.click(screen.getByRole('button',{name:'关闭详情'})); expect(screen.queryByText('一句话听懂')).not.toBeInTheDocument(); });
  it('按关键词搜索企业和产品',async()=>{ const user=userEvent.setup(); const {container}=render(<App/>); await user.type(screen.getByLabelText('搜索'),'宇树'); expect(screen.getByText('/ 15 个节点')).toBeInTheDocument(); expect(container.querySelectorAll('.node')).toHaveLength(1); expect(container.querySelector('.node')?.textContent).toContain('人形机器人'); });
  it('按机器人类型筛选',async()=>{ const user=userEvent.setup(); const {container}=render(<App/>); await user.selectOptions(screen.getByLabelText('按机器人类型筛选'),'移动机器人'); const labels=[...container.querySelectorAll('.node')].map(n=>n.textContent); expect(labels).toContain('激光雷达测出周围的距离轮廓'); expect(labels.join('')).not.toContain('精密减速器'); });
});
