import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { getWordsFunc } from '../services/wordsService';
import { getAllWords } from '../redux/wordSlice';
import WordItem from '../components/WordItem';
import Search from '../components/Search';
import Category from '../components/Category';
import { SquarePlus } from 'lucide-react';
import { Modal } from '../ui-kit';
import NewWord from '../components/NewWord';

const WordsListPage: React.FC = () => {
  const [isModal, setIsModal] = React.useState<boolean>(false);

  const handlePopup = () => {
    setIsModal((prev) => !prev);
  };

  // get user info from redux
  const user = useAppSelector((state) => state.user.value) as User;
  const dispatch = useAppDispatch();
  const words = useAppSelector((state) => state.words.value);

  React.useEffect(() => {
    getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
  }, []);

  return (
    <div>
      <div className='flex mb-5 justify-between'>
        <Search />
        <div className='flex align-middle gap-3'>
          <button
            type='button'
            onClick={handlePopup}
            className='flex gap-1 align-middle text-white bg-green-500 hover:bg-green-600 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 whitespace-nowrap'
          >
            <SquarePlus size={20} className='-ml-2' /> Add New Word
          </button>
          <Category />
        </div>
      </div>
      {words ? (
        <ul className='flex flex-col gap-2'>
          {words.map((word) => (
            <WordItem word={word} key={word.id} />
          ))}
        </ul>
      ) : (
        <h1>List of Words</h1>
      )}
      {isModal && (
        <Modal closeModal={handlePopup}>
          <NewWord closeModal={handlePopup} />
        </Modal>
      )}
    </div>
  );
};

export default WordsListPage;
