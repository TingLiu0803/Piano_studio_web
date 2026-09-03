import type { Locale } from "@/content/site";
import { extraFocusMinutes } from "@/content/practice-games";

export const articleSlugs = [
  "mianbao-practice-timer-for-kids",
  "piano-practice-games-for-kids",
  "mianbao-studio-cat-employee-001",
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
  /** Optional in-article CTA. Internal paths start with `/` and get the locale prefix. */
  cta?: {
    href: string;
    label: string;
    note?: string;
    newTab?: boolean;
    gaEvent?: string;
    gaPlacement?: string;
  };
  /** Visible article figures (server-rendered; also feed Article JSON-LD `image`). */
  figures?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
  /** Overrides the default Article JSON-LD keyword list. */
  keywords?: string[];
};

const en: Record<ArticleSlug, Article> = {
  "mianbao-practice-timer-for-kids": {
    slug: "mianbao-practice-timer-for-kids",
    title: "Mianbao Practice Timer: kids stay focused longer and start practice on their own",
    description:
      "A studio-made practice Pomodoro plus a backyard of cats at Eric Liu Piano Studio in Cupertino. Students earn dried fish for practice time, then decorate the yard to attract visiting cats. Follow-ups: longer focused lesson minutes, and more willingness to start at home.",
    quickAnswer: `Mianbao Practice Timer is a studio game for children's piano practice: a timer sits beside a backyard of cats. Practice minutes turn into dried fish; dried fish buy toys and plants that attract visiting cats. Every child who comes to a lesson can adopt one electronic cat as a practice partner — adults who want one can too. In parent follow-ups, focused lesson time increased by about ${extraFocusMinutes} minutes on average, and children started home practice more readily than before.`,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "Studio practice",
    readingTimeMinutes: 4,
    keywords: [
      "piano practice timer",
      "kids piano lessons",
      "practice motivation",
      "cupertino piano studio",
      "mianbao",
    ],
    intro:
      "The newest title in the studio warehouse is not another note-name drill. It is a practice clock with a backyard of cats. A child sits down, starts the timer, and the minutes become dried fish. Those fish buy a bed, a plant, a slide — things that make other cats come to visit. Screenshots below are the live game families can open today.",
    figures: [
      {
        src: "/studio/games/practice-timer.png",
        alt: "Mianbao Practice Timer at Eric Liu Piano Studio in Cupertino: a 25-minute practice clock next to an illustrated orange-and-white cat at a piano",
        caption: "The practice clock. Start it, stay with the piece, collect dried fish.",
      },
      {
        src: "/studio/games/practice-timer-adopt.png",
        alt: "Cat adoption screen in Mianbao Practice Timer at Eric Liu Piano Studio: choose one electronic cat such as Mianbao to practice with",
        caption: "Each student adopts one cat. After you choose, that cat stays.",
      },
      {
        src: "/studio/games/practice-timer-backyard.png",
        alt: "Backyard in Mianbao Practice Timer at Eric Liu Piano Studio: an orange-and-white cat sits in a sunny yard waiting for visiting cats",
        caption: "The backyard. Add items, wait, and other cats come to visit.",
      },
      {
        src: "/studio/games/practice-timer-shop.png",
        alt: "Shop in Mianbao Practice Timer at Eric Liu Piano Studio: dried fish buy a cat bed, cat tree, toys, and a giant slide",
        caption: "Dried fish from practice time buy the things that fill the yard.",
      },
    ],
    sections: [
      {
        heading: "A timer, then a yard of visiting cats",
        body:
          "This is a Pomodoro for the piano bench plus a small Neko Atsume-style yard. The child starts a practice block — often twenty-five minutes — and dried fish arrive as the minutes pass. Those fish go to the shop: a bed, a scratcher, a plant, later a giant slide. Items in the yard attract other cats. The loop is simple on purpose. The score is not a high number; it is that the child sat down and stayed.",
        bullets: [
          "Start the timer, then play the assigned piece — not the other way around",
          "Dried fish come from practice time, not from tapping around the yard",
          "One adopted cat per student; visiting cats are the reason to come back",
        ],
      },
      {
        heading: "What changed in the lesson and at home",
        body:
          `This is a studio observation, not a controlled study. After we put the timer in the lesson week, children stayed with the piece longer in the room — focused lesson time increased by about ${extraFocusMinutes} minutes on average, in line with the other short games. The sharper change was at home: parents said the child asked to open the timer and start, instead of being walked to the bench. I treat that as a signal to keep the loop short, not as a promise for every family.`,
        bullets: [
          `About ${extraFocusMinutes} extra minutes of focused time in the lesson, on average`,
          "Home practice started more often from the child's side, reported in follow-ups",
          "The cat is a partner for the assignment — not a second activity that replaces it",
        ],
      },
      {
        heading: "How a practice block should look",
        body:
          "Open the timer, pick the adopted cat if it is the first visit, turn the sound on, and start. Play the weekly piece while the clock runs. When the block ends, buy one backyard thing if there are enough fish, then close the tab. If the child only wants to rearrange the yard, the block was too long or the assignment was not small enough.",
        bullets: [
          "One timed block, then back to closing the laptop",
          "Say out loud what the assignment was before hitting start",
          "Bring one fuzzy bar or one stubborn note to the next lesson",
        ],
      },
    ],
    howTo: {
      name: "How to use Mianbao Practice Timer in a practice week",
      description:
        "A four-step routine so the timer and the backyard support the weekly piano assignment instead of replacing it.",
      totalTimeIso: "PT25M",
      steps: [
        {
          name: "Adopt one cat, then start the clock",
          text: "The first visit, choose a practice partner. After that, open the timer and press start before touching the piece.",
        },
        {
          name: "Play the assigned piece while it runs",
          text: "The clock is for the bench, not for browsing the shop. Sound on helps; a microphone is optional and stays on the device.",
        },
        {
          name: "Spend fish on one backyard item",
          text: "If there are enough dried fish, buy one thing. Then stop. The yard can wait until the next block.",
        },
        {
          name: "Bring one question to the next lesson",
          text: "Write the bar or the note that still collides. Ask it in the private lesson so the timer feeds the 1:1 work.",
        },
      ],
    },
    cta: {
      href: "/practice-games",
      label: "Open the studio game warehouse",
      note: "Mianbao Practice Timer is on the same shelf as Beat Game and Who Am I? — name, screenshot, play button.",
      gaEvent: "practice_game_hub_click",
      gaPlacement: "journal_practice_timer_article",
    },
    related: [
      { slug: "piano-practice-games-for-kids", label: "Studio music games for kids" },
      { slug: "mianbao-studio-cat-employee-001", label: "Meet Mianbao, studio Employee #001" },
    ],
  },
  "piano-practice-games-for-kids": {
    slug: "piano-practice-games-for-kids",
    title: "Studio music games for kids: more focused minutes, more willingness to practice",
    description:
      "Eric Liu Piano Studio in Cupertino regularly releases homemade music games for children's piano lessons — Beat Game, Who Am I?, and Mianbao Practice Timer. Follow-up observations: about 15 extra minutes of focused lesson time, and a stronger willingness to practice at home.",
    quickAnswer: `The studio regularly releases homemade music games that support children's piano lessons rather than replacing private 1:1 teaching. Live now: Beat Game (note values and rhythm), Who Am I? (note names, then children's songs), and Mianbao Practice Timer (a practice clock plus a backyard of cats). In parent follow-ups, focused lesson time increased by about ${extraFocusMinutes} minutes on average, and willingness to practice at home improved. New titles will land in the studio game warehouse.`,
    datePublished: "2026-08-31",
    dateModified: "2026-09-02",
    category: "Studio practice",
    readingTimeMinutes: 6,
    keywords: [
      "piano practice games",
      "kids piano lessons",
      "note names",
      "rhythm games",
      "cupertino piano studio",
    ],
    intro:
      "Parents often ask what actually changes a child's attention in the lesson room. One practical answer at this Cupertino studio has been short, named music games built for kids — beats, note names, and a practice timer — sitting beside the weekly piece, not instead of it. Screenshots below are the real titles families can open today, plus Mianbao, who greets students in the room.",
    figures: [
      {
        src: "/studio/games/music-theory-hub.png",
        alt: "Music Theory Game home screen from Eric Liu Piano Studio, with Beat Game and Who Am I? and an illustrated orange-and-white cat at a piano",
        caption: "The kids' game home: pick Beat Game or Who Am I? Mianbao is on the left.",
      },
      {
        src: "/studio/games/beat-game.png",
        alt: "Beat Game at Eric Liu Piano Studio: a child matches a note value by tapping 1, 2, 3, or 4",
        caption: "Beat Game — learn how long a note lasts, then tap the count.",
      },
      {
        src: "/studio/games/who-am-i.png",
        alt: "Who Am I? at Eric Liu Piano Studio: animal icons mapped to piano keys from C to B",
        caption: "Who Am I? — Cat is C. Tap the animal, then tap the key.",
      },
      {
        src: "/studio/mianbao-warehouse.png",
        alt: "Mianbao, the orange and white cat at Eric Liu Piano Studio in Cupertino, sitting on a cardboard warehouse playhouse",
        caption: "The same cat in the room: Employee #001 on his warehouse.",
      },
      {
        src: "/studio/mianbao-closeup.png",
        alt: "Close-up of Mianbao, an orange and white studio cat at Eric Liu Piano Studio",
        caption: "Mianbao, who likes it when students visit.",
      },
    ],
    sections: [
      {
        heading: "Games sit beside the lesson, they do not replace it",
        body:
          "Every student here still gets a private one-on-one lesson with a written weekly assignment. A game is a five-to-ten-minute task with a name: tap a rhythm, name a key, then close the tab. That is closer to a technique drill than to open-ended screen time. If a child only wants to tap the game, the game is too long or the assignment was not small enough.",
      },
      {
        heading: "What follow-ups have shown so far",
        body:
          `This is a studio observation from parent follow-ups, not a controlled study. After we started using short games in the lesson week, children's focused lesson time increased by about ${extraFocusMinutes} minutes on average. Parents also reported that the child was more willing to sit down at the piano at home. I treat those numbers as a signal to keep iterating — not as a guarantee for every family.`,
        bullets: [
          `About ${extraFocusMinutes} extra minutes of focused time in the lesson, on average`,
          "Stronger willingness to start home practice, reported in follow-ups",
          "Games stay short so attention does not collapse into browsing",
        ],
      },
      {
        heading: "What kids can play today",
        body:
          "The public warehouse now has three titles, all aimed at children. Beat Game teaches note values — how long a note lasts — then asks the child to tap 1, 2, 3, or 4 with the pulse. Who Am I? teaches piano note names with animals (Cat = middle C), then moves into finding keys, melody games, and simple songs such as Twinkle Twinkle. Mianbao Practice Timer is a practice clock plus a backyard of cats: minutes become dried fish, and fish attract visiting cats. None of these is an advanced theory quiz. More titles will be added to the same warehouse page, each with a name and a screenshot.",
        bullets: [
          "Beat Game: note values and tapping the rhythm",
          "Who Am I?: note names, then children's songs",
          "Mianbao Practice Timer: sit down, stay with the piece, grow the backyard",
        ],
      },
      {
        heading: "How a round should look at home",
        body:
          "Use the game as a warm-up before the assigned piece. One short round, sound on, then close the tab. The useful residue is a sentence the child can bring to the next lesson: “the half note still feels like a quarter” or “I keep mixing F and G.” That sentence is the assignment, not a high score.",
        bullets: [
          "Five to ten minutes, then back to the piece",
          "Say out loud the value or the note name before the next tap",
          "Write one fuzzy spot and ask about it next week",
        ],
      },
      {
        heading: "Mianbao is in the room and on the screen",
        body:
          "The orange-and-white cat on the game home screen is the same Mianbao who sits on the cardboard warehouse between lessons. He likes students. The games are built in that same mood: short, friendly, and in service of the lesson — not a separate toy pile.",
      },
    ],
    howTo: {
      name: "How to use a studio music game in a practice week",
      description:
        "A four-step routine so a short kids' game supports the weekly piano assignment instead of replacing it.",
      totalTimeIso: "PT10M",
      steps: [
        {
          name: "Warm up with one short round",
          text: "Open Beat Game or Who Am I?, turn sound on, and play one round before touching the assigned piece.",
        },
        {
          name: "Say the value or the note name",
          text: "Out loud: “this is two beats” or “Cat is C.” Unsure is allowed — say it anyway.",
        },
        {
          name: "Write down one question",
          text: "Note the value or the key that still collides. One question is enough.",
        },
        {
          name: "Bring it to the next lesson",
          text: "Ask that question in the next private lesson so the game feeds the 1:1 work instead of floating beside it.",
        },
      ],
    },
    cta: {
      href: "/practice-games",
      label: "Open the studio game warehouse",
      note: "Each live title has a name, a screenshot, and a play button. Sound on.",
      gaEvent: "practice_game_hub_click",
      gaPlacement: "journal_games_article",
    },
    related: [
      { slug: "mianbao-practice-timer-for-kids", label: "Mianbao Practice Timer for kids" },
      { slug: "mianbao-studio-cat-employee-001", label: "Meet Mianbao, studio Employee #001" },
    ],
  },
  "mianbao-studio-cat-employee-001": {
    slug: "mianbao-studio-cat-employee-001",
    title: "Mianbao, Employee #001: the studio’s lucky orange-and-white cat",
    description:
      "Meet Mianbao, the people-loving orange-and-white cat at Eric Liu Piano Studio in Cupertino — unofficial Employee #001, who greets students and often stays to play.",
    quickAnswer:
      "Mianbao is the studio's orange-and-white cat and unofficial Employee #001. He is a people-loving lucky cat who likes it when students visit, and he often stays in the room to play. Families meet him at the Cupertino studio; he is part of how the room feels, not a gimmick.",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    category: "Studio life",
    readingTimeMinutes: 4,
    keywords: [
      "piano studio cat",
      "cupertino piano studio",
      "eric liu piano studio",
      "kids piano lessons",
    ],
    intro:
      "Before a trial lesson, parents usually ask about technique, schedule, and whether a child will sit still. Then they notice the orange-and-white cat on the warehouse playhouse. That is Mianbao. This note introduces him properly — because he is the first employee on the roster, and students ask about him more than they ask about finger numbers.",
    figures: [
      {
        src: "/studio/mianbao-warehouse.png",
        alt: "Mianbao, the orange and white cat at Eric Liu Piano Studio in Cupertino, sitting on a cardboard warehouse playhouse",
        caption: "Employee #001 on the warehouse — his preferred perch between lessons.",
      },
      {
        src: "/studio/mianbao-carpet.png",
        alt: "Mianbao lying on the carpet beside a mirror at Eric Liu Piano Studio in Cupertino",
        caption: "Off duty on the studio carpet, still within greeting range of the door.",
      },
      {
        src: "/studio/mianbao-closeup.png",
        alt: "Close-up of Mianbao, an orange and white studio cat, with a small orange spot on a white paw",
        caption: "The tell: a small orange spot on a white paw.",
      },
      {
        src: "/studio/games/music-theory-hub.png",
        alt: "Music Theory Game home with illustrated Mianbao at a piano, Beat Game and Who Am I? at Eric Liu Piano Studio",
        caption: "The same face on the kids' games: Beat Game and Who Am I?",
      },
    ],
    sections: [
      {
        heading: "Employee #001, on purpose",
        body:
          "Mianbao means “bread.” He is a short-haired orange-and-white cat — orange on the head, back, and tail; white muzzle, chest, and paws. Calling him Employee #001 is not a joke I tell once; it is how students keep track of who runs the front of house. I teach. He greets.",
      },
      {
        heading: "He likes it when students come",
        body:
          "He is unusually people-oriented for a studio cat. When a student arrives, he often appears at the door, sits nearby during the first minutes, or parks on the warehouse while someone warms up. Children who were nervous about the new room tend to talk to him first. That is useful. A calm animal in the room is not a curriculum, but it is a real part of why the first ten minutes go more easily.",
      },
      {
        heading: "What visiting families should know",
        body:
          "He is friendly, not a prop. If a child is allergic or uneasy around animals, say so before the trial — we will keep him out of the teaching space for that hour. If a child wants to say hello, the rule is the same as at home: let him approach, no chasing, hands gentle. He has a small orange spot on a white front paw; students like finding it.",
        bullets: [
          "Tell me in advance about cat allergies or fear of animals",
          "Let Mianbao come to the student — no picking up without asking",
          "He may sit in for part of a lesson; he may also nap through it",
        ],
      },
      {
        heading: "The same face on the practice games",
        body:
          "When the studio ships a new music mini-game, Mianbao is the one who invites families to try it. The warehouse playhouse is not a metaphor I invented for the website — it is where he actually sits. If you meet him at a trial and later open Beat Game, Who Am I?, or the practice timer at home, you will recognize the cat on the screen.",
      },
    ],
    related: [
      { slug: "mianbao-practice-timer-for-kids", label: "Mianbao Practice Timer for kids" },
      { slug: "piano-practice-games-for-kids", label: "Studio music games for kids" },
    ],
  },
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
      "Most adult piano students practice the way they read email: linearly, without prioritization. The most expensive habit you can build is sight-reading the same passage at full tempo every day and hoping it gets better. This article describes the practice framework I teach in my Cupertino studio.",
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
  "mianbao-practice-timer-for-kids": {
    slug: "mianbao-practice-timer-for-kids",
    title: "面包练习计时：孩子上课更能坐住，回家也更主动练",
    description:
      "库比蒂诺 Eric Liu 钢琴工作室的自制练琴番茄钟，加上后院猫咪。练琴换小鱼干，小鱼干给后院添东西，吸引别的猫来访。回访观察：上课专注更久，在家也更愿意自己开始练。",
    quickAnswer: `面包练习计时是给小孩练琴用的工作室游戏：一边是计时，一边是后院猫咪。练琴分钟换成小鱼干，小鱼干买玩具和植物，用来吸引来访的猫。每一个来上课的小朋友都可以领养一只电子猫陪练——大朋友愿意的话也可以。根据家长回访，上课专注时间平均约多了 ${extraFocusMinutes} 分钟，孩子在家也比以前更主动坐到琴前。`,
    datePublished: "2026-09-02",
    dateModified: "2026-09-02",
    category: "工作室实践",
    readingTimeMinutes: 4,
    keywords: [
      "练琴计时",
      "儿童钢琴课",
      "练琴动力",
      "库比蒂诺钢琴工作室",
      "面包",
    ],
    intro:
      "仓库里最新的一款，不是又一个音名练习。它是一只练琴计时器，外加一个猫咪后院。孩子坐下、按下开始，分钟变成小鱼干。小鱼干换一张床、一盆植物、一座滑梯——用来让别的猫来做客。下面的截图就是家里现在能打开的游戏。",
    figures: [
      {
        src: "/studio/games/practice-timer.png",
        alt: "库比蒂诺 Eric Liu 钢琴工作室的面包练习计时：25 分钟练琴钟，旁边是橘白猫坐在钢琴前的插画",
        caption: "练琴计时。按下开始，跟着曲子坐住，收集小鱼干。",
      },
      {
        src: "/studio/games/practice-timer-adopt.png",
        alt: "Eric Liu 钢琴工作室面包练习计时的领养页：选一只电子猫当练琴伙伴，例如 Mianbao",
        caption: "每个学生领养一只猫。选定之后，这只猫就留下。",
      },
      {
        src: "/studio/games/practice-timer-backyard.png",
        alt: "Eric Liu 钢琴工作室面包练习计时的后院：橘白猫坐在阳光院子里，等其他猫来访",
        caption: "后院。添上物品，等一等，就会有别的猫来做客。",
      },
      {
        src: "/studio/games/practice-timer-shop.png",
        alt: "Eric Liu 钢琴工作室面包练习计时的商店：小鱼干可买猫窝、猫爬架、玩具和巨型滑梯",
        caption: "练琴换来的小鱼干，用来把院子装满。",
      },
    ],
    sections: [
      {
        heading: "先计时，再等后院来客",
        body:
          "这是给琴凳用的番茄钟，加上一个有点像猫咪后院收集的小院子。孩子开始一段练琴——常常是二十五分钟——分钟走过，小鱼干就到账。小鱼干拿去商店：一张床、一个抓板、一盆植物，再往后是一座大滑梯。院子里的东西会吸引别的猫。回路故意做得很简单。分数不是一个高数字，而是孩子坐下并且坐住了。",
        bullets: [
          "先开计时，再弹这周的曲子——不要反过来",
          "小鱼干来自练琴时间，不是来自在院子里点来点去",
          "每位学生领养一只猫；来访的猫，才是下次还想打开的理由",
        ],
      },
      {
        heading: "课上和家里实际看到的变化",
        body:
          `这是工作室观察，不是对照实验。把计时放进一周功课之后，孩子在琴房里更能跟着曲子坐住——上课专注时间平均约多了 ${extraFocusMinutes} 分钟，和另外两款短游戏的观察一致。更明显的变化在家里：家长说孩子会自己要求打开计时开始练，而不是被带到琴凳前。我把这当成把回路保持够短的信号，而不是对每个家庭的承诺。`,
        bullets: [
          `上课专注时间平均约多 ${extraFocusMinutes} 分钟`,
          "回访里，在家开始练琴更多是孩子自己提出来的",
          "猫是作业的伙伴，不是取代作业的第二个活动",
        ],
      },
      {
        heading: "一轮练琴该怎么用",
        body:
          "打开计时，第一次来先领养一只猫，打开声音，按下开始。计时走着的时候弹这周的曲子。这一段结束，如果小鱼干够，就给后院买一样东西，然后关掉标签。如果孩子只想摆院子、不想碰曲子，说明这一段太长，或作业还不够小。",
        bullets: [
          "只计时一轮，然后合上电脑",
          "按下开始之前，先大声说出今天的作业是什么",
          "把还卡住的那一小段，或那个顽固的音，带到下一节课",
        ],
      },
    ],
    howTo: {
      name: "如何把面包练习计时放进一周练琴",
      description: "四步流程，让计时和后院支持每周钢琴作业，而不是取代它。",
      totalTimeIso: "PT25M",
      steps: [
        {
          name: "领养一只猫，然后开计时",
          text: "第一次来先选练琴伙伴。之后每次先打开计时、按下开始，再碰曲子。",
        },
        {
          name: "计时走着的时候弹指定曲目",
          text: "钟是给琴凳用的，不是给逛商店用的。建议打开声音；麦克风可选，声音只留在这台设备上。",
        },
        {
          name: "用小鱼干买一样后院物品",
          text: "如果小鱼干够，就买一样。然后停。院子可以等到下一轮。",
        },
        {
          name: "带一个问题到下一节课",
          text: "记下仍然撞在一起的那一小段或那个音。在一对一课上问，让计时喂回课堂。",
        },
      ],
    },
    cta: {
      href: "/practice-games",
      label: "打开工作室游戏仓库",
      note: "面包练习计时和节拍游戏、「我是谁」在同一层货架上——名字、截图、开始玩。",
      gaEvent: "practice_game_hub_click",
      gaPlacement: "journal_practice_timer_article",
    },
    related: [
      { slug: "piano-practice-games-for-kids", label: "工作室的音乐小游戏" },
      { slug: "mianbao-studio-cat-employee-001", label: "认识招财猫 Mianbao，员工 001 号" },
    ],
  },
  "piano-practice-games-for-kids": {
    slug: "piano-practice-games-for-kids",
    title: "工作室的音乐小游戏：孩子上课更专注，练琴也更愿意开始",
    description:
      "库比蒂诺 Eric Liu 钢琴工作室会定期推出给小孩玩的自制音乐游戏：节拍游戏、「我是谁」与面包练习计时。回访观察：上课专注时间平均约多 15 分钟，在家练琴意愿有提升。",
    quickAnswer: `工作室会定期推出给小孩玩的自制音乐小游戏，配合儿童钢琴课，而不是取代一对一私教。现在可以玩的是节拍游戏（音符时值与节奏）、「我是谁」（用小动物记音名，再弹儿歌），以及面包练习计时（练琴计时加上后院猫咪）。根据家长回访，小孩上课专注时间平均约多了 ${extraFocusMinutes} 分钟，在家练琴的意愿也有提升。以后新游戏都会放进同一个游戏仓库。`,
    datePublished: "2026-08-31",
    dateModified: "2026-09-02",
    category: "工作室实践",
    readingTimeMinutes: 6,
    keywords: [
      "练琴小游戏",
      "儿童钢琴课",
      "节拍",
      "音名",
      "库比蒂诺钢琴工作室",
    ],
    intro:
      "家长常问：到底怎样才能让孩子在琴房里把注意力稳住。这个库比蒂诺工作室的一个实际答案是：做短小、有名字、给小孩玩的音乐游戏——先认节拍和音名，再加上练琴计时——放在每周曲目旁边用，不是用来取代曲目。下面的截图就是家里现在能打开的游戏，以及教室里迎接学生的招财猫 Mianbao。",
    figures: [
      {
        src: "/studio/games/music-theory-hub.png",
        alt: "Eric Liu 钢琴工作室儿童乐理游戏首页：节拍游戏与我是谁，左侧是橘白猫插画",
        caption: "儿童游戏首页：选节拍游戏或「我是谁」。左边是 Mianbao。",
      },
      {
        src: "/studio/games/beat-game.png",
        alt: "Eric Liu 钢琴工作室节拍游戏截图：孩子点 1、2、3、4 来匹配音符时值",
        caption: "节拍游戏——这个音要停多久，再把它拍出来。",
      },
      {
        src: "/studio/games/who-am-i.png",
        alt: "Eric Liu 钢琴工作室「我是谁」游戏截图：小动物对应 C 到 B 的琴键",
        caption: "我是谁——猫咪是 C。先点动物，再点琴键。",
      },
      {
        src: "/studio/mianbao-warehouse.png",
        alt: "库比蒂诺 Eric Liu 钢琴工作室的橘白猫 Mianbao，坐在纸箱仓库上",
        caption: "教室里的同一只猫：员工 001 号坐在仓库上。",
      },
      {
        src: "/studio/mianbao-closeup.png",
        alt: "橘白招财猫 Mianbao 特写，Eric Liu 钢琴工作室",
        caption: "Mianbao，很喜欢学生来访。",
      },
    ],
    sections: [
      {
        heading: "游戏在课旁边，不取代课",
        body:
          "这里每位学生仍然上私人一对一课，并带着书面的每周作业回家。游戏是一个 5–10 分钟、有名字的任务：拍一个节奏、说出一个音名，然后关掉标签。它更接近技巧练习，而不是打开屏幕随便玩。如果孩子只想点游戏、不想碰曲子，说明游戏太长，或作业还不够小。",
      },
      {
        heading: "回访目前看到的变化",
        body:
          `这是工作室根据家长回访做的观察，不是对照实验。开始把短游戏放进一周功课之后，小孩上课专注时间平均约多了 ${extraFocusMinutes} 分钟。家长也提到，孩子更愿意在家坐到钢琴前。我把这些数字当成继续迭代的信号，而不是对每个家庭的承诺。`,
        bullets: [
          `上课专注时间平均约多 ${extraFocusMinutes} 分钟`,
          "回访里，在家开始练琴的意愿有提升",
          "游戏保持够短，注意力才不会滑成刷屏幕",
        ],
      },
      {
        heading: "孩子现在可以玩什么",
        body:
          "仓库里现在有三款给小孩的游戏。节拍游戏教音符时值——这个音要停多久——然后让孩子跟着拍子点 1、2、3 或 4。「我是谁」用小动物记琴键音名（猫咪 = 中央 C），再进入找键、旋律游戏，以及小星星等儿歌。面包练习计时是练琴钟加上后院猫咪：分钟换成小鱼干，小鱼干吸引来访的猫。都不是进阶乐理测验。以后新游戏会加在同一层仓库里，每款都有名字和截图。",
        bullets: [
          "节拍游戏：音符时值与拍节奏",
          "我是谁：音名，再弹儿歌",
          "面包练习计时：坐下、跟着曲子坐住，把后院养起来",
        ],
      },
      {
        heading: "在家一轮游戏该怎么玩",
        body:
          "把游戏当作曲目前的热身。短短一轮，打开声音，然后关掉标签页。真正有用的残留是孩子能带到下一节课的一句话：「二分音符对我来说还是像四分」或「F 和 G 会搞混。」这句话才是作业，不是高分。",
        bullets: [
          "5–10 分钟，然后回到曲子",
          "下一次点击之前，先大声说出时值或音名",
          "记下一个还不稳的点，下周课上问",
        ],
      },
      {
        heading: "Mianbao 在教室里，也在屏幕上",
        body:
          "游戏首页那只橘白猫，就是两节课之间坐在纸箱仓库上的 Mianbao。他喜欢学生。游戏也是这个脾气：短、友善、为课程服务——不是另外一堆玩具。",
      },
    ],
    howTo: {
      name: "如何把工作室小游戏放进一周练琴",
      description: "四步流程，让给小孩的短游戏支持每周钢琴作业，而不是取代它。",
      totalTimeIso: "PT10M",
      steps: [
        {
          name: "先玩一轮短热身",
          text: "打开节拍游戏或「我是谁」，打开声音，在碰指定曲目之前只玩一轮。",
        },
        {
          name: "说出时值或音名",
          text: "大声说：「这是两拍」或「猫咪是 C」。不确定也可以说。",
        },
        {
          name: "写下同一个问题",
          text: "记下仍然撞在一起的那个时值或那个键。一个问题就够。",
        },
        {
          name: "带到下一节课",
          text: "在下一节一对一课上问这个问题，让游戏喂回课堂，而不是漂在旁边。",
        },
      ],
    },
    cta: {
      href: "/practice-games",
      label: "打开工作室游戏仓库",
      note: "每款上线游戏都有名字、截图和开始玩。建议打开声音。",
      gaEvent: "practice_game_hub_click",
      gaPlacement: "journal_games_article",
    },
    related: [
      { slug: "mianbao-practice-timer-for-kids", label: "面包练习计时：孩子更主动练琴" },
      { slug: "mianbao-studio-cat-employee-001", label: "认识招财猫 Mianbao，员工 001 号" },
    ],
  },
  "mianbao-studio-cat-employee-001": {
    slug: "mianbao-studio-cat-employee-001",
    title: "招财猫 Mianbao：工作室员工 001 号",
    description:
      "认识 Mianbao：库比蒂诺 Eric Liu 钢琴工作室一只非常亲人的橘白猫，非正式员工 001 号。他喜欢学生来访，也常留下来一起玩。",
    quickAnswer:
      "Mianbao 是工作室的橘白招财猫，也是非正式的员工 001 号。他非常亲人，喜欢学生来访，并常常留在教室里跟大家玩。试听的家庭会在库比蒂诺工作室见到他；他是这个房间气氛的一部分，不是摆拍道具。",
    datePublished: "2026-08-31",
    dateModified: "2026-08-31",
    category: "工作室日常",
    readingTimeMinutes: 4,
    keywords: [
      "钢琴工作室猫咪",
      "库比蒂诺钢琴工作室",
      "Eric Liu 钢琴工作室",
      "儿童钢琴课",
    ],
    intro:
      "试听前，家长通常会问技巧、时间，以及孩子能不能坐得住。然后他们会看见纸箱仓库上那只橘白猫。那是 Mianbao。这篇把他正式介绍一遍——因为他是花名册上的第一号员工，学生问他，比问指法编号还勤。",
    figures: [
      {
        src: "/studio/mianbao-warehouse.png",
        alt: "库比蒂诺 Eric Liu 钢琴工作室的橘白猫 Mianbao，坐在纸箱仓库造型的猫屋上",
        caption: "员工 001 号的工位：两节课之间，他最爱坐在仓库顶上。",
      },
      {
        src: "/studio/mianbao-carpet.png",
        alt: "Mianbao 趴在库比蒂诺钢琴工作室地毯上，身旁是落地镜",
        caption: "下班状态：趴在地毯上，但仍在门口能打招呼的范围内。",
      },
      {
        src: "/studio/mianbao-closeup.png",
        alt: "橘白招财猫 Mianbao 特写，白色前爪上有一小块橘色斑",
        caption: "辨认标记：白爪子上那一小块橘色。",
      },
      {
        src: "/studio/games/music-theory-hub.png",
        alt: "儿童乐理游戏首页，插画里的 Mianbao 坐在钢琴前，可选节拍游戏或我是谁",
        caption: "屏幕上同一张脸：节拍游戏和「我是谁」。",
      },
    ],
    sections: [
      {
        heading: "员工 001 号，是认真的",
        body:
          "Mianbao 是「面包」的意思。他是短毛橘白：头顶、背和尾巴偏橘，嘴筒、胸口和爪子偏白。叫他员工 001 号不是讲一次的玩笑，而是学生用来记住「谁负责前台」的方式。我负责上课。他负责迎接。",
      },
      {
        heading: "他很喜欢学生来访",
        body:
          "以工作室的猫来说，他格外亲人。学生进门时，他常常出现在门口，在开始的几分钟坐在旁边，或者在有人热身时趴在仓库上。对陌生房间紧张的孩子，往往会先跟他说话。这很有用。房间里一只冷静的动物不是课程大纲，但确实会让前十分钟容易一些。",
      },
      {
        heading: "来访家庭需要知道的事",
        body:
          "他友善，但不是道具。如果孩子对猫过敏，或害怕动物，请在试听前告诉我——那一小时我们会让他离开教室。如果孩子想打招呼，规则和家里一样：让他走过来，不追、手轻。他白色前爪上有一小块橘色，学生很喜欢找这块斑。",
        bullets: [
          "对猫过敏或怕动物，请提前说",
          "让 Mianbao 走向学生——未经询问不要抱起来",
          "他可能旁听一部分课，也可能整节课都在睡觉",
        ],
      },
      {
        heading: "练琴小游戏也是这张脸",
        body:
          "工作室每推出一款新的音乐小游戏，都由 Mianbao 出面邀请家庭去试。纸箱仓库不是为网站编的隐喻——他真的坐在上面。如果你在试听时见过他，回家再打开节拍游戏、「我是谁」或练琴计时，会认得屏幕上那只猫。",
      },
    ],
    related: [
      { slug: "mianbao-practice-timer-for-kids", label: "面包练习计时：孩子更主动练琴" },
      { slug: "piano-practice-games-for-kids", label: "工作室的音乐小游戏" },
    ],
  },
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
      "大多数成人练琴像读邮件：从头到尾、没有优先级。最昂贵的习惯是每天用原速把同一段从头到尾过一遍，然后期待自己变好。本文介绍我在库比蒂诺工作室教授的练习框架。",
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
