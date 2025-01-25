import { SquarePlus } from 'lucide-react';
import React from 'react';
import { IWord } from '../types';
import { useAppSelector } from '../redux/hooks';
import { getWordsFunc } from '../services/wordsService';
import { Loader } from '../ui-kit';
import { addDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebase';

const Categories: React.FC = () => {
  const [textInput, setTextInput] = React.useState<string>('');
  const [errorText, setErrorText] = React.useState<string>('');
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [words, setWords] = React.useState<IWord[] | undefined>([]);
  const [categoryWords, setCategoryWords] = React.useState<IWord[] | undefined>([]);

  // get user info from redux
  const user = useAppSelector((state) => state.user.value);

  // Get words
  React.useEffect(() => {
    setLoading(true);
    getWordsFunc(user, 'users', 'words').then((data) => {
      setWords(data);
      setLoading(false);
    });
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(e.target.value);
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

  // Add New Category
  const addCategory = async (): Promise<void> => {
    if (!textInput) return setErrorText('Fill Category Name.');
    setErrorText('');

    try {
      const wordsId: string[] | undefined = categoryWords?.map((item) => item.id);

      const userId = user?.email as string;

      const docRef = doc(db, 'users', userId);
      await addDoc(collection(docRef, 'categories'), {
        date: new Date().toISOString(),
        name: textInput.trim(),
        words: wordsId,
      });
      setIsOpen(false);
      console.log('New Category Created');
    } catch (error) {
      console.log(error);
    }
  };

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
        <>
          <div className='text-center text-red-500'>{errorText}</div>
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
        </>
      )}
    </div>
  );
};

export default Categories;
