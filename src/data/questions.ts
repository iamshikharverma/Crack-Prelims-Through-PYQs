export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
  year: number;
  topic?: string;
  category?: string;
}

export { polityQuestions } from './polity';
export { economyQuestions } from './economy';
export { ancientHistoryQuestions } from './ancient_history';
export { medievalHistoryQuestions } from './medieval_history';
export { artCultureQuestions } from './art_culture';
export { modernHistoryQuestions } from './modern_history';
export { geographyQuestions } from './geography';
export { environmentQuestions } from './environment';
export { scienceTechQuestions } from './science_tech';
