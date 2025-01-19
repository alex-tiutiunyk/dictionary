import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { deleteWordFunc, getWordsFunc } from '../services/wordsService';
import { getAllWords } from '../redux/wordSlice';
import { IWord } from '../types';

const WordsListPage: React.FC = () => {
  // const [words, setWords] = React.useState<IWord[] | undefined>([]);
  // get user info from redux
  const user = useAppSelector((state) => state.user.value) as User;
  const userId = user.email as string;
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.value);

  React.useEffect(() => {
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  }, []);

  const deleteWord = async (wordId: string, userId: string): Promise<void> => {
    // delete word
    (await deleteWordFunc(wordId, userId, 'users', 'words')) as IWord[] | undefined;
    // get changed list of all words and dispatch new data
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  };

  return (
    <div>
      {words ? (
        <ul className='flex flex-col gap-2'>
          {words.map((word) => (
            <li key={word.id} className='flex justify-between  px-2 py-1 bg-gray-100'>
              <span>
                {word.word} - {word.wordTranslation}
              </span>
              <button
                type='button'
                className='border border-gray-700 px-0.5'
                onClick={() => deleteWord(word.id, userId)}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h1>List of Words</h1>
      )}
    </div>
  );
};

export default WordsListPage;
