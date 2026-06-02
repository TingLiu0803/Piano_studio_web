import type { Locale } from "@/content/site";

export const articleSlugs = [
  "adult-piano-learning-timeline-san-jose",
  "how-to-choose-piano-teacher-south-bay",
  "online-vs-in-person-piano-lessons-bay-area",
  "adult-piano-practice-strategy-divide-and-conquer",
  "what-to-expect-first-piano-lesson",
  "studio-piano-vs-digital-keyboard-adult-beginners",
] as const;

export type ArticleSlug = (typeof articleSlugs)[number];

export type ArticleSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type ArticleHowToStep = {
  name: string;
  text: string;
};

export type Article = {
  slug: ArticleSlug;
  title: string;
  description: string;
  /** Short, citable, answer-first summary (2-4 sentences). */
  quickAnswer: string;
  datePublished: string;
  dateModified: string;
  category: string;
  readingTimeMinutes: number;
  intro: string;
  sections: ArticleSection[];
  /** If present, emits `HowTo` JSON-LD alongside `Article`. */
  howTo?: {
    name: string;
    description: string;
    totalTimeIso: string;
    steps: ArticleHowToStep[];
  };
  /** Closing related-reading internal links (slug + label). */
  related?: { slug: ArticleSlug; label: string }[];
};

const en: Record<ArticleSlug, Article> = {
  "adult-piano-learning-timeline-san-jose": {
    slug: "adult-piano-learning-timeline-san-jose",
    title: "How long does an adult take to learn piano in San Jose?",
    description:
      "How long does it take an adult to learn piano? A realistic month-by-month and year-by-year timeline based on 60+ adult students coached privately in San Jose and the South Bay.",
    quickAnswer:
      "Most adult beginners hear meaningful progress within 2-3 months of consistent practice. By month 6 you can usually play a simple piece musically; by year 1-2, intermediate repertoire is realistic when you practice 20-40 minutes a day, 5 days a week.",
    datePublished: "2026-04-10",
    dateModified: "2026-05-28",
    category: "Adult learning",
    readingTimeMinutes: 7,
    intro:
      "Adult students searching for piano lessons in San Jose almost always ask the same first question: how long is this going to take? This article gives a concrete timeline based on what actually happens in private lessons at my studio, not generic estimates from method-book publishers.",
    sections: [
      {
        heading: "Month 1-3: foundations",
        body:
          "In the first three months, adult beginners should expect to gain comfortable hand position, basic note reading in both clefs, and the ability to play simple two-hand pieces (Hal Leonard Adult Method 1 territory). The non-obvious gain is mental: you learn to break a practice session into small, named tasks instead of just \"playing through\" the piece.",
        bullets: [
          "Hand position, posture, and relaxed wrist motion",
          "Reading bass and treble clef in C, G, F major",
          "Simple two-hand pieces with clear pulse",
          "First exposure to dynamics (forte / piano) and phrasing",
        ],
      },
      {
        heading: "Month 4-6: musicality starts",
        body:
          "By month four, the body knows what the keyboard is. Now we layer in musicality: phrasing direction, dynamic shaping, voicing the melody above accompaniment. Most adults play their first \"real\" musical performance for friends or family around month 5-6.",
      },
      {
        heading: "Month 7-12: intermediate transitions",
        body:
          "Year one ends with the transition from method-book pieces into actual repertoire. Common waypoints: Bach minuets, easier Clementi sonatinas, simple Chopin preludes, or pop arrangements at an honest level (not simplified to oblivion). Reading speed becomes the gating factor.",
      },
      {
        heading: "Year 2 and beyond",
        body:
          "By year two, an adult who practices consistently can attempt Tchaikovsky's Album for the Young, Schubert waltzes, easier Mozart sonata movements, or Chopin Preludes Op. 28 No. 4 / No. 7. One of my students moved from struggling through John Thompson exercises to performing Tchaikovsky's The New Doll and a Schubert Waltz in under two years.",
      },
      {
        heading: "What changes the timeline",
        body:
          "Consistency dominates. Practicing 25 minutes a day, five days a week, will outperform a single two-hour weekend session by a large margin. Lesson cadence (weekly versus bi-weekly), instrument quality (a weighted keyboard at minimum), and willingness to record yourself also matter.",
        bullets: [
          "5 short sessions per week > 1 long weekend session",
          "Weekly lessons keep momentum; bi-weekly works for self-disciplined adults",
          "Weighted-key keyboard or acoustic piano (not 61-key synth)",
          "Recording yourself once a week shortens the feedback loop dramatically",
        ],
      },
    ],
    related: [
      { slug: "adult-piano-practice-strategy-divide-and-conquer", label: "Adult piano practice strategy: divide and conquer" },
      { slug: "what-to-expect-first-piano-lesson", label: "What to expect in your first piano lesson" },
    ],
  },
  "how-to-choose-piano-teacher-south-bay": {
    slug: "how-to-choose-piano-teacher-south-bay",
    title: "How to choose a piano teacher in the South Bay",
    description:
      "A practical checklist for choosing a piano teacher in San Jose, Sunnyvale, Cupertino, and the South Bay: what to ask, what to watch for, and what \"good teaching\" actually looks like.",
    quickAnswer:
      "Pick a piano teacher based on clear weekly structure, honest technique coaching, repertoire that matches your goals, and a free trial that gives you a real lesson - not a sales pitch. Avoid teachers who only follow one method book or who never adjust to your goals.",
    datePublished: "2026-03-22",
    dateModified: "2026-05-28",
    category: "Choosing a teacher",
    readingTimeMinutes: 6,
    intro:
      "If you are searching \"piano teacher near me\" in San Jose, Sunnyvale, Cupertino, or anywhere in the South Bay, the hardest part is not finding teachers - it is filtering. This checklist explains what actually separates a good private piano teacher from a busy one.",
    sections: [
      {
        heading: "Look for clear weekly structure",
        body:
          "A strong teacher leaves you with a concrete plan after every lesson: which bars to isolate, which technique drill to repeat, what to record, and what to bring back next week. If you walk out of a trial lesson unsure what to practice, that is a red flag.",
      },
      {
        heading: "Watch for technique honesty",
        body:
          "Adults pick up tension habits quickly. A teacher who never mentions wrist height, finger curvature, shoulder relaxation, or efficient motion is teaching you to plateau. Healthy technique conversation should start in the first lesson, not year three.",
      },
      {
        heading: "Match repertoire to your real goals",
        body:
          "If you want to play Chopin Nocturnes, a teacher who refuses to mention them for two years is mismatched. Good teachers stage repertoire honestly: stepping stones that prepare your target piece, not detours that delay it indefinitely.",
      },
      {
        heading: "Demand a real trial lesson",
        body:
          "A useful trial includes diagnostic listening, a small assignment, and clear pricing. If the trial is purely a sales conversation, you are buying a brand, not teaching quality. Most serious private teachers in the South Bay offer a free or low-cost trial.",
      },
      {
        heading: "Questions to ask in a trial",
        body:
          "These five questions surface fit fast.",
        bullets: [
          "How do you plan a week between lessons?",
          "What does progress look like at month 3, month 6, year 1?",
          "How do you teach technique without injury risk?",
          "What is your policy on rescheduling and cancellations?",
          "Can I see one student's progression in real terms?",
        ],
      },
    ],
    related: [
      { slug: "what-to-expect-first-piano-lesson", label: "What to expect in your first piano lesson" },
      { slug: "online-vs-in-person-piano-lessons-bay-area", label: "Online vs in-person piano lessons in the Bay Area" },
    ],
  },
  "online-vs-in-person-piano-lessons-bay-area": {
    slug: "online-vs-in-person-piano-lessons-bay-area",
    title: "Online vs in-person piano lessons in the Bay Area",
    description:
      "When online piano lessons work, when in-person wins, and how Bay Area students can pick the right format based on schedule, instrument, and goals.",
    quickAnswer:
      "In-person piano lessons give the most accurate touch and tone feedback and are best for beginners and advanced technique work. Online lessons are excellent for busy adults, intermediate students, and anyone with a weighted-key instrument plus decent audio - the teaching content is the same; only feedback latency changes.",
    datePublished: "2026-02-14",
    dateModified: "2026-05-28",
    category: "Lesson format",
    readingTimeMinutes: 5,
    intro:
      "Online piano lessons used to be a compromise. After several years of full-time online teaching across the Bay Area, the honest answer is: format matters less than the teacher, and online lessons can be just as effective for the right student.",
    sections: [
      {
        heading: "When in-person is clearly better",
        body:
          "Complete beginners benefit from a teacher able to physically adjust hand position. Advanced technique work (octaves, double notes, polyphony with strict voicing) is easier to diagnose in person. Young children also tend to focus better in physical space.",
      },
      {
        heading: "When online wins",
        body:
          "Online is a real win when the student is an adult with a busy schedule, a parent splitting time across two cities, or a confident intermediate who just needs structured weekly accountability. Recording becomes trivial, scheduling becomes flexible, and commute time is converted directly into practice time.",
      },
      {
        heading: "The audio setup that actually matters",
        body:
          "A USB microphone (Blue Yeti, FIFINE K669) and a wired headset improve perceived teaching quality far more than fancy software. Most online piano lesson frustration is audio frustration disguised as teaching frustration.",
        bullets: [
          "External USB microphone (not laptop mic)",
          "Wired headphones to prevent feedback echo",
          "Camera angle showing both hands and keyboard from above",
          "Stable wired ethernet when possible",
        ],
      },
      {
        heading: "Hybrid as a third option",
        body:
          "Many South Bay families use hybrid: in-person for the first month and during exam prep, online during busy work weeks or travel. This often produces the best progression curve at the lowest commute cost.",
      },
    ],
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "Adult piano learning timeline in San Jose" },
      { slug: "studio-piano-vs-digital-keyboard-adult-beginners", label: "Studio piano vs digital keyboard for adult beginners" },
    ],
  },
  "adult-piano-practice-strategy-divide-and-conquer": {
    slug: "adult-piano-practice-strategy-divide-and-conquer",
    title: "Adult piano practice strategy: divide and conquer (an engineer's framework)",
    description:
      "A practical, repeatable practice framework for adult piano students borrowed from software engineering: name the bottleneck, isolate one variable, fix it, reconnect.",
    quickAnswer:
      "The most efficient adult piano practice strategy is to isolate one small problem per session - rhythm, fingering, voicing, or phrasing - solve it deliberately, then reconnect it to the full phrase. Stop counting practice minutes; start counting solved problems.",
    datePublished: "2026-01-30",
    dateModified: "2026-05-28",
    category: "Practice strategy",
    readingTimeMinutes: 8,
    intro:
      "Most adult piano students practice the way they read email: linearly, without prioritization. The most expensive habit you can build is sight-reading the same passage at full tempo every day and hoping it gets better. This article describes the practice framework I teach in my San Jose studio.",
    sections: [
      {
        heading: "Why time-counting fails adults",
        body:
          "Children can absorb 45 minutes of unfocused playing and still improve because their nervous systems are wide open. Adults cannot. Practicing 60 minutes without naming the problem you are solving wastes most of the session.",
      },
      {
        heading: "The four-step framework",
        body:
          "Each session is structured as: (1) identify one bottleneck, (2) isolate the smallest possible unit that contains it, (3) repeat with focused attention until it is solid, (4) reconnect to the full phrase and verify nothing else broke.",
      },
      {
        heading: "Naming the bottleneck",
        body:
          "Common bottlenecks: a specific finger crossing, a rhythmic group you keep rushing, a chord voicing where the inner voice swallows the melody, a pedal change that smudges. The act of naming the bottleneck out loud is half the fix.",
      },
      {
        heading: "Isolating the smallest unit",
        body:
          "Down to two beats, one hand, half-tempo if needed. The unit should be small enough that you can play it perfectly on the third repetition. If you cannot play it perfectly slowly, you definitely cannot play it correctly fast.",
      },
      {
        heading: "What focused repetition looks like",
        body:
          "Three to seven repetitions at conscious attention level, then walk away from that unit for the day. Marathon repetition (20+ identical reps) produces muscle confusion and increased injury risk. Less is more.",
      },
      {
        heading: "Reconnection",
        body:
          "Play the unit inside the full phrase at full tempo once. If it breaks, the unit was not small enough; go smaller. If it holds, leave it alone for 48 hours and verify it on day three. Sleep consolidates motor learning more than additional reps do.",
      },
    ],
    howTo: {
      name: "How to practice piano with the divide-and-conquer framework",
      description:
        "A repeatable, four-step routine for adult piano students who want measurable practice progress in 25-40 minute sessions.",
      totalTimeIso: "PT30M",
      steps: [
        {
          name: "Identify one bottleneck",
          text: "Name the single hardest moment in today's piece. Say it out loud: 'measure 14, beat 3, left hand crosses badly.'",
        },
        {
          name: "Isolate the smallest unit",
          text: "Reduce to two beats and one hand if needed. Drop tempo until you can play the unit perfectly three times in a row.",
        },
        {
          name: "Focused repetition (3-7 reps)",
          text: "Repeat the unit with full attention for no more than seven repetitions. Stop and rotate to a different bottleneck before quality degrades.",
        },
        {
          name: "Reconnect to the full phrase",
          text: "Insert the unit back into the phrase at performance tempo. If it breaks, go smaller. If it holds, leave it for 48 hours and verify on day three.",
        },
      ],
    },
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "Adult piano learning timeline in San Jose" },
      { slug: "what-to-expect-first-piano-lesson", label: "What to expect in your first piano lesson" },
    ],
  },
  "what-to-expect-first-piano-lesson": {
    slug: "what-to-expect-first-piano-lesson",
    title: "What to expect in your first piano lesson",
    description:
      "A walkthrough of what actually happens in a first private piano lesson in San Jose - whether you are a complete beginner, a returning adult, or a parent bringing a child.",
    quickAnswer:
      "Your first piano lesson is half diagnostic, half teaching. Expect 10 minutes of conversation about goals, 30-40 minutes of structured playing and observation, and a clear written or recorded assignment for the week. You should leave with a small, doable plan - not a sales pitch.",
    datePublished: "2026-01-10",
    dateModified: "2026-05-28",
    category: "Getting started",
    readingTimeMinutes: 5,
    intro:
      "If you have never taken a private piano lesson before, the first session can feel mysterious. This article walks through what actually happens at the studio - so you know what to bring, what to expect, and what a good first lesson should feel like.",
    sections: [
      {
        heading: "Before you arrive",
        body:
          "Bring whatever music you already own, even if it is wrong for your level. Bring a list of pieces you wish you could play, even if they feel out of reach. If you have a phone with a camera, that is enough recording equipment for now.",
      },
      {
        heading: "The first ten minutes: goals and history",
        body:
          "We talk about your background, schedule, and goals. \"Why do you want to play piano?\" is not a soft question - the answer determines repertoire, practice routine, and whether you should pursue exam tracks or a free-form path.",
      },
      {
        heading: "Diagnostic playing",
        body:
          "If you have any background, I will ask you to play something you know - even if it is rough. The goal is to hear hand shape, pulse, sense of phrase, and where you compensate. If you are a true beginner, we start with hand position and the first five notes on the keyboard.",
      },
      {
        heading: "The first piece of teaching",
        body:
          "Every first lesson ends with one specific thing taught well: a clear hand position, a single rhythm group, a phrase shape, a pedaling rule. Quality of the first lesson is measured by whether you can apply that one thing at home alone.",
      },
      {
        heading: "Walking out with a plan",
        body:
          "You leave with: one small assignment for the week, a short note on what to focus on, and a sense of whether the teaching style fits. If you cannot describe your assignment in one sentence, the first lesson did not finish.",
      },
    ],
    related: [
      { slug: "how-to-choose-piano-teacher-south-bay", label: "How to choose a piano teacher in the South Bay" },
      { slug: "adult-piano-practice-strategy-divide-and-conquer", label: "Adult piano practice strategy" },
    ],
  },
  "studio-piano-vs-digital-keyboard-adult-beginners": {
    slug: "studio-piano-vs-digital-keyboard-adult-beginners",
    title: "Studio piano vs digital keyboard for adult beginners",
    description:
      "Acoustic piano vs digital keyboard for adult beginners: what to buy first, when to upgrade, and how each choice changes your learning curve.",
    quickAnswer:
      "Adult beginners should start with a full-size, fully-weighted 88-key digital piano with hammer action - not a 61-key synthesizer and not an unweighted MIDI keyboard. Upgrade to an acoustic upright once you can play intermediate repertoire and your touch sensitivity is the bottleneck (typically year 2-3).",
    datePublished: "2025-12-18",
    dateModified: "2026-05-28",
    category: "Instrument choice",
    readingTimeMinutes: 6,
    intro:
      "Adult beginners often ask whether they should buy an acoustic upright before starting piano lessons. The honest answer: most beginners do not need an acoustic piano in year one, but they absolutely need fully-weighted keys.",
    sections: [
      {
        heading: "Why weighted keys matter from day one",
        body:
          "Piano technique depends on the resistance of the key against your finger. A 61-key unweighted keyboard teaches your hand the wrong physical habits, which you then have to unlearn when you finally play a real piano. Weighted hammer-action keys (the kind a digital piano uses) feel close enough to an acoustic for the first few years of learning.",
      },
      {
        heading: "Good first instruments",
        body:
          "Reliable options in the under-$1500 range: Yamaha P-145 / P-225, Kawai ES120 / ES520, Roland FP-30X / FP-60X. These all have 88 fully-weighted keys, decent built-in sounds, and last for years. The dedicated piano sound on any of these is better than a $5000 keyboard from 2005.",
        bullets: [
          "Yamaha P-145, P-225, P-525 (graded hammer action)",
          "Kawai ES120, ES520, ES920 (responsive action)",
          "Roland FP-30X, FP-60X (PHA-4 action)",
        ],
      },
      {
        heading: "When to upgrade to acoustic",
        body:
          "Once you are playing intermediate repertoire and your tone control is the limiting factor (typically year 2-3), an acoustic upright becomes worth the investment. Used Yamaha U1, Kawai K-300, or Boston UP-118 are common Bay Area choices in the $4000-8000 range.",
      },
      {
        heading: "What does not matter at the start",
        body:
          "Polyphony specs above 192 voices, hundreds of built-in sounds, MIDI features, weighted hammer simulation grades. These are marketing differentiators - they do not change your first 18 months of learning.",
      },
    ],
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "Adult piano learning timeline in San Jose" },
      { slug: "online-vs-in-person-piano-lessons-bay-area", label: "Online vs in-person piano lessons" },
    ],
  },
};

const zh: Record<ArticleSlug, Article> = {
  "adult-piano-learning-timeline-san-jose": {
    slug: "adult-piano-learning-timeline-san-jose",
    title: "圣何塞成人学钢琴需要多久？",
    description:
      "成人学钢琴需要多久？基于在圣何塞与南湾私教 60 多位成人学员的真实月度与年度时间线。",
    quickAnswer:
      "稳定练习的成人在 2-3 个月内能听到明显进步；第 6 个月通常能音乐地弹一首小品；第 1-2 年可进入中级曲目，前提是每周 5 天、每天 20-40 分钟。",
    datePublished: "2026-04-10",
    dateModified: "2026-05-28",
    category: "成人学习",
    readingTimeMinutes: 7,
    intro:
      "搜索圣何塞钢琴课的成人学员问得最多的，永远是同一个问题：到底要学多久？本文给出基于真实学生进度的具体时间线，而不是教材出版商的笼统估计。",
    sections: [
      {
        heading: "第 1-3 个月：打基础",
        body:
          "前三个月的目标：稳定手型、双谱号识谱、能用两只手弹简单乐曲。最关键的进步是思维方式：把练习拆成具名的小任务，而不是从头到尾“过一遍”。",
        bullets: ["手型、坐姿、放松手腕", "C、G、F 大调双谱号读谱", "节拍清晰的双手小品", "初次接触强弱与乐句"],
      },
      {
        heading: "第 4-6 个月：开始有音乐性",
        body:
          "第四个月起身体已经记住键盘，可以加入乐句走向、强弱塑造、主旋律突出。多数成人在第 5-6 个月能为家人朋友演奏第一首“真正像样”的曲子。",
      },
      {
        heading: "第 7-12 个月：进入中级",
        body:
          "第一年结束时，可从教材曲目过渡到真正的作品。常见里程碑：巴赫小步舞曲、克莱门蒂简易奏鸣曲、肖邦简单前奏曲，或诚实难度的流行曲改编。读谱速度成为新的瓶颈。",
      },
      {
        heading: "第二年及以后",
        body:
          "进入第二年，稳定练习的成人可以挑战柴可夫斯基《少年曲集》、舒伯特圆舞曲、莫扎特奏鸣曲较易乐章，或肖邦前奏曲 Op. 28 No. 4 / No. 7。曾有学员在不到两年内从 Thompson 教材吃力起步，达到演奏《新娃娃舞曲》与舒伯特圆舞曲的水平。",
      },
      {
        heading: "什么会改变时间线",
        body:
          "稳定性最重要。每天 25 分钟、每周 5 天，长期效果远超只在周末练两小时。课程频率、乐器质量（至少要配重电钢）、是否每周录音回听，也都影响进度。",
        bullets: ["每周 5 次短练 > 周末一次长练", "每周课保持节奏；自律强者可隔周", "至少 88 键配重电钢琴", "每周录音一次，反馈循环加快"],
      },
    ],
    related: [
      { slug: "adult-piano-practice-strategy-divide-and-conquer", label: "成人练琴策略：分而治之" },
      { slug: "what-to-expect-first-piano-lesson", label: "第一节钢琴课会发生什么" },
    ],
  },
  "how-to-choose-piano-teacher-south-bay": {
    slug: "how-to-choose-piano-teacher-south-bay",
    title: "在南湾如何选择钢琴老师",
    description:
      "在圣何塞、森尼维尔、库比蒂诺及南湾选择钢琴老师的实用清单：试听该问什么、要警惕什么、什么才是真正的好教学。",
    quickAnswer:
      "选钢琴老师要看：每周计划是否清晰、是否真实教技巧、曲目是否贴合你的目标、是否提供能上一节真课的免费试听。避免只跟一本教材、从不调整目标的老师。",
    datePublished: "2026-03-22",
    dateModified: "2026-05-28",
    category: "如何选老师",
    readingTimeMinutes: 6,
    intro:
      "在圣何塞、森尼维尔、库比蒂诺或整个南湾搜索“附近钢琴老师”时，难点不在于找不到老师，而在于筛选。本清单解释了什么真正区分一位优秀的私教老师与一位忙碌的老师。",
    sections: [
      {
        heading: "看是否有清晰的周计划",
        body:
          "好老师每节课结束都会给出具体计划：哪几小节单独练、什么技巧动作要重复、要录什么、下周带什么回来。如果你试听完不知道要练什么，那是一个明确信号。",
      },
      {
        heading: "注意技巧诚实度",
        body:
          "成人很容易养成紧张习惯。如果老师从不提及手腕高度、指尖弧度、肩部放松或省力发力，他是在帮你提前到达瓶颈。技巧讨论应该从第一节课就开始，而不是第三年。",
      },
      {
        heading: "曲目要匹配真实目标",
        body:
          "如果你想弹肖邦夜曲，老师却两年不提，就是不匹配。好老师会诚实地搭桥：让你逐步具备能力，而不是无限期绕路。",
      },
      {
        heading: "要求真实的试听课",
        body:
          "有价值的试听包括：诊断式聆听、一个小作业、明确的价格说明。如果试听变成纯销售对话，你买的是品牌而不是教学。多数严谨的南湾私教都提供免费或低成本试听。",
      },
      {
        heading: "试听时该问的 5 个问题",
        body:
          "这五个问题能很快暴露契合度。",
        bullets: [
          "你如何规划两次课之间的一周？",
          "第 3 个月、第 6 个月、第 1 年的进度大致是什么样？",
          "你怎么避免技术训练带来的伤害？",
          "改约和请假政策是怎样的？",
          "能否用一位实际学生的成长说明？",
        ],
      },
    ],
    related: [
      { slug: "what-to-expect-first-piano-lesson", label: "第一节钢琴课会发生什么" },
      { slug: "online-vs-in-person-piano-lessons-bay-area", label: "湾区线上 vs 线下钢琴课" },
    ],
  },
  "online-vs-in-person-piano-lessons-bay-area": {
    slug: "online-vs-in-person-piano-lessons-bay-area",
    title: "湾区线上 vs 线下钢琴课怎么选",
    description:
      "线上钢琴课什么时候够用、线下钢琴课什么时候不可替代，以及湾区学生如何按日程、乐器与目标选择最合适的上课方式。",
    quickAnswer:
      "线下课触键与音色反馈最准，适合零基础和高级技巧训练。线上课对忙碌成人与中级学员同样有效——只要你有配重电钢与基本音频设备，教学内容与线下一致，只是反馈延迟略有差异。",
    datePublished: "2026-02-14",
    dateModified: "2026-05-28",
    category: "授课形式",
    readingTimeMinutes: 5,
    intro:
      "线上钢琴课曾经是“将就的选择”。但经过多年在湾区全职线上教学后，诚实的答案是：形式不如老师重要，对合适的学生，线上同样高效。",
    sections: [
      {
        heading: "什么时候线下明显更好",
        body:
          "完全零基础需要老师真实地调整手型；高级技巧（八度、双音、严格声部）也更易在面对面诊断。年幼儿童在物理空间里更易集中注意力。",
      },
      {
        heading: "什么时候线上反而更好",
        body:
          "成人忙碌、家庭跨城、有自律的中级学员，线上是真正的胜出。录音更方便、排课更灵活，把通勤时间直接换成练习时间。",
      },
      {
        heading: "真正决定线上质量的设备",
        body:
          "外置 USB 麦克风与有线耳麦带来的改善，远超过任何花哨软件。多数“线上钢琴课难受”其实是“音频难受”的伪装。",
        bullets: ["外置 USB 麦克风（不要用笔记本麦）", "有线耳机避免回声", "俯拍键盘和双手", "尽量有线网络"],
      },
      {
        heading: "混合上课作为第三种选项",
        body:
          "南湾很多家庭使用混合：前一个月与考级阶段线下，繁忙周或出差期线上。这往往以最低通勤成本带来最佳进度。",
      },
    ],
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "圣何塞成人学钢琴需要多久" },
      { slug: "studio-piano-vs-digital-keyboard-adult-beginners", label: "成人初学者：原声钢琴还是电钢" },
    ],
  },
  "adult-piano-practice-strategy-divide-and-conquer": {
    slug: "adult-piano-practice-strategy-divide-and-conquer",
    title: "成人练琴策略：分而治之（工程师的练习框架）",
    description:
      "为成人钢琴学员准备的可复用练习框架，借鉴自软件工程：命名瓶颈、隔离单一变量、修复、再接回完整乐句。",
    quickAnswer:
      "成人最高效的练琴方式：每次只攻克一个小问题——节奏、指法、声部或乐句——刻意解决后再接回完整乐句。停止数练琴时间，开始数“解决了多少问题”。",
    datePublished: "2026-01-30",
    dateModified: "2026-05-28",
    category: "练习策略",
    readingTimeMinutes: 8,
    intro:
      "大多数成人练琴像读邮件：从头到尾、没有优先级。最昂贵的习惯是每天用原速把同一段从头到尾过一遍，然后期待自己变好。本文介绍我在圣何塞工作室教授的练习框架。",
    sections: [
      { heading: "为什么“数时间”对成人不奏效", body: "儿童神经系统开放性强，60 分钟不聚焦也能进步。成人不行。没有命名问题、单纯靠时长堆出来的练习，大部分都是浪费。" },
      { heading: "四步框架", body: "每次练习按以下结构：（1）找出一个瓶颈，（2）将其隔离到最小单位，（3）以集中注意力反复练习直到稳定，（4）接回完整乐句并验证。" },
      { heading: "命名瓶颈", body: "常见瓶颈：某次指法穿越、某组节奏被赶、某个内声部盖过主旋律、某次踏板换得模糊。把瓶颈用口语说出来本身就完成了一半修复。" },
      { heading: "隔离最小单位", body: "可缩到两拍、单手、半速。这个单位要小到第三次重复就能完美。慢都弹不准，快肯定弹不对。" },
      { heading: "什么叫聚焦重复", body: "全神贯注下重复 3-7 次，然后离开这个单位。马拉松式 20+ 次相同重复会引发肌肉记忆混乱并提高受伤风险——越少越好。" },
      { heading: "再接回乐句", body: "将单位以原速放回乐句完整跑一次。若崩溃，说明单位不够小；若稳定，48 小时不再练，第三天再验证。睡眠对动作学习的巩固远超过额外重复。" },
    ],
    howTo: {
      name: "分而治之练琴法",
      description: "适合 25-40 分钟练习时段的成人钢琴四步练琴流程。",
      totalTimeIso: "PT30M",
      steps: [
        { name: "命名一个瓶颈", text: "用口语点名今天最难的一处，例如：“第 14 小节第 3 拍，左手穿越不顺。”" },
        { name: "隔离最小单位", text: "缩到两拍单手，如果还不行，降速直到能连弹三次完美。" },
        { name: "聚焦重复 3-7 次", text: "在最高注意力下重复不超过 7 次，质量下滑前就切换瓶颈。" },
        { name: "再接回完整乐句", text: "以原速将单位放回乐句完整跑一次。崩溃则缩更小；稳定则 48 小时后再验证。" },
      ],
    },
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "圣何塞成人学钢琴需要多久" },
      { slug: "what-to-expect-first-piano-lesson", label: "第一节钢琴课会发生什么" },
    ],
  },
  "what-to-expect-first-piano-lesson": {
    slug: "what-to-expect-first-piano-lesson",
    title: "第一节钢琴课会发生什么",
    description:
      "圣何塞私人钢琴第一节课的真实流程：零基础、重拾成人或带孩子来上课的家长，都可以提前了解会发生什么。",
    quickAnswer:
      "第一节课一半是诊断、一半是教学：10 分钟谈目标，30-40 分钟有结构的演奏与观察，最后给出一个清晰可执行的本周作业。你应该带着一个具体的小计划离开，而不是销售话术。",
    datePublished: "2026-01-10",
    dateModified: "2026-05-28",
    category: "上课起步",
    readingTimeMinutes: 5,
    intro: "如果你从未上过私人钢琴课，第一节课会有点神秘。本文带你走一遍工作室真实流程：你需要带什么、会发生什么、什么是一节合格的第一课。",
    sections: [
      { heading: "上课前", body: "把已有的乐谱都带上，哪怕程度不合适。把你想弹但还弹不了的曲目列一张清单。手机摄像头就足够当录音设备。" },
      { heading: "前 10 分钟：目标与背景", body: "我们会聊背景、日程与目标。“你为什么想学钢琴”不是软问题——答案决定曲目、练习节奏，以及是否走考级路线。" },
      { heading: "诊断式演奏", body: "如果有基础，我会请你弹一段你熟悉的——哪怕弹得不完美。目标是听手型、脉动、乐句感与你在哪里补偿。完全零基础则从手型和键盘前五个音开始。" },
      { heading: "第一个被教好的点", body: "每一节第一课都至少有一件具体的事被教好：稳定的手型、一组节奏、一个乐句走向、一条踏板规则。第一节课的质量，看你回家能否独立应用它。" },
      { heading: "带着计划离开", body: "你走的时候应该有：一份本周作业、一段重点说明、对教学风格是否合适的判断。如果你说不出一句话的本周作业，那这第一节课没结束。" },
    ],
    related: [
      { slug: "how-to-choose-piano-teacher-south-bay", label: "在南湾如何选钢琴老师" },
      { slug: "adult-piano-practice-strategy-divide-and-conquer", label: "成人练琴策略：分而治之" },
    ],
  },
  "studio-piano-vs-digital-keyboard-adult-beginners": {
    slug: "studio-piano-vs-digital-keyboard-adult-beginners",
    title: "成人初学者：原声钢琴还是配重电钢？",
    description:
      "成人初学者该买原声立式钢琴还是配重电钢？什么时候升级？每种选择如何影响学习曲线？",
    quickAnswer:
      "成人初学者应直接购买 88 键全配重锤式电钢琴，不要 61 键合成器或非配重 MIDI 键盘。第 2-3 年进入中级、触键灵敏度成为瓶颈后，再升级到原声立式钢琴。",
    datePublished: "2025-12-18",
    dateModified: "2026-05-28",
    category: "乐器选择",
    readingTimeMinutes: 6,
    intro: "成人初学者常问：上课前是否要先买原声钢琴？诚实答案：第一年通常不需要原声，但必须有 88 键全配重键。",
    sections: [
      { heading: "为什么第一天就要配重键", body: "钢琴技巧的核心是手指与琴键之间的阻力关系。61 键非配重键盘会教会你错误的物理习惯，将来上真琴还要重新拆掉。配重锤式电钢琴对前几年学习足够接近原声手感。" },
      {
        heading: "推荐的入门琴",
        body:
          "$1500 以下可靠选择：Yamaha P-145 / P-225、Kawai ES120 / ES520、Roland FP-30X / FP-60X。均为 88 全配重键，内置音色与稳定性多年不淘汰。",
        bullets: ["Yamaha P-145、P-225、P-525", "Kawai ES120、ES520、ES920", "Roland FP-30X、FP-60X"],
      },
      { heading: "什么时候升级到原声钢琴", body: "当你弹中级曲目、且音色控制成为限制时（通常第 2-3 年），原声立式才值得投入。湾区二手 Yamaha U1、Kawai K-300、Boston UP-118 常见区间为 $4000-8000。" },
      { heading: "什么不重要", body: "192 复音以上、几百种内置音色、MIDI 花式参数、配重模拟分级——这些是营销差异，对前 18 个月的学习毫无影响。" },
    ],
    related: [
      { slug: "adult-piano-learning-timeline-san-jose", label: "圣何塞成人学钢琴需要多久" },
      { slug: "online-vs-in-person-piano-lessons-bay-area", label: "湾区线上 vs 线下钢琴课" },
    ],
  },
};

export const articles: Record<Locale, Record<ArticleSlug, Article>> = { en, zh };

export function getArticle(locale: Locale, slug: ArticleSlug): Article {
  return articles[locale][slug];
}

export function getAllArticles(locale: Locale): Article[] {
  return articleSlugs.map((slug) => articles[locale][slug]);
}
