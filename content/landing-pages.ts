import type { Locale } from "@/content/site";

export const landingPageSlugs = [
  "piano-lessons-san-jose",
  "adult-piano-lessons",
  "kids-piano-lessons",
  "online-piano-lessons",
  "piano-teacher-san-jose",
] as const;

export type LandingPageSlug = (typeof landingPageSlugs)[number];

export type LandingSection = { heading: string; body: string };

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
            "Piano Lessons San Jose & South Bay | In-Person & Online | 1:1 Free Trial",
          description:
            "Private piano lessons in San Jose, CA and the South Bay—in-person or online. One-on-one coaching for beginners through advanced. Free trial lesson. Book your San Jose piano lesson today.",
        },
        h1: "Piano lessons in San Jose and the South Bay",
        intro:
          "Whether you are searching for piano lessons in San Jose, piano classes near Campbell, or a South Bay piano teacher who only teaches one-on-one, this studio is built around you—not a generic method book. Lessons are in-person in San Jose and nearby communities, or online when that fits your schedule.",
        sections: [
          {
            heading: "Why private 1:1 lessons",
            body:
              "Every student gets a customized plan. We focus on technique, musicality, and the “language” of music—not crowded group classes. If you want affordable piano lessons with depth, you’ll get clear practice strategies and repertoire that matches your goals.",
          },
          {
            heading: "Who takes lessons here",
            body:
              "Adult beginners and adult restarters, kids and teens (ages 5+), and students preparing for exams or performances. If you are comparing “piano lessons near me” options, start with a free trial lesson and see the teaching style in action.",
          },
          {
            heading: "Service area",
            body:
              "Students come from San Jose, Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, Milpitas, and across the SF Bay Area. Online piano lessons are available for busy adults and families who prefer remote learning.",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "Piano Lessons for Adults San Jose | Private Beginners & Restarters | Free Trial",
          description:
            "Private piano lessons for adults in San Jose and the Bay Area: beginners, restarters, and serious hobbyists. In-person or online, one-on-one. Free trial—no credit card required.",
        },
        h1: "Piano lessons for adults in San Jose and the Bay Area",
        intro:
          "If you typed “private piano lessons for adults” or “piano lessons for adults near me,” you are in the right place. I specialize in adult beginners and adult restarters—people who want real progress without gimmicks, and who value structured, patient coaching.",
        sections: [
          {
            heading: "Adult beginners and “I quit as a kid” restarters",
            body:
              "I started seriously after age 25 and reached conservatory-level advanced playing as an adult, so I understand the mindset and scheduling realities of adult learners. Lessons emphasize technique, reading, and musicality—not rushing through method books.",
          },
          {
            heading: "In-person or online",
            body:
              "Choose in-person lessons in San Jose / South Bay or online lessons for flexibility. Either way, you get private 1:1 instruction tailored to your goals.",
          },
          {
            heading: "Try before you commit",
            body:
              "Book a free trial lesson to see whether the teaching style fits. Most families receive a same-day reply to inquiries.",
          },
        ],
      },
      "kids-piano-lessons": {
        seo: {
          title:
            "Piano Lessons for Kids San Jose | Private 1:1 | South Bay & Bay Area",
          description:
            "Private piano lessons for kids and teens in San Jose and the South Bay. Patient, structured lessons for beginners through advancing students. In-person or online. Book a free trial.",
        },
        h1: "Piano lessons for kids and teens (ages 5+)",
        intro:
          "Parents searching for piano classes in San Jose or a private piano teacher for children often want a calm, structured teacher who communicates clearly. I teach one-on-one only—no group classes—so each student gets attention tailored to their age and learning style.",
        sections: [
          {
            heading: "What parents can expect",
            body:
              "Clear weekly assignments, emphasis on healthy technique, and a long-term plan that balances progress with enjoyment. Bilingual support (English and Chinese) is available for families who want it.",
          },
          {
            heading: "Lesson formats",
            body:
              "Weekly or bi-weekly schedules, in-person in San Jose / South Bay or online. Support for exam prep, auditions, and competitions when that aligns with your goals.",
          },
          {
            heading: "Start with a trial",
            body:
              "Schedule a free trial lesson to see whether the fit is right for your child before committing to ongoing lessons.",
          },
        ],
      },
      "online-piano-lessons": {
        seo: {
          title:
            "Online Piano Lessons | San Jose Bay Area Teacher | 1:1 Private",
          description:
            "Online piano lessons with a conservatory-level pianist and experienced teacher. Private 1:1 lessons for adults and kids. Serving San Jose, South Bay, and remote students. Free trial available.",
        },
        h1: "Online piano lessons (private one-on-one)",
        intro:
          "Online lessons work well for busy adults, traveling families, and students who prefer learning from home. You still get the same personalized curriculum and attention—just without the commute.",
        sections: [
          {
            heading: "How online lessons are structured",
            body:
              "We focus on the same fundamentals as in-person lessons: technique, reading, interpretation, and practice routines you can actually follow during the week. Camera setup and assignment clarity matter—I help students optimize both.",
          },
          {
            heading: "Who online lessons are best for",
            body:
              "Adult beginners and hobbyists, motivated kids with parent support, and students who split time between cities. If you are in the Bay Area and want occasional in-person lessons, hybrid options can be discussed.",
          },
          {
            heading: "Book a trial",
            body:
              "Try a free trial lesson to confirm audio quality, teaching style, and scheduling fit.",
          },
        ],
      },
      "piano-teacher-san-jose": {
        seo: {
          title:
            "Piano Teacher San Jose | Eric Liu | Conservatory-Level Adult Success",
          description:
            "Looking for a piano teacher in San Jose? Eric Liu offers private 1:1 lessons for adults, beginners, and kids 5+. In-person South Bay & online. Free trial lesson. Read reviews and book today.",
        },
        h1: "Piano teacher in San Jose",
        intro:
          "Whether you searched “piano teacher near me,” “piano music teachers near me,” or “San Jose piano teachers,” the goal is the same: find a teacher you trust, who teaches seriously, and who respects your time. I offer private lessons only—no group classes—rooted in classical training and practical coaching.",
        sections: [
          {
            heading: "Credentials and approach",
            body:
              "Training with Bay Area concert pianists and years of one-on-one teaching experience. Students range from young beginners to adults pursuing advanced repertoire. I emphasize technique, musicality, and clear practice systems.",
          },
          {
            heading: "Lessons vs. apps",
            body:
              "Apps can supplement, but they rarely replace a teacher who diagnoses tension, musical phrasing, and efficient practice. If you want more than “tap-along” exercises, private lessons are the fastest path to real playing.",
          },
          {
            heading: "Next step",
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
            "圣何塞钢琴课 | 南湾湾区 | 线下一对一与线上 | 免费试听",
          description:
            "圣何塞及南湾私人钢琴课，线下或线上授课。一对一教学，适合初学者至进阶。免费试听，无需信用卡。",
        },
        h1: "圣何塞与南湾钢琴课程",
        intro:
          "无论您在寻找圣何塞钢琴课、南湾钢琴老师，还是希望线上一对一，课程都以学生为中心——不使用千篇一律的教材。线下可在圣何塞及周边上课，也支持在线课程以配合日程。",
        sections: [
          {
            heading: "为何选择一对一",
            body:
              "每位学生都有独立学习计划，注重技巧、音乐性与音乐语言的理解，不设团课。希望在合理预算内获得有深度的钢琴课，会得到清晰的练习方法与符合目标的曲目安排。",
          },
          {
            heading: "适合对象",
            body:
              "成人初学者与重回钢琴的成人、儿童与青少年（5+），以及需要备考或比赛辅导的学生。若您在比较“钢琴老师”或“钢琴课”，欢迎先预约免费试听，直接感受教学方式。",
          },
          {
            heading: "服务区域",
            body:
              "学生来自圣何塞、森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯及整个湾区。也可选择线上钢琴课。",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "成人钢琴课 圣何塞湾区 | 初学者与重拾钢琴 | 一对一免费试听",
          description:
            "面向成人初学者与成人重拾者的私人钢琴课。圣何塞湾区可线下或线上一对一。免费试听，无需信用卡。",
        },
        h1: "成人钢琴课（圣何塞与湾区）",
        intro:
          "我专门指导成人初学者与“童年学过、想重新拾回”的人。以系统、耐心的方式教授技巧、读谱与音乐表现，而不是赶进度刷完一本教材。",
        sections: [
          {
            heading: "成人学习路径",
            body:
              "我在25岁后才开始系统学习并达到音乐学院水平的高级演奏，理解成人学习者的时间与心理特点。课程强调技巧、读谱与音乐性。",
          },
          {
            heading: "线下或线上",
            body:
              "可选择圣何塞/南湾线下课，或线上课以配合工作与家庭。均为一对一私教。",
          },
          {
            heading: "先试听再决定",
            body:
              "欢迎预约免费试听，确认是否适合您。多数咨询可在当天收到回复。",
          },
        ],
      },
      "kids-piano-lessons": {
        seo: {
          title:
            "儿童钢琴课 圣何塞 | 一对一私教 | 南湾湾区",
          description:
            "圣何塞及南湾儿童与青少年私人钢琴课（5岁+）。一对一教学，不设团课。线下或线上。欢迎预约免费试听。",
        },
        h1: "儿童与青少年钢琴课（5岁+）",
        intro:
          "为家长提供清晰、结构化的钢琴课：注重健康手型与练习习惯，长期规划兼顾进度与兴趣。仅一对一，不授团课。可提供中英文沟通，方便家长了解进度。",
        sections: [
          {
            heading: "家长可期待",
            body:
              "每周明确作业、重视基本功与音乐表现，并在需要时支持考级、比赛与试音准备。",
          },
          {
            heading: "上课形式",
            body:
              "每周或隔周；圣何塞/南湾线下或线上。根据家庭目标定制内容。",
          },
          {
            heading: "从试听开始",
            body:
              "建议先预约免费试听，确认师生与家庭期望是否一致。",
          },
        ],
      },
      "online-piano-lessons": {
        seo: {
          title:
            "线上钢琴课 | 湾区老师一对一 | 成人与儿童",
          description:
            "线上私人钢琴课：由经验丰富的老师一对一授课，适合成人与儿童。服务圣何塞、南湾及远程学生。可预约免费试听。",
        },
        h1: "线上钢琴课（一对一）",
        intro:
          "线上课程适合通勤不便的成人、经常出差的家庭，以及希望在家练习的学生。教学内容与线下一致，重点仍是技巧、读谱与可执行的练习计划。",
        sections: [
          {
            heading: "线上如何上课",
            body:
              "关注镜头与收音设置、清晰的作业与示范，以及每周可执行的练习步骤。",
          },
          {
            heading: "适合对象",
            body:
              "成人爱好者、有家长支持的儿童，以及需要灵活安排的学生。若在湾区，也可讨论线下与线上混合。",
          },
          {
            heading: "预约试听",
            body:
              "可先免费试听，确认设备与教学风格是否合适。",
          },
        ],
      },
      "piano-teacher-san-jose": {
        seo: {
          title:
            "圣何塞钢琴老师 | Eric Liu | 一对一成人与儿童",
          description:
            "圣何塞私人钢琴老师：一对一课程，成人初学者、儿童5+均可。南湾线下与线上。免费试听。欢迎阅读简介与评价。",
        },
        h1: "圣何塞钢琴老师",
        intro:
          "若您在搜索“钢琴老师”“圣何塞钢琴老师”或“附近钢琴老师”，核心需求通常是：专业、可靠、沟通清晰。我仅提供一对一私教，不设团课，教学以古典训练与系统化练习为基础。",
        sections: [
          {
            heading: "背景与风格",
            body:
              "师从湾区知名钢琴家，多年一对一教学经验，学生涵盖儿童初学者与成人进阶。强调技巧、音乐性与可持续的练习方法。",
          },
          {
            heading: "老师与自学/应用",
            body:
              "自学与应用可辅助，但难以替代老师对发力、乐句与练习策略的诊断。若希望真正弹奏而不仅是跟点，私教通常更高效。",
          },
          {
            heading: "下一步",
            body:
              "可查看完整简介、首页演奏视频，并预约免费试听。",
          },
        ],
      },
    },
  };
