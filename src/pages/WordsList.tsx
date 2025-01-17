import React from 'react';
import { IWord } from '../types';
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { v4 as uuidv4 } from 'uuid';

const WordsListPage: React.FC = () => {
  const [words, setWords] = React.useState<IWord[]>([]);

  const { user } = useAuth();
  const userId = user?.email;

  const getWords = async (userId: string) => {
    try {
      // Read the data
      const q = query(collection(db, 'users'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      // const val = doc(db, 'users');
      // const collectionVal = collection(val, `words`);
      // getDo(collectionVal, {
      //   date: new Date().toISOString(),
      //   word,
      //   wordTranslation,
      //   example,
      //   exampleTranslation,
      // });
      // Set the words
    } catch (error) {
      console.log(error);
    }
  };

  // Create in words collection new word with generated id
  const createNewWordInCollection = async () => {
    try {
      await addDoc(collection(db, 'user-11'), {
        date: new Date().toISOString(),
        word: 'New word',
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create 1
  const createCollectionUserId = async () => {
    try {
      const docRef = doc(db, 'users', user?.uid);
      await addDoc(collection(docRef, 'words'), {
        date: new Date().toISOString(),
        word: 'New word',
      });
      console.log('ok');
    } catch (error) {
      console.log(error);
    }
  };

  // React.useEffect(() => {
  //   getWords(userId);
  // }, []);

  return (
    <div>
      <h1>List of Words</h1>
      <button
        className='border p-1 px-2 border-gray-600'
        type='button'
        onClick={createNewWordInCollection}
      >
        Create New Word in Collection
      </button>{' '}
      <button
        className='border p-1 px-2 border-gray-600'
        type='button'
        onClick={createCollectionUserId}
      >
        Create new
      </button>
    </div>
  );
};

export default WordsListPage;
