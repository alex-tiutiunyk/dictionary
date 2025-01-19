import React from 'react';
import { IWord } from '../types';
import { CornerRightDown } from 'lucide-react';
import { deleteWordFunc, getWordsFunc } from '../services/wordsService';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getAllWords } from '../redux/wordSlice';
import { User } from 'firebase/auth';

interface WordItemProps {
  word: IWord;
}

const WordItem = ({ word }: WordItemProps) => {
  const user = useAppSelector((state) => state.user.value) as User;
  const userId = user.email as string;
  const dispatch = useAppDispatch();

  const deleteWord = async (wordId: string, userId: string): Promise<void> => {
    // delete word
    (await deleteWordFunc(wordId, userId, 'users', 'words')) as IWord[] | undefined;
    // get changed list of all words and dispatch new data
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  };

  return (
    <li key={word.id} className='flex justify-between  px-2 py-1 bg-gray-100'>
      <div>
        {word.word} - <span className='text-indigo-500'>{word.wordTranslation}</span>
      </div>
      <div className='flex gap-2'>
        <button type='button' className='border border-gray-700 px-0.5 text-red-600'>
          <CornerRightDown />
        </button>
        <button
          type='button'
          className='border border-gray-700 px-0.5'
          onClick={() => deleteWord(word.id, userId)}
        >
          delete
        </button>
      </div>
    </li>
  );
};

export default WordItem;
