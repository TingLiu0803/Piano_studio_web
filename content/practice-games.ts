import type { Locale } from "@/content/site";

/** Locale-rooted path for the first-party games warehouse. */
export const PRACTICE_GAMES_PATH = "/practice-games";

/** Public game app (kids: beats + note names). */
export const GAMES_APP_URL = "https://music-game-flax.vercel.app/";

/**
 * Studio follow-up observation (not a controlled study). Interpolate this
 * number everywhere the claim appears so EN / 中文 never drift.
 */
export const extraFocusMinutes = 15;

export const mianbaoPhoto = {
  src: "/studio/mianbao-warehouse.png",
  alt: "Mianbao, the orange and white studio cat at Eric Liu Piano Studio in Cupertino, sitting on a cardboard warehouse playhouse",
} as const;

export type PracticeGame = {
  id: string;
  url: string;
  title: Record<Locale, string>;
  skill: Record<Locale, string>;
  audience: Record<Locale, string>;
  screenshot: { src: string; alt: Record<Locale, string> };
};

export const practiceGames: PracticeGame[] = [
  {
    id: "beat-game",
    url: "https://music-game-flax.vercel.app/#beat",
    title: {
      en: "Beat Game",
      zh: "节拍游戏 Beat Game",
    },
    skill: {
      en: "Learn note values and tap the rhythm — how long a note lasts, then clap it back.",
      zh: "认识音符时值并跟着拍节奏：这个音要停多久，再把它拍出来。",
    },
    audience: {
      en: "Built for children in piano lessons. Short rounds; no music-theory jargon required.",
      zh: "为上钢琴课的孩子做的。每轮很短，不需要先懂乐理名词。",
    },
    screenshot: {
      src: "/studio/games/beat-game.png",
      alt: {
        en: "Beat Game screenshot from Eric Liu Piano Studio: a child taps 1–4 to match a note value",
        zh: "Eric Liu 钢琴工作室节拍游戏截图：孩子点 1–4 来匹配音符时值",
      },
    },
  },
  {
    id: "who-am-i",
    url: "https://music-game-flax.vercel.app/#keyboard",
    title: {
      en: "Who Am I?",
      zh: "我是谁 Who Am I?",
    },
    skill: {
      en: "Learn piano note names with animals (Cat = C) then tap the matching key. Later: find position, melody games, and compose.",
      zh: "用小动物记琴键音名（猫咪 = C），再点对应的键。之后还有找位置、旋律游戏和作曲。",
    },
    audience: {
      en: "The same kids title: remember names, then play simple songs like Twinkle Twinkle.",
      zh: "同一套儿童游戏：先记住音名，再弹小星星等儿歌。",
    },
    screenshot: {
      src: "/studio/games/who-am-i.png",
      alt: {
        en: "Who Am I? screenshot from Eric Liu Piano Studio: animals mapped to piano keys C through B",
        zh: "Eric Liu 钢琴工作室「我是谁」游戏截图：小动物对应 C 到 B 的琴键",
      },
    },
  },
];

export const firstPracticeGame = practiceGames[0];

export type PracticeGamesCopy = {
  navLabel: string;
  seo: { title: string; description: string };
  badge: string;
  h1: string;
  intro: string;
  quickAnswer: string;
  factsTitle: string;
  factsEyebrow: string;
  facts: string[];
  catalogEyebrow: string;
  catalogTitle: string;
  catalogSubtitle: string;
  playCta: string;
  playNote: string;
  inviteEyebrow: string;
  inviteTitle: string;
  inviteBody: string;
  invitePrimaryCta: string;
  invitePlayCta: string;
  mianbaoCaption: string;
  howWeUseTitle: string;
  howWeUseBody: string;
  howWeUseBullets: string[];
};

export const practiceGamesCopy: Record<Locale, PracticeGamesCopy> = {
  en: {
    navLabel: "Games",
    seo: {
      title: "Kids Piano Games | Beats & Note Names | Cupertino Studio",
      description: `A warehouse of studio-made piano games for kids at Eric Liu Piano Studio in Cupertino. Live now: Beat Game and Who Am I? In follow-ups, focused lesson time increased by about ${extraFocusMinutes} minutes on average. Free trial.`,
    },
    badge: "Studio game warehouse",
    h1: "Piano games for kids: beats, note names, and more titles to come",
    intro:
      "This page is the studio's game warehouse. Each card is a named title with a screenshot. New games will be added here as they ship — you do not need a new email each time. They sit beside private 1:1 lessons, not instead of them.",
    quickAnswer: `Eric Liu Piano Studio regularly releases homemade music games for children. Live now: Beat Game (note values and rhythm) and Who Am I? (note names on the piano, then children's songs). In parent follow-ups, focused lesson time increased by about ${extraFocusMinutes} minutes on average, and willingness to practice at home improved. More titles will appear in this warehouse. Games supplement one-on-one teaching — they do not replace it.`,
    factsTitle: "Facts at a glance",
    factsEyebrow: "Studio observations",
    facts: [
      `Follow-up observation: about ${extraFocusMinutes} extra minutes of focused lesson time, on average`,
      "Parent follow-ups also reported a stronger willingness to practice at home",
      "This page is a warehouse: every live title has a name and a screenshot",
      "Live now: Beat Game and Who Am I? — built for kids, not advanced theory quizzes",
      "Used as a short, named task next to the weekly assignment — not a substitute for 1:1 lessons",
      "Free trial lesson still the way to see how this fits your child",
    ],
    catalogEyebrow: "Warehouse",
    catalogTitle: "Games you can play now",
    catalogSubtitle:
      "Two titles are live. The next game will show up on this same shelf — name, screenshot, and a play button.",
    playCta: "Play this game",
    playNote: "Opens in a new tab. Works on a phone or a computer; sound on helps.",
    inviteEyebrow: "Employee #001",
    inviteTitle: "Mianbao will take you to the game warehouse",
    inviteBody: `Mianbao is the studio's people-loving orange-and-white cat. The kids' games start with beats and note names — short rounds, then back to the piece. Families who tried them reported about ${extraFocusMinutes} extra minutes of focused lesson time.`,
    invitePrimaryCta: "See the games",
    invitePlayCta: "Open the kids' games",
    mianbaoCaption:
      "Mianbao (Employee #001) on his warehouse playhouse at the Cupertino studio.",
    howWeUseTitle: "How games show up in a lesson week",
    howWeUseBody:
      "A game is a named five-to-ten-minute task, not open-ended screen time. Beat Game for values and pulse; Who Am I? for note names. Then close the tab and play the assigned piece.",
    howWeUseBullets: [
      "Use it as a warm-up before the assigned piece, not instead of the piece",
      "Keep a round short enough that attention stays high",
      "If a note value or a key name is still fuzzy, bring that one question to the next lesson",
    ],
  },
  zh: {
    navLabel: "小游戏",
    seo: {
      title: "儿童钢琴小游戏｜节拍与音名｜库比蒂诺工作室",
      description: `Eric Liu 钢琴工作室的儿童练琴游戏仓库。现已上线：节拍游戏、我是谁（音名）。回访观察：小孩上课专注时间平均约多 ${extraFocusMinutes} 分钟。提供免费试听。`,
    },
    badge: "工作室游戏仓库",
    h1: "儿童钢琴小游戏：先认节拍和音名，后面还会继续上新",
    intro:
      "这一页是工作室的游戏仓库。每张卡片都有名字和截图。以后每出新游戏都会摆在这里，不用再翻邮件。小游戏放在一对一钢琴课旁边用——不是用来取代私教。",
    quickAnswer: `工作室会定期推出给小孩玩的自制音乐小游戏。现在可以玩的是：节拍游戏（音符时值与节奏），以及「我是谁」（用小动物记音名，再弹儿歌）。根据家长回访，上课专注时间平均约多了 ${extraFocusMinutes} 分钟，在家练琴意愿也有提升。后续新游戏都会出现在这个仓库里。小游戏是一对一教学的补充，不是替代。`,
    factsTitle: "一眼速览",
    factsEyebrow: "工作室观察",
    facts: [
      `回访观察：上课专注时间平均约多 ${extraFocusMinutes} 分钟`,
      "家长回访也提到，在家练琴的意愿有所提升",
      "这一页是仓库：每款上线游戏都有名字和截图",
      "现已上线：节拍游戏、我是谁——给小孩玩，不是进阶乐理测验",
      "作为每周作业旁边的短任务使用，不替代一对一课程",
      "想看它如何嵌进真实课表，仍建议先免费试听",
    ],
    catalogEyebrow: "仓库",
    catalogTitle: "现在可以玩的游戏",
    catalogSubtitle:
      "目前上架两款。下一款也会出现在同一层货架上——名字、截图、开始玩。",
    playCta: "打开这款游戏",
    playNote: "将在新标签页打开。手机或电脑都可以；建议打开声音。",
    inviteEyebrow: "员工 001 号",
    inviteTitle: "招财猫 Mianbao 带你去游戏仓库",
    inviteBody: `Mianbao 是工作室一只非常亲人的橘白猫。给小孩的游戏从节拍和音名开始：短短一轮，再回到曲子。试过的家庭在回访里提到，上课专注时间大约多了 ${extraFocusMinutes} 分钟。`,
    invitePrimaryCta: "查看小游戏",
    invitePlayCta: "打开儿童小游戏",
    mianbaoCaption: "员工 001 号 Mianbao 坐在库比蒂诺工作室的纸箱仓库上。",
    howWeUseTitle: "小游戏怎么放进一周功课",
    howWeUseBody:
      "游戏是一个有名字的 5–10 分钟任务，不是打开屏幕随便玩。节拍游戏练时值和拍子；「我是谁」练音名。然后关掉标签，去弹这周的曲子。",
    howWeUseBullets: [
      "当作曲目前的热身，而不是取代曲目",
      "每轮保持够短，注意力才撑得住",
      "如果时值或音名还分不清，把那一个问题带到下一节课",
    ],
  },
};

export function getPracticeGamesCopy(locale: Locale): PracticeGamesCopy {
  return practiceGamesCopy[locale];
}
