import { SquarePlus } from 'lucide-react';
import React from 'react';
import { ICategories, IWord } from '../types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { deleteWordFunc, getWordsFunc } from '../services/wordsService';
import { Loader } from '../ui-kit';
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAllCategories } from '../redux/categoriesSlice';
import { Link, useNavigate } from 'react-router-dom';

const Categories: React.FC = () => {
  const [textInput, setTextInput] = React.useState<string>('');
  const [error, setError] = React.useState<boolean>(false);
  const [isOpen, setIsOpen] = React.useState<boolean>(true);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [words, setWords] = React.useState<IWord[] | undefined>([]);
  const [categoryWords, setCategoryWords] = React.useState<IWord[] | undefined>([]);

  // get user info from redux
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  // Get Words
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
    if (!textInput) return setError(true);
    setError(false);

    try {
      const wordsId: string[] | undefined = categoryWords?.map((item) => item.id);

      const userId = user?.email as string;

      const docRef = doc(db, 'users', userId);
      await addDoc(collection(docRef, 'categories'), {
        date: new Date().toISOString(),
        name: textInput.trim(),
        words: wordsId,
      });
      // setIsOpen(false);
      const updatedCategories = await getWordsFunc(user, 'users', 'categories');
      dispatch(getAllCategories(updatedCategories));
      console.log('New Category Created');
    } catch (error) {
      console.log(error);
    }
  };

  // Gategories
  const categories = useAppSelector((state) => state.categories.value);
  React.useEffect(() => {
    getWordsFunc(user, 'users', 'categories').then((data) => {
      dispatch(getAllCategories(data));
    });
  }, []);

  // deleteCategory
  const deleteCategory = async (e, id): Promise<void> => {
    e.stopPropagation();
    try {
      const userId = user?.email;
      const collectionPath = doc(doc(db, 'users', userId), 'categories', id);
      await deleteDoc(collectionPath);
      const updatedCategories = await getWordsFunc(user, 'users', 'categories');
      dispatch(getAllCategories(updatedCategories));
      return console.log('deleted category');
    } catch (error) {
      console.log('Error delete word: ', error);
    }
  };

  const navigate = useNavigate();
  const handleCategory = (id: string) => {
    navigate(`/dictionary/categories/${id}`);
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
          <div className='border mb-5'>
            <div className='flex justify-between align-middle p-3 border-b-2'>
              <input
                type='text'
                className={`bg-gray-50 border text-gray-900 text-sm rounded-lg block p-2.5 ${
                  error
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 focus:border-blue-500'
                }`}
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

      <h1 className='text-center text-2xl mb-5'>Categories</h1>
      {categories.map((item) => (
        <div
          key={item.id}
          onClick={() => handleCategory(item.id)}
          className='px-2 py-1 bg-gray-100 mb-2 flex justify-between cursor-pointer'
        >
          <div>
            {item.name} ({item.words.length})
          </div>
          <button
            className='border px-1 bg-red-500 hover:bg-red-600 text-white'
            onClick={(e) => deleteCategory(e, item.id)}
          >
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Categories;
