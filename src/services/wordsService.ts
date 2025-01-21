import { User } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { IWord } from '../types';

export const getWordsFunc = async (
  user: User | null,
  collectionName: string,
  subCollectionName: string,
): Promise<IWord[] | undefined> => {
  try {
    const userId = user?.email as string;
    const usersRef = collection(doc(db, collectionName, userId), subCollectionName);
    const q = query(usersRef, orderBy('date', 'desc'));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((item) => ({ id: item.id, ...item.data() } as IWord));
  } catch (error) {
    console.log('Error getting user works: ', error);
  }
};

export const deleteWordFunc = async (
  wordId: string,
  userId: string,
  collectionName: string,
  subCollectionName: string,
): Promise<void> => {
  try {
    const collectionPath = doc(doc(db, collectionName, userId), subCollectionName, wordId);
    await deleteDoc(collectionPath);
  } catch (error) {
    console.log('Error delete word: ', error);
  }
};
