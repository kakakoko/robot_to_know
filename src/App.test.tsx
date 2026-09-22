import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import App from './App';
import { learningPath, nodes, type Source } from './data/industry';

vi.mock('./data/industry', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./data/industry')>();
  const verified: Source = {
    title: '已核实产品原文', url: 'https://example.com/verified', publisher: '测试发布方',
    verification: 'verified', accessed: '2026-09-21', checkedAt: '2026-09-21', published: '2025-06-01',
    evidence: '原文明确列出产品名称与用途。', note: '仅适用于这一型号。',
  };
  const pending: Source = {
    title: '待核实产品原文', url: 'https://example.com/pending', publisher: '测试发布方',
    verification: 'pending', checkedAt: '2026-09-22',
    evidence: '产品的适用范围仍需阅读全文确认。', note: '本次访问未取得正文。',
  };
  return {
    ...actual,
    nodes: actual.nodes.map(node => node.id !== 'reducer' ? node : {
      ...node, sources: [verified, pending], companies: [
        { name: '已核实企业案例', region: '海外', product: '已核实的测试产品', source: verified },
        { name: '待核实社区案例', region: '开源社区', product: '尚待核实的测试项目', source: pending },
      ],
    }),
  };
});

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('交互图谱', () => {
  it('点击节点打开并关闭详情', async () => {
    const user = userEvent.setup(); render(<App/>);
    await user.click(screen.getAllByRole('button', { name: '精密减速器' })[0]);
    expect(screen.getByRole('dialog', { name: '精密减速器详情' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '关闭详情' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('按关键词搜索企业和产品', async () => {
    const user = userEvent.setup(); const { container } = render(<App/>);
    await user.type(screen.getByLabelText('搜索'), '宇树');
    expect(container.querySelectorAll('.node')).toHaveLength(1);
    expect(container.querySelector('.node')?.textContent).toContain('人形机器人');
  });

  it('按机器人类型筛选', async () => {
    const user = userEvent.setup(); const { container } = render(<App/>);
    await user.selectOptions(screen.getByLabelText('按机器人类型筛选'), '移动机器人');
    const labels = [...container.querySelectorAll('.node')].map(node => node.textContent);
    expect(labels.join('')).toContain('激光雷达');
    expect(labels.join('')).not.toContain('精密减速器');
  });

  it('关键词、产业环节和机器人类型共同筛选，空结果可复位', async () => {
    const user = userEvent.setup(); const { container } = render(<App/>);
    await user.type(screen.getByLabelText('搜索'), '汇川');
    await user.selectOptions(screen.getByLabelText('按产业环节筛选'), '核心零部件');
    await user.selectOptions(screen.getByLabelText('按机器人类型筛选'), '移动机器人');
    expect(container.querySelectorAll('.node')).toHaveLength(1);
    expect(container.querySelector('.node')).toHaveAttribute('aria-label', '伺服电机');
    await user.selectOptions(screen.getByLabelText('按产业环节筛选'), '软件与控制');
    expect(container.querySelectorAll('.node')).toHaveLength(1);
    expect(container.querySelector('.node')).toHaveAttribute('aria-label', '控制器与伺服驱动');
    await user.type(screen.getByLabelText('搜索'), '不存在的产品');
    expect(screen.getByText('没有找到匹配节点')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '清除全部筛选' }));
    expect(screen.getByLabelText('搜索')).toHaveValue('');
    expect(screen.getByLabelText('按产业环节筛选')).toHaveValue('全部');
    expect(screen.getByLabelText('按机器人类型筛选')).toHaveValue('全部');
    expect(container.querySelectorAll('.node')).toHaveLength(nodes.length);
  });

  it('切换学习步骤保留正文，仅查看详情按钮打开面板', async () => {
    const user = userEvent.setup(); render(<App/>);
    const step = screen.getByRole('button', { name: new RegExp(learningPath[2].title) });
    await user.click(step);
    expect(step).toHaveAttribute('aria-current', 'step');
    expect(screen.getByText('第 3 / 6 步')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: learningPath[2].title })).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '下一步' }));
    expect(screen.getByText('第 4 / 6 步')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: '上一步' }));
    const name = nodes.find(node => node.id === learningPath[2].node)!.name;
    await user.click(screen.getByRole('button', { name: `查看「${name}」详情` }));
    expect(screen.getByRole('dialog', { name: `${name}详情` })).toBeInTheDocument();
  });

  it('Space 打开节点，Tab 留在详情内，Escape 关闭并恢复焦点', async () => {
    const user = userEvent.setup(); render(<App/>);
    const trigger = screen.getAllByRole('button', { name: '精密减速器' })[0];
    trigger.focus();
    await user.keyboard(' ');
    const dialog = screen.getByRole('dialog', { name: '精密减速器详情' });
    const close = within(dialog).getByRole('button', { name: '关闭详情' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(close).toHaveFocus();
    expect(document.body.style.overflow).toBe('hidden');
    expect(document.getElementById('site-content')?.inert).toBe(true);
    await user.tab({ shift: true });
    expect(within(dialog).getByRole('link', { name: /待核实产品原文/ })).toHaveFocus();
    await user.tab();
    expect(close).toHaveFocus();
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
    expect(document.body.style.overflow).toBe('');
    expect(document.getElementById('site-content')?.inert).toBe(false);
  });

  it('企业和来源逐条展示混合核实状态、日期、证据及适用边界', async () => {
    const user = userEvent.setup(); render(<App/>);
    await user.click(screen.getAllByRole('button', { name: '精密减速器' })[0]);
    for (const label of ['已核实企业案例产品资料', '已核实产品原文']) {
      const card = within(screen.getByRole('article', { name: label }));
      expect(card.getByText('已核实')).toBeInTheDocument();
      expect(card.getByText('核实日期：2026-09-21')).toBeInTheDocument();
      expect(card.getByText('发布日期：2025-06-01')).toBeInTheDocument();
      expect(card.getByText(/原文明确列出产品名称与用途/)).toBeInTheDocument();
      expect(card.getByText(/仅适用于这一型号/)).toBeInTheDocument();
      expect(card.queryByText('待核实')).not.toBeInTheDocument();
    }
    for (const label of ['待核实社区案例产品资料', '待核实产品原文']) {
      const card = within(screen.getByRole('article', { name: label }));
      expect(card.getByText('待核实')).toBeInTheDocument();
      expect(card.getByText('最近尝试：2026-09-22')).toBeInTheDocument();
      expect(card.getByText(/产品的适用范围仍需阅读全文确认/)).toBeInTheDocument();
      expect(card.getByText(/本次访问未取得正文/)).toBeInTheDocument();
      expect(card.queryByText(/核实日期/)).not.toBeInTheDocument();
    }
    expect(screen.getByText('开源社区')).toBeInTheDocument();
    expect(screen.queryByText(/当前开发环境无法联网/)).not.toBeInTheDocument();
    await user.keyboard('{Escape}');
    expect(screen.getByText(/项已核实，.*项待核实/)).toBeInTheDocument();
  });

  it('所有节点卡片和列背景完整位于 SVG 画布内', () => {
    render(<App/>);
    const map = screen.getByRole('group', { name: '机器人产业链地图' });
    const [, , width, height] = map.getAttribute('viewBox')!.split(' ').map(Number);
    expect(within(map).getAllByRole('button')).toHaveLength(nodes.length);
    for (const node of map.querySelectorAll('.node')) {
      const [, x, y] = node.getAttribute('transform')!.match(/translate\(([\d.]+),([\d.]+)\)/)!.map(Number);
      const rect = node.querySelector('rect')!;
      expect(x).toBeGreaterThanOrEqual(0);
      expect(y).toBeGreaterThanOrEqual(0);
      expect(x + Number(rect.getAttribute('width'))).toBeLessThanOrEqual(width);
      expect(y + Number(rect.getAttribute('height'))).toBeLessThanOrEqual(height);
    }
    for (const rect of map.querySelectorAll('rect[x]')) {
      expect(Number(rect.getAttribute('x')) + Number(rect.getAttribute('width'))).toBeLessThanOrEqual(width);
    }
  });

  it('窄桌面视口下缩放改变实际像素宽度，复位恢复宽度和滚动位置', async () => {
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockReturnValue(800);
    const user = userEvent.setup(); const { container } = render(<App/>);
    const map = screen.getByRole('group', { name: '机器人产业链地图' });
    expect(map).toHaveStyle({ width: '920px' });
    await user.click(screen.getByRole('button', { name: '缩小' }));
    expect(map).toHaveStyle({ width: '782px' });
    expect(screen.getByLabelText('地图缩放')).toHaveTextContent('85%');
    await user.click(screen.getByRole('button', { name: '缩小' }));
    expect(map).toHaveStyle({ width: '644px' });
    expect(screen.getByRole('button', { name: '缩小' })).toBeDisabled();
    const viewport = container.querySelector('.map-scroll')!;
    viewport.scrollLeft = 100;
    await user.click(screen.getByRole('button', { name: '复位' }));
    expect(map).toHaveStyle({ width: '920px' });
    expect(viewport.scrollLeft).toBe(0);
    await user.click(screen.getByRole('button', { name: '放大' }));
    expect(map).toHaveStyle({ width: '1058px' });
  });
});
