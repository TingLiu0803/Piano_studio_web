export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  studioName: "Eric Liu Piano Studio",
  ownerName: "Eric Liu",
  city: "San Jose",
  region: "CA",
  country: "US",
  serviceArea: "San Jose and the SF Bay Area",
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
  email: "mr.tingliu@gmail.com",
  phone: "650-575-7300",
  addressLine: "San Jose, CA 95110",
  timezone: "America/Los_Angeles",
  geo: {
    latitude: 37.3382,
    longitude: -121.8863,
  },
  bookingUrl:
    process.env.NEXT_PUBLIC_BOOKING_URL ??
    "https://calendar.app.google/zF9wtvjGaaLZ76dS7",
  bookingProvider: "Google Calendar Appointment Schedule",
  /** Public Google Business Profile or Maps place URL (set NEXT_PUBLIC_GOOGLE_BUSINESS_URL in production). */
  googleBusinessProfileUrl:
    process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL ??
    "https://share.google/GOmPCiC3Zgpe8hAav",
  socialLinks: [] as string[],
  // Update these when you get new reviews on Google Business Profile
  reviews: {
    averageRating: 5, // Average rating (all your reviews are 5 stars)
    totalCount: 3, // Total number of reviews - UPDATE THIS as you get more reviews
  },
  bilibiliVideos: [
    {
      title: "Liszt Sonata In B Minor (Excerpt)",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1nYXPYHEQr&autoplay=0",
    },
    {
      title: "Bach Partita No.1 in B-Flat Major (Excerpt)",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1Pb4y1n7Uc&autoplay=0",
    },
    {
      title: "Beethoven Piano Sonata No.28, Op.101 1st movement",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1gqSEYNEtq&autoplay=0",
    },
    {
      title: "Mozart Sonata K. 576, 2nd movement",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1GXkNBrEUk&autoplay=0",
    }
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
    },
    footer: {
      lessonPages: "Lesson pages",
      googleBusiness: "Reviews on Google",
    },
    hero: {
      title: "Piano lessons in Bay Area for confident, intelligent, and tasteful playing",
      subtitle: "Conservatory-level pianist who made it as an adult. Affordable in depth piano lessons in San Jose, SF Bay Area, South Bay & online.",
      primaryCta: "Book a free trial lesson",
      secondaryCta: "View performances",
      ctaNote: "Fast reply: most families get a response within the same day.",
      lessonsPageLink: "Piano lessons in San Jose & South Bay",
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
        title: "I made it as an adult — so you can too",
        description:
          "I became conservotory level advanced as an adult, so I specialize in helping adults overcome childhood regret and finally play for real.",
      },
      {
        title: "Technique and true understanding of music language",
        description:
          "Hyper-focus on the balance between technique, musicality, and master the low level code of music",
      },
      {
        title: "Bilingual instruction",
        description:
          "English and Chinese support for students and parents.",
      },
    ],

    about: {
      title: "About the teacher",
      body:
        "Software engineer turned pianist, with 20+ years of classical training under concert pianists, 8+ years of teaching experience, and 60+ students personally coached, I specialize in one-on-one piano lessons tailored to each individual’s goals, learning style, and unique musical voice. I never follow one-size-fits-all methods — and I never teach group classes. Quality always comes first, and every customized lesson is designed to ensure meaningful progress without sacrificing artistic identity.\n\nTrained under renowned Bay Area pianist Erna Gulabyan (San Francisco Conservatory) and Frank Levy (Stanford University), I continue to maintain a close relationship with them, grounding my teaching in both tradition and deep musical insight. As a professional software engineer with 4 years of Silicon Valley experience, I also bring a problem-solving mindset that helps students tackle technical and musical challenges with clarity, structure, and creativity.",
    },

    services: {
      title: "Lesson options",
      items: [
        "Private one-on-one lessons",
        "Weekly or bi-weekly schedules",
        "In-person and online formats",
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
      approachTitle: "What makes the studio different",
      lessonHubTitle: "Choose your lesson type",
      lessonHubDescription:
        "Not sure where to start? Pick the page that matches you—each one explains format, areas served, and how to book a free trial.",
      lessonHubCardCta: "Learn more",
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
    ],
    seo: {
      title:
        "Piano Lessons San Jose & South Bay | In-Person & Online 1:1 | Free Trial",
      description:
        "In-person piano lessons in San Jose and the South Bay—plus online. Private 1:1 lessons for adults, adult beginners, and kids 5+. Free trial, no credit card. Book today.",
      keywords:
        "piano lessons san jose, san jose piano lessons, piano teacher san jose, piano teachers san jose, in person piano lessons near me, private piano lessons for adults, piano lessons for adults near me, piano lessons south bay, piano lessons bay area, piano lessons for beginner, piano lessons for adult beginner, online piano lessons, affordable piano lessons, South Bay piano lessons, beginner piano lessons, adult piano lessons, cheap piano lessons near me, piano classes san jose",
      breadcrumbLabels: {
        "piano-lessons-san-jose": "Piano lessons in San Jose",
        "adult-piano-lessons": "Adult piano lessons",
        "kids-piano-lessons": "Kids piano lessons",
        "online-piano-lessons": "Online piano lessons",
        "piano-teacher-san-jose": "Piano teacher in San Jose",
      },
      pages: {
        trial: {
          title:
            "Free Trial Piano Lesson San Jose | In-Person or Online | South Bay",
          description:
            "Book a free 1:1 trial in San Jose or online. In-person South Bay piano lessons or remote lessons for busy adults. No credit card. Beginners and adult beginners welcome.",
        },
        about: {
          title:
            "About Eric Liu | Piano Teacher San Jose | Adult Beginners & Kids 5+",
          description:
            "Conservatory-level pianist; advanced playing achieved as an adult. Private 1:1 piano lessons in San Jose & Bay Area—adults, kids, in-person or online. 8+ years teaching, 60+ students coached.",
        },
        contact: {
          title:
            "Contact Piano Lessons San Jose | Free Trial, Rates & Availability",
          description:
            "Contact Eric Liu Piano Studio in San Jose. Ask about in-person or online lessons, free trial, rates, and scheduling for adults, kids, and beginners. Fast reply—most inquiries same day.",
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
    },
    footer: {
      lessonPages: "课程页面",
      googleBusiness: "Google 评价与商家信息",
    },
    hero: {
      title: "湾区钢琴课，培养自信、理性与有品位的演奏",
      subtitle: "为硅谷思维重新设计的钢琴课程",
      primaryCta: "预约免费试听",
      secondaryCta: "观看演出视频",
      ctaNote: "快速回复：大多数家庭当天即可收到答复。",
      lessonsPageLink: "圣何塞与南湾钢琴课程",
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
        title: "量身定制课程",
        description: "根据学生目标、学习方式与节奏定制课程计划。",
      },
      {
        title: "技术与音乐语言的真正理解",
        description: "聚焦技术与音乐性的平衡，并掌握音乐的底层语言。",
      },
      {
        title: "双语教学",
        description: "提供中文与英文沟通，方便家长了解学习进度。",
      },
    ],
    about: {
      title: "关于老师",
      body:
        "拥有超过7年的教学经验，并亲自指导过50多位学生，我专注于一对一钢琴课，针对每位学生的目标、学习方式与独特的音乐表达进行定制。我不采用一刀切的教学方法，也从不且永远不会教授团体课。质量始终第一，每一节定制课程都以不牺牲艺术个性为前提，确保扎实而有意义的进步。\n\n我曾师从旧金山音乐学院湾区钢琴家Erna Gulabyan和斯坦福大学的Frank Levy，并一直与他们保持密切联系，使我的教学扎根于传统与深厚的音乐洞见之中。作为一名拥有4年硅谷经验的专业软件工程师，我也带来系统的解决问题思维，帮助学生以清晰、结构化且富有创造力的方式攻克技术与音乐难点。",
    },
    services: {
      title: "课程选项",
      items: [
        "一对一私人课程",
        "每周或隔周安排",
        "线下与线上授课",
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
      approachTitle: "课程有什么不同",
      lessonHubTitle: "选择适合您的课程",
      lessonHubDescription:
        "不确定从哪开始？按您的情况选择页面—每种课程都会说明授课方式、服务区域以及如何预约免费试听。",
      lessonHubCardCta: "了解更多",
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
        name: "西洛杉矶家长",
      },
      {
        quote:
          "Eric是一位出色的钢琴老师。我的孩子之前没有任何基础，他非常耐心、灵活且善于鼓励，让学习钢琴成为一段非常积极的体验。",
        name: "成年学生",
      },
    ],
    seo: {
      title:
        "圣何塞钢琴课 · 南湾湾区 | 线下与线上一对一 | 免费试听",
      description:
        "圣何塞与南湾线下钢琴课，亦提供在线课程。成人与成人初学者、儿童（5岁+）一对一私教。免费试听，无需信用卡。",
      keywords:
        "圣何塞钢琴课, 南湾钢琴课, 湾区钢琴课, 圣何塞钢琴老师, 钢琴老师, 成人钢琴课, 成人初学者, 钢琴课, 线上钢琴课, 一对一钢琴课, 钢琴老师推荐, 实惠钢琴课",
      breadcrumbLabels: {
        "piano-lessons-san-jose": "圣何塞钢琴课程",
        "adult-piano-lessons": "成人钢琴课",
        "kids-piano-lessons": "儿童钢琴课",
        "online-piano-lessons": "线上钢琴课",
        "piano-teacher-san-jose": "圣何塞钢琴老师",
      },
      pages: {
        trial: {
          title: "免费试听钢琴课 | 圣何塞南湾 | 线下或线上",
          description:
            "预约圣何塞或线上免费一对一试听。南湾线下钢琴课或远程课程。无需信用卡。初学者与成人初学者欢迎。",
        },
        about: {
          title: "关于 Eric Liu | 圣何塞钢琴老师 | 成人与儿童一对一",
          description:
            "音乐学院水平演奏；成年后系统学习达到高阶。圣何塞与湾区私人钢琴课，成人、儿童、线下或线上一对一。8年以上教学经验。",
        },
        contact: {
          title: "联系钢琴课预约 | 圣何塞 | 试听与费用",
          description:
            "联系 Eric Liu 钢琴工作室：咨询线下/线上课程、免费试听、费用与时间安排。多数咨询当日回复。",
        },
      },
    },
  },
};
