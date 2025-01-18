import React from 'react';
import { IWord } from '../types';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';

const WordsListPage: React.FC = () => {
  const [words, setWords] = React.useState<IWord[]>([]);

  const { user } = useAuth();

  const getWords = async (): Promise<void> => {
    try {
      setWords([]);
      // Read the data
      const userId = user?.email as string;
      const usersRef = collection(doc(db, 'users', userId), 'words');
      // const q = query(usersRef, where('words', '==', true));
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.docs.map((item) => {
        // setWords([...words, item]);
        // setWords([...words, { id: item.id, ...item.data() }]);
        // console.log({ id: item.id, ...item.data() });
        setWords((prev) => [...prev, { id: item.id, ...item.data() }]);
      });
      console.log(words);
      // Set the words
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getWords();
  }, []);

  return (
    <div>
      <h1>List of Words</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {word.word} - {word.wordTranslation}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WordsListPage;
