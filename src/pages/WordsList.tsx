import React from 'react';
import { IWord } from '../types';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAppSelector } from '../redux/hooks';

const WordsListPage: React.FC = () => {
  const [words, setWords] = React.useState<IWord[]>([]);

  // get user info from redux
  const user = useAppSelector((state) => state.user.value);

  const getWords = async (): Promise<void> => {
    try {
      setWords([]);
      // Read the data
      const userId = user?.email as string;
      const usersRef = collection(doc(db, 'users', userId), 'words');
      const querySnapshot = await getDocs(usersRef);
      querySnapshot.docs.map((item) => {
        setWords((prev) => [...prev, { id: item.id, ...item.data() }]);
      });
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
      {words ? (
        <ul>
          {words.map((word) => (
            <li key={word.id}>
              {word.word} - {word.wordTranslation}
            </li>
          ))}
        </ul>
      ) : (
        <h1>List of Words</h1>
      )}
    </div>
  );
};

export default WordsListPage;
