# 03 · Claude 接手手册：用 Claude Code / Claude.ai 执行与长期维护

> 目标：让任何一个新开的 Claude 会话（Claude Code、claude.ai、或未来的维护者）
> 都能在零口头交接的情况下，按同一套设计语言持续工作——并突破单次对话的上下文限制。

---

## 一、为什么是"文档 + Skills"而不是一个超长 prompt

单次对话的上下文有限且会被遗忘。本包的解法是**渐进式披露（progressive disclosure）**：

- **SKILL.md**：只在相关任务触发时载入（约几百行），存放"必须每次都遵守的规则"；
- **references/**：更厚的细节（token 表、页面模板），Claude 只在需要时读取；
- **本目录的 01/02/03 文档**：给人读的"为什么"，Claude 需要决策依据时也可被指向。

效果：无论项目进行到第 1 次还是第 100 次会话，设计决策都不依赖任何人的记忆。

## 二、安装（一次性，5 分钟）

```bash
# 在 Piano_studio_web 仓库根目录
mkdir -p .claude/skills
cp -r <本包>/skills/piano-studio-design-system  .claude/skills/
cp -r <本包>/skills/piano-studio-geo-guardrails .claude/skills/
mkdir -p docs/design
cp <本包>/01-*.md <本包>/02-*.md <本包>/03-*.md docs/design/
```

然后在仓库根目录创建（或追加到）`CLAUDE.md`——Claude Code 每次会话都会读它：

```markdown
# Project guide for Claude

- Any UI/visual work: follow the `piano-studio-design-system` skill.
- Any change touching pages, content/*.ts, metadata, or routes: run the
  `piano-studio-geo-guardrails` checklist before finishing.
- Design rationale lives in docs/design/ (01 diagnosis, 02 design language, 03 this workflow).
- All user-facing copy lives in content/*.ts with both en and zh; never hardcode strings.
- After UI changes, verify both /en and /zh render and `npm run lint` passes.
```

把 skills 和 docs 一并提交进 git——它们是代码库的一部分，这正是"长期稳定维护"的含义。

## 三、实施路线图（建议按 PR 切分，每个都是一次独立 Claude Code 会话）

| 阶段 | 内容 | 风险 | 验收 |
|---|---|---|---|
| **P0 信任速修**（先行，不依赖设计稿） | 删除 `<details>` 折叠；正文 text-sm → 16px；申请并替换域名邮箱；页脚版权补 © | 极低 | guardrails 清单全过；线上肉眼复查 |
| **P1 Token 换肤** | 按 tokens.md 整体替换 globals.css；引入 Fraunces；删渐变光斑 | 低（纯表皮） | 全站走查截图对比；对比度对照表抽查 |
| **P2 Orientation Band** | 新建 OrientationBand + OctaveStrip；breadcrumb 数据抽到 lib/breadcrumbs.ts 供 JSON-LD 与可见导航共用；挂到所有非主页页面 | 中（动了 breadcrumb 数据流） | 可见路径 = JSON-LD 路径；移动端两行折行 |
| **P3 页面模板** | 按 page-templates.md 重排落地页、Contact、主页；照片位用 PhotoPlaceholder | 中 | 02 文档 §7 验收清单 |
| **P4 照片就位 + 发布** | 老师按 02 §3 拍 P1–P4，替换占位 | — | "3 秒陌生人测试"通过后才上线 P3+P4 |

P0 可以今天就做；P3 在照片没拍之前可以开发但不发布。

## 四、Prompt 配方（直接复制进 Claude Code）

**启动 P0：**
> Apply phase P0 from docs/design/03-claude-handoff-playbook.md: remove the
> `<details>` collapse in LandingPageView (copy unchanged), raise all body copy from
> text-sm to 16px per the design-system skill, and update the footer copyright.
> Run the geo-guardrails checklist before finishing and show me the diff summary.

**启动 P2（示范如何引用 skill 细节）：**
> Build the OrientationBand per the design-system skill's
> references/page-templates.md §1. Refactor breadcrumb data into lib/breadcrumbs.ts
> consumed by both BreadcrumbJsonLd and the new visible nav. Mount it on every
> non-home page in both locales.

**日常维护（新增一个 SEO 落地页）：**
> Add a new landing page "piano-lessons-cupertino" following the existing
> content/landing-pages.ts pattern, the landing-page template in the design-system
> skill, and the geo-guardrails new-route rules (sitemap, llms.txt via content,
> both locales, full JSON-LD set). Copy draft: <粘贴文案>.

**设计回归检查（定期跑）：**
> Audit the current UI against the piano-studio-design-system skill's self-check and
> the geo-guardrails pre-merge checklist. Report violations as a fix list, don't fix yet.

## 五、视觉迭代闭环：截图驱动

Claude 改 UI 时最大的盲区是"看不见结果"。两种补法，任选：

1. **本地最简版**：`npm run dev` 后人工截图（桌面 1440 + 移动 380 两档），把截图直接
   拖进 Claude Code 对话："Here's how it renders, critique against the design system
   and fix the top 3 issues." 一轮 10 分钟，2–3 轮收敛。
2. **自动化版**：让 Claude Code 装 Playwright 截图脚本（`scripts/screenshot.ts`，
   对每个路由输出两档截图），此后每次改动让 Claude 自己跑脚本→看图→自评→修正。
   这是打破"改了但不知道效果"循环的最稳做法。

## 六、Claude.ai（网页版/Claude design）怎么配合用

分工原则：**claude.ai 出方向，Claude Code 落地**。

- **改版前出概念稿**：在 claude.ai 新会话上传 02 设计文档 + 现网页截图，让它产出
  某页面的 HTML/React artifact 高保真 mockup，团队对着 mockup 拍板，再把结论
  （"采用方案 B 的 hero"）写进 issue 交给 Claude Code。避免在生产仓库里反复试错。
- **给本项目建一个 Claude Project**：把 01/02/03 三份文档放进 Project knowledge，
  此后所有讨论（新页面文案、营销素材、给其他老师复制方案）都自动带着设计语言上下文。
- 注意：claude.ai 的 artifact 是一次性概念稿，**不要**直接复制其代码进仓库——
  仓库代码必须由挂着两个 skills 的 Claude Code 会话产出，才能保证 token/guardrails 合规。

## 七、复制给下一位老师（NPO 规模化路径）

1. Fork 仓库（skills 和 docs 随仓库一起带走）；
2. 重写 `content/site.ts`（姓名/NAP/服务区）、`content/landing-pages.ts`（城市与课程矩阵）、
   `content/faqs.ts`；photos P1–P4 换成新老师的；
3. design-system skill 中仅两处需要按新老师个性微调：色板（材料隐喻可换，如提琴教师
   可用云杉/枫木/松香色系）与签名元素；其余规则（orientation band、信任层、guardrails）
   是普适的，直接沿用；
4. 用第四节的 prompt 配方跑一遍 P0–P4。

> 维护纪律（写给未来的自己）：每当一次会话里做出了新的设计决策，
> 让 Claude 把决策**写回 skill 或 02 文档**再结束会话——
> "决策只存在于聊天记录里"是长期项目腐烂的头号原因。
