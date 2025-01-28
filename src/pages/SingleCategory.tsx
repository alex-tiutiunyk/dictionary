import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { User } from 'firebase/auth';
import { ICategories, IWord } from '../types';
import { collection, doc, documentId, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams } from 'react-router-dom';

const SingleCategory: React.FC = () => {
  const user = useAppSelector((state) => state.user.value) as User;
  const { id } = useParams();
  const [words, setWords] = React.useState<IWord[] | []>([]);

  const [singleCategory, setSingleCategory] = React.useState<ICategories | null>(null);

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

  const getFewWords = async (category: ICategories | null) => {
    try {
      if (!category) return;
      const userId = user.email;
      const wordsId: string[] | undefined = category.words;
      const collectionRef = collection(doc(db, 'users', userId), 'words');
      const q = query(collectionRef, where(documentId(), 'in', wordsId));
      const res = await getDocs(q);
      const data = res.docs.map((item) => ({ id: item.id, ...item.data() } as IWord));
      setWords(data);
      console.log(data);
    } catch (error) {
      console.log('Error getting user works: ', error);
    }
  };

  React.useEffect(() => {
    getOneCategory().then((category) => {
      setSingleCategory(category);
      getFewWords(category);
    });
  }, []);

  return (
    <div>
      <h1 className='text-center text-2xl mb-5'>{singleCategory && singleCategory.name}</h1>
      <ul>
        {words &&
          words.map((word) => (
            <li key={word.id}>
              - {word.word} - {word.wordTranslation}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SingleCategory;
