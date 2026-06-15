# Plan: ValueCalc — 技术实现计划

> 基于SPEC.md v1.1，按Agent Skills Phase 2生成

## 实现顺序（依赖关系）

```
Task 1: 项目脚手架 → Task 2: 计算逻辑 → Task 3: 首页UI → Task 4: 图表 → Task 5: SEO/Ad → Task 6: 部署
```

平行任务：Task 2和Task 3的样式可并行

## 风险与缓解

| 风险 | 概率 | 缓解策略 |
|------|------|----------|
| Astro v5 + Tailwind v4兼容性 | 中 | 用Astro官方模板初始化 |
| Chart.js在Astro中的SSR问题 | 中 | 用client:only或client:load指令 |
| .cc.cd域名SEO影响 | 低 | Google官方：TLD不影响排名 |
| Cloudflare Pages部署配置 | 低 | 用官方CLI引导 |

---

## Task 1: 项目脚手架

- **Acceptance:** `npm run dev` 能启动, `npm run build` 能输出
- **Verify:** `npm run build` 无报错，dist/目录有HTML文件
- **Files:** package.json, astro.config.mjs, tsconfig.json, tailwind.config.mjs, src/layouts/BaseLayout.astro, src/styles/global.css

## Task 2: 复利计算逻辑 + 测试

- **Acceptance:** calculateCompound函数通过所有单元测试，结果与Excel FV()一致
- **Verify:** `npx vitest run` 全绿
- **Files:** src/lib/calculator.ts, src/lib/__tests__/calculator.test.ts

## Task 3: 首页UI — 计算器表单 + 结果展示

- **Acceptance:** 用户能输入参数、点击计算、看到数字结果
- **Verify:** `npm run dev` 手动测试，输入$10000/7%/10年能得到正确结果
- **Files:** src/pages/index.astro, src/components/CalculatorForm.astro, src/components/ResultDisplay.astro, src/components/ComparisonTable.astro

## Task 4: Chart.js增长曲线

- **Acceptance:** 首页显示复利增长折线图，交互式（hover看数据）
- **Verify:** 浏览器中图表正常渲染，无报错
- **Files:** src/components/GrowthChart.astro

## Task 5: SEO + AdSense + 关于页

- **Acceptance:** 结构化数据就位、3个AdSense位、About页发布、sitemap/robots可访问
- **Verify:** Google Rich Results Test通过、手动检查广告位
- **Files:** src/components/SEOMeta.astro, src/components/AdBanner.astro, src/pages/about.astro, src/pages/404.astro, public/robots.txt, public/sitemap.xml

## Task 6: Cloudflare Pages部署

- **Acceptance:** valuecalc.cc.cd 能访问到线上站点
- **Verify:** 浏览器打开 https://valuecalc.cc.cd 看到完整计算器
- **Files:** Cloudflare配置

---

## 检查点

- [x] Phase 1: Spec已审核 ✅
- [x] Phase 2: Plan已生成 ✅
- [ ] Phase 3: Tasks拆分 → 见上方6个Task
- [ ] Phase 4: Implement → 逐Task执行

---

*Plan v1.0 — 微思 · 2026.6.15*