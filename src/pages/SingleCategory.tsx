import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { ICategories } from '../types';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

const SingleCategory: React.FC = () => {
  const user = useAppSelector((state) => state.user.value) as User;
  const { id } = useParams();
  const [category, setCategory] = React.useState<ICategories | null>(null);

  const getOneCategory = async (): Promise<ICategories | null> => {
    try {
      const categoryId = id;
      const userId = user?.email as string;
      const collectionName = 'users';
      const categoryDoc = await getDoc(
        doc(doc(db, collectionName, userId), 'categories', categoryId),
      );
      if (categoryDoc.exists()) {
        return { id: categoryDoc.id, ...categoryDoc.data() } as ICategories;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error getting task:', error);
      throw error;
    }
  };

  const getFewWords = async () => {
    try {
      const collectionRef = collection(doc(db, 'users', 'alex.tiutiunyk@gmail.com'), 'words');
      const q = query(
        collectionRef,
        where('date', 'in', ['2025-01-18T12:45:01.759Z', '2025-01-19T13:34:44.527Z']),
      );
      const data = await getDocs(q);
      console.log(data.docs.map((item) => item.data()));
      // const q = query(usersRef, where('state', '==', 'CA'));
      // const userId = user?.email as string;
      // const usersRef1 = doc(doc(db, 'users', userId), 'words', words[0]);
      // const usersRef2 = doc(doc(db, 'users', userId), 'words', words[1]);
      // const categoryDoc = await getAll(
      //   doc(doc(db, collectionName, userId), 'categories', categoryId),
      // );
      // console.log(categoryDoc);
      // const q = query(usersRef, orderBy('date', 'desc'));
      // const querySnapshot = await getDocs(q);
      // return querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() } as IWord));
    } catch (error) {
      console.log('Error getting user works: ', error);
    }
  };

  React.useEffect(() => {
    getOneCategory().then((category) => setCategory(category));
    getFewWords();
  }, []);

  return (
    <div>
      <h1 className='text-center text-2xl mb-5'>{category && category.name}</h1>
      <ul>{category && category.words.map((word) => <li key={word}>- {word}</li>)}</ul>
    </div>
  );
};

export default SingleCategory;
