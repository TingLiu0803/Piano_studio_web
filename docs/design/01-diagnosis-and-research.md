# 01 · 现状诊断与研究结论

> 适用对象：sanjosepianolesson.com（Eric Liu Piano Studio，MusicNBrain 旗下项目）
> 代码仓库：github.com/TingLiu0803/Piano_studio_web（Next.js 16 · React 19 · Tailwind 4 · TypeScript）
> 本文档是整套方案的"为什么"。设计方案见 02，执行方法见 03。

---

## 一、核心结论（先说答案）

**这个网站的 SEO/GEO 层已经做得相当好，失败的是"人类信任层"。**

实际搜索验证：搜 "piano lessons San Jose"，该站确实出现在自然结果中，与 Superprof、Wyzant、
Steinway 教师目录、Willow Glen Music School 等同台竞争——证明内容架构和技术 SEO 是有效的。
问题是：当一个真人从 Google 点进 /en/contact 或某个 lesson-options 分页时，
页面给他的第一印象是"关键词堆出来的可疑页面"，而不是"一位真实老师的工作室"。

因此整个改造的纲领是一句话：

> **不动 SEO/GEO 骨架，重做视觉与信任表皮；让每一个页面都能当"前门"用。**

---

## 二、为什么落地页"看着像诈骗网站"——六项具体诊断

逐项检查了线上页面（/en、/en/contact、/en/adult-piano-lessons）和源码后，定位到以下原因，
按严重程度排序：

### D1 · 全站零摄影、零人脸（最严重）
整个网站没有任何照片：没有老师的脸、没有工作室、没有钢琴。纯文字 + 关键词密集的标题，
正是垃圾 doorway page 的典型视觉特征。诈骗站不放真人照片，因为没有真人——
访客的潜意识用同样的启发式判断这个站。
（讽刺的是：站内有 6 个 Bilibili 演奏视频和 Google 五星评价，真实性证据充足，但被埋没了。）

### D2 · Contact 页是"信息孤岛"
/en/contact 直接被 Google 收录并获得排名，但页面只有：一个表单 + 一张"Studio details"侧卡。
没有 hero、没有人、没有"你联系的是谁"、没有任何指回主页核心内容（演奏视频、师资、评价）的
视觉通路。从搜索直接降落的访客完全没有方向感。

### D3 · 设计 token 是"无人认领的模板色"
现 globals.css：校车黄 primary (#f4c62c) + 薄荷绿 accent (#5ec2a9) + 浅灰底 + 两团径向渐变光斑。
这套配色和"古典钢琴教师"之间没有任何语义联系，是典型的"没改过的脚手架配色"。
模板感 = 不被认领感 = 可疑感。

### D4 · `<details>` 折叠正文是双输模式
LandingPageView 中，超过 260 字符的正文被收进 `<details>` 折叠（"Read more"）。
对人：内容被藏起来，页面显得空洞且鬼祟（隐藏文字是经典 spam 模式的视觉同款）；
对机器：研究明确指出<cite index="24-1">重要内容不应藏在交互元素后面</cite>，自包含、直接可见的段落才利于 AI 抽取引用。
这是全方案中唯一一处"改了反而同时利好 SEO/GEO"的结构改动。

### D5 · 子页面没有"你在网站中的位置"的视觉锚
面包屑只存在于 JSON-LD（机器可见，人不可见）。落地页的 H1 直接就是关键词句，
上方没有工作室身份锁定（logo + 名称 + 地点）、没有可见路径（Home → Lesson options → 本页）。
访客无法在 1 秒内判断"这是一个正规网站的内页"。

### D6 · 信任信号的细节漏洞
- 联系邮箱是 `mr.tingliu@gmail.com`——个人 Gmail 而非 `@sanjosepianolesson.com` 域名邮箱，
  这是小型服务网站最常见的减分项之一；
- 五星评价、"8+ years / 60+ students" 等事实存在但全部排在首屏之下；
- 页脚版权写 "2026 Eric Liu Piano Studio"（缺 © 符号，小细节但叠加印象）。

---

## 三、参照研究：胜出的同类网站在做什么

### 3.1 实际 SERP 竞争对手（搜 "piano lessons San Jose" 验证）

| 网站 | 类型 | 可借鉴点 |
|---|---|---|
| Superprof / Wyzant | 市场平台 | 靠**大量真人头像 + 学生评价**建立信任；评价就是产品 |
| Steinway 教师目录 | 权威目录 | 借势权威品牌背书（≈ 本站的 MusicNBrain/师承背书，应放大） |
| Willow Glen Music School | 本地学校 | <cite index="11-1">价格完全透明（$49.25/30min，$197/月，$35 注册费）</cite>，并直接回答"家里没琴行不行" |
| Santa Teresa Academy | 本地学校 | 清晰的服务区域列表 + 课程矩阵 |
| pianolessonssanjose.com | 个体工作室 | 长文案直击痛点（"小时候被逼练琴"），情感叙事值得借鉴但视觉同样过时 |

启示：本站内容深度其实**超过**多数竞品（FAQ 质量、学生案例、练习方法论都更具体），
缺的只是让人愿意读下去的视觉信任前提。

### 3.2 音乐教师网站设计的公认最佳实践

来自 Bandzoogle、Music Studio Marketing 等针对音乐教师的设计指南：
- <cite index="20-1">访客必须在首屏立刻看到三件事：教什么（"Private Violin Lessons for Kids and Adults"）、在哪里（"Located in Chicago and Online"）、怎么开始（"Book a Trial Lesson"）</cite>；
- <cite index="14-1">每页用区块（section）作为设计元素：每页不同的题图、用区块底色切分文字</cite>，混排视频与图片；
- <cite index="19-1">多服务/多区域的正确架构是：主页作为中性 hub，"Lesson Options" 区块向外链接到各分页</cite>——**这正是本站现有架构**，证明架构没错，错在分页的执行质量；
- <cite index="20-1">面向家庭的信任要素：隐私政策、SSL、学生照片需家长书面同意、只用名字缩写</cite>。

### 3.3 GEO（生成式引擎优化）研究结论 → 哪些东西绝对不能动

本站能被 Claude/AI 搜索引用，依赖的正是这些已建好的机制（与 2026 年 GEO 共识逐项对应）：

| GEO 最佳实践（研究来源） | 本站现状 |
|---|---|
| <cite index="21-1">页面顶部放 answer block：两三句话直接给出定义/要点</cite> | ✅ QuickAnswer 组件，必须保留 |
| <cite index="23-1">清晰的 H1→H2→H3 层级；自包含、可独立抽取引用的段落；FAQ/比较表</cite> | ✅ H1 唯一、FAQ 组件、FactsAtAGlance；段落自包含（但被 details 藏起来——要放出来） |
| <cite index="24-1">robots 不挡 AI 爬虫；内容服务端渲染；不锁在交互元素后；建 llms.txt；FAQ/评价加 schema</cite> | ✅ SSR、llms.txt + llms-full.txt 自动生成、JSON-LD 齐全；❌ details 折叠违反"不锁在交互元素后" |
| <cite index="25-1">正文前 200 词直接完整回答主查询，TLDR 优先</cite> | ✅ 落地页开头即直答（"Yes, adults can absolutely..."） |
| 作者权威信号（byline、关于页） | ✅ AuthorByline 组件 + 师承背书 |
| 内容新鲜度 | ✅ "Updated May 28, 2026" 日期 + contentVersion 机制 |

另一个值得记住的研究数据：<cite index="24-1">Google 前排链接与 AI 引用来源的重合度已从 70% 跌到 20% 以下</cite>——
意味着这套 GEO 基建是独立资产，重构 UI 时损坏它的代价比想象中更高。
这就是为什么交付包里有一个独立的 `piano-studio-geo-guardrails` skill 专门看守它。

---

## 四、对"个体音乐老师引流"这一 NPO 课题的可复制结论

以本项目为样本，可以提炼出一个可推广给其他个体老师的公式：

**可持续生源 = (内容深度 × 技术 GEO/SEO) × 人类信任层**

前两项是乘法关系中已经做好的部分（本仓库可直接作为模板复用）；
人类信任层包括五个最小要素，缺一项整体效果就大打折扣：
1. 老师的脸（hero 或 byline 处的真人照片）
2. 教学场景照片（工作室/钢琴/上课瞬间，1–3 张即可）
3. 子页面的身份锚（可见面包屑 + 品牌锁定，"每页都是前门"）
4. 域名邮箱 + 一致的 NAP（名称/地址/电话）
5. 首屏即见的第三方证明（Google 评分、演奏视频入口）

后续给其他老师复制时：fork 本仓库 → 换 content/*.ts 内容 → 换照片 → 跑同一套 skills。
这正是 03 文档与 skills 设计的长期目标。
