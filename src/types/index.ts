export interface IWord {
  id: string;
  wordId: string;
  date: string;
  word: string;
  wordTranslation: string;
  example: string;
  exampleTranslation: string;
  comment: string;
}

export interface ICategories {
  id: string;
  categoryId: string;
  date: string;
  name: string;
  words: string[];
}
