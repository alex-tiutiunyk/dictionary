import { User } from 'firebase/auth';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { IWord } from '../types';

export const getWordsFunc = async (user: User | null): Promise<IWord[] | undefined> => {
  try {
    if (!user) return;
    const userId = user?.email as string;
    const usersRef = collection(doc(db, 'users', userId), 'words');
    const querySnapshot = await getDocs(usersRef);
    return querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() } as IWord));
  } catch (error) {
    console.log('Error getting user works: ', error);
  }
};
