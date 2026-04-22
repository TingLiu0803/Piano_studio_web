import type { Locale } from "@/content/site";

export const landingPageSlugs = [
  "piano-lessons-san-jose",
  "adult-piano-lessons",
  "kids-piano-lessons",
  "online-piano-lessons",
  "piano-teacher-san-jose",
] as const;

export type LandingPageSlug = (typeof landingPageSlugs)[number];

export type LandingSection = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type LandingPageData = {
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  sections: LandingSection[];
};

export const landingPages: Record<Locale, Record<LandingPageSlug, LandingPageData>> =
  {
    en: {
      "piano-lessons-san-jose": {
        seo: {
          title:
            "Piano Lessons San Jose | South Bay & Online | 1:1 + Free Trial",
          description:
            "Private 1:1 piano lessons in San Jose & the South Bay—in-person or online. Kids 5+, adults, beginners to advanced. Weekly plans, technique & musicality. Free trial; most inquiries answered same day.",
        },
        h1: "Piano lessons in San Jose and the South Bay",
        intro:
          "Whether you are searching for piano lessons in San Jose, piano classes near Campbell, or a South Bay piano teacher who only teaches one-on-one, this studio is built around you—not a generic method book. Lessons are in-person in San Jose and nearby communities, or online when that fits your schedule.",
        sections: [
          {
            heading: "Why private 1:1 lessons",
            bullets: [
              "Weekly assignments matched to your goals—not a one-size method track",
              "Technique, reading, and phrasing explained in repeatable language",
              "Practice strategies you can use between lessons without guesswork",
            ],
            body:
              "Every student gets a customized plan. We focus on technique, musicality, and the “language” of music—not crowded group classes. If you want affordable piano lessons with depth, you’ll get clear practice strategies and repertoire that matches your goals.",
          },
          {
            heading: "Who takes lessons here",
            bullets: [
              "Adult beginners and “I quit as a kid” restarters",
              "Kids and teens (5+) through advancing repertoire",
              "Exam, audition, and performance coaching when you want it",
            ],
            body:
              "Adult beginners and restarters, kids and teens (ages 5+), intermediate and advanced students working on technique and repertoire, and anyone preparing for exams, auditions, or performances. If you are comparing “piano lessons near me” options, start with a free trial lesson and see the teaching style in action.",
          },
          {
            heading: "Service area",
            bullets: [
              "In-person across San Jose, Sunnyvale, Santa Clara, Cupertino, and nearby South Bay cities",
              "Online lessons for busy adults and families who prefer remote learning",
            ],
            body:
              "Students come from San Jose, Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, Milpitas, and across the SF Bay Area. Online piano lessons are available for busy adults and families who prefer remote learning.",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "Adult Piano Lessons San Jose | Beginners to Advanced | Free Trial",
          description:
            "Private adult piano lessons in San Jose & Bay Area: beginners, restarters, hobbyists, and advanced players. In-person or online 1:1. Patient, structured coaching—free trial, no credit card.",
        },
        h1: "Piano lessons for adults in San Jose and the Bay Area",
        intro:
          "If you typed “private piano lessons for adults” or “piano lessons for adults near me,” you are in the right place. Many of my adults are beginners or restarters, but I also teach intermediate and advanced players who want serious coaching on technique, musicality, and repertoire—structured, patient, and goal-driven.",
        sections: [
          {
            heading: "Adult beginners and “I quit as a kid” restarters",
            bullets: [
              "Adult-paced learning: technique, reading, and phrasing without rushing a method book",
              "Scheduling and mindset coaching from someone who started seriously after 25",
              "Intermediate/advanced adults get repertoire, interpretation, and practice design support",
            ],
            body:
              "I started seriously after age 25 and reached conservatory-level advanced playing as an adult, so I understand the mindset and scheduling realities of adult learners. Lessons emphasize technique, reading, and musicality—not rushing through method books. Intermediate and advanced adults get the same depth of coaching on repertoire, interpretation, and practice design.",
          },
          {
            heading: "In-person or online",
            bullets: [
              "In-person in San Jose / South Bay when you want hands-on touch and acoustics",
              "Online when travel is tight—same curriculum, same weekly accountability",
            ],
            body:
              "Choose in-person lessons in San Jose / South Bay or online lessons for flexibility. Either way, you get private 1:1 instruction tailored to your goals.",
          },
          {
            heading: "Try before you commit",
            bullets: [
              "Free trial to confirm teaching style and fit",
              "Most families get a same-day reply to messages",
            ],
            body:
              "Book a free trial lesson to see whether the teaching style fits. Most families receive a same-day reply to inquiries.",
          },
        ],
      },
      "kids-piano-lessons": {
        seo: {
          title:
            "Kids Piano Lessons San Jose | Private 1:1 | South Bay",
          description:
            "Private piano lessons for kids & teens (5+) in San Jose & South Bay. Calm, structured 1:1 lessons—healthy technique, clear weekly assignments, optional exam prep. In-person or online. Free trial.",
        },
        h1: "Piano lessons for kids and teens (ages 5+)",
        intro:
          "Parents searching for piano classes in San Jose or a private piano teacher for children often want a calm, structured teacher who communicates clearly. I teach one-on-one only—no group classes—so each student gets attention tailored to their age and learning style.",
        sections: [
          {
            heading: "What parents can expect",
            bullets: [
              "Weekly assignments you can supervise without guesswork",
              "Healthy technique habits from the first months",
              "English/Chinese check-ins when your family wants them",
            ],
            body:
              "Clear weekly assignments, emphasis on healthy technique, and a long-term plan that balances progress with enjoyment. Bilingual support (English and Chinese) is available for families who want it.",
          },
          {
            heading: "Lesson formats",
            bullets: [
              "Weekly or bi-weekly; in-person in San Jose / South Bay or online",
              "Exam, audition, and competition support when that matches your goals",
            ],
            body:
              "Weekly or bi-weekly schedules, in-person in San Jose / South Bay or online. Support for exam prep, auditions, and competitions when that aligns with your goals.",
          },
          {
            heading: "Start with a trial",
            bullets: [
              "Free trial before committing to ongoing lessons",
              "Meet the teaching style and expectations together",
            ],
            body:
              "Schedule a free trial lesson to see whether the fit is right for your child before committing to ongoing lessons.",
          },
        ],
      },
      "online-piano-lessons": {
        seo: {
          title:
            "Online Piano Lessons (1:1) | San Jose Teacher | Free Trial",
          description:
            "Live online piano lessons with an experienced San Jose/Bay Area teacher. Private 1:1 for adults & kids. Technique, reading, weekly practice plans. Try a free trial—check audio, style, and fit.",
        },
        h1: "Online piano lessons (private one-on-one)",
        intro:
          "Online lessons work well for busy adults, traveling families, and students who prefer learning from home. You still get the same personalized curriculum and attention—just without the commute.",
        sections: [
          {
            heading: "How online lessons are structured",
            bullets: [
              "Same fundamentals as in-person: technique, reading, interpretation",
              "Weekly routines designed to be doable at home",
              "Help optimizing camera angle, lighting, and assignment workflow",
            ],
            body:
              "We focus on the same fundamentals as in-person lessons: technique, reading, interpretation, and practice routines you can actually follow during the week. Camera setup and assignment clarity matter—I help students optimize both.",
          },
          {
            heading: "Who online lessons are best for",
            bullets: [
              "Busy adults, hobbyists, and motivated kids with parent support",
              "Families who split time between cities",
              "Bay Area students who may want occasional hybrid in-person lessons",
            ],
            body:
              "Adult beginners and hobbyists, motivated kids with parent support, and students who split time between cities. If you are in the Bay Area and want occasional in-person lessons, hybrid options can be discussed.",
          },
          {
            heading: "Book a trial",
            bullets: [
              "Free trial to validate audio, teaching style, and schedule",
            ],
            body:
              "Try a free trial lesson to confirm audio quality, teaching style, and scheduling fit.",
          },
        ],
      },
      "piano-teacher-san-jose": {
        seo: {
          title:
            "Piano Teacher San Jose | Private 1:1 | Adults & Kids 5+",
          description:
            "Find a San Jose piano teacher for serious 1:1 lessons—adults, restarters, and kids 5+. Classical training, structured practice, South Bay in-person or online. Free trial; fast replies.",
        },
        h1: "Piano teacher in San Jose",
        intro:
          "Whether you searched “piano teacher near me,” “piano music teachers near me,” or “San Jose piano teachers,” the goal is the same: find a teacher you trust, who teaches seriously, and who respects your time. I offer private lessons only—no group classes—rooted in classical training and practical coaching.",
        sections: [
          {
            heading: "Credentials and approach",
            bullets: [
              "Years of one-on-one teaching from young beginners to advanced adults",
              "Classical lineage with practical, week-to-week practice systems",
            ],
            body:
              "Training with Bay Area concert pianists and years of one-on-one teaching experience. Students range from young beginners to adults pursuing advanced repertoire. I emphasize technique, musicality, and clear practice systems.",
          },
          {
            heading: "Lessons vs. apps",
            bullets: [
              "Human diagnosis for tension, phrasing, and efficient practice",
              "A path to real repertoire—not only tap-along drills",
            ],
            body:
              "Apps can supplement, but they rarely replace a teacher who diagnoses tension, musical phrasing, and efficient practice. If you want more than “tap-along” exercises, private lessons are the fastest path to real playing.",
          },
          {
            heading: "Next step",
            bullets: [
              "Read the full bio, watch performances on the homepage, then book a trial",
            ],
            body:
              "Read the About page for the full biography, watch performance clips on the homepage, and book a free trial lesson when you are ready.",
          },
        ],
      },
    },
    zh: {
      "piano-lessons-san-jose": {
        seo: {
          title:
            "圣何塞钢琴课 | 南湾线上一对一 | 免费试听 · 当日回复",
          description:
            "圣何塞/南湾私人钢琴课：线下或线上一对一，儿童与成人、初学到进阶。每周清晰作业、技巧与音乐表现并重。免费试听；多数咨询当天回复。",
        },
        h1: "圣何塞与南湾钢琴课程",
        intro:
          "无论您在寻找圣何塞钢琴课、南湾钢琴老师，还是希望线上一对一，课程都以学生为中心——不使用千篇一律的教材。线下可在圣何塞及周边上课，也支持在线课程以配合日程。",
        sections: [
          {
            heading: "为何选择一对一",
            bullets: [
              "按目标拆解的每周计划，而不是赶进度的通用路径",
              "技巧、读谱与乐句表达用可重复的方法练到稳定",
              "在家练习的步骤清晰，减少“不知道练什么”的消耗",
            ],
            body:
              "每位学生都有独立学习计划，注重技巧、音乐性与音乐语言的理解，不设团课。希望在合理预算内获得有深度的钢琴课，会得到清晰的练习方法与符合目标的曲目安排。",
          },
          {
            heading: "适合对象",
            bullets: [
              "成人初学者与重拾者；儿童与青少年（5+）",
              "中级/高级：技巧与曲目深化；考级、试音、比赛与演出辅导",
              "不确定是否合适：先免费试听，直接感受教学方式",
            ],
            body:
              "成人初学者与重拾者、儿童与青少年（5+）、中级与高级学员（技巧与曲目深化），以及需要考级、试音、比赛或演出辅导的学生。若您在比较“钢琴老师”或“钢琴课”，欢迎先预约免费试听，直接感受教学方式。",
          },
          {
            heading: "服务区域",
            bullets: [
              "线下覆盖圣何塞、森尼维尔、圣克拉拉、库比蒂诺等南湾城市",
              "亦提供线上课程，适合通勤紧张的家庭与成人",
            ],
            body:
              "学生来自圣何塞、森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯及整个湾区。也可选择线上钢琴课。",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "成人钢琴课 圣何塞/湾区 | 初学到高级 | 免费试听",
          description:
            "成人初学者、重拾者与进阶学员的一对一钢琴课：圣何塞/南湾线下或线上。系统、耐心、以目标为导向。免费试听，无需信用卡；多数咨询当天回复。",
        },
        h1: "成人钢琴课（圣何塞与湾区）",
        intro:
          "许多成年学生是初学者或重拾者；我也教授中级与高级成人学员，在技巧、音乐性与曲目上做深度指导。课程系统、耐心、以目标为导向，而不是赶进度刷完一本教材。",
        sections: [
          {
            heading: "成人学习路径",
            bullets: [
              "按成人节奏推进：技巧、读谱与音乐性，而不是赶教材页数",
              "理解“下班后练琴”的现实：作业可执行、反馈具体",
              "中级/高级：曲目、音乐表现与练习规划同样深度跟进",
            ],
            body:
              "我在25岁后才开始系统学习并达到音乐学院水平的高级演奏，理解成人学习者的时间与心理特点。课程强调技巧、读谱与音乐性。中级与高级学员同样在曲目、音乐表现与练习规划上获得深度指导。",
          },
          {
            heading: "线下或线上",
            bullets: [
              "南湾线下：更直观的触键与音色反馈",
              "线上：更灵活的时间安排，同样一对一私教",
            ],
            body:
              "可选择圣何塞/南湾线下课，或线上课以配合工作与家庭。均为一对一私教。",
          },
          {
            heading: "先试听再决定",
            bullets: [
              "免费试听确认教学风格与目标是否匹配",
              "多数咨询可在当天收到回复",
            ],
            body:
              "欢迎预约免费试听，确认是否适合您。多数咨询可在当天收到回复。",
          },
        ],
      },
      "kids-piano-lessons": {
        seo: {
          title:
            "儿童钢琴课 圣何塞 | 一对一私教 | 南湾",
          description:
            "圣何塞/南湾儿童与青少年（5岁+）私人钢琴课：健康手型、清晰作业、长期规划。不设团课。线下或线上。免费试听，欢迎家长先沟通目标。",
        },
        h1: "儿童与青少年钢琴课（5岁+）",
        intro:
          "为家长提供清晰、结构化的钢琴课：注重健康手型与练习习惯，长期规划兼顾进度与兴趣。仅一对一，不授团课。可提供中英文沟通，方便家长了解进度。",
        sections: [
          {
            heading: "家长可期待",
            bullets: [
              "每周作业清楚，家长陪练更有抓手",
              "重视基本功与音乐表现，而不是只追进度",
              "需要时支持考级、比赛与试音准备",
            ],
            body:
              "每周明确作业、重视基本功与音乐表现，并在需要时支持考级、比赛与试音准备。",
          },
          {
            heading: "上课形式",
            bullets: [
              "每周或隔周；圣何塞/南湾线下或线上",
              "内容按家庭目标定制",
            ],
            body:
              "每周或隔周；圣何塞/南湾线下或线上。根据家庭目标定制内容。",
          },
          {
            heading: "从试听开始",
            bullets: [
              "先免费试听，确认师生与家庭期望是否一致",
            ],
            body:
              "建议先预约免费试听，确认师生与家庭期望是否一致。",
          },
        ],
      },
      "online-piano-lessons": {
        seo: {
          title:
            "线上钢琴课 | 圣何塞老师一对一 | 免费试听",
          description:
            "线上一对一钢琴课：成人与儿童均可。技巧、读谱与每周可执行作业。服务圣何塞、南湾及远程学生。免费试听，先确认设备与教学风格。",
        },
        h1: "线上钢琴课（一对一）",
        intro:
          "线上课程适合通勤不便的成人、经常出差的家庭，以及希望在家练习的学生。教学内容与线下一致，重点仍是技巧、读谱与可执行的练习计划。",
        sections: [
          {
            heading: "线上如何上课",
            bullets: [
              "镜头、收音与示范节奏优化，让细节听得清、看得懂",
              "作业与练习步骤具体到“每天练什么”",
            ],
            body:
              "关注镜头与收音设置、清晰的作业与示范，以及每周可执行的练习步骤。",
          },
          {
            heading: "适合对象",
            bullets: [
              "成人爱好者；有家长陪伴支持的儿童",
              "需要灵活排课的学生；也可讨论湾区线下混合",
            ],
            body:
              "成人爱好者、有家长支持的儿童，以及需要灵活安排的学生。若在湾区，也可讨论线下与线上混合。",
          },
          {
            heading: "预约试听",
            bullets: [
              "免费试听：确认设备、网络与教学风格",
            ],
            body:
              "可先免费试听，确认设备与教学风格是否合适。",
          },
        ],
      },
      "piano-teacher-san-jose": {
        seo: {
          title:
            "圣何塞钢琴老师 | 一对一私教 | 成人与儿童 5+",
          description:
            "圣何塞私人钢琴老师 Eric Liu：一对一课程，古典训练+系统化练习。南湾线下或线上；成人初学者、重拾者与儿童 5+。免费试听，欢迎先看评价与简介。",
        },
        h1: "圣何塞钢琴老师",
        intro:
          "若您在搜索“钢琴老师”“圣何塞钢琴老师”或“附近钢琴老师”，核心需求通常是：专业、可靠、沟通清晰。我仅提供一对一私教，不设团课，教学以古典训练与系统化练习为基础。",
        sections: [
          {
            heading: "背景与风格",
            bullets: [
              "多年一对一经验：儿童初学者到成人进阶",
              "强调技巧、音乐性与可持续的练习方法",
            ],
            body:
              "师从湾区知名钢琴家，多年一对一教学经验，学生涵盖儿童初学者与成人进阶。强调技巧、音乐性与可持续的练习方法。",
          },
          {
            heading: "老师与自学/应用",
            bullets: [
              "发力、乐句与练习策略需要面对面诊断与纠正",
              "目标是真正弹奏作品，而不只是跟练应用",
            ],
            body:
              "自学与应用可辅助，但难以替代老师对发力、乐句与练习策略的诊断。若希望真正弹奏而不仅是跟点，私教通常更高效。",
          },
          {
            heading: "下一步",
            bullets: [
              "阅读完整简介与首页演奏视频，再预约免费试听",
            ],
            body:
              "可查看完整简介、首页演奏视频，并预约免费试听。",
          },
        ],
      },
    },
  };
