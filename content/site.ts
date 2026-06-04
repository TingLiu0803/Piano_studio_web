export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

/**
 * Studio-wide content version. Bump when meaningful copy or schema fields
 * change so that JSON-LD `dateModified` and `Article.dateModified` stay
 * accurate; LLM crawlers use this signal to decide whether to re-cite.
 */
export const contentVersion = "2026-05-28";

export const siteConfig = {
  studioName: "Eric Liu Piano Studio",
  ownerName: "Eric Liu",
  city: "San Jose",
  region: "CA",
  country: "US",
  serviceArea:
    "Private piano lessons in San Jose, Sunnyvale & South Bay (Cupertino, Santa Clara, Campbell, Milpitas, Mountain View, Palo Alto, Los Gatos, Saratoga); SF Bay Area & online",
  serviceAreas: [
    "San Jose",
    "Sunnyvale",
    "Santa Clara",
    "Cupertino",
    "Mountain View",
    "Palo Alto",
    "Los Gatos",
    "Saratoga",
    "Campbell",
    "Milpitas",
    "South Bay",
    "SF Bay Area",
    "Online",
  ],
  lessonFormats: ["In-person", "Online"],
  ageRange: "Ages 5+",
  pricingNote: "Affordable rates - Contact for pricing",
  /** Schema.org priceRange token (`$`, `$$`, `$$$`, `$$$$`) for LocalBusiness. */
  priceRangeToken: "$$",
  email: "mr.tingliu@gmail.com",
  phone: "650-575-7300",
  /** Telephone in E.164 for schema.org. */
  phoneE164: "+1-650-575-7300",
  addressLine: "San Jose, CA 95110",
  timezone: "America/Los_Angeles",
  geo: {
    latitude: 37.3382,
    longitude: -121.8863,
  },
  /**
   * Opening hours used both for visible copy and for
   * LocalBusiness `openingHoursSpecification`.
   */
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "20:00" },
    { days: ["Saturday"], opens: "09:00", closes: "18:00" },
    { days: ["Sunday"], opens: "10:00", closes: "16:00" },
  ] as ReadonlyArray<{ days: string[]; opens: string; closes: string }>,
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://calendar.app.google/zF9wtvjGaaLZ76dS7",
  bookingProvider: "Google Calendar Appointment Schedule",
  /** Public Google Business Profile or Maps place URL (set NEXT_PUBLIC_GOOGLE_BUSINESS_URL in production). */
  googleBusinessProfileUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ??
    "https://share.google/GOmPCiC3Zgpe8hAav",
  /**
   * Public profiles for the studio entity (Yelp, Thumbtack, Instagram, etc.).
   * Feeds LocalBusiness `sameAs`; populate as accounts are claimed.
   */
  socialLinks: [] as string[],
  /**
   * Public profiles for the owner/teacher (LinkedIn, Bilibili, X, Wikidata, etc.).
   * Feeds Person `sameAs` — high-leverage GEO signal that lets LLMs unify the
   * teacher entity across the web.
   */
  ownerProfiles: [
    "https://space.bilibili.com/", // TODO: replace with full Bilibili creator URL
  ] as string[],
  /**
   * Public asset URLs. The OG default ships as a real 1200x630 JPEG; the
   * studio and teacher entries currently reuse it as a placeholder. Replace
   * `studio` with a real interior/branded studio photo and `teacher` with a
   * real headshot when available — JSON-LD and OG tags will pick the new
   * values up automatically.
   */
  images: {
    /** 1200x630 default Open Graph image. */
    ogDefault: "/og-default.jpg",
    /** Studio interior or branded photo (used in LocalBusiness `image`). */
    studio: "/og-default.jpg",
    /** Teacher headshot (used in Person `image`). */
    teacher: "/og-default.jpg",
    /** Square logo used in Organization `logo` (PNG, transparent background ideal). */
    logo: "/musicnbrain-logo.png",
  },
  // Update these when you get new reviews on Google Business Profile
  reviews: {
    averageRating: 5, // Average rating (all your reviews are 5 stars)
    totalCount: 3, // Total number of reviews - UPDATE THIS as you get more reviews
    /** ISO date the review count was last verified against the GBP profile. */
    lastVerified: "2026-05-28",
  },
  /**
   * Entities that anchor the studio's identity for E-E-A-T and LLM citation.
   * Surfaced both in JSON-LD (`alumniOf`, `colleague`, `memberOf`) and on the
   * About page as outbound links.
   */
  entityLinks: {
    sfcm: {
      name: "San Francisco Conservatory of Music",
      url: "https://www.sfcm.edu/",
    },
    stanford: {
      name: "Stanford University",
      url: "https://www.stanford.edu/",
    },
    musicnbrain: {
      name: "MusicNBrain",
      url: "https://www.musicnbrain.com/",
    },
    mentorErna: {
      name: "Erna Gulabyan",
      affiliation: "San Francisco Conservatory of Music",
    },
    mentorFrank: {
      name: "Frank Levy",
      affiliation: "Stanford University",
    },
  },
  bilibiliVideos: [
    {
      bvid: "BV1nYXPYHEQr",
      title: "Liszt Sonata In B Minor (Excerpt)",
      description:
        "Studio performance excerpt of Franz Liszt's Sonata in B Minor by Eric Liu, recorded for the Eric Liu Piano Studio in San Jose.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1nYXPYHEQr&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV1nYXPYHEQr",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2024-08-15T12:00:00Z",
      duration: "PT6M00S",
    },
    {
      bvid: "BV1TuDzB7EQS",
      title: "Chopin Nocturne in C minor, Op.48 No.1 (Excerpt)",
      description:
        "Performance excerpt of Chopin Nocturne Op. 48 No. 1 in C minor by Eric Liu, illustrating phrasing and tone control taught in studio.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1TuDzB7EQS&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV1TuDzB7EQS",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2024-09-10T12:00:00Z",
      duration: "PT5M30S",
    },
    {
      bvid: "BV1gqSEYNEtq",
      title: "Beethoven Piano Sonata No.28, Op.101 1st movement",
      description:
        "Beethoven Piano Sonata No. 28 Op. 101 first movement, performed by Eric Liu — example of late-Beethoven phrasing and voicing.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1gqSEYNEtq&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV1gqSEYNEtq",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2024-07-22T12:00:00Z",
      duration: "PT4M45S",
    },
    {
      bvid: "BV1GXkNBrEUk",
      title: "Mozart Sonata K. 576, 2nd movement",
      description:
        "Mozart Sonata K. 576, second movement, performed by Eric Liu — example of classical-era cantabile and pedaling decisions.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1GXkNBrEUk&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV1GXkNBrEUk",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2024-06-18T12:00:00Z",
      duration: "PT6M20S",
    },
    {
      bvid: "BV18u411o7uu",
      title: "Chopin: Nocturne in B major, Op. 62 No. 1",
      description:
        "Chopin Nocturne in B major Op. 62 No. 1, performed by Eric Liu — late-Chopin counterpoint and tone hierarchy.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV18u411o7uu&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV18u411o7uu",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2023-11-05T12:00:00Z",
      duration: "PT7M15S",
    },
    {
      bvid: "BV1H24y1f7Ls",
      title: "Bach: Partita for Keyboard No. 6, BWV 830 (Excerpt)",
      description:
        "Bach Keyboard Partita No. 6 BWV 830, excerpt performed by Eric Liu — example of articulation and voice-leading in Bach.",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1H24y1f7Ls&autoplay=0",
      watchUrl: "https://www.bilibili.com/video/BV1H24y1f7Ls",
      thumbnailUrl: "/og-default.jpg",
      uploadDate: "2023-09-12T12:00:00Z",
      duration: "PT5M50S",
    },
  ],
};

export const content = {
  en: {
    languageLabel: "English",
    nav: {
      home: "Home",
      about: "About",
      trial: "Free Trial",
      contact: "Contact",
      lessonsMenu: "Lesson options",
      journal: "Journal",
      musicnbrain: "MusicNBrain",
    },
    footer: {
      lessonPages: "Lesson pages",
      googleBusiness: "Reviews on Google",
    },
    googleReviews: {
      eyebrow: "Verified on Google",
      headline: "5-star rated studio",
      body:
        "Read public reviews from students and parents in the San Jose area—then book a free trial to see if the fit is right.",
      cta: "See reviews on Google",
      ratingSummary: "{rating} out of 5 · {count} reviews",
      opensInNewTab: "Opens your Google Business profile in a new tab.",
    },
    hero: {
      title: "Private piano lessons in San Jose — weekly progress you can hear",
      subtitle:
        "San Jose piano teacher for adults, adult beginners, restarters, and kids 5+: in-person near San Jose & Sunnyvale or online. Private 1:1 only—clear weekly plans, strong technique, and musicality. Free trial; most inquiries get a same-day reply.",
      primaryCta: "Book a free trial lesson",
      secondaryCta: "View performances",
      ctaNote: "Fast reply: most families get a response within the same day.",
      lessonsPageLink: "San Jose piano lessons (private 1:1, in-person & online)",
      adultLessonsPageLink: "Private adult piano lessons in San Jose",
      teacherPageLink: "San Jose piano teacher for adults & kids",
      browseAllLessonTypes: "Browse all lesson types",
      stats: [
        { value: "8+ years teaching", label: "Engineer turned pianist" },
        { value: "60+ students", label: "Personally coached" },
        { value: "2k followers", label: "Bilibili followers" },
        { value: "1:1 only", label: "No group classes" },
      ],
      video: {
        title: "Studio performance preview",
        embedUrl:
          "https://player.bilibili.com/player.html?bvid=BV1nYXPYHEQr&autoplay=0",
        caption: "Watch a short performance to see what you will learn.",
      },
    },
    highlights: [
      {
        title: "Goal-oriented practice, not time-counting",
        description:
          "Adults get a divide-and-conquer practice system: each session targets one small component (rhythm, fingering, voicing, or phrasing) so progress stays measurable even with a busy schedule.",
      },
      {
        title: "Adults build musical thinking from week one",
        description:
          "Lessons include practical theory and aesthetic decisions early, so students do more than mechanical replay. The goal is intelligent sound and clear musical intent, not just correct notes.",
      },
      {
        title: "Real progression you can hear over months",
        description:
          "One adult student in her 40s moved from struggling with early Thompson pieces to performing Tchaikovsky's The New Doll and a Schubert Waltz in under two years.",
      },
    ],

    about: {
      title: "About the teacher",
      summaryBullets: [
        "San Jose piano teacher · 8+ years teaching · 60+ students coached · 1:1 only (no group classes)",
        "Adult beginners & restarters through advancing kids; auditions and exams when that fits your goals",
        "Classical training with a structured, engineer-style approach to practice and problem solving",
      ],
      body:
        "Software engineer turned pianist, with 20+ years of classical training under concert pianists, 8+ years of teaching experience, and 60+ students personally coached, I specialize in one-on-one piano lessons tailored to each individual’s goals, learning style, and unique musical voice. I never follow one-size-fits-all methods — and I never teach group classes. Quality always comes first, and every customized lesson is designed to ensure meaningful progress without sacrificing artistic identity.\n\nTrained under renowned Bay Area pianist Erna Gulabyan (San Francisco Conservatory) and Frank Levy (Stanford University), I continue to maintain a close relationship with them, grounding my teaching in both tradition and deep musical insight. As a professional software engineer with 4 years of Silicon Valley experience, I also bring a problem-solving mindset that helps students tackle technical and musical challenges with clarity, structure, and creativity.",
    },

    services: {
      title: "Lesson options",
      items: [
        "Private piano lessons in San Jose (one student, one teacher—no group classes)",
        "Weekly or bi-weekly schedules",
        "In-person across San Jose, Sunnyvale & South Bay, plus online",
        "Exam prep, auditions, and competitions",
      ],
    },
    sections: {
      performancesTitle: "Example performances",
      performancesDescription:
        "I am honored to have 2k followers on Bilibili. Follow me to see more performances and videos.",
      testimonialsTitle: "Student and parent testimonials",
      aboutTitle: "Meet your teacher",
      aboutCta: "Read the full bio",
      approachTitle: "What you get in every lesson",
      lessonHubTitle: "Choose your lesson type",
      lessonHubDescription:
        "Private lessons in San Jose and nearby South Bay cities—not sure where to start? Pick the page that matches you; each one spells out format, neighborhoods served, and how to book a free trial.",
      lessonHubCardCta: "Learn more",
      partnershipTitle: "Partnership with MusicNBrain",
      partnershipDescription:
        "Our studio proudly supports MusicNBrain's mission to help young performers grow through real performance opportunities and community impact.",
      partnershipBoardMemberTitle: "Board member introduction",
      partnershipBoardMemberBody:
        "I serve as one of the board members at MusicNBrain, and I bring that same nonprofit service mindset into every lesson, recital, and student pathway we build together.",
      partnershipCta: "Visit MusicNBrain",
      readMoreDetails: "Read full detail",
      midPageTrialTitle: "Ready to try a lesson?",
      landingPartnerFooter:
        "Nonprofit partner MusicNBrain supports youth performances and community pathways for students.",
    },
    trial: {
      title: "Book a free trial lesson",
      description:
        "Choose a time that works for your family. You'll receive a confirmation email after submitting.",
      requestTitle: "Prefer to request a time?",
      requestDescription:
        "Send a quick note with your availability and goals. I'll confirm or suggest times by email.",
      requestCta: "Send a trial request",
    },
    contact: {
      title: "Contact the studio",
      description:
        "Ask about availability, rates, or the best plan for your student.",
      submitLabel: "Send inquiry",
      successMessage: "Thanks! Your message has been received.",
    },
    testimonials: [
      {
        quote:
          "Eric is a fantastic teacher! I have been learning from Eric for about 9 months now and have absolutely loved it! He caters to my individual needs and plans every lesson meticulously and is very focused on mixing good technique with musical sense.",
        name: "Angad Singh",
      },
      {
        quote:
          "Eric is a fantastic piano teacher for our son, who started with no prior experience. He is very patient, flexible, and encouraging, which has made learning piano a truly positive experience.",
        name: "Thunyarat “Bam” Amornpetchkul",
      },
      {
        quote:
          "Eric has many great insights on both techniques and musicality. He is also a patient instructor. 10/10.",
        name: "Yudan Guo",
      },
      {
        quote:
          "Epic teacher! With great passion to both beginners and intermediate students.",
        name: "Jeremy Lin",
      },
    ],
    seo: {
      title:
        "Private Piano Lessons San Jose | San Jose Piano Teacher | Adults & Kids | Trial",
      description:
        "Private piano lessons in San Jose and the South Bay: San Jose piano teacher for adults, beginners, and kids 5+ (Sunnyvale, Santa Clara, Cupertino, Campbell, and nearby). In-person or online. Weekly plans, technique & musicality. Free trial; same-day reply on most inquiries.",
      keywords:
        "piano lessons san jose, san jose piano lessons, piano teacher san jose, piano teachers san jose, in person piano lessons near me, private piano lessons for adults, piano lessons near me for adults, piano lessons for adults san jose, piano lessons for beginners sunnyvale, sunnyvale piano lessons, piano lessons south bay, piano lessons bay area, piano lessons for beginner, piano lessons for adult beginner, online piano lessons, affordable piano lessons, South Bay piano lessons, beginner piano lessons, adult piano lessons, piano classes, piano classes san jose",
      breadcrumbLabels: {
        "piano-lessons-san-jose": "San Jose piano lessons",
        "adult-piano-lessons": "Adult piano lessons",
        "kids-piano-lessons": "Kids piano lessons",
        "online-piano-lessons": "Online piano lessons",
        "piano-teacher-san-jose": "Piano teacher in San Jose",
      },
      pages: {
        trial: {
          title:
            "Book a Free Piano Trial | San Jose & South Bay | Online Option",
          description:
            "Reserve a free 1:1 trial with Eric Liu Piano Studio—in San Jose, nearby South Bay cities, or online. No credit card. See teaching style, ask questions, and pick a weekly time that fits.",
        },
        about: {
          title:
            "Eric Liu | Piano Teacher San Jose & Sunnyvale | Private Lessons Adults & Kids",
          description:
            "Meet Eric Liu: private in-person and online piano lessons from San Jose—serving Sunnyvale, Santa Clara, and the South Bay. Adult beginners, restarters, and kids 5+. Classical depth, structured practice, bilingual support. Read the full story.",
        },
        contact: {
          title:
            "Contact San Jose Piano Studio | Rates, Schedule & Free Trial",
          description:
            "Message Eric Liu Piano Studio about availability, tuition, or the best lesson format. In-person San Jose / South Bay or online. Most families hear back the same day.",
        },
      },
    },
  },
  zh: {
    languageLabel: "中文",
    nav: {
      home: "首页",
      about: "关于",
      trial: "免费试听",
      contact: "联系",
      lessonsMenu: "课程类型",
      journal: "学琴笔记",
      musicnbrain: "MusicNBrain",
    },
    footer: {
      lessonPages: "课程页面",
      googleBusiness: "Google 评价与商家信息",
    },
    googleReviews: {
      eyebrow: "Google 真实评价",
      headline: "五星好评工作室",
      body:
        "欢迎查看圣何塞及周边学琴家庭在 Google 上的公开评价；也可先预约免费试听，亲自感受是否合适。",
      cta: "在 Google 查看评价",
      ratingSummary: "{rating} 分（满分 5）· {count} 条评价",
      opensInNewTab: "将在新标签页打开 Google 商家资料。",
    },
    hero: {
      title: "圣何塞私人钢琴课：把练习变成看得见的进步",
      subtitle:
        "圣何塞钢琴老师：面向成人初学者、重拾者与儿童（5岁+）的一对一私教；圣何塞、森尼维尔及周边线下，亦可线上。每周清晰作业、扎实技巧与可感知的音乐表现。免费试听；多数咨询当天回复。",
      primaryCta: "预约免费试听",
      secondaryCta: "观看演出视频",
      ctaNote: "快速回复：大多数家庭当天即可收到答复。",
      lessonsPageLink: "圣何塞钢琴课程（一对一私教 · 线下与线上）",
      adultLessonsPageLink: "圣何塞成人钢琴私教",
      teacherPageLink: "圣何塞钢琴老师（成人与儿童）",
      browseAllLessonTypes: "查看全部课程类型",
      stats: [
        { value: "7年以上", label: "教学经验" },
        { value: "50+学生", label: "亲自指导" },
        { value: "2000关注", label: "哔哩哔哩" },
        { value: "仅一对一", label: "不设团课" },
      ],
      video: {
        title: "演奏与教学预览",
        embedUrl:
          "https://player.bilibili.com/player.html?bvid=BV1nYXPYHEQr&autoplay=0",
        caption: "观看一段演奏，了解你将学到什么。",
      },
    },
    highlights: [
      {
        title: "以目标为中心，而不是只堆练习时长",
        description:
          "成人采用“分而治之”的练习策略：每次只攻克一个小模块（节奏、指法、声部或乐句），在忙碌生活中也能持续推进。",
      },
      {
        title: "从第一周开始建立音乐理解",
        description:
          "课程会尽早加入实用乐理与审美判断，不是机械按键。目标是“有思考的声音”，而不只是把音弹对。",
      },
      {
        title: "几个月内能听见的真实进步",
        description:
          "一位40多岁的护士学生，从 Thompson 初级曲目吃力起步，在不到两年内完成了《新娃娃舞曲》和舒伯特圆舞曲。",
      },
    ],
    about: {
      title: "关于老师",
      summaryBullets: [
        "圣何塞钢琴老师 · 7年以上教学 · 50+学生亲自指导 · 仅一对一（不设团课）",
        "成人初学者与重拾者、儿童与进阶学员；可按目标准备考级、比赛与试音",
        "古典训练背景 + 结构化练习方法，帮助稳定突破技术与音乐难点",
      ],
      body:
        "拥有超过7年的教学经验，并亲自指导过50多位学生，我专注于一对一钢琴课，针对每位学生的目标、学习方式与独特的音乐表达进行定制。我不采用一刀切的教学方法，也从不且永远不会教授团体课。质量始终第一，每一节定制课程都以不牺牲艺术个性为前提，确保扎实而有意义的进步。\n\n我曾师从旧金山音乐学院湾区钢琴家Erna Gulabyan和斯坦福大学的Frank Levy，并一直与他们保持密切联系，使我的教学扎根于传统与深厚的音乐洞见之中。作为一名拥有4年硅谷经验的专业软件工程师，我也带来系统的解决问题思维，帮助学生以清晰、结构化且富有创造力的方式攻克技术与音乐难点。",
    },
    services: {
      title: "课程选项",
      items: [
        "圣何塞私人钢琴课（仅一对一，不设团课）",
        "每周或隔周安排",
        "圣何塞、森尼维尔及南湾线下，亦可线上",
        "考试准备、试音与比赛辅导",
      ],
    },
    sections: {
      performancesTitle: "示例演出",
      performancesDescription:
        "我在哔哩哔哩拥有约2000名关注者，欢迎关注查看更多演出与视频。",
      testimonialsTitle: "学生与家长评价",
      aboutTitle: "认识老师",
      aboutCta: "查看完整介绍",
      approachTitle: "每节课您会收获什么",
      lessonHubTitle: "选择适合您的课程",
      lessonHubDescription:
        "圣何塞与南湾私人钢琴课：不确定从哪开始？按您的情况选择页面—每种课程都会说明授课方式、服务区域以及如何预约免费试听。",
      lessonHubCardCta: "了解更多",
      partnershipTitle: "与 MusicNBrain 的合作",
      partnershipDescription:
        "我们的工作室长期支持 MusicNBrain 的使命：通过真实舞台与社区参与，帮助年轻演奏者持续成长。",
      partnershipBoardMemberTitle: "理事会成员介绍",
      partnershipBoardMemberBody:
        "我本人也是 MusicNBrain 的理事会成员之一，并将同样的公益服务理念带入每一节课程、每一次汇演与每一位学生的发展路径中。",
      partnershipCta: "访问 MusicNBrain 官网",
      readMoreDetails: "展开详情",
      midPageTrialTitle: "想先试听一节课？",
      landingPartnerFooter:
        "公益合作伙伴 MusicNBrain：支持青少年舞台实践与社区音乐项目。",
    },
    trial: {
      title: "预约免费试听课",
      description: "选择适合您家庭的时间，提交后会收到确认邮件。",
      requestTitle: "想先提交时间请求？",
      requestDescription:
        "告诉我您的时间安排与学习目标，我会通过邮件确认或推荐时间。",
      requestCta: "提交试听请求",
    },
    contact: {
      title: "联系工作室",
      description: "欢迎咨询时间安排、费用或最适合学生的计划。",
      submitLabel: "发送咨询",
      successMessage: "谢谢！我们已收到您的留言。",
    },
    testimonials: [
      {
        quote:
          "Eric是一位非常优秀的老师！我跟他学习了约9个月，非常喜欢他的课程。他会根据我的个人需求量身规划每节课，并非常注重把扎实技术与音乐感结合起来。",
        name: "Angad Singh",
      },
      {
        quote:
          "Eric是一位出色的钢琴老师。我的孩子之前没有任何基础，他非常耐心、灵活且善于鼓励，让学习钢琴成为一段非常积极的体验。",
        name: "Thunyarat “Bam” Amornpetchkul",
      },
      {
        quote:
          "Eric在技巧与音乐性上都有很多独到见解，也是一位非常有耐心的老师。满分推荐。",
        name: "Yudan Guo",
      },
      {
        quote:
          "非常棒的老师！对初学者与中级学员都充满热情。",
        name: "Jeremy Lin",
      },
    ],
    seo: {
      title:
        "圣何塞私人钢琴课 | 圣何塞钢琴老师 | 成人与儿童 | 免费试听",
      description:
        "圣何塞私人钢琴课与南湾一对一教学：圣何塞钢琴老师，面向成人初学者、重拾者与儿童 5+（森尼维尔、圣克拉拉、库比蒂诺、坎贝尔等）。线下或线上；每周清晰作业，技巧与音乐表现并重。免费试听；多数咨询当天回复。",
      keywords:
        "圣何塞钢琴课, 森尼维尔钢琴课, 南湾钢琴课, 湾区钢琴课, 圣何塞钢琴老师, 成人钢琴私教, 钢琴老师, 成人初学者, 钢琴课, 线上钢琴课, 一对一钢琴课, 钢琴老师推荐, 实惠钢琴课",
      breadcrumbLabels: {
        "piano-lessons-san-jose": "圣何塞钢琴课",
        "adult-piano-lessons": "成人钢琴课",
        "kids-piano-lessons": "儿童钢琴课",
        "online-piano-lessons": "线上钢琴课",
        "piano-teacher-san-jose": "圣何塞钢琴老师",
      },
      pages: {
        trial: {
          title: "预约免费钢琴试听 | 圣何塞与南湾 | 可线上",
          description:
            "预约 Eric Liu 钢琴工作室免费一对一试听：圣何塞/南湾线下或线上。无需信用卡。了解教学风格、沟通目标，并选择合适上课时间。",
        },
        about: {
          title: "Eric Liu | 圣何塞钢琴老师 | 成人、儿童与初学者",
          description:
            "了解 Eric Liu：湾区一对一钢琴私教，成人重拾、认真爱好者与儿童 5+。古典功底、结构化练习与中英文沟通支持。",
        },
        contact: {
          title: "联系钢琴课 | 圣何塞 | 费用、时间与试听",
          description:
            "咨询课程安排、学费或最适合的上课方式（线下/线上）。多数家庭当日收到回复。",
        },
      },
    },
  },
};
