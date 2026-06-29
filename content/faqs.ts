import type { Locale } from "@/content/site";

export type FaqId =
  | "free-trial"
  | "adult-beginner"
  | "advanced-artistry"
  | "areas-served"
  | "adult-private-lessons"
  | "lesson-cost"
  | "adult-too-late"
  | "online-lessons"
  | "choose-teacher"
  | "beginner-lessons"
  | "adult-timeline"
  | "need-piano-at-home"
  | "practice-frequency";

export type FaqItem = {
  id: FaqId;
  question: string;
  answer: string;
};

const faqCatalog: Record<Locale, FaqItem[]> = {
  en: [
    {
      id: "free-trial",
      question: "Do you offer free trial piano lessons?",
      answer:
        "Yes. I offer a free trial lesson for beginners and adult beginners so you can experience the teaching style before committing.",
    },
    {
      id: "adult-beginner",
      question: "Can adults start learning piano from zero?",
      answer:
        "Yes. I regularly coach adult beginners and restarters, and we start musical thinking early: practical theory, phrasing, and tone color, not just mechanical note pressing. For example, I coached a nurse in her 40s who began by struggling through early Thompson pieces; in less than two years, she was performing Tchaikovsky's The New Doll and a Schubert Waltz with confident musical expression.",
    },
    {
      id: "adult-timeline",
      question: "How long does it take to learn piano as an adult?",
      answer:
        "Most adults can hear meaningful progress within a few months when they practice consistently. Reaching advanced repertoire usually takes years, but your first milestones come much sooner with focused coaching.",
    },
    {
      id: "need-piano-at-home",
      question: "Do I need a piano at home before starting lessons?",
      answer:
        "You do not need a grand piano to begin. A full-size keyboard with weighted keys is enough for beginners, and I can suggest practical setup options during your trial lesson.",
    },
    {
      id: "practice-frequency",
      question: "How often should adult beginners practice piano?",
      answer:
        "I recommend shifting from time-oriented practice to goal-oriented practice. I use a divide-and-conquer strategy from programming: break a complex task into manageable parts, then let each practice session focus on just one part. This approach is efficient and low-friction - around 90% of my students stay in lessons for two years or longer and report steady, painless progress. That matters for adults, because unlike children, we have limited energy to divide across work, family, and the rest of life.",
    },
    {
      id: "areas-served",
      question: "What areas do you serve for piano lessons?",
      answer:
        "The studio is based in Cupertino, and I teach in-person across San Jose and the South Bay, including Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, and Milpitas. I also offer online lessons.",
    },
    {
      id: "adult-private-lessons",
      question: "Do you offer private piano lessons for adults?",
      answer:
        "Yes. Adult private lessons are a core part of the studio, including complete beginners, restarters, and advanced hobbyists who want deeper control of tone, phrasing, and interpretation.",
    },
    {
      id: "advanced-artistry",
      question:
        "Can you help if I already play advanced pieces but want more artistry?",
      answer:
        "Yes. One adult student could already play advanced pieces like Chopin Nocturnes and Bach French Suites, but the playing still felt like \"getting through the notes.\" We rebuilt the work around musical language and efficient biomechanics, then used an Argerich-inspired routine: isolate the hardest bars first, solve them deeply, and reconnect them to the larger phrase. The result was a clear shift toward recording-level clarity and artistic value, not just technical completion.",
    },
    {
      id: "lesson-cost",
      question: "How much do piano lessons cost in San Jose?",
      answer:
        "Tuition depends on lesson length, frequency, and lesson format. Message me for current rates, and use the free trial lesson to confirm fit before enrolling.",
    },
    {
      id: "adult-too-late",
      question: "Is 30 too late to learn piano?",
      answer:
        "No. Adults can make strong progress at 30 and beyond with consistent practice and clear instruction. I started serious piano study as an adult and built toward advanced repertoire over time.",
    },
    {
      id: "online-lessons",
      question: "Do you offer online piano lessons?",
      answer:
        "Yes. I offer both in-person lessons from a Cupertino-based studio serving San Jose and the South Bay, and online lessons, with the same one-on-one structure and weekly accountability.",
    },
    {
      id: "choose-teacher",
      question: "How do I choose a piano teacher in the South Bay?",
      answer:
        "Look for clear weekly structure, honest technique coaching, and repertoire that matches your goals. Reviews and a trial lesson are the fastest way to confirm fit.",
    },
    {
      id: "beginner-lessons",
      question: "Do you teach piano lessons for complete beginners?",
      answer:
        "Yes. I teach complete beginners, adult beginners, and children ages 5+, with personalized one-on-one instruction.",
    },
  ],
  zh: [
    {
      id: "free-trial",
      question: "你们提供免费试听钢琴课吗？",
      answer:
        "是的。我们为初学者和成人初学者提供免费试听课，帮助你在报名前先确认教学风格是否适合。",
    },
    {
      id: "adult-beginner",
      question: "成人零基础可以学钢琴吗？",
      answer:
        "可以。很多学生是成人初学者或重拾者。通过一对一课程和清晰的每周练习计划，成年人同样可以从零建立扎实基础。",
    },
    {
      id: "adult-timeline",
      question: "成年人学钢琴多久能看到进步？",
      answer:
        "只要稳定练习，多数成人在几个月内就能听到明显进步。进阶到高难曲目通常需要更长时间，但早期里程碑会来得更快。",
    },
    {
      id: "need-piano-at-home",
      question: "开始学琴前，家里一定要有钢琴吗？",
      answer:
        "不一定要先买三角钢琴。对初学者来说，全尺寸配重电钢就可以开始；试听课里我可以给你更具体的设备建议。",
    },
    {
      id: "practice-frequency",
      question: "成人初学者每周应练琴几次？",
      answer:
        "建议每周至少练 5 天，每次 20-40 分钟。短而稳定的练习，通常比周末一次长练更有效。",
    },
    {
      id: "areas-served",
      question: "你们在哪些地区提供钢琴课？",
      answer:
        "工作室位于库比蒂诺，线下课程覆盖圣何塞与南湾，包括森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔与米尔皮塔斯，也提供线上课程。",
    },
    {
      id: "adult-private-lessons",
      question: "你们提供成人一对一钢琴课吗？",
      answer:
        "提供。成人一对一课程是工作室核心服务之一，涵盖初学者、重拾者，以及希望进一步提升音色、乐句与诠释能力的进阶学员。",
    },
    {
      id: "advanced-artistry",
      question: "如果我已经会弹高级曲目，还能继续提升艺术表达吗？",
      answer:
        "可以。有位成人学员本来已经能弹肖邦夜曲和巴赫法国组曲，但演奏还停留在“把音弹下来”。我们从音乐语言和科学发力重建方法，并采用受阿格里奇训练思路启发的策略：先攻克最难小节，再回接到完整乐句。结果是演奏从技术完成，转向更接近录音级清晰度与艺术价值。",
    },
    {
      id: "lesson-cost",
      question: "圣何塞钢琴课费用大概是多少？",
      answer:
        "学费会根据课时长度、上课频率和授课形式而变化。欢迎联系获取最新价格，也可以先免费试听确认是否合适。",
    },
    {
      id: "adult-too-late",
      question: "30 岁学钢琴会不会太晚？",
      answer:
        "不会。只要有稳定练习和明确指导，30 岁以后依然可以学得很好。我自己也是成年后才开始系统学习并逐步进入高阶曲目。",
    },
    {
      id: "online-lessons",
      question: "你们提供线上钢琴课吗？",
      answer:
        "提供。可选库比蒂诺/圣何塞及南湾线下或线上一对一课程，教学结构和每周跟进保持一致。",
    },
    {
      id: "choose-teacher",
      question: "在南湾怎么选钢琴老师？",
      answer:
        "建议优先看是否有清晰周计划、真实技巧反馈，以及与目标匹配的曲目安排。再结合评价和试听，最容易判断是否适合。",
    },
    {
      id: "beginner-lessons",
      question: "你们教完全零基础吗？",
      answer:
        "教。我们教授零基础成人、儿童（5 岁+）和不同阶段学员，课程为个性化一对一。",
    },
  ],
};

export const homeFaqIds: FaqId[] = [
  "adult-beginner",
  "adult-timeline",
  "need-piano-at-home",
  "practice-frequency",
];

export const adultLandingFaqIds: FaqId[] = [
  "adult-beginner",
  "advanced-artistry",
  "adult-timeline",
  "need-piano-at-home",
  "practice-frequency",
  "adult-too-late",
];

export const kidsLandingFaqIds: FaqId[] = [
  "beginner-lessons",
  "free-trial",
  "need-piano-at-home",
  "lesson-cost",
  "areas-served",
  "choose-teacher",
];

export const onlineLandingFaqIds: FaqId[] = [
  "online-lessons",
  "free-trial",
  "need-piano-at-home",
  "practice-frequency",
  "lesson-cost",
  "choose-teacher",
];

export const pianoLessonsSanJoseFaqIds: FaqId[] = [
  "free-trial",
  "areas-served",
  "lesson-cost",
  "adult-private-lessons",
  "beginner-lessons",
  "choose-teacher",
  "online-lessons",
];

export const pianoTeacherSanJoseFaqIds: FaqId[] = [
  "choose-teacher",
  "free-trial",
  "adult-private-lessons",
  "beginner-lessons",
  "areas-served",
  "lesson-cost",
];

export function getFaqItems(locale: Locale, ids?: FaqId[]): FaqItem[] {
  const catalog = faqCatalog[locale];
  if (!ids || ids.length === 0) {
    return catalog;
  }

  const allowed = new Set(ids);
  return ids
    .map((id) => catalog.find((item) => item.id === id))
    .filter((item): item is FaqItem => Boolean(item) && allowed.has(item!.id));
}
