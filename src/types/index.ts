export interface IWord {
  id: string;
  date: string;
  word: string;
  wordTranslation: string;
  example: string;
  exampleTranslation: string;
  comment: string;
}

export interface ICategories {
  id: string;
  date: string;
  name: string;
  words: string[];
}
