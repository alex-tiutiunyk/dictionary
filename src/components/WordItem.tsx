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
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const user = useAppSelector((state) => state.user.value) as User;
  const userId = user.email as string;
  const dispatch = useAppDispatch();

  const deleteWord = async (wordId: string, userId: string): Promise<void> => {
    // delete word
    (await deleteWordFunc(wordId, userId, 'users', 'words')) as IWord[] | undefined;
    // get changed list of all words and dispatch new data
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  };

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li key={word.id}>
      <div className='flex justify-between px-2 py-1 bg-gray-100'>
        <div>
          {word.word} - <span className='text-indigo-500'>{word.wordTranslation}</span>
        </div>
        <div className='flex gap-2'>
          <button
            type='button'
            className={`border border-gray-700 px-0.5 text-red-600 ${
              !word.example || !word.exampleTranslation || !word.comment
                ? 'opacity-40 cursor-default'
                : ''
            }`}
            onClick={handleOpen}
          >
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
      </div>
      {isOpen && (word.example || word.exampleTranslation || word.comment) && (
        <div className='bg-gray-50 px-2 py-1'>
          {word.example && (
            <p>
              <b>Example:</b> {word.example}
            </p>
          )}
          {word.exampleTranslation && (
            <p>
              <b>Translate:</b> {word.exampleTranslation}
            </p>
          )}
          {word.comment && (
            <p>
              <b>Comment:</b> {word.comment}
            </p>
          )}
        </div>
      )}
    </li>
  );
};

export default React.memo(WordItem);
