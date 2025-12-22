import { OperaRole, Costume, GameLevel, LyricChallenge, PersonalityQuestion, PersonalityResult } from './types';

// Previous constants remain the same...
export const ROLES: Record<string, OperaRole> = {
  FADAN: {
    id: 'fadan',
    name: 'Fa Dan',
    chineseName: '花旦',
    description: 'The young female lead, often characterized by intricate headdresses and embroidered robes.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Cantonese_Opera_actress.jpg/600px-Cantonese_Opera_actress.jpg',
  },
  SHENG: {
    id: 'sheng',
    name: 'Sheng',
    chineseName: '生',
    description: 'The male lead role, representing scholars, warriors, or officials.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cantonese_Opera_Costume_Male_General.jpg/600px-Cantonese_Opera_Costume_Male_General.jpg',
  },
  JING: {
    id: 'jing',
    name: 'Jing',
    chineseName: '净',
    description: 'The painted face role, representing characters with bold personalities.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cantonese_Opera_Face_Painting.jpg/600px-Cantonese_Opera_Face_Painting.jpg',
  },
  WUSHENG: {
    id: 'wusheng',
    name: 'Wu Sheng',
    chineseName: '武生',
    description: 'Martial male role, skilled in combat and acrobatics.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cantonese_Opera_General_Costume.jpg/600px-Cantonese_Opera_General_Costume.jpg', 
  },
  LAOSHENG: {
    id: 'laosheng',
    name: 'Lao Sheng',
    chineseName: '老生',
    description: 'Older male role, dignified and often wearing a beard.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cantonese_opera_actor.jpg/600px-Cantonese_opera_actor.jpg', 
  },
  XIAOSHENG: {
    id: 'xiaosheng',
    name: 'Xiao Sheng',
    chineseName: '小生',
    description: 'Young male scholar role, often without a beard and singing in falsetto.',
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cantonese_Opera_Scholar_Costume.jpg/600px-Cantonese_Opera_Scholar_Costume.jpg', 
  },
};

export const LEVELS: GameLevel[] = [
  {
    levelId: 1,
    targetRole: ROLES.FADAN,
    options: [
      { id: 'c1', roleId: 'wusheng', name: 'General Armor', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Cantonese_Opera_General_Armor.jpg/320px-Cantonese_Opera_General_Armor.jpg' },
      { id: 'c2', roleId: 'fadan', name: 'Embroidered Robe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cantonese_Opera_Costume_Female.jpg/320px-Cantonese_Opera_Costume_Female.jpg' },
      { id: 'c3', roleId: 'sheng', name: 'Scholar Robe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Cantonese_Opera_Scholar_Robe.jpg/320px-Cantonese_Opera_Scholar_Robe.jpg' },
    ],
  },
  {
    levelId: 2,
    targetRole: ROLES.JING,
    options: [
      { id: 'c4', roleId: 'fadan', name: 'Water Sleeves', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Water_Sleeves_Cantonese_Opera.jpg/320px-Water_Sleeves_Cantonese_Opera.jpg' },
      { id: 'c5', roleId: 'jing', name: 'Python Robe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Cantonese_Opera_Jing_Role.jpg/320px-Cantonese_Opera_Jing_Role.jpg' },
      { id: 'c6', roleId: 'sheng', name: 'Official Cap', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Cantonese_Opera_Hat.jpg/320px-Cantonese_Opera_Hat.jpg' },
    ],
  },
  {
    levelId: 3,
    targetRole: ROLES.WUSHENG,
    options: [
      { id: 'c7', roleId: 'wusheng', name: 'Martial Armor (Kao)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Cantonese_Opera_Warrior.jpg/320px-Cantonese_Opera_Warrior.jpg' },
      { id: 'c8', roleId: 'xiaosheng', name: 'Fan & Folded Hat', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Folding_fan_in_opera.jpg/320px-Folding_fan_in_opera.jpg' },
      { id: 'c9', roleId: 'laosheng', name: 'Black Beard', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Cantonese_Opera_Beard.jpg/320px-Cantonese_Opera_Beard.jpg' },
    ],
  },
  {
    levelId: 4,
    targetRole: ROLES.LAOSHENG,
    options: [
      { id: 'c10', roleId: 'wusheng', name: 'Flags (Kao Qi)', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Opera_Flags_Back.jpg/320px-Opera_Flags_Back.jpg' },
      { id: 'c11', roleId: 'laosheng', name: 'Dignified Robe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Cantonese_Opera_Emperor.jpg/320px-Cantonese_Opera_Emperor.jpg' },
      { id: 'c12', roleId: 'fadan', name: 'Phoenix Crown', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Cantonese_Opera_Headdress.jpg/320px-Cantonese_Opera_Headdress.jpg' },
    ],
  },
  {
    levelId: 5,
    targetRole: ROLES.XIAOSHENG,
    options: [
      { id: 'c13', roleId: 'jing', name: 'Painted Mask', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Cantonese_Opera_Mask.jpg/320px-Cantonese_Opera_Mask.jpg' },
      { id: 'c14', roleId: 'xiaosheng', name: 'Scholar Hat', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Cantonese_Opera_Scholar_Hat.jpg/320px-Cantonese_Opera_Scholar_Hat.jpg' },
      { id: 'c15', roleId: 'laosheng', name: 'Walking Staff', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Cantonese_Opera_Prop.jpg/320px-Cantonese_Opera_Prop.jpg' },
    ],
  },
];

export const LYRIC_CHALLENGES: LyricChallenge[] = [
  {
    id: 'l1',
    roleName: 'Princess Changping (长平公主)',
    playTitle: 'The Flower Princess (帝女花)',
    chineseQuote: '帝女花带泪上香，愿丧生回谢爹娘。',
    englishQuote: 'The Princess offers incense in tears, Willing to give her life to repay her parents’ grace.'
  },
  {
    id: 'l2',
    roleName: 'Zhou Shixian (周世显)',
    playTitle: 'The Flower Princess (帝女花)',
    chineseQuote: '寸心盼望能同合葬，鸳鸯侣相偎傍。',
    englishQuote: 'With all my heart I long to be buried together, Like paired mandarin ducks forever side by side.'
  },
  {
    id: 'l3',
    roleName: 'Princess Changping (长平公主)',
    playTitle: 'The Flower Princess (帝女花)',
    chineseQuote: '再合巹交杯墓穴作新房。',
    englishQuote: 'Let us share the bridal cups once more, And take the grave as our wedding chamber.'
  },
  {
    id: 'l4',
    roleName: 'Princess Changping (长平公主)',
    playTitle: 'The Flower Princess (帝女花)',
    chineseQuote: '六代繁华三日散，一杯心血字七行。',
    englishQuote: 'Six dynasties’ splendor fades within three days; Seven lines are written with a cup of blood.'
  },
  {
    id: 'l5',
    roleName: 'Li Yi (李益)',
    playTitle: 'The Purple Hairpin (紫钗记)',
    chineseQuote: '此亦缘分也，真真是缘分也。',
    englishQuote: 'This, too, is fate— Truly, it is fate.'
  },
  {
    id: 'l6',
    roleName: 'Huo Xiaoyu (霍小玉)',
    playTitle: 'The Purple Hairpin (紫钗记)',
    chineseQuote: '借钗作谜问，愿拜石榴裙。',
    englishQuote: 'I borrow the hairpin as a riddle, Willing to bow beneath the pomegranate skirt.'
  },
  {
    id: 'l7',
    roleName: 'Huo Xiaoyu (霍小玉)',
    playTitle: 'The Purple Hairpin (紫钗记)',
    chineseQuote: '一钗一诺，岂可轻忘。',
    englishQuote: 'One hairpin, one vow— How could it ever be forgotten?'
  },
  {
    id: 'l8',
    roleName: 'Yellow-shirted Guest (黄衫客)',
    playTitle: 'The Purple Hairpin (紫钗记)',
    chineseQuote: '路见不平，岂能袖手旁观。',
    englishQuote: 'How could one stand aside When injustice is met upon the road?'
  }
];

export const PERSONALITY_RESULTS: PersonalityResult[] = [
  {
    id: 'changping',
    title: '长平公主型人格',
    englishTitle: 'Princess Changping Type',
    keywords: ['责任', '忠贞', '克制'],
    englishKeywords: ['Duty', 'Loyalty', 'Restraint'],
    chineseInterpretation: '你重视信念与责任，即使情感深沉，也选择承担与克制。在关键时刻，你更愿意为“意义”而牺牲个人幸福。',
    englishInterpretation: 'You value principles and responsibility. Even when emotions run deep, you choose restraint and sacrifice for a greater cause.',
    relatedOpera: 'Princess Changping《帝女花》'
  },
  {
    id: 'xiaoyu',
    title: '霍小玉型人格',
    englishTitle: 'Huo Xiaoyu Type',
    keywords: ['深情', '敏感', '等待'],
    englishKeywords: ['Devotion', 'Sensitivity', 'Waiting'],
    chineseInterpretation: '你在情感中全情投入，相信承诺，却也容易被伤害。你的深情，是你最动人的地方。',
    englishInterpretation: 'You love wholeheartedly and believe in promises, but your sincerity also makes you vulnerable.',
    relatedOpera: 'The Purple Hairpin《紫钗记》'
  },
  {
    id: 'huiniang',
    title: '李慧娘型人格',
    englishTitle: 'Li Huiniang Type',
    keywords: ['执念', '反抗', '轮回'],
    englishKeywords: ['Obsession', 'Resistance', 'Rebirth'],
    chineseInterpretation: '你不轻易放弃，即使命运残酷，也要为真心讨回公道。',
    englishInterpretation: 'You refuse to let go. Even against injustice, you fight for the truth of your emotions.',
    relatedOpera: 'The Reincarnation of the Red Plum Blossom《再世红梅记》'
  },
  {
    id: 'liyi',
    title: '李益型人格',
    englishTitle: 'Li Yi Type',
    keywords: ['现实', '犹疑', '退让'],
    englishKeywords: ['Pragmatism', 'Hesitation', 'Withdrawal'],
    chineseInterpretation: '你并非无情，而是在现实压力下容易妥协。',
    englishInterpretation: 'You are not heartless, but reality often pushes you to retreat when it matters most.',
    relatedOpera: 'The Purple Hairpin《紫钗记》'
  },
  {
    id: 'liniang',
    title: '杜丽娘型人格',
    englishTitle: 'Du Liniang Type',
    keywords: ['浪漫', '觉醒', '理想'],
    englishKeywords: ['Romanticism', 'Awakening', 'Idealism'],
    chineseInterpretation: '你相信情感的真实性，并敢于为此觉醒。',
    englishInterpretation: 'You believe in the authenticity of love and dare to awaken for it.',
    relatedOpera: 'The Peony Pavilion adaptation'
  },
  {
    id: 'suzhen',
    title: '白素贞型人格',
    englishTitle: 'Bai Suzhen Type',
    keywords: ['守护', '牺牲', '成全'],
    englishKeywords: ['Protection', 'Sacrifice', 'Fulfillment'],
    chineseInterpretation: '你认为爱意味着守护，哪怕需要付出巨大的代价。',
    englishInterpretation: 'You believe love means protecting others, even at the cost of yourself.',
    relatedOpera: 'The Legend of the White Snake'
  }
];

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 'q1',
    chineseText: '当爱情与你的人生责任发生冲突时，你更可能：',
    englishText: 'When love conflicts with responsibility, you are more likely to:',
    options: [
      { id: 'a', chineseText: '为更大的责任放下个人情感', englishText: 'Give up personal love for a greater duty', typeWeights: { changping: 3, suzhen: 1 } },
      { id: 'b', chineseText: '坚持爱情，哪怕付出极大代价', englishText: 'Hold on to love, no matter the cost', typeWeights: { xiaoyu: 2, huiniang: 3, liniang: 2 } },
      { id: 'c', chineseText: '在现实压力下选择退让', englishText: 'Step back under real-life pressure', typeWeights: { liyi: 4 } },
      { id: 'd', chineseText: '寻找折中方案，尽量两全', englishText: 'Seek a compromise between both', typeWeights: { suzhen: 2, liniang: 1 } },
    ]
  },
  {
    id: 'q2',
    chineseText: '面对误会或流言，你的第一反应是：',
    englishText: 'When facing misunderstanding or rumors, your first reaction is to:',
    options: [
      { id: 'a', chineseText: '隐忍承受，相信时间', englishText: 'Endure quietly and trust time', typeWeights: { changping: 3, suzhen: 1 } },
      { id: 'b', chineseText: '立刻抗争，要求澄清', englishText: 'Fight back immediately and demand clarification', typeWeights: { huiniang: 4, liniang: 1 } },
      { id: 'c', chineseText: '心灰意冷，选择沉默', englishText: 'Feel disheartened and remain silent', typeWeights: { xiaoyu: 2, liyi: 2 } },
      { id: 'd', chineseText: '冷静观察，等待时机', englishText: 'Observe calmly and wait for the right moment', typeWeights: { suzhen: 3 } },
    ]
  },
  {
    id: 'q3',
    chineseText: '你更认同哪一种情感观？',
    englishText: 'Which view of love do you relate to most?',
    options: [
      { id: 'a', chineseText: '情感应服从责任与秩序', englishText: 'Love should submit to duty and order', typeWeights: { changping: 4, liyi: 1 } },
      { id: 'b', chineseText: '情感高于一切，生死不渝', englishText: 'Love is above all, even life and death', typeWeights: { xiaoyu: 2, huiniang: 3, liniang: 3 } },
      { id: 'c', chineseText: '情感容易被现实摧毁', englishText: 'Love is fragile and easily broken by reality', typeWeights: { liyi: 4 } },
      { id: 'd', chineseText: '情感需要理性与判断守护', englishText: 'Love needs reason and discernment to survive', typeWeights: { suzhen: 3, changping: 1 } },
    ]
  },
  {
    id: 'q4',
    chineseText: '当命运对你极不公平时，你会：',
    englishText: 'When fate treats you unfairly, you tend to:',
    options: [
      { id: 'a', chineseText: '接受现实，坚守内心', englishText: 'Accept it and stay true to yourself', typeWeights: { changping: 4, xiaoyu: 1 } },
      { id: 'b', chineseText: '与命运对抗，绝不低头', englishText: 'Resist fate and refuse to surrender', typeWeights: { huiniang: 4, liniang: 2 } },
      { id: 'c', chineseText: '被打倒，但仍放不下', englishText: 'Be defeated, yet unable to let go', typeWeights: { xiaoyu: 3, liyi: 2 } },
      { id: 'd', chineseText: '等待机会，试图翻转', englishText: 'Wait for an opportunity to turn things around', typeWeights: { suzhen: 4 } },
    ]
  },
  {
    id: 'q5',
    chineseText: '你更容易被哪种人吸引？',
    englishText: 'You are more likely to be drawn to someone who is:',
    options: [
      { id: 'a', chineseText: '有担当、有责任感', englishText: 'Responsible and reliable', typeWeights: { changping: 3, suzhen: 2 } },
      { id: 'b', chineseText: '深情而执着', englishText: 'Deeply devoted and persistent', typeWeights: { xiaoyu: 4, huiniang: 2 } },
      { id: 'c', chineseText: '温柔但脆弱', englishText: 'Gentle but emotionally fragile', typeWeights: { liyi: 3, liniang: 1 } },
      { id: 'd', chineseText: '聪慧、懂得进退', englishText: 'Intelligent and socially perceptive', typeWeights: { suzhen: 3, changping: 1 } },
    ]
  },
  {
    id: 'q6',
    chineseText: '在亲密关系中，你最害怕的是：',
    englishText: 'In intimate relationships, what do you fear most?',
    options: [
      { id: 'a', chineseText: '背叛信念', englishText: 'Betraying your values', typeWeights: { changping: 4, suzhen: 1 } },
      { id: 'b', chineseText: '辜负深情', englishText: 'Failing sincere devotion', typeWeights: { huiniang: 3, liniang: 2 } },
      { id: 'c', chineseText: '被遗忘、被抛弃', englishText: 'Being forgotten or abandoned', typeWeights: { xiaoyu: 4, liyi: 1 } },
      { id: 'd', chineseText: '看错人、信错人', englishText: 'Trusting the wrong person', typeWeights: { liyi: 3, suzhen: 2 } },
    ]
  },
  {
    id: 'q7',
    chineseText: '如果结局无法圆满，你更能接受：',
    englishText: 'If a happy ending is impossible, you would rather accept:',
    options: [
      { id: 'a', chineseText: '以牺牲成全意义', englishText: 'Sacrifice yourself for meaning', typeWeights: { changping: 4, suzhen: 2 } },
      { id: 'b', chineseText: '为爱走向极端', englishText: 'Going to extremes for love', typeWeights: { huiniang: 4, liniang: 1 } },
      { id: 'c', chineseText: '留下遗憾独自承受', englishText: 'Living with regret alone', typeWeights: { xiaoyu: 4, liyi: 2 } },
      { id: 'd', chineseText: '经历轮回，等待重来', englishText: 'Reincarnation and a second chance', typeWeights: { liniang: 4, suzhen: 1 } },
    ]
  },
  {
    id: 'q8',
    chineseText: '你更接近哪一种人生叙事？',
    englishText: 'Which type of life story resonates with you most?',
    options: [
      { id: 'a', chineseText: '庄严而悲壮', englishText: 'Solemn and tragic', typeWeights: { changping: 4, suzhen: 1 } },
      { id: 'b', chineseText: '凄美而极致', englishText: 'Beautifully heartbreaking', typeWeights: { xiaoyu: 3, huiniang: 3 } },
      { id: 'c', chineseText: '现实而哀伤', englishText: 'Realistic and sorrowful', typeWeights: { liyi: 4, xiaoyu: 1 } },
      { id: 'd', chineseText: '曲折但终会昭雪', englishText: 'Twisted, yet ultimately redeemed', typeWeights: { suzhen: 3, liniang: 3 } },
    ]
  }
];