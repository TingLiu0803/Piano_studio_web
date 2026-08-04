# 测量计划：合格问询漏斗

**站点：** sanjosepianolesson.com  
**主 KPI：** 合格课程问询 + 试听预约 → 报名  
**次 KPI：** 有机点击、本地词 CTR、CTA 点击率  
**非 KPI：** 单独的印象数或泛词平均位次  

**评估窗口：** **6–8 周**为一轮（因历史基线约 2 询/月，单周噪声过大）。每周看方向，不单周定胜负。

---

## 1. 周漏斗（必须按周导出）

| 阶 | 指标 | 来源 | 备注 |
|----|------|------|------|
| 1 | Search impressions | GSC | 总分 + 查询组 |
| 2 | Organic clicks | GSC | 同分查询组 |
| 3 | Landing-page sessions | GA4 | `session_start` / 落地页报告；Organic Search |
| 4 | Primary CTA clicks | GA4 | `primary_cta_click` / `trial_cta_click` |
| 5a | Form starts | GA4 | `contact_form_start` |
| 5b | Calendar outbound | GA4 | `trial_booking_click` |
| 6 | Successful inquiries | GA4 + 邮箱/CRM | `contact_form_submit_success`；人工核对收件 |
| 7 | Trial bookings | Google Calendar 后台 | 站内无法直接测完成；周人工计数 |
| 8 | Enrolled students | 人工 | 试听后 14/30 天是否报名 |

**派生率：**

- CTR = clicks / impressions（按查询组）  
- CTA 率 = primary CTA / sessions  
- 询盘率 = successful inquiries / sessions  
- 试听完成率 = trial bookings / (calendar clicks + form successes)  
- 报名率 = enrolled / trial bookings  

---

## 2. 必做拆分维度

| 维度 | 如何切 |
|------|--------|
| Landing page | `/en`, `/zh`, city pages, adult/kids/online, contact, trial |
| Query category | generic / geo-Cupertino / geo-Sunnyvale / geo-SJ / adult / beginner / near-me |
| City intent | 从落地页或查询组推断 |
| Adult vs kids | 落地页 +（若表单有）留言关键词人工标 |
| English vs Chinese | `/en` vs `/zh` |
| Device | GA4 device category |

GSC 与 GA4 无法完美自动对齐「查询→会话」；以 **查询组趋势 + 落地页趋势** 交叉阅读。

---

## 3. 事件字典（实现目标）

| 事件 | 参数 | 触发 |
|------|------|------|
| `primary_cta_click` | page_path, page_type, cta_location, language | 主试听 CTA（可与 `trial_cta_click` 并存或逐步统一） |
| `contact_form_start` | page_path, language | 表单首次 focus |
| `contact_form_submit_success` | page_path, language, page_type | API 成功 |
| `contact_form_submit_error` | page_path, language, status | API 失败 |
| `trial_booking_click` | page_path, cta_location, language | 日历外链 |
| `email_click` | page_path | mailto |
| `phone_click` | page_path | tel |
| `directions_click` | page_type | 打开地图/GBP 路线（若有） |

**已有可继续使用：** `trial_cta_click`, `contact_submit`, `generate_lead`, `lesson_hub_card_click`  

**隐私：** 不把姓名、邮箱、电话、留言内容写入事件参数。

---

## 4. 成功 / 失败判据（6–8 周）

相对改动前 28 天基线：

| 信号 | 改善（继续） | 警惕 |
|------|--------------|------|
| 本地词组（Cupertino+Sunnyvale+SJ）CTR | ↑ ≥ 50% 相对（例如 0.4%→0.6%+）且有绝对点击 | 印象↑但 CTR 更差 |
| Organic sessions | 稳定或↑ | 点击↑会话不↑（追踪/落地问题） |
| CTA 点击 | ↑ | 会话↑ CTA 不动（首屏问题） |
| Successful inquiries | 从 0 回到 ≥1/月，目标恢复 ~2/月 | GA 有 success、邮箱无（SMTP） |
| Trial bookings | ≥1/月 | 仅有 calendar click 无后台预约 |
| 合格率 | 询盘来自通勤圈、理解须来工作室 | 大量「你来我家吗/分店在哪」 |

**不要**用单周 0 询盘宣判失败。

---

## 5. 每周 15 分钟检查清单

1. GSC：总点击、本地词组 CTR、有点击查询  
2. GA4：上述事件计数（注意 AdBlock 低估）  
3. 收件箱 + 垃圾箱：询盘条数是否 = `contact_form_submit_success`  
4. Google Calendar：新预约数  
5. 记录异常（部署、GBP 变更、停课）

---

## 6. 你需要导出的下一批数据

**GSC（建议 3 个月 + 对比地址变更前后）：**

- 查询 × 点击/印象/CTR/位次  
- 页面 × 同上  
- 国家/地区（若有）  
- 日期图表（变更日标注）

**GA4：**

- 流量获取：Organic Search 会话  
- 落地页  
- 事件：`contact_submit`, `generate_lead`, `trial_booking_click`, `trial_cta_click`（及新事件上线后全套）  
- 设备、语言路径  

**运营：**

- Vercel 环境变量是否含 SMTP（是/否即可，勿把密钥贴进聊天）  
- Calendar 后台预约历史  
- GBP 截图：名称、地址、类别、评价数  
