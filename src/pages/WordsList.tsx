import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { getWordsFunc } from '../services/wordsService';
import { getAllWords } from '../redux/wordSlice';
import WordItem from '../components/WordItem';

const WordsListPage: React.FC = () => {
  // get user info from redux
  const user = useAppSelector((state) => state.user.value) as User;
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.value);

  React.useEffect(() => {
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  }, []);

  return (
    <div>
      {words ? (
        <ul className='flex flex-col gap-2'>
          {words.map((word) => (
            <WordItem word={word} key={word.id} />
          ))}
        </ul>
      ) : (
        <h1>List of Words</h1>
      )}
    </div>
  );
};

export default WordsListPage;
