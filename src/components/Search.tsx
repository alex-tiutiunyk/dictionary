import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { IWord } from '../types';
import { getAllWords } from '../redux/wordSlice';
import { getWordsFunc } from '../services/wordsService';
import { User } from 'firebase/auth';

const Search: React.FC = () => {
  const [inputText, setInputText] = React.useState<string>('');
  const words: IWord[] | undefined = useAppSelector((state) => state.words.value);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.value) as User;
  const searchRef = React.useRef(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputText(value);
  };

  React.useEffect(() => {
    getWordsFunc(user, 'users', 'words').then((data) => {
      const searchResult = data?.filter(
        (item) => item.word.includes(inputText) || item.wordTranslation.includes(inputText),
      );
      dispatch(getAllWords(searchResult));
    });
  }, [inputText]);

  return (
    <div>
      <input
        type='text'
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
        placeholder='Word...'
        value={inputText}
        onChange={handleChange}
        ref={searchRef}
      />
    </div>
  );
};

export default Search;
