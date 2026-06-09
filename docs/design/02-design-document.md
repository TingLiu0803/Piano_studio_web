# 02 · 设计文档：统一设计语言 "Ivory & Felt"

> 本文档是唯一权威的设计语言定义（single source of truth）。
> 任何 UI 改动（人或 Claude 执行）都必须能在本文档中找到依据。
> 机器可执行版本见 `skills/piano-studio-design-system/`。

---

## 0. 设计立场（一段话）

主体是一位**工程师转行的古典钢琴教师**——这两个词决定了一切：
视觉材料取自钢琴本身（象牙白、乌木黑、黄铜、琴键下的猩红毛毡），
版式纪律取自工程师（清晰栅格、克制装饰、信息层级即结构）。
首要任务不是"好看"，而是**让每个从搜索引擎降落的陌生人在 3 秒内确认：
这是一位真实的、专业的、就在 San Jose 的老师**。

> 关于"暖白底 + 衬线大标题"的自检：这接近 AI 生成设计的常见默认之一，
> 但在此处是主体驱动的选择——白色来自象牙琴键而非"奶油风"，
> 强调色是黄铜与毛毡红而非陶土色，且签名元素（八度音区条）与默认模板无关。
> 保留此方向的前提是严格执行签名元素；否则宁可不用暖白底。

## 1. 三条不可妥协的原则

1. **每个页面都是前门（Every page is a front door）**
   SEO 分页和 Contact 页的访客大多没见过主页。每个页面必须自带：
   身份锚（品牌锁定 + 可见面包屑）、人（照片）、证明（评分/视频入口）、出口（CTA + 通往主页的路径）。
2. **信任先于转化（Trust before conversion）**
   首屏顺序永远是：我是谁 → 凭什么信我 → 然后才是"Book a free trial"。
3. **不藏内容（Nothing collapsed, nothing hidden）**
   正文一律可见。用字号、留白、底色区分层级，禁止 `<details>` 折叠正文。
   （此原则同时是 GEO 要求，见 geo-guardrails skill。）

---

## 2. 设计 Token

### 2.1 色板 "Ivory & Felt"（6 色 + 派生）

| Token | 值 | 来源与用法 |
|---|---|---|
| `--ivory` (background) | `#FAF7F0` | 象牙琴键的暖白。全站底色，替换现灰底 #f3f4f6 |
| `--ebony` (foreground) | `#211D1A` | 乌木黑。正文与标题，偏暖不偏蓝 |
| `--brass` (primary) | `#B8860B` → hover `#9A7009` | 黄铜（踏板/铰链）。主 CTA、关键链接。由现校车黄演化而来，保留暖色记忆但更沉稳 |
| `--felt` (accent) | `#A4243B` | 琴键下的猩红毛毡。**全站唯一的"惊喜色"**：八度条上的当前位置、眉标（eyebrow）、徽章。用量 < 5% |
| `--surface` | `#FFFFFF` | 卡片面。配 `--line` 1px 边而非重阴影 |
| `--line` (border) | `#E5DFD3` | 暖灰线。分隔、边框 |
| 派生：`--muted` | `#6B6257` | 次级文字 |
| 派生：`--felt-tint` | `#F7E9EC` | felt 的 8% 调，徽章/标签底 |
| 派生：`--brass-tint` | `#F5EDDC` | brass 的浅调，高亮块底 |
| 状态：`--success` `#3E7A5E` / `--error` `#A4243B`（复用 felt） | | |

删除现有的两团径向渐变光斑（body background-image）——它们是模板痕迹。

### 2.2 字体

| 角色 | 字体 | 理由 |
|---|---|---|
| Display（H1/H2、数字强调） | **Fraunces**（Google Fonts，经 next/font 自托管） | 有"老式音乐厅节目单"气质的现代衬线，光学尺寸轴让大标题优雅、小标题清晰 |
| Body / UI | **Geist**（已安装，不动） | 工程师的那一半；与 Fraunces 形成"乐谱 × 图纸"的对比 |
| 中文（zh locale） | Display 回退 **Noto Serif SC**，Body 回退 **Noto Sans SC** | 与英文双轨气质一致 |

类型刻度（基于 1.25 比率）：
`12.8 / 16(基准) / 20 / 25 / 31 / 39 / 49px`。
H1 用 39–49px Fraunces 600；正文 16px/1.7 Geist；**禁止再用 14px (`text-sm`) 作正文**——
现站大量 text-sm 正文是"不想被读"的视觉信号，正文一律 16px 起。

### 2.3 形状、阴影、间距

- 圆角：卡片 `16px`（替换现 rounded-3xl=24px 的"气泡感"），按钮 `999px`（胶囊）或 `10px`，统一选胶囊。
- 阴影：默认无；仅悬浮元素（sticky CTA、下拉菜单）用 `0 4px 16px rgb(33 29 26 / 0.08)`。
  信任感来自 1px `--line` 边 + 底色对比，不来自投影。
- 间距：8px 网格。Section 垂直间距 `96px`（桌面）/ `64px`（移动）。内容最大宽 `72rem`，正文列最大 `42rem`。

### 2.4 签名元素：八度条（The Octave Strip）

全站唯一的记忆点，基于已有的 `PianoKeyboardMark` 组件扩展：
一条高约 `10px` 的极简钢琴键横条（7 白键 + 5 黑键的一个八度，线框风格，`--line` 描边）。

用法（也只有这三处，防滥用）：
1. **Orientation band**（见 §4.1）中作为面包屑下的水平分隔，当前页面对应的"键"填充 `--felt`；
2. 主页 hero 标题下方，作为 H1 与副标题之间的分隔；
3. 页脚顶部边界。

这个元素同时完成：品牌识别、"你在网站中的位置"的隐喻（哪个键亮 = 你在哪页）、与主题的材质连接。

---

## 3. 摄影与媒体规范（解决 D1 的硬性要求）

设计系统再好，**没有照片就没有信任**。需要老师提供（手机拍摄可接受，自然光）：

| 编号 | 内容 | 用在哪 | 规格 |
|---|---|---|---|
| P1 | 老师正面半身像（在钢琴旁，微笑，看镜头） | 全站 byline 头像、Contact hero、About | 1:1 裁剪 ≥800px |
| P2 | 工作室全景（钢琴 + 环境） | 主页 hero 背景/侧图 | 16:9 ≥1600px |
| P3 | 上课瞬间（老师指导学生手部，无需学生露脸） | 落地页题图，每页可不同裁剪 | 3:2 ≥1200px |
| P4 | 键盘特写（手 + 琴键） | 备用纹理、OG 图底 | 16:9 |

规则：照片一律 `next/image`，必写 alt（含 "Eric Liu" 或 "San Jose piano studio" 等实体词，对 SEO 有益）；
未成年学生绝不露正脸、姓名只用缩写（家长书面同意是底线）。
**照片就位之前不要发布重设计**——否则只是更精致的可疑页面。

---

## 4. 页面模板

### 4.1 通用：Orientation Band（所有非主页页面顶部，本方案的核心修复）

放在 header 之下、H1 之上，约 56px 高，`--ivory` 底 + 底边 1px `--line`：

```
┌──────────────────────────────────────────────────────────────┐
│ [♪mark] Eric Liu Piano Studio · San Jose, CA                  │
│ Home › Lesson options › Adult piano lessons                   │
│ ─[八度条：当前页对应键为 felt 红]──────────────────────────────│
└──────────────────────────────────────────────────────────────┘
```

- 面包屑是**可见的** `<nav aria-label="Breadcrumb">`，与已有 BreadcrumbJsonLd 数据同源
  （同一份数据渲染两次：一次 JSON-LD 一次可见 HTML——禁止出现两套路径文案）；
- 锁定行字号 13px `--muted`，不抢 H1。

这个 56px 的条直接解决 D2/D5：落地者 1 秒内知道"这是谁的网站、我在哪、主页在哪"。

### 4.2 SEO 落地页模板（5 个 lesson-options 分页共用）

```
[Header]
[Orientation Band]
┌─ Hero（白卡，brass-tint 左边条 4px）────────────────────────┐
│ eyebrow（felt 色小字）: ADULT LESSONS · SAN JOSE & ONLINE    │
│ H1（Fraunces 39px，保持现有关键词 H1 文案不变）               │
│ [P1 头像 40px] By Eric Liu · Updated 2026-05-28（byline）   │
│ 开头直答段（现有文案，16px 可见，不折叠）                       │
│ [Book a free trial]（brass 胶囊）  [Watch performances ↗]    │
└─────────────────────────────────────────────────────────────┘
[QuickAnswer 块 — brass-tint 底，保留组件与文案]
[P3 教学照片，全宽 3:2，带说明文字]
[FactsAtAGlance — 保留]
正文 sections：H2 + 全部可见正文（删除 <details>），
  每 2 个 section 之间穿插一个"证明条"（轮换：学生评价 1 条 / 演奏视频卡 1 张）
[Common questions / FAQ — 保留，FAQ JSON-LD 不动]
[CTA band：felt-tint 底 + Book a free trial]
[Continue reading + 通往主页的明确链接："See the full studio overview →"]
[Footer（顶部为八度条）]
```

要点：**所有 H1/H2 文案、QuickAnswer、FAQ、JSON-LD 一字不动**——只换容器的皮肤与排序。

### 4.3 Contact 页 = "迷你主页"

```
[Header][Orientation Band]
┌─ Hero 左右分栏 ─────────────────────────────────────────────┐
│ 左：H1 "Contact the studio"                                  │
│     [P1 照片 96px 圆形] "You'll be talking to Eric —         │
│     piano teacher in San Jose, replies same day."            │
│     ★★★★★ Google · 8+ yrs · 60+ students（信任行，首屏可见） │
│ 右：表单卡（现 ContactForm 原样复用）                          │
└─────────────────────────────────────────────────────────────┘
[New here? 三卡路径条：Watch performances / Meet the teacher /  ]
[  Browse lesson types —— 把降落流量导回站内核心内容              ]
[Studio details（NAP 一致；邮箱换 hello@sanjosepianolesson.com）]
[Footer]
```

### 4.4 主页

架构不变（hub-and-spoke 已被研究验证为正确架构），调整四点：
1. Hero 右侧放 P2 工作室照片（或 P1），左侧文字；八度条置于 H1 下；
2. 统计行（8+ years / 60+ students / ★★★★★）上移到 hero 内部；
3. "Choose your lesson type" 五卡改为带 P3 不同裁剪缩略图的卡片；
4. 删除径向渐变光斑与重复的三处 "Book a free trial" 区块（保留两处：hero + 页尾）。

---

## 5. 组件规范摘要（细节见 skill references/page-templates.md）

| 组件 | 规范 |
|---|---|
| 按钮 Primary | brass 底 / ivory 字 / 胶囊 / 48px 高 / hover 加深 + 无位移 |
| 按钮 Secondary | 透明底 / ebony 字 / 1px line 边 / 胶囊 |
| 卡片 | surface 底 / 1px line / 16px 圆角 / 24–32px 内边距 / 无阴影 |
| 眉标 eyebrow | 12.8px / 字距 0.08em / 大写 / felt 色 |
| 信任徽章 | felt-tint 底 felt 字（评分类）或 brass-tint 底（资质类） |
| 视频卡 | 保留 VideoCard，缩略图加 16px 圆角 + 1px line，播放钮 felt 色 |
| 表单 | 输入框 48px 高 / 1px line / focus 时 2px brass 外环；错误用 felt 文案不抖动 |

## 6. 可达性与体验底线

- 文本对比度 ≥ 4.5:1（brass on ivory 用于大字号与按钮底，正文链接用加下划线的 ebony/brass 深值）；
- 键盘焦点环 2px brass，永不 `outline: none`；
- 动效仅三处：页面载入 hero 淡入 200ms、卡片 hover 边框变 brass、sticky CTA 滑入；
  全部包在 `@media (prefers-reduced-motion: no-preference)`；
- 移动端：Orientation band 折行为两行；sticky trial CTA 保留但底部安全区内。

## 7. 验收清单（每次 UI 改动后自查）

- [ ] 任意分页截图给陌生人看 3 秒，能答出"谁/在哪/做什么"
- [ ] 首屏出现：真人元素 + 第三方证明 + 一个 CTA
- [ ] 无折叠正文；无 text-sm 正文；无渐变光斑
- [ ] felt 红用量 < 5% 画面面积
- [ ] H1 文案、QuickAnswer、FAQ、JSON-LD 与改动前 diff 为零（geo-guardrails skill 负责强制）
- [ ] Lighthouse：a11y ≥ 95，SEO = 100，LCP 不劣化（照片必须 next/image + 正确 sizes）
