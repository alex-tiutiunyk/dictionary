import { SquarePlus } from 'lucide-react';
import React from 'react';
import { IWord } from '../types';
import { useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { getWordsFunc } from '../services/wordsService';
import { Loader } from '../ui-kit';

const Categories: React.FC = () => {
  const [textInput, setTextInput] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [words, setWords] = React.useState<IWord[] | undefined>([]);
  const [categoryWords, setCategoryWords] = React.useState<IWord[] | undefined>([]);

  const user = useAppSelector((state) => state.user.value) as User;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
  };

  const addCategory = (): void => {
    console.log('Category');
  };

  const handleOpen = (): void => {
    setIsOpen((prev) => !prev);
  };

  const addWordToCategory = (id: string): void => {
    // find element with id
    const newItem: IWord | undefined = words?.find((item) => item.id === id);
    // add element in categoryWords
    setCategoryWords((prev) => [...prev, newItem]);

    // delete element from filterWords
    const filterWords = words?.filter((item) => item.id !== id);
    setWords(filterWords);
  };

  const removeWordFromCategory = (id: string): void => {
    const newItem: IWord | undefined = categoryWords?.find((item) => item.id === id);
    setWords((prev) => [...prev, newItem]);

    const filterCategoryWords = categoryWords?.filter((item) => item.id !== id);
    setCategoryWords(filterCategoryWords);
  };

  React.useEffect(() => {
    setLoading(true);
    getWordsFunc(user, 'users', 'words').then((data) => {
      setWords(data);
      setLoading(false);
    });
  }, [user]);

  return (
    <div>
      <div className='flex mb-5 justify-between'>
        <button
          type='button'
          className='flex gap-1 align-middle text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          onClick={handleOpen}
        >
          <SquarePlus size={20} className='-ml-2' /> Add New Category
        </button>
      </div>
      {isOpen && (
        <div className='border'>
          <div className='flex justify-between align-middle p-3 border-b-2'>
            <input
              type='text'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5'
              placeholder='Category Name'
              value={textInput}
              onChange={handleChange}
            />
            <button
              type='button'
              onClick={addCategory}
              className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5'
            >
              Add New Category
            </button>
          </div>
          <div className='flex'>
            <div className='w-[50%] min-h-[200px] p-3'>
              <ul>
                {categoryWords &&
                  categoryWords.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => removeWordFromCategory(item.id)}
                      className='cursor-pointer'
                    >
                      &#8594; {item.word} - {item.wordTranslation}
                    </li>
                  ))}
              </ul>
            </div>
            <div
              className={`w-[50%] min-h-[200px] border-l-2 p-3 ${
                loading ? 'flex align-middle justify-center flex-col' : ''
              }`}
            >
              {loading && <Loader />}
              <ul>
                {words &&
                  words.map((item) => (
                    <li
                      key={item.id}
                      onClick={() => addWordToCategory(item.id)}
                      className='cursor-pointer'
                    >
                      &#8594; {item.word} - {item.wordTranslation}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
