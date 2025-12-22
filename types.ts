export interface OperaRole {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  silhouetteImage: string;
}

export interface Costume {
  id: string;
  roleId: string;
  name: string;
  imageUrl: string;
  isCorrect?: boolean;
}

export interface GameLevel {
  levelId: number;
  targetRole: OperaRole;
  options: Costume[];
}

export interface LyricChallenge {
  id: string;
  roleName: string; 
  playTitle: string; 
  chineseQuote: string;
  englishQuote: string;
}

export interface PersonalityQuestion {
  id: string;
  chineseText: string;
  englishText: string;
  options: {
    id: string;
    chineseText: string;
    englishText: string;
    typeWeights: Record<string, number>; // Maps result ID to weight
  }[];
}

export interface PersonalityResult {
  id: string;
  title: string;
  englishTitle: string;
  keywords: string[];
  englishKeywords: string[];
  chineseInterpretation: string;
  englishInterpretation: string;
  relatedOpera: string;
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  SUCCESS = 'SUCCESS',
  LOADING_AI = 'LOADING_AI',
  AI_REVEAL = 'AI_REVEAL',
  GAME_OVER = 'GAME_OVER'
}