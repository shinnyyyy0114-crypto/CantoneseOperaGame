export interface OperaRole {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  silhouetteImage: string; // URL for the silhouette
}

export interface Costume {
  id: string;
  roleId: string; // The correct match
  name: string;
  imageUrl: string;
  isCorrect?: boolean; // For visual feedback
}

export interface GameLevel {
  levelId: number;
  targetRole: OperaRole;
  options: Costume[];
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  SUCCESS = 'SUCCESS',
  LOADING_AI = 'LOADING_AI',
  AI_REVEAL = 'AI_REVEAL',
  GAME_OVER = 'GAME_OVER'
}
