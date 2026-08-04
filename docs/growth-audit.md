# 增长审计报告：Eric Liu Piano Studio

**站点：** https://sanjosepianolesson.com/  
**审计日期：** 2026-08-04  
**KPI：** 合格试听预约 / 课程问询（非曝光）  
**方法：** 子代理并行审计（GSC 意图 / 地点一致性 / 转化信任 / 技术分析 / 内容架构 / 域名 SERP 感知）后由主代理合成  

**仓库说明：** 本地 `main` / `performance-diagno` **缺少** Cupertino / Sunnyvale / Santa Clara 城市页；**线上生产**与 `origin/seo-geo` 一致（含三城页）。下文同时标注。

---

## 1. 执行诊断（Executive diagnosis）

问询从约 **2/月 → 0**、同时 GSC 印象上升，**不是矛盾**：漏斗断在「展示 → 点击」和「点击 → 信任/转化」。

**主因组合（按置信度）：**

1. **曝光质量差 + CTR 崩塌**（高）：28 天 1.12K 印象、仅 4 点击、CTR 0.4%；高意图本地词几乎全在 pos 26–50 且 0 点击。  
2. **地点叙事错配**（高）：NAP 已正确指向 Cupertino，但文案/FAQ/Schema 大量使用「in-person across / in San Jose & Sunnyvale」，暗示多点授课或老师出行；域名与首页 title 仍强绑 San Jose。  
3. **意图—承诺断裂**（中高）：SJ→Cupertino 消息切换后，历史 SJ 路径信任未重建，Cupertino 相关性尚未成熟。  
4. **域名 CTR 税**（中）：`sanjosepianolesson.com` 对 Cupertino/Sunnyvale/near-me 搜索者形成「圣何塞店」印象；**不是**问询归零的唯一主因。  
5. **转化摩擦 + 可能的投递静默失败**（中–高技术风险）：Google Calendar 外链新标签；学费「Contact for pricing」；API 在 SMTP 缺失时仍返回成功。

**这不是单纯 SEO 流量项目。** 优化目标应是：**合格本地问询**，不是印象或泛词位次。

---

## 2. GSC 证据

### 汇总

| 窗口 | 点击 | 印象 | CTR | 平均位次 |
|------|------|------|-----|----------|
| 28 天 | 4 | 1.12K | 0.4% | 27.8 |
| 近 7 天 | 2 | 202 | 1% | 32 |

### 重要查询（均 0 点击，除站点总点击外）

| 查询 | 印象 | 位次 | 类别 |
|------|------|------|------|
| piano lessons | 225 | 11.1 | 泛词 |
| sunnyvale piano lessons | 95 | 34.4 | 地理 |
| piano lessons sunnyvale | 56 | 33.0 | 地理 |
| private piano lessons for adults | 53 | 49.1 | 成人/商业 |
| piano lessons san jose | 35 | 49.6 | 地理 |
| piano lessons for beginners sunnyvale | 34 | 26.1 | 初学+地理 |
| private piano lessons near me | 27 | 52.3 | near-me |
| in person piano lessons near me | 25 | 29.3 | near-me |
| piano lessons near me | 21 | 20.3 | near-me |
| piano lessons cupertino | 21 | 30.3 | 实体城 |

### 解读要点

- **有用曝光**：Cupertino、Sunnyvale（含 beginners）、in-person/private + 本地。  
- **低价值曝光**：纯 `piano lessons`（竞争极端、合格率低）。  
- **平均位次误导**：泛词 ~11 与大量深位本地词混加权 → 27.8；深位 0 点击属常态。  
- **Sunnyvale > Cupertino 曝光**：需求量 + 文案/title 堆 Sunnyvale +（生产）独立 Sunnyvale 页；**不等于**应假装 Sunnyvale 有分店。

---

## 3. 技术发现

| 项 | 状态 | 影响 |
|----|------|------|
| GA4 `G-ZEWCS29HG3` | 已装 | 「完全没追踪」解释力弱 |
| Google Ads `AW-…` | 仅 config，无 conversion ping | Ads「转化=0」≠业务零询 |
| `contact_submit` / `generate_lead` | 表单 HTTP 成功才打 | 可验证是否有人提交 |
| `trial_booking_click` | 有 | 只记点击，不记预约完成 |
| phone / email click | **缺失** | 电话/邮件询盘在 GA 不可见 |
| `contact_form_submit_error` | **缺失** | 失败静默于分析侧 |
| `/api/contact` + SMTP | **SMTP 缺失时跳过发信仍 `{ok:true}`** | **P0**：用户见成功、邮箱空 |
| SQLite leads | `/tmp` 易丢 | 不能当主投递 |
| NAP / JSON-LD 地址 | Cupertino 95014 正确 | 无残留 `95110` |
| `/` → `/en` | 308 | 正常 |
| Schema `jobTitle` / slogan / alternateName | 仍强绑 San Jose | 与 NAP 冲突 |
| 生产 vs 本地 | 生产有三城页；本地 main 无 | 分叉风险 |
| Hero Bilibili iframe | eager 加载 | CWV / LCP 风险 |

**「零询盘」可能含义：**

1. 真实零互动（GSC 几乎无点击 → 极可能）  
2. 有表单成功事件但邮件未到（SMTP 静默）  
3. 电话/日历完成未进 GA（漏记）  

**建议先查：** GA4 近 28 天 `contact_submit`、`trial_booking_click`；Vercel SMTP 环境变量；Gmail 垃圾箱；Google Calendar 后台预约。

---

## 4. 转化发现

来源：[`Conversion trust audit`](9625e611-a1e1-43ee-aabd-02c4076fbf4f) + 已实施修复。

### 首屏问题

- ~~用户不能立刻确定课只在 Cupertino~~ → 已改 hero/FAQ（仍须上线验证）。  
- 学费：仍无公开区间（**需你提供真实数字后再上**）；已去掉「Affordable rates」。  
- 课时时长几乎不可见（teacher 页偶有 45/60；首页无）——待你确认后再写。  
- 社证：仅 3 条 Google；教师头像仍为 `og-default` 占位——需真实照片资产。  
- CTA 多处重复 — 可见性够；日历外链摩擦仍在。

### 试听路径

1. 点「Book free trial」→ `/trial`  
2. 主 CTA 打开 **Google Calendar Appointment** 新标签（摩擦高，已写明）  
3. 或同页 ContactForm 提交请求  

**Q8 — Google Calendar：** 外链 + 第三方登录摩擦（中高）。备选表单保留；文案已说明新标签与邮件确认路径。

**Q9：** mailto/tel **试听/联系侧栏现已可点**；地址可开 Maps；SMTP 缺失不再假成功；phone/email/directions 已埋点。

### 转化泄漏（更新后）

| 级别 | 泄漏 | 状态 |
|------|------|------|
| **P0** | SMTP 静默成功 | **已修** |
| **P0** | 地点多点线下误导 | **已修文案**（待部署） |
| **P0** | 定价/课时不透明 | **待你提供数字** |
| **P0** | 日历外链摩擦 | 文案澄清；嵌入日历为后续实验 |
| **P0** | About 老师占位图 | **待真实照片** |
| **P1** | 侧栏 NAP 不可点 | **已修** |
| **P1** | How it works 与预约方式不一致 | **已修** |

---

## 5. 地点一致性发现

### 正确事实模型（建议全站统一）

> **Eric Liu Piano Studio 位于 Cupertino（175 Calvert Dr, R103, CA 95014）。线下课仅在此工作室进行；Sunnyvale / Santa Clara / West San Jose 等南湾学员自行前来。不上门家教。另提供线上一对一。**

### NAP

- **当前无 `95110` / 旧圣何塞街道地址**（已于地址变更提交清理）。  
- Contact / Trial / Footer / LocalBusiness 地址一致。

### 语义不一致（高优先级）

| 信号 | 问题 |
|------|------|
| FAQ `areas-served` | 「I teach in-person across San Jose and the South Bay…」 |
| Homepage services | 「In-person in Cupertino, San Jose, Sunnyvale…」 |
| SJ 落地页 intro | 「Lessons are in-person in San Jose…」 vs Facts「based in Cupertino」 |
| `lib/llms.ts` | 「in-person across [cities]」 |
| Schema | `jobTitle: San Jose piano teacher`；slogan 无 Cupertino |
| Articles | 「my San Jose studio」 |
| 域名 + 首页 title | 强圣何塞 |

### 暗示多工作室 / 上门？

- **多点授课：是（多处暗示）** — 「in-person across / in [cities]」。  
- **上门家教：整体否**；生产 Cupertino 页 FAQ 明确否定；全站 FAQ 未全局声明。

### 为何 Sunnyvale 可见度高于 Cupertino？

1. Title/keywords 堆 Sunnyvale，少堆 Cupertino 主词。  
2. 「San Jose & Sunnyvale」并列贯穿成人/儿童/总览页。  
3. Schema slogan 提 SJ+Sunnyvale，不提 Cupertino。  
4. 生产有独立 Sunnyvale 初学者向落地页。  
5. Cupertino 搜索量本身可能更小；实体信号未充分进入 title。

---

## 6. 搜索意图发现

| 词群 | 意图 | 对线索价值 | 建议 |
|------|------|------------|------|
| Cupertino | 实体匹配 | 最高 | 首页 title + Cupertino 页强化 |
| Sunnyvale ± beginners | 强本地商业 | 高（通勤机会） | 诚实通勤页/段落，冲 top 15 |
| Adults private | 受众匹配 | 中高 | adult 页 + 地理修饰 |
| San Jose | 历史/域名 | 中（敏感） | 保留捕获，首屏说清 Cupertino |
| near me | 地图主导 | 中低（网站 alone 难） | GBP + NAP + 清晰地址 |
| 泛词 piano lessons | 虚荣曝光 | 低 | 不主攻 |

**Q7 — `piano lessons` pos 11.1、225 印象、0 点击：**  
超竞争 SERP（广告/地图/目录）；第 11 ≈ 难见首屏；印象含未滚到结果的展示；域名/title 地点信号混乱。属虚荣指标，对问询 KPI 价值低于本地词进前十。

---

## 7. 根因假设排序（含 H1–H11）

| ID | 假设 | 置信度 | 支持证据 | 反证 | 如何验证 |
|----|------|--------|----------|------|----------|
| **H5** | Title/snippet 排名但不吸引点击 | **78%** | CTR 0.4%；title 双 SJ；泛词 0/225 | 深位词 CTR 本就接近 0 | 改 title 后同查询组 CTR 4–8 周 |
| **H3** | 访客不知道线下课在 Cupertino | **75%** | 「in-person across」多处；hero 多城 | NAP 正确；城市页有澄清 | 热图/会话；询盘问题是否含「你在哪教」 |
| **H6** | 吸引低意图泛流量而非可转化线索 | **72%** | 泛词 225 印象主导已列池 | 本地词也有曝光只是深 | 点击查询构成；落地页→CTA 率 |
| **H7** | 改强调 Cupertino 削弱 SJ 相关性，Cupertino 未成熟 | **68%** | 时间线吻合；SJ 词深位；问询归零 | 印象上升说明覆盖仍在 | SJ vs Cupertino 查询份额与点击对比 |
| **H4** | 印象来自通勤半径外用户 | **55%** | 泛词+near-me 无强本地包 | Sunnyvale 曝光属半径内 | GSC 国家/地区；GA 地理位置 |
| **H11** | 域名抑制非 SJ 点击 | **62%（CTR）/ 28%（主因）** | 域名可见 SJ；非 SJ 词 0 点击 | 深位本身解释 0 CTR；品牌 schema 中性 | 文案实验 B 后若非 SJ CTR 仍差 → 再议迁域 |
| **H8** | 价格不确定降低转化 | **58%** | Contact for pricing；无时长 | 历史 2 询时也可能无公开价 | 公开价格区间 A/B |
| **H9** | 重复 SEO 城市文案削弱信任 | **60%** | 城市列表复制；keywords 填塞 | 生产城市页有真实通勤细节 | 跳出/停留；品牌搜索 |
| **H10** | 定位过宽、缺少唯一选择理由 | **52%** | 多城+多受众并列 | 有古典+工程师差异化素材 | 首屏简化后 CTA 率 |
| **H1** | 小样本随机波动 | **35%** | 基线仅 ~2/月 | 归零持续 + CTR 结构差 | 再观察 60–90 天 |
| **H2** | 联系/预约路径技术损坏 | **40%（全面损坏）/ 70%（SMTP 静默风险）** | API 校验存活；SMTP 代码路径危险 | 未证实生产 SMTP 状态 | 查环境变量 + GA lead 事件 |

**综合判断：** 主因是 **H5 + H3 + H6/H7 组合**；技术 **H2** 须排除但不能单独解释「几乎无点击」；域名 **H11** 是放大器。

---

## 8. 推荐地理策略

**决策：Cupertino 工作室服务南湾通勤圈（非 Cupertino-only，非 Mid-Peninsula 扩张）。**

| 层级 | 内容 |
|------|------|
| 实体 | 仅 Cupertino 工作室 |
| 核心线下通勤 | Cupertino、Sunnyvale、Santa Clara、West San Jose、Saratoga |
| 次级 | Mountain View；更远偏线上/周末 |
| 伞称 | South Bay |
| **不做** | Mid-Peninsula 线下主打；多城分店暗示；上门；几十个薄城页 |

**域名策略（先于迁域）：** 方案 **B**（保留域名 + 受控文案实验：站点名 Eric Liu Piano Studio、title 由 Cupertino 引领、工作室 vs 服务区分离）。**不要**换成 `cupertino…` 城市域。

**城市页（调和 E 与生产现实）：**

- **保留**生产已有的 **Cupertino**（实体真相页）与 **Sunnyvale**（最大邻城需求 + 真实通勤内容）。  
- **Santa Clara**：若内容厚度不足则合并进 hub；有独特通勤/邻里细节可暂留。  
- **不要**再批量新建 Mountain View / Palo Alto / Mid-Peninsula 页。  
- 本地 main 应与生产对齐，消除分叉。

---

## 9. 推荐页面 / 关键词地图

| 查询意图 | 主落点 | Title 方向（诚实） |
|----------|--------|-------------------|
| Cupertino piano lessons | `/piano-lessons-cupertino` + 首页 | Cupertino studio + brand + trial |
| Sunnyvale / beginners Sunnyvale | `/piano-lessons-sunnyvale` | Sunnyvale families · lessons at Cupertino studio · commute |
| Santa Clara | 现有页或 SJ hub 通勤段 | 同上模式 |
| San Jose / West SJ | `/piano-lessons-san-jose` | SJ/West SJ students · travel to Cupertino |
| Adults | `/adult-piano-lessons` | Adult beginners · Cupertino studio · South Bay |
| Kids | `/kids-piano-lessons` | Kids 5+ · private 1:1 · Cupertino |
| Teacher / E-E-A-T | `/piano-teacher-san-jose`（可考虑未来中性 slug，需 301+签字） | Eric Liu · Cupertino-based |
| Online | `/online-piano-lessons` | Live online 1:1 |
| Trial / Contact | `/trial` `/contact` | Book trial · Cupertino address visible |
| 泛词 piano lessons | 首页（维护） | **不追求**该词流量规模 |

---

## 10. 高优先级修复（P0–P3）

对每项：证据 / 预期影响 / 工作量 / 风险 / 置信 / 度量。

### P0 — 转化链路可靠

1. **SMTP 缺失不得返回成功**  
   - 证据：`app/api/contact/route.ts` 静默 skip  
   - 影响：防止「假成功」丢线索 — **高**  
   - 工作量：低  
   - 风险：低（配置错误会表面化）  
   - 置信：90%  
   - 度量：错误率事件；真实收件

2. **补齐转化事件**（primary CTA、form start/success/error、phone/email、trial_booking、directions）  
   - 证据：phone/email/error 缺失  
   - 影响：分清「真零」vs「漏记」  
   - 工作量：低–中  
   - 风险：低  
   - 置信：85%  
   - 度量：GA4 漏斗周报

### P1 — 地点消息一致

3. **全局改写「in-person across/in [cities]」→「students travel to the Cupertino studio from…」**  
4. **Schema slogan / jobTitle / knowsAbout 含 Cupertino**  
5. **Articles「San Jose studio」→ Cupertino studio**  
6. **全站 FAQ 明确：不上门；线下仅 Cupertino**  
7. **对齐本地仓库与生产城市页**

- 证据：地点矩阵  
- 影响：降低到站跳出、提升合格问询 — **高**  
- 工作量：中  
- 风险：中（SJ 词短期波动）  
- 置信：80%  
- 度量：本地词 CTR；询盘中地点相关问题减少

### P2 — 首屏转化清晰

8. 首屏固定回答：谁 / 给谁 / **在哪上课** / 为何选 / 下一步 / 试听是什么  
9. 弱化「affordable」；可考虑「tuition discussed at trial」或价格区间（**不编造数字**）

### P3 — CTR

10. 首页 title 改为 Cupertino 引领 + 品牌（实验 B）  
11. 各落地页 title/description 去关键词堆砌，保留 1 个城市定位 + 通勤诚实句

---

## 11. 中优先级实验

| 实验 | 内容 | 成功标准 |
|------|------|----------|
| E1 | 公开课时时长 + 学费区间（真实数字，需你提供） | 表单开始率↑ |
| E2 | 试听页内嵌说明「将打开 Google Calendar」+ 同页表单并重 | calendar click→预约代理指标改善 |
| E3 | 首屏附近放 1 条真实评价 + 真实教师照片 | CTA 点击率↑ |
| E4 | 通勤地图/「从 Sunnyvale 约 10–15 分钟」可视化 | Sunnyvale 落地页转化↑ |
| E5 | 域名迁到地点中性品牌域 | **仅当 E-title 实验后非 SJ CTR 仍差** |

---

## 12. 明确不要做的事

- 不要为了印象再堆几十个薄城页（Mountain View / Palo Alto / Mid-Peninsula 集群）。  
- 不要换成 `cupertinopianolessons.com` 之类城市 EMD。  
- 不要暗示多工作室或上门。  
- 不要把「曝光上升」当成增长成功。  
- 不要虚构评价、招生数、通勤时间、价格、证书。  
- 不要在未确认 SMTP 前假设「表单坏了所以零询」或「表单一定好」。  
- 不要为打 `piano lessons` 泛词牺牲本地诚实定位。

---

## 13. 测量计划（摘要）

详见 `docs/measurement-plan.md`。

周漏斗：印象 → 有机点击 → 落地会话 → 主 CTA → 表单开始/日历外链 → 成功问询 → 试听预约 → 报名。

因基线极小（~2 询/月），**评估窗口建议 6–8 周**，单周成败无意义。

---

## 14. 未知项与还需的数据

1. GA4 近 28/90 天：会话、落地页、`contact_submit`、`trial_booking_click`、`trial_cta_click`  
2. GSC：有点击的查询/页面；Cupertino vs SJ vs Sunnyvale 份额趋势；Search Appearance  
3. Vercel：`SMTP_*` / `CONTACT_TO_EMAIL` 是否配置；运行时是否有 `SMTP credentials missing`  
4. Google Calendar Appointment 后台是否有预约  
5. GBP：地址是否 Cupertino、类别、评价原文是否提城市  
6. 历史问询来源（电话 vs 表单 vs 日历 vs 中文社群）  
7. 真实学费区间与课时时长（若要上价格实验）  
8. 地址变更与文案切换的准确日期（对齐 GSC 拐点）

---

## 附录：子代理结论索引

| 代理 | 核心结论 |
|------|----------|
| A GSC | 漏斗断在点击；Sunnyvale 是通勤机会；泛词 pos 11 是虚荣 |
| B 地点 | 无 95110；「in-person across」是主语义风险；生产城市页更诚实 |
| C 转化 | 地点不清 + 价格不清 + 日历外链 + 社证弱 |
| D 技术 | GA 在；SMTP 静默高风险；电话邮件未追踪 |
| E 架构 | 南湾通勤圈策略；防 doorway；Mid-Peninsula 不可信为主市场 |
| F 域名 | CTR 税 ~62%；主因概率 ~28%；先做方案 B 再谈迁域 |
