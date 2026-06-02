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

export type LandingRelatedLink = {
  href: string;
  label: string;
};

export type LandingObjection = {
  question: string;
  answer: string;
};

export type LandingNeighborhoods = {
  heading: string;
  body: string;
  bullets?: string[];
};

export type LandingPageData = {
  seo: { title: string; description: string };
  h1: string;
  intro: string;
  /**
   * 2-4 sentence answer-first summary used in the "Quick answer" speakable
   * block above the fold. Optimized for AI search citation and Google
   * featured-snippet eligibility.
   */
  quickAnswer: string;
  /**
   * Short, concrete facts about the lesson type. Rendered as a
   * "Facts at a glance" panel and consumed by AI engines as quotable claims.
   */
  facts: string[];
  /** Neighborhood / service-area depth (helps local pack + AI extraction). */
  neighborhoods?: LandingNeighborhoods;
  /**
   * Short objection-handling block: question + direct answer. Each item is
   * rendered with a stable anchor ID so search engines can deep-link.
   */
  commonObjections?: LandingObjection[];
  /** Closing call-to-action paragraph rendered just above the trial CTA. */
  nextStep?: string;
  /** Related-reading internal links rendered at the bottom of the page. */
  relatedLinks?: LandingRelatedLink[];
  sections: LandingSection[];
};

export const landingPages: Record<Locale, Record<LandingPageSlug, LandingPageData>> =
  {
    en: {
      "piano-lessons-san-jose": {
        seo: {
          title:
            "Piano Lessons San Jose & Sunnyvale | In-Person Near Me + Online | 1:1",
          description:
            "In-person piano lessons near San Jose and Sunnyvale, plus online: private 1:1 for kids 5+, adults, and beginners. If you searched piano classes or a local piano teacher, start here—weekly plans, technique & musicality. Free trial; most inquiries same day.",
        },
        h1: "San Jose piano lessons — private, one-on-one",
        intro:
          "Private piano lessons in San Jose and the South Bay: if you are searching for piano lessons in San Jose, piano lessons for beginners in Sunnyvale, piano classes near Campbell, or in-person piano lessons near me with a teacher who only does one-on-one, this page is the clearest summary. Lessons are in-person in San Jose and nearby communities, or online when that fits your schedule.",
        quickAnswer:
          "Eric Liu Piano Studio offers private 1:1 piano lessons in San Jose and across the South Bay (Sunnyvale, Santa Clara, Cupertino, Campbell, Mountain View, Palo Alto, Los Gatos, Saratoga, Milpitas) for adults, adult beginners, restarters, and kids ages 5+. Lessons are taught in-person near San Jose or live online; a free trial lesson is available with no credit card.",
        facts: [
          "Location: based in San Jose, California; in-person and online lessons",
          "Format: private 1:1 only — no group classes",
          "Ages: 5 and up — kids, teens, adults, and adult beginners",
          "Languages: English and Mandarin Chinese",
          "Trial: free trial lesson, no credit card required",
          "Reply time: most inquiries get a same-day reply",
        ],
        neighborhoods: {
          heading: "Neighborhoods and commute notes",
          body:
            "Students travel to lessons from across the South Bay. San Jose families come from Willow Glen, Almaden Valley, and Cambrian Park. Sunnyvale and Santa Clara families typically reach the studio in under 20 minutes via 280 or 101. Cupertino, Mountain View, and Palo Alto students often combine lessons with after-school or weekend routines. Online lessons work well for Los Gatos, Saratoga, Campbell, and Milpitas families who prefer to convert commute time into practice time.",
          bullets: [
            "San Jose — Willow Glen, Almaden, Cambrian, Cambrian Park, Rose Garden",
            "Sunnyvale & Santa Clara — quick reach via 280 or 101",
            "Cupertino, Mountain View, Palo Alto — weekend or after-school slots common",
            "Los Gatos, Saratoga, Campbell, Milpitas — online lessons often preferred",
          ],
        },
        commonObjections: [
          {
            question: "I have never taken a piano lesson — is that okay?",
            answer:
              "Yes. Complete beginners are a core part of the studio. The first lesson is a structured diagnostic: hand position, the first five notes, and one small assignment you can practice at home that week.",
          },
          {
            question: "I do not have an acoustic piano at home.",
            answer:
              "A full-size, fully-weighted 88-key digital piano is enough to begin. We can recommend specific Yamaha, Kawai, and Roland models during your trial.",
          },
          {
            question: "How quickly can we start lessons?",
            answer:
              "Most new students complete a free trial within one to two weeks and start weekly lessons the same or following week, depending on schedule openings.",
          },
        ],
        nextStep:
          "The fastest way to evaluate fit is the free trial lesson — you get a real teaching session, a small assignment for the week, and clear pricing before committing.",
        relatedLinks: [
          { href: "/adult-piano-lessons", label: "Private adult piano lessons" },
          { href: "/kids-piano-lessons", label: "Kids piano lessons (ages 5+)" },
          { href: "/online-piano-lessons", label: "Online piano lessons" },
          { href: "/piano-teacher-san-jose", label: "About the San Jose piano teacher" },
        ],
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
              "Students come from San Jose, Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, Milpitas, and across the SF Bay Area—including many looking for piano lessons near me for adults or piano lessons for beginners in Sunnyvale. Online piano lessons are available for busy adults and families who prefer remote learning.",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "Private Piano Lessons for Adults | San Jose & Sunnyvale | Near Me + Online",
          description:
            "Piano lessons near me for adults in San Jose, Sunnyvale, and the South Bay: private 1:1 for beginners, restarters, hobbyists, and advanced players. In-person or online. Patient, structured coaching—free trial, no credit card.",
        },
        h1: "Private piano lessons for adults in San Jose and the Bay Area",
        intro:
          "Yes, adults can absolutely start piano from zero and make clear progress with a structured plan. If you searched for private adult piano lessons in San Jose or nearby, this page answers the key questions directly: who this is for, how long progress takes, what to practice, and whether you need an instrument at home.",
        quickAnswer:
          "Private piano lessons for adults at Eric Liu Piano Studio are 1:1 only, taught in-person in San Jose and the South Bay or live online. Adult beginners and restarters typically hear meaningful progress within 2-3 months of practicing 20-40 minutes a day, 5 days a week, and most students stay in lessons for 2+ years. A free trial lesson is available, no credit card required.",
        facts: [
          "Adult beginners and restarters are a core part of the studio",
          "Recommended practice: 20-40 minutes a day, 5 days a week",
          "First measurable progress milestone: 2-3 months of consistent practice",
          "Long-term retention: ~90% of students stay in lessons for 2+ years",
          "Equipment needed to start: 88-key fully-weighted digital piano (no acoustic required)",
          "Free trial lesson, no credit card",
        ],
        neighborhoods: {
          heading: "Adult students by neighborhood",
          body:
            "Adult students at the studio come from across the South Bay: software engineers in Sunnyvale and Mountain View, healthcare workers in San Jose and Santa Clara, professors and graduate students in Palo Alto, and parents in Cupertino, Los Gatos, and Saratoga who finally want to learn alongside their kids. Online lessons are popular with adults who travel or work late shifts.",
          bullets: [
            "Tech workers — Sunnyvale, Mountain View, Cupertino, Palo Alto",
            "Healthcare workers — San Jose, Santa Clara, Campbell",
            "Parents learning alongside kids — Cupertino, Saratoga, Los Gatos",
            "Travel-heavy schedules — online lessons preferred",
          ],
        },
        commonObjections: [
          {
            question: "Is 30 (or 40, 50, 60) too late to start piano?",
            answer:
              "No. Adults can build strong technique and reach intermediate or advanced repertoire at any starting age. Consistency dominates starting age — the studio has students who began at 40+ now performing Schubert, Tchaikovsky, and Chopin pieces.",
          },
          {
            question: "I tried lessons as a kid and quit — will it be different now?",
            answer:
              "Adults often progress faster than kids on cognitive tasks (reading, theory, phrasing) because they bring focus and goal clarity. The lessons are structured for adult schedules and adult goals, not method-book mileage.",
          },
          {
            question: "How long until I can play something I actually like?",
            answer:
              "Most adult beginners can play a real, recognizable piece musically by month 5-6. Intermediate repertoire (Chopin Preludes, easier Mozart, Bach minuets) usually becomes realistic in year 1-2.",
          },
          {
            question: "Can I practice efficiently with a busy job?",
            answer:
              "Yes. The studio teaches a divide-and-conquer practice framework — short, focused 25-minute sessions that solve one named problem per session, rather than long unfocused playthroughs.",
          },
        ],
        nextStep:
          "Book a free trial lesson — you will play a small piece, get one specific assignment for the week, and leave with clear pricing and scheduling.",
        relatedLinks: [
          { href: "/online-piano-lessons", label: "Online piano lessons" },
          { href: "/piano-teacher-san-jose", label: "About the teacher" },
        ],
        sections: [
          {
            heading: "Can adults really start piano from zero?",
            bullets: [
              "Adult-paced instruction: technique, reading, and phrasing without rushing through method books",
              "Coaching shaped by lived experience: I started serious study after age 25",
              "Beginners, restarters, and advanced hobbyists all get one-on-one planning",
            ],
            body:
              "Yes. Adult beginners are a core part of this studio, and many students start with zero background or return after years away. Lessons are built for adult schedules and goals, with clear weekly assignments so your practice feels focused instead of overwhelming.",
          },
          {
            heading: "How long does it take to make progress as an adult?",
            bullets: [
              "Most adults hear noticeable improvement within the first 2-3 months of consistent practice",
              "Long-term growth is cumulative: technique, reading confidence, and repertoire depth build over time",
              "Your timeline depends more on consistency than starting age",
            ],
            body:
              "You can expect early milestones quickly when practice is steady, then deeper musical control over the long run. I help you pick repertoire and routines that match your available time so progress is sustainable.",
          },
          {
            heading:
              "What if I can already play difficult pieces but want more artistry?",
            bullets: [
              "Advanced playing is not only about finishing hard notes; it is about musical language, tone hierarchy, and phrasing logic",
              "Training combines expressive decisions with efficient, science-based touch and motion",
              "Argerich-inspired workflow: isolate the hardest bars first, then reconnect them to the full musical line",
            ],
            body:
              "A recent adult student could already play Chopin Nocturnes and Bach French Suites, but the interpretation felt mechanical. We shifted from note completion to sound design and phrase architecture, with focused breakthroughs in difficult passages. Over time, her playing moved from \"I can play it\" to performance quality with clear artistic intent.",
          },
          {
            heading: "Do I need a piano at home, and how often should I practice?",
            bullets: [
              "A full-size weighted keyboard is enough to begin; you do not need a grand piano to start",
              "Best baseline for adults: 20-40 minutes, at least 5 days per week",
              "Short, consistent sessions beat occasional long sessions",
            ],
            body:
              "You can start with practical equipment and improve over time. During lessons, I translate your goals into a realistic weekly plan so practice fits your work and family schedule.",
          },
          {
            heading: "Should I choose in-person or online adult piano lessons?",
            bullets: [
              "In-person in San Jose and South Bay for direct touch and tone feedback",
              "Online for busy weeks or commute-heavy schedules, with the same private structure",
              "Free trial available to test fit before committing",
            ],
            body:
              "Both formats can work well when expectations are clear. We choose the format based on your schedule, goals, and learning style, then adjust over time as needed.",
          },
        ],
      },
      "kids-piano-lessons": {
        seo: {
          title:
            "Kids Piano Lessons San Jose & Sunnyvale | Private 1:1 | In-Person + Online",
          description:
            "Private piano lessons for kids & teens (5+) in San Jose, Sunnyvale, and the South Bay. Calm, structured 1:1 lessons—healthy technique, clear weekly assignments, optional exam prep. Free trial.",
        },
        h1: "Piano lessons for kids and teens (ages 5+)",
        intro:
          "Parents searching for piano classes in San Jose, piano classes near Sunnyvale, or a private piano teacher for children often want a calm, structured teacher who communicates clearly. I teach one-on-one only—no group classes—so each student gets attention tailored to their age and learning style.",
        quickAnswer:
          "Eric Liu Piano Studio teaches private 1:1 piano lessons for kids and teens ages 5 and up, in-person in San Jose and the South Bay or live online. Lessons emphasize healthy technique, calm structured weekly assignments, and bilingual (English/Chinese) communication for families who want it. A free trial lesson is available.",
        facts: [
          "Ages: 5 and up — kids, pre-teens, teens",
          "Format: private 1:1 only — no group classes",
          "Languages: English and Mandarin Chinese check-ins available",
          "Schedules: weekly or bi-weekly",
          "Optional: exam prep (CM, ABRSM), competitions, recitals",
          "Free trial lesson before committing",
        ],
        neighborhoods: {
          heading: "Where students come from",
          body:
            "Most kids and teens come from families in San Jose, Sunnyvale, Santa Clara, and Cupertino. Many parents drive in from Palo Alto, Mountain View, Los Gatos, and Saratoga for weekend slots. Bilingual Mandarin-speaking families often appreciate the parent-teacher check-ins in Chinese.",
          bullets: [
            "Kid-friendly weekend slots common for Palo Alto / Mountain View families",
            "Bilingual English / Mandarin communication for parents",
            "Cupertino, Saratoga, Los Gatos families often combine with school music programs",
          ],
        },
        commonObjections: [
          {
            question: "My child is 5 — is that too young?",
            answer:
              "Age 5 is a workable starting age when the child can sit still for 30 minutes and follow short instructions. Lessons for very young students focus on hand position, rhythm games, and short pieces — not method-book speed.",
          },
          {
            question: "What if my child does not want to practice at home?",
            answer:
              "Parents get specific, age-appropriate weekly assignments small enough to complete in 10-20 minutes. We work with you on a sustainable home routine rather than forcing long sessions.",
          },
          {
            question: "Can we do exam prep (Certificate of Merit, ABRSM)?",
            answer:
              "Yes. Exam tracks are optional and added when the student is ready. The studio supports CM and ABRSM preparation alongside the standard repertoire curriculum.",
          },
        ],
        nextStep:
          "Bring your child to a free trial lesson — you will see the teaching style, get a specific home-practice plan for the week, and leave with a clear sense of whether the fit is right.",
        relatedLinks: [
          { href: "/online-piano-lessons", label: "Online piano lessons" },
          { href: "/piano-lessons-san-jose", label: "San Jose piano lessons (overview)" },
          { href: "/piano-teacher-san-jose", label: "About the San Jose piano teacher" },
        ],
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
        quickAnswer:
          "Online piano lessons at Eric Liu Piano Studio are live, private, 1:1 sessions taught from a San Jose-based studio. Format and curriculum match in-person lessons; effectiveness depends mostly on the student's audio setup (USB microphone, wired headphones, top-down camera) and weighted-key digital piano. A free trial lesson lets you confirm setup and fit.",
        facts: [
          "Format: live 1:1 video lessons (not pre-recorded)",
          "Requirements: 88-key fully-weighted digital piano, USB microphone, wired headphones",
          "Camera: top-down view of both hands and keyboard preferred",
          "Connection: stable wired ethernet recommended",
          "Pricing: same as in-person tuition",
          "Free trial lesson to validate audio and fit",
        ],
        neighborhoods: {
          heading: "Who uses online lessons",
          body:
            "Bay Area online students are typically adults with travel-heavy schedules, parents managing multiple kids' activities, and students living outside the South Bay (Oakland, San Francisco, Peninsula, even out-of-state). Hybrid arrangements are common: in-person during exam prep or recital seasons, online during regular weeks.",
          bullets: [
            "Adults with travel-heavy jobs",
            "Bay Area families outside the South Bay (Oakland, SF, Peninsula)",
            "Out-of-state students in compatible time zones",
            "Hybrid (online + occasional in-person) for local students",
          ],
        },
        commonObjections: [
          {
            question: "Is online really as effective as in-person?",
            answer:
              "For intermediate and motivated students, yes — the teaching content is identical. Complete beginners and very young children sometimes benefit from in-person for the first few months, then transition to online once basic habits are in place.",
          },
          {
            question: "What is the right audio setup?",
            answer:
              "A USB microphone (Blue Yeti, FIFINE K669) plus wired headphones improves perceived teaching quality more than any software upgrade. Built-in laptop microphones miss pedal noise and subtle dynamics.",
          },
          {
            question: "Will it work for kids?",
            answer:
              "Yes for motivated kids ages 8+ with parent support nearby. Younger children often do better in-person until they can manage the camera and assignments independently.",
          },
        ],
        nextStep:
          "Book a free online trial — we will test the audio together, do a real teaching session, and confirm whether the setup is solid before committing to weekly lessons.",
        relatedLinks: [
          { href: "/adult-piano-lessons", label: "Private adult piano lessons" },
          { href: "/kids-piano-lessons", label: "Kids piano lessons" },
        ],
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
            "Piano Teacher San Jose | In-Person & Online | Private Adults & Kids 5+",
          description:
            "Looking for a piano teacher in San Jose or nearby? Private 1:1 lessons for adults, restarters, and kids 5+—classical training, structured practice, Sunnyvale & South Bay in-person or online. Free trial; fast replies.",
        },
        h1: "Piano teacher in San Jose",
        intro:
          "Whether you searched “piano teacher San Jose,” “piano teacher near me,” “piano music teachers near me,” or “San Jose piano teachers,” the goal is the same: find a teacher you trust, who teaches seriously, and who respects your time. I offer private lessons only—no group classes—rooted in classical training and practical coaching.",
        quickAnswer:
          "Eric Liu is a private piano teacher in San Jose with 8+ years of teaching experience and 60+ students personally coached. He trained under Erna Gulabyan (San Francisco Conservatory of Music) and Frank Levy (Stanford University), and teaches only 1:1 — no group classes — for adults, adult beginners, and kids ages 5+ in San Jose and the South Bay, or live online.",
        facts: [
          "Teacher: Eric Liu — software engineer turned pianist",
          "Experience: 8+ years teaching; 60+ students personally coached",
          "Training: classical lineage from Erna Gulabyan (SF Conservatory) and Frank Levy (Stanford)",
          "Format: private 1:1 only — no group classes",
          "Languages: English and Mandarin Chinese",
          "Board member: MusicNBrain (nonprofit youth performance organization)",
          "Free trial lesson, same-day reply on most inquiries",
        ],
        neighborhoods: {
          heading: "Who reaches the studio from where",
          body:
            "Students come from across the South Bay. In-person students travel from San Jose, Sunnyvale, Santa Clara, Cupertino, Mountain View, Palo Alto, Los Gatos, Saratoga, Campbell, and Milpitas. Online students reach the studio from the Peninsula, the East Bay, and out-of-state locations on compatible time zones.",
          bullets: [
            "In-person — San Jose, Sunnyvale, Santa Clara, Cupertino, South Bay cities",
            "Online — Peninsula, East Bay, out-of-state in compatible time zones",
            "Bilingual support for Mandarin-speaking families in Cupertino, Saratoga, Palo Alto",
          ],
        },
        commonObjections: [
          {
            question: "How is this different from a music school or franchise?",
            answer:
              "This is a single-teacher studio. You work directly with Eric Liu every lesson, not a rotating staff. Weekly plans are individualized, not pulled from a method-book curriculum applied to a cohort.",
          },
          {
            question: "What if I am more advanced and need real coaching?",
            answer:
              "Advanced students get repertoire-level coaching with focus on musical language, tone hierarchy, and efficient practice. Past students range from beginners through performance-level repertoire (Chopin, Bach, Beethoven).",
          },
          {
            question: "What is the typical lesson schedule?",
            answer:
              "Weekly is the default; bi-weekly works for self-disciplined adults. Lessons are typically 45 or 60 minutes. We pick a recurring weekly time slot during the first month.",
          },
        ],
        nextStep:
          "Read the About page for the full bio, then book a free trial lesson — the trial is a real teaching session, not a sales conversation.",
        relatedLinks: [
          { href: "/about", label: "Full bio: Eric Liu" },
          { href: "/adult-piano-lessons", label: "Private adult piano lessons" },
          { href: "/kids-piano-lessons", label: "Kids piano lessons" },
        ],
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
            "圣何塞与森尼维尔钢琴课 | 线下一对一 + 线上 | 免费试听",
          description:
            "圣何塞、森尼维尔及南湾私人钢琴课：线下一对一或线上，儿童与成人、初学到进阶。每周清晰作业、技巧与音乐表现并重。免费试听；多数咨询当天回复。",
        },
        h1: "圣何塞钢琴课 — 私人一对一",
        intro:
          "圣何塞私人钢琴课与南湾教学：无论您在寻找圣何塞钢琴课、森尼维尔初学者课程、南湾钢琴老师，还是希望线上一对一，课程都以学生为中心——不使用千篇一律的教材。线下可在圣何塞及周边上课，也支持在线课程以配合日程。",
        quickAnswer:
          "Eric Liu 钢琴工作室提供圣何塞与南湾（森尼维尔、圣克拉拉、库比蒂诺、坎贝尔、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、米尔皮塔斯）一对一私人钢琴课，面向成人、成人初学者、重拾者与 5 岁以上儿童。提供圣何塞线下课与线上课；免费试听，无需信用卡。",
        facts: [
          "位置：基于加州圣何塞，线下与线上均可",
          "形式：仅一对一私教，不设团课",
          "年龄：5 岁以上 — 儿童、青少年、成人、成人初学者",
          "语言：英文与普通话",
          "试听：免费试听，无需信用卡",
          "回复速度：多数咨询当天回复",
        ],
        neighborhoods: {
          heading: "服务区域与通勤说明",
          body:
            "学生来自南湾各地：圣何塞家庭多来自 Willow Glen、Almaden、Cambrian；森尼维尔与圣克拉拉家庭通常 280 或 101 二十分钟内到达；库比蒂诺、山景城、帕洛阿尔托学生常将课程嵌入放学或周末时段；洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯家庭更常选择线上以节省通勤。",
          bullets: [
            "圣何塞 — Willow Glen、Almaden、Cambrian、Rose Garden",
            "森尼维尔与圣克拉拉 — 280 或 101 快速到达",
            "库比蒂诺、山景城、帕洛阿尔托 — 周末或放学后档常见",
            "洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯 — 常选线上课",
          ],
        },
        commonObjections: [
          {
            question: "完全零基础可以吗？",
            answer:
              "可以。零基础是工作室的核心学员之一。第一节课结构化诊断：手型、前五个音、一个本周可在家完成的小作业。",
          },
          {
            question: "家里没有原声钢琴怎么办？",
            answer:
              "88 键全配重电钢琴足以入门。试听课中我们可以根据您的预算推荐具体的 Yamaha、Kawai、Roland 型号。",
          },
          {
            question: "多久可以开始上课？",
            answer:
              "多数新学员在一到两周内完成免费试听，并在同周或下周开始正式每周课。",
          },
        ],
        nextStep:
          "最快确认是否合适的方式是免费试听——你会上一节真实的课，带走本周作业，并清楚价格与排期。",
        relatedLinks: [
          { href: "/adult-piano-lessons", label: "成人钢琴私教" },
          { href: "/kids-piano-lessons", label: "儿童钢琴课（5 岁以上）" },
          { href: "/online-piano-lessons", label: "线上钢琴课" },
          { href: "/piano-teacher-san-jose", label: "关于圣何塞钢琴老师" },
        ],
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
              "学生来自圣何塞、森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔、米尔皮塔斯及整个湾区，亦适合希望在家附近找到成人钢琴私教或森尼维尔初学者课程的家庭。也可选择线上钢琴课。",
          },
        ],
      },
      "adult-piano-lessons": {
        seo: {
          title:
            "成人钢琴私教 | 圣何塞与森尼维尔 | 线下线上皆可 | 免费试听",
          description:
            "圣何塞、森尼维尔及南湾成人一对一钢琴课：初学者、重拾者与进阶学员。系统、耐心、以目标为导向。免费试听，无需信用卡；多数咨询当天回复。",
        },
        h1: "成人钢琴私教（圣何塞与湾区）",
        intro:
          "若您在寻找成人钢琴私教、家附近的成人钢琴课或圣何塞成人初学者课程，欢迎了解：许多成年学生是初学者或重拾者；我也教授中级与高级成人学员，在技巧、音乐性与曲目上做深度指导。课程系统、耐心、以目标为导向，而不是赶进度刷完一本教材。",
        quickAnswer:
          "Eric Liu 钢琴工作室成人课程为一对一私教，圣何塞与南湾线下或线上。稳定练习的成人初学者通常在 2-3 个月内听到明显进步（每周 5 天、每天 20-40 分钟），约 90% 的学员长期坚持 2 年以上。免费试听，无需信用卡。",
        facts: [
          "成人初学者与重拾者是工作室核心学员",
          "建议练习节奏：每周 5 天，每天 20-40 分钟",
          "可衡量的进步通常出现在第 2-3 个月",
          "长期留存：约 90% 学员保持 2 年以上",
          "入门设备：88 键全配重电钢琴（无需原声钢琴）",
          "免费试听，无需信用卡",
        ],
        neighborhoods: {
          heading: "成人学员的来源",
          body:
            "成人学员来自南湾各地：森尼维尔与山景城的软件工程师、圣何塞与圣克拉拉的医护、帕洛阿尔托的教授与研究生、库比蒂诺与洛斯加托斯陪伴孩子一起学习的家长。出差频繁的成人偏爱线上课。",
          bullets: [
            "科技从业者 — 森尼维尔、山景城、库比蒂诺、帕洛阿尔托",
            "医护工作者 — 圣何塞、圣克拉拉、坎贝尔",
            "陪孩子一起学的家长 — 库比蒂诺、萨拉托加、洛斯加托斯",
            "出差频繁 — 偏好线上课",
          ],
        },
        commonObjections: [
          {
            question: "30 岁（或 40、50、60）学钢琴会不会太晚？",
            answer:
              "不会。任何年龄都可以建立扎实技巧并达到中级以上水平。稳定性远比起步年龄重要——工作室有 40+ 才起步的学员正在演奏舒伯特、柴可夫斯基、肖邦的作品。",
          },
          {
            question: "小时候学过又放弃了，这次会不一样吗？",
            answer:
              "成人在认知任务（读谱、乐理、乐句）上往往进步更快，因为目标更清晰、注意力更集中。课程为成人时间表与目标量身设计，而不是赶教材进度。",
          },
          {
            question: "多久能弹我真正喜欢的曲子？",
            answer:
              "多数成人初学者在第 5-6 个月能音乐地弹出一首像样的小品；中级曲目（肖邦前奏曲、莫扎特较易奏鸣曲、巴赫小步舞曲）通常在第 1-2 年内可达成。",
          },
          {
            question: "工作很忙，能高效练琴吗？",
            answer:
              "可以。工作室采用“分而治之”练习框架——每次 25 分钟，明确解决一个问题，而不是从头到尾过一遍。",
          },
        ],
        nextStep:
          "预约免费试听——你会弹一小段、得到本周一个具体作业，并清楚价格与排期。",
        relatedLinks: [
          { href: "/online-piano-lessons", label: "线上钢琴课" },
          { href: "/piano-teacher-san-jose", label: "关于老师" },
        ],
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
            "儿童钢琴课 圣何塞与森尼维尔 | 一对一私教 | 南湾",
          description:
            "圣何塞、森尼维尔及南湾儿童与青少年（5岁+）私人钢琴课：健康手型、清晰作业、长期规划。不设团课。线下或线上。免费试听，欢迎家长先沟通目标。",
        },
        h1: "儿童与青少年钢琴课（5岁+）",
        intro:
          "为家长提供清晰、结构化的钢琴课：注重健康手型与练习习惯，长期规划兼顾进度与兴趣。仅一对一，不授团课。可提供中英文沟通，方便家长了解进度。",
        quickAnswer:
          "Eric Liu 钢琴工作室为 5 岁以上儿童与青少年提供圣何塞与南湾线下或线上的一对一私人钢琴课。重视健康手型、清晰每周作业、可与家长进行中英文沟通。提供免费试听。",
        facts: [
          "年龄：5 岁及以上 — 儿童、少儿、青少年",
          "形式：仅一对一私教，不设团课",
          "语言：英文与普通话家长沟通",
          "排课：每周或隔周",
          "可选：考级（CM、ABRSM）、比赛、汇演",
          "免费试听再决定是否报名",
        ],
        neighborhoods: {
          heading: "学员来自哪里",
          body:
            "多数儿童与青少年来自圣何塞、森尼维尔、圣克拉拉与库比蒂诺。许多家长从帕洛阿尔托、山景城、洛斯加托斯、萨拉托加专程开来上周末档。中文家庭非常欢迎家长沟通使用中文。",
          bullets: [
            "周末档常见——帕洛阿尔托、山景城家庭",
            "中英文家长沟通",
            "库比蒂诺、萨拉托加、洛斯加托斯家庭常与学校音乐项目结合",
          ],
        },
        commonObjections: [
          {
            question: "孩子才 5 岁，会不会太小？",
            answer:
              "5 岁可以开始，前提是能坐住 30 分钟并跟随简单指令。幼龄学员的课程聚焦手型、节奏游戏与短曲，不追教材进度。",
          },
          {
            question: "孩子在家不愿意练琴怎么办？",
            answer:
              "家长会收到具体、年龄合适的作业，每天可在 10-20 分钟内完成。我们会和您一起搭建可持续的家庭练习节奏，而不是强迫长时间练琴。",
          },
          {
            question: "可以准备 CM、ABRSM 考级吗？",
            answer:
              "可以。考级是可选项，当学生准备好时再加入。工作室支持 CM 与 ABRSM 准备，并与常规曲目教学同步。",
          },
        ],
        nextStep:
          "带孩子来一次免费试听——你会看到教学风格、得到本周具体的家庭练习计划，并清楚地判断是否合适。",
        relatedLinks: [
          { href: "/online-piano-lessons", label: "线上钢琴课" },
          { href: "/piano-lessons-san-jose", label: "圣何塞钢琴课总览" },
          { href: "/piano-teacher-san-jose", label: "关于圣何塞钢琴老师" },
        ],
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
        quickAnswer:
          "Eric Liu 钢琴工作室的线上课为现场（非录播）一对一视频课，从圣何塞工作室授课。教学内容与线下一致，效果主要取决于学生端的音频设备（USB 麦克风、有线耳机、俯拍键盘的摄像头）与配重电钢琴。可先免费试听确认设备与契合度。",
        facts: [
          "形式：现场一对一视频课（非录播）",
          "设备要求：88 键全配重电钢琴、USB 麦克风、有线耳机",
          "摄像头：从上方俯拍双手与键盘",
          "网络：尽量有线网络",
          "价格：与线下学费一致",
          "免费试听以验证音频与契合度",
        ],
        neighborhoods: {
          heading: "谁更适合线上课",
          body:
            "湾区线上学员多为出差频繁的成人、要协调多名孩子活动的家长，以及住在南湾之外（奥克兰、旧金山、半岛甚至外州）的学生。混合形式常见：考级或汇演时线下，常规周线上。",
          bullets: [
            "出差频繁的成人",
            "南湾之外的湾区家庭（奥克兰、旧金山、半岛）",
            "时区相近的外州学生",
            "本地学生混合方式（线上 + 偶尔线下）",
          ],
        },
        commonObjections: [
          {
            question: "线上效果真的能和线下一样吗？",
            answer:
              "对中级与有积极性的学员而言，教学内容完全一致。完全零基础与幼龄儿童前期更建议线下，等基本习惯稳定后再转线上。",
          },
          {
            question: "音频设备该怎么选？",
            answer:
              "外置 USB 麦克风（Blue Yeti、FIFINE K669）配上有线耳机带来的提升远大于任何软件升级。笔记本内置麦无法捕捉踏板细节与微弱力度。",
          },
          {
            question: "孩子适合线上吗？",
            answer:
              "8 岁以上、有家长在旁的孩子通常适合线上。更小的孩子建议先线下，能独立处理摄像头与作业后再转线上。",
          },
        ],
        nextStep:
          "预约免费线上试听——我们一起测试音频，进行一节真课，确认设备稳定后再决定是否开始周课。",
        relatedLinks: [
          { href: "/adult-piano-lessons", label: "成人钢琴私教" },
          { href: "/kids-piano-lessons", label: "儿童钢琴课" },
        ],
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
            "圣何塞钢琴老师 | 森尼维尔与南湾 | 一对一成人与儿童 5+",
          description:
            "圣何塞私人钢琴老师 Eric Liu：一对一课程，古典训练与系统化练习。森尼维尔及南湾线下或线上；成人初学者、重拾者与儿童 5+。免费试听，欢迎先看评价与简介。",
        },
        h1: "圣何塞钢琴老师",
        intro:
          "若您在搜索“圣何塞钢琴老师”“森尼维尔钢琴老师”或“附近钢琴老师”，核心需求通常是：专业、可靠、沟通清晰。我仅提供一对一私教，不设团课，教学以古典训练与系统化练习为基础。",
        quickAnswer:
          "Eric Liu 是圣何塞私人钢琴老师，拥有 8 年以上教学经验、亲自指导过 60 多位学生，曾师从 Erna Gulabyan（旧金山音乐学院）与 Frank Levy（斯坦福大学）。仅一对一教学，不设团课，面向成人、成人初学者与 5 岁以上儿童，线下覆盖圣何塞与南湾，亦可线上。",
        facts: [
          "老师：Eric Liu — 软件工程师出身的钢琴老师",
          "经验：8 年以上教学，60+ 位学生亲自指导",
          "训练：师从 Erna Gulabyan（旧金山音乐学院）与 Frank Levy（斯坦福大学）",
          "形式：仅一对一私教，不设团课",
          "语言：英文与普通话",
          "公益身份：MusicNBrain（青少年演出非营利机构）理事",
          "免费试听，多数咨询当天回复",
        ],
        neighborhoods: {
          heading: "学员来自哪里",
          body:
            "学员来自整个南湾。线下覆盖圣何塞、森尼维尔、圣克拉拉、库比蒂诺、山景城、帕洛阿尔托、洛斯加托斯、萨拉托加、坎贝尔与米尔皮塔斯；线上学员则来自半岛、东湾及时区相近的外州。",
          bullets: [
            "线下 — 圣何塞、森尼维尔、圣克拉拉、库比蒂诺、南湾各市",
            "线上 — 半岛、东湾、时区相近的外州",
            "中文沟通支持 — 库比蒂诺、萨拉托加、帕洛阿尔托家庭",
          ],
        },
        commonObjections: [
          {
            question: "和音乐学校或连锁机构有什么不同？",
            answer:
              "这是单老师工作室——每节课都是 Eric Liu 亲自授课，不会轮换老师。每周计划个性化定制，而不是从教材里搬一套统一进度。",
          },
          {
            question: "如果我程度较高，能得到真正的指导吗？",
            answer:
              "可以。进阶学员在曲目层面获得音乐语言、声部层次与高效练习的指导。学生范围从零基础到演出级曲目（肖邦、巴赫、贝多芬）。",
          },
          {
            question: "一般怎么排课？",
            answer:
              "默认每周一次；自律强的成人可隔周。每节通常 45 或 60 分钟。第一个月内确定固定每周时间。",
          },
        ],
        nextStep:
          "先看“关于”页了解完整简介，再预约免费试听——试听是真实教学课，不是销售对话。",
        relatedLinks: [
          { href: "/about", label: "完整简介：Eric Liu" },
          { href: "/adult-piano-lessons", label: "成人钢琴私教" },
          { href: "/kids-piano-lessons", label: "儿童钢琴课" },
        ],
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
