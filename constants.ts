import { OperaRole, Costume, GameLevel, LyricChallenge } from './types';

export const ROLES: Record<string, OperaRole> = {
  FADAN: {
    id: 'fadan',
    name: 'Fa Dan',
    chineseName: '花旦',
    description: 'The young female lead, often characterized by intricate headdresses and embroidered robes.',
    // A classic Fadan in full costume
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Cantonese_Opera_actress.jpg/600px-Cantonese_Opera_actress.jpg',
  },
  SHENG: {
    id: 'sheng',
    name: 'Sheng',
    chineseName: '生',
    description: 'The male lead role, representing scholars, warriors, or officials.',
    // Replaced with a Warrior/General style image (with flags/kao) as requested
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Cantonese_Opera_Costume_Male_General.jpg/600px-Cantonese_Opera_Costume_Male_General.jpg',
  },
  JING: {
    id: 'jing',
    name: 'Jing',
    chineseName: '净',
    description: 'The painted face role, representing characters with bold personalities.',
    // A painted face character
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Cantonese_Opera_Face_Painting.jpg/600px-Cantonese_Opera_Face_Painting.jpg',
  },
  WUSHENG: {
    id: 'wusheng',
    name: 'Wu Sheng',
    chineseName: '武生',
    description: 'Martial male role, skilled in combat and acrobatics.',
    // Martial actor action shot
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Cantonese_Opera_General_Costume.jpg/600px-Cantonese_Opera_General_Costume.jpg', 
  },
  LAOSHENG: {
    id: 'laosheng',
    name: 'Lao Sheng',
    chineseName: '老生',
    description: 'Older male role, dignified and often wearing a beard.',
    // Older male with beard
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Cantonese_opera_actor.jpg/600px-Cantonese_opera_actor.jpg', 
  },
  XIAOSHENG: {
    id: 'xiaosheng',
    name: 'Xiao Sheng',
    chineseName: '小生',
    description: 'Young male scholar role, often without a beard and singing in falsetto.',
    // Scholar role
    silhouetteImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Cantonese_Opera_Scholar_Costume.jpg/600px-Cantonese_Opera_Scholar_Costume.jpg', 
  },
};

export const LEVELS: GameLevel[] = [
  {
    levelId: 1,
    targetRole: ROLES.FADAN,
    options: [
      { id: 'c1', roleId: 'wusheng', name: 'General Armor', imageUrl: '/public/images/general_armor.jpg' },
      { id: 'c2', roleId: 'fadan', name: 'Embroidered Robe', imageUrl: '/public/images/embroidered_robe.jpg' },
      { id: 'c3', roleId: 'sheng', name: 'Scholar Robe', imageUrl: '/public/images/scholar_robe.jpg' },
    ],
  },
  {
    levelId: 2,
    targetRole: ROLES.JING,
    options: [
      { id: 'c4', roleId: 'fadan', name: 'Water Sleeves', imageUrl: '/public/images/water_sleeves.jpg' },
      { id: 'c5', roleId: 'jing', name: 'Python Robe', imageUrl: '/public/images/python_robe.jpg' },
      { id: 'c6', roleId: 'sheng', name: 'Official Cap', imageUrl: '/public/images/official_cap.jpg' },
    ],
  },
  {
    levelId: 3,
    targetRole: ROLES.WUSHENG,
    options: [
      { id: 'c7', roleId: 'wusheng', name: 'Martial Armor (Kao)', imageUrl: '/public/images/martial_armor.jpg' },
      { id: 'c8', roleId: 'xiaosheng', name: 'Fan & Folded Hat', imageUrl: '/public/images/fan&folded_hat.jpg' },
      { id: 'c9', roleId: 'laosheng', name: 'Black Beard', imageUrl: '/public/images/black_beard.jpg' },
    ],
  },
  {
    levelId: 4,
    targetRole: ROLES.LAOSHENG,
    options: [
      { id: 'c10', roleId: 'wusheng', name: 'Flags (Kao Qi)', imageUrl: '/public/images/flags.jpg' },
      { id: 'c11', roleId: 'laosheng', name: 'Dignified Robe', imageUrl: '/public/images/dignified_robe.jpg' },
      { id: 'c12', roleId: 'fadan', name: 'Phoenix Crown', imageUrl: '/public/images/phoenix_crown.jpg' },
    ],
  },
  {
    levelId: 5,
    targetRole: ROLES.XIAOSHENG,
    options: [
      { id: 'c13', roleId: 'jing', name: 'Painted Mask', imageUrl: '/public/images/painted_mask.jpg' },
      { id: 'c14', roleId: 'xiaosheng', name: 'Scholar Hat', imageUrl: '/public/images/scholar_hat.jpg' },
      { id: 'c15', roleId: 'laosheng', name: 'Walking Staff', imageUrl: '/public/images/walking_staff.jpg' },
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