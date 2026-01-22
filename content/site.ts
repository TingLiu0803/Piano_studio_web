export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const siteConfig = {
  studioName: "Eric Liu Piano Studio",
  ownerName: "Eric Liu",
  city: "San Jose",
  region: "CA",
  country: "US",
  serviceArea: "San Jose and the SF Bay Area",
  lessonFormats: ["In-person", "Online"],
  ageRange: "Ages 5+",
  pricingNote: "Contact for rates",
  email: "mr.tingliu@gmail.com",
  phone: "650-575-7300",
  addressLine: "San Jose, CA 95110",
  timezone: "America/Los_Angeles",
  bookingUrl: "https://cal.com/your-studio/free-trial",
  bilibiliVideos: [
    {
      title: "Liszt Sonata In B Minor (Excerpt)",
      embedUrl:
        "https://player.bilibili.com/player.html?bvid=BV1nYXPYHEQr&autoplay=0",
    },
    {
      title: "Bach Partita No. 6 in E Minor (Excerpt)",
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
    },
    hero: {
      title: "Piano lessons in Bay Area for confident, intelligent, and tasteful playing",
      subtitle: "Piano Lessons Reimagined for Silicon Valley Minds",
      primaryCta: "Book a free trial lesson",
      secondaryCta: "View performances",
    },
    highlights: [
      {
        title: "Tailored curriculum",
        description:
          "Lesson plans adapted to each student's goals, learning style, and pace.",
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
        "With over 7 years of experience and more than 50 students personally coached, I specialize in one-on-one piano lessons tailored to each individual's goals, learning style, and unique musical voice. I never follow one-size-fits-all methods -- and I never and will never teach group classes. Quality always comes first, and every customized lesson is designed to ensure meaningful progress without sacrificing artistic identity.\n\nTrained under renowned Bay Area pianist Erna Gulabyan at the San Francisco Conservatory and Frank Levy at Standford University, I continue to maintain a close relationship with them, grounding my teaching in both tradition and deep musical insight. As a professional software engineer with 4 years of Silicon Valley experience, I also bring a problem-solving mindset that helps students tackle technical and musical challenges with clarity, structure, and creativity.",
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
    },
    trial: {
      title: "Book a free trial lesson",
      description:
        "Choose a time that works for your family. You'll receive a confirmation email after submitting.",
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
        "Eric Liu Piano Studio | Piano lessons in Bay Area for confident, intelligent, and tasteful playing",
      description:
        "Private piano lessons in San Jose and the SF Bay Area. Bilingual one-on-one instruction with a focus on technique, artistry, and confidence.",
      keywords:
        "piano lessons, piano teacher, private piano lessons, music lessons",
    },
  },
  zh: {
    languageLabel: "中文",
    nav: {
      home: "首页",
      about: "关于",
      trial: "免费试听",
      contact: "联系",
    },
    hero: {
      title: "湾区钢琴课，培养自信、理性与有品位的演奏",
      subtitle: "为硅谷思维重新设计的钢琴课程",
      primaryCta: "预约免费试听",
      secondaryCta: "观看演出视频",
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
    },
    trial: {
      title: "预约免费试听课",
      description: "选择适合您家庭的时间，提交后会收到确认邮件。",
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
        "Eric Liu Piano Studio | 湾区钢琴课，培养自信、理性与有品位的演奏",
      description:
        "圣何塞及旧金山湾区私人钢琴课程。一对一双语教学，注重技巧、艺术性与自信。",
      keywords: "钢琴课, 钢琴老师, 私人钢琴课, 音乐课",
    },
  },
};
