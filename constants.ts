import { OperaRole, Costume, GameLevel } from './types';

export const ROLES: Record<string, OperaRole> = {
  FADAN: {
    id: 'fadan',
    name: 'Fa Dan',
    chineseName: '花旦',
    description: 'The young female lead, often characterized by intricate headdresses and embroidered robes.',
    silhouetteImage: 'https://picsum.photos/id/64/400/600',
  },
  SHENG: {
    id: 'sheng',
    name: 'Sheng',
    chineseName: '生',
    description: 'The male lead role, representing scholars, warriors, or officials.',
    silhouetteImage: 'https://picsum.photos/id/453/400/600',
  },
  JING: {
    id: 'jing',
    name: 'Jing',
    chineseName: '净',
    description: 'The painted face role, representing characters with bold personalities.',
    silhouetteImage: 'https://picsum.photos/id/338/400/600',
  },
  WUSHENG: {
    id: 'wusheng',
    name: 'Wu Sheng',
    chineseName: '武生',
    description: 'Martial male role, skilled in combat and acrobatics.',
    silhouetteImage: 'https://picsum.photos/id/1060/400/600', 
  },
  LAOSHENG: {
    id: 'laosheng',
    name: 'Lao Sheng',
    chineseName: '老生',
    description: 'Older male role, dignified and often wearing a beard.',
    silhouetteImage: 'https://picsum.photos/id/1005/400/600', 
  },
  XIAOSHENG: {
    id: 'xiaosheng',
    name: 'Xiao Sheng',
    chineseName: '小生',
    description: 'Young male scholar role, often without a beard and singing in falsetto.',
    silhouetteImage: 'https://picsum.photos/id/1011/400/600', 
  },
};

export const LEVELS: GameLevel[] = [
  {
    levelId: 1,
    targetRole: ROLES.FADAN,
    options: [
      { id: 'c1', roleId: 'wusheng', name: 'General Armor', imageUrl: 'https://picsum.photos/id/106/200/200' },
      { id: 'c2', roleId: 'fadan', name: 'Embroidered Robe', imageUrl: 'https://picsum.photos/id/325/200/200' },
      { id: 'c3', roleId: 'sheng', name: 'Scholar Robe', imageUrl: 'https://picsum.photos/id/195/200/200' },
    ],
  },
  {
    levelId: 2,
    targetRole: ROLES.JING,
    options: [
      { id: 'c4', roleId: 'fadan', name: 'Water Sleeves', imageUrl: 'https://picsum.photos/id/204/200/200' },
      { id: 'c5', roleId: 'jing', name: 'Python Robe', imageUrl: 'https://picsum.photos/id/234/200/200' },
      { id: 'c6', roleId: 'sheng', name: 'Official Cap', imageUrl: 'https://picsum.photos/id/22/200/200' },
    ],
  },
  {
    levelId: 3,
    targetRole: ROLES.WUSHENG,
    options: [
      { id: 'c7', roleId: 'wusheng', name: 'Martial Armor (Kao)', imageUrl: 'https://picsum.photos/id/1055/200/200' },
      { id: 'c8', roleId: 'xiaosheng', name: 'Fan & Folded Hat', imageUrl: 'https://picsum.photos/id/1015/200/200' },
      { id: 'c9', roleId: 'laosheng', name: 'Black Beard', imageUrl: 'https://picsum.photos/id/1020/200/200' },
    ],
  },
  {
    levelId: 4,
    targetRole: ROLES.LAOSHENG,
    options: [
      { id: 'c10', roleId: 'wusheng', name: 'Flags (Kao Qi)', imageUrl: 'https://picsum.photos/id/1040/200/200' },
      { id: 'c11', roleId: 'laosheng', name: 'Dignified Robe', imageUrl: 'https://picsum.photos/id/1033/200/200' },
      { id: 'c12', roleId: 'fadan', name: 'Phoenix Crown', imageUrl: 'https://picsum.photos/id/1035/200/200' },
    ],
  },
  {
    levelId: 5,
    targetRole: ROLES.XIAOSHENG,
    options: [
      { id: 'c13', roleId: 'jing', name: 'Painted Mask', imageUrl: 'https://picsum.photos/id/1042/200/200' },
      { id: 'c14', roleId: 'xiaosheng', name: 'Scholar Hat', imageUrl: 'https://picsum.photos/id/1044/200/200' },
      { id: 'c15', roleId: 'laosheng', name: 'Walking Staff', imageUrl: 'https://picsum.photos/id/1048/200/200' },
    ],
  },
];
