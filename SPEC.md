# Spec: ValueCalc — 复利计算器 & 投资工具站 MVP

## Objective

构建一个英文界面的投资计算器工具站，首个MVP为核心复利计算器（Compound Interest Calculator）。目标用户为英语国家的个人投资者。

**用户故事：**
- 作为一个投资者，我想输入本金、年利率、投资年限，看到复利增长的可视化结果
- 作为一个投资者，我想对比"每月定投 vs 一次性投入"的增长差异
- 作为一个投资者，我想看到通胀调整后的真实收益
- 作为一个站长，我想通过AdSense变现（金融类CPC $5-30+）

**成功标准：**
- LCP < 2.5s, CLS < 0.1, FID < 100ms（Core Web Vitals全绿）
- 计算结果100%准确（与Excel/Google Sheets对比验证）
- 移动端完美适配（70%+流量来自手机）
- AdSense广告位就位（至少3个广告位）
- SEO基础到位（结构化数据、meta标签、sitemap）

## Tech Stack

- **静态站生成器：** Astro v5（零JS默认=极致性能+SEO友好）
- **样式：** Tailwind CSS v4（快速响应式开发）
- **交互逻辑：** Vanilla JS（计算器逻辑无需框架，保持零依赖）
- **图表：** Chart.js v4（轻量级，复利增长可视化）
- **部署：** Cloudflare Pages（免费、全球CDN、自动HTTPS）
- **域名：** valuecalc.cc.cd（主站）+ valuecalc.ccwu.cc（备用）
- **分析：** Google Analytics 4 + AdSense

> 选择Astro而非Next.js的理由：工具站不需要SSR/数据库，Astro输出纯HTML=更快加载+更好SEO+更低成本

## Commands

```bash
Dev:      npm run dev
Build:    npm run build
Preview:  npm run preview
```

## Project Structure

```
sites/valuecalc/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro      → 全站布局（header/footer/AdSense/Analytics）
│   ├── components/
│   │   ├── CalculatorForm.astro   → 输入表单组件
│   │   ├── ResultDisplay.astro   → 计算结果展示
│   │   ├── GrowthChart.astro     → Chart.js增长曲线
│   │   ├── ComparisonTable.astro → 定投vs一次性对比表
│   │   ├── AdBanner.astro        → AdSense广告位组件
│   │   └── SEOMeta.astro         → 结构化数据+meta标签
│   ├── pages/
│   │   ├── index.astro            → 首页：复利计算器
│   │   ├── about.astro            → 关于页（E-E-A-T信号）
│   │   └── 404.astro              → 自定义404
│   ├── lib/
│   │   └── calculator.ts          → 纯函数：复利计算逻辑
│   └── styles/
│       └── global.css             → Tailwind导入+自定义样式
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── SPEC.md                        → 本文档
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── tsconfig.json
```

## Code Style

**TypeScript 计算逻辑（纯函数，100%可测试）：**
```typescript
// src/lib/calculator.ts
export interface CompoundInput {
  principal: number;
  monthlyContribution: number;
  annualRate: number;
  years: number;
  inflationRate: number;
  compoundFrequency: 'monthly' | 'quarterly' | 'annually';
}

export function calculateCompound(input: CompoundInput): CompoundResult {
  // 纯函数，无副作用
}
```

**命名规范：**
- 文件：kebab-case（compound-interest-calculator.astro）
- 组件：PascalCase（CalculatorForm.astro）
- 函数：camelCase（calculateCompound）
- CSS：Tailwind utility-first

## Testing Strategy

- **框架：** Vitest
- **单元测试：** src/lib/calculator.ts — 100%覆盖
- **覆盖率：** 计算逻辑100%
- **关键测试：** 结果与Excel FV()函数精确一致

## Boundaries

- **Always:**
  - 计算逻辑用纯函数
  - 提交前运行测试
  - 移动端优先
  - 货币显示2位小数

- **Ask first:**
  - 添加新npm依赖
  - 修改Astro/Tailwind配置
  - 修改AdSense策略

- **Never:**
  - 提交密钥到代码仓库
  - 使用重依赖（jQuery等）
  - 牺牲性能加动画

## Success Criteria

1. ✅ 复利计算结果与Excel精确一致（误差<0.01）
2. ✅ Core Web Vitals全绿
3. ✅ Lighthouse Performance > 95
4. ✅ 移动端完美显示
5. ✅ 结构化数据通过Google Rich Results Test
6. ✅ 至少3个AdSense广告位就位
7. ✅ sitemap.xml + robots.txt可访问
8. ✅ 关于页展示E-E-A-T信号

## 域名决策

| 域名 | 优势 | 劣势 |
|------|------|------|
| **valuecalc.cc.cd** ✅主选 | 更短、.cd后缀较独特 | 非主流TLD，SEO无已知惩罚 |
| valuecalc.ccwu.cc | 备用 | 更长、.cc子域名层级深 |

**决策：主站用 valuecalc.cc.cd**，更短更易记，DNS已验证生效。

## Open Questions

1. ~~域名~~ → 已选 valuecalc.cc.cd
2. **AdSense账号：** 已有？还是需用新站申请？
3. **GA4：** MVP阶段是否先不加？
4. ~~后端需求~~ → MVP不需要

---

*Spec v1.1 — 微思（CFO/COO/CMO）· 2026.6.15*