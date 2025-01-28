import React from 'react';
import { db } from '../firebase';
import { addDoc, collection, doc } from 'firebase/firestore';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getWordsFunc } from '../services/wordsService';
import { getAllWords } from '../redux/wordSlice';
import { v4 as uuidv4 } from 'uuid';

interface NewWordProps {
  closeModal: () => void;
}

const NewWord: React.FC<NewWordProps> = ({ closeModal }) => {
  const [word, setWord] = React.useState<string>('');
  const [wordTranslation, setWordTranslation] = React.useState<string>('');
  const [example, setExample] = React.useState<string>('');
  const [exampleTranslation, setExampleTranslation] = React.useState<string>('');
  const [comment, setComment] = React.useState<string>('');
  const [error, setError] = React.useState<string>('');

  // get user info from redux
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  // set value for input and textarea
  const handleForm = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const textareaEvent = e as React.ChangeEvent<HTMLTextAreaElement>;

    const value = e.target.value;
    const name = e.target.id;

    const valueTextrea: string = textareaEvent.target.value;
    const nameTextarea: string = textareaEvent.target.id;

    if (name === 'word') return setWord(value);
    if (name === 'translation') return setWordTranslation(value);

    if (nameTextarea === 'example') return setExample(valueTextrea);
    if (nameTextarea === 'example-translation') return setExampleTranslation(valueTextrea);
    if (nameTextarea === 'comment') return setComment(valueTextrea);
  };

  // Add new word
  const addWord = async (): Promise<void> => {
    if (!word) return setError('Please fill Word field');

    try {
      const userId = user?.email as string;

      const docRef = doc(db, 'users', userId);
      await addDoc(collection(docRef, 'words'), {
        date: new Date().toISOString(),
        wordId: uuidv4(),
        word,
        wordTranslation,
        example,
        exampleTranslation,
        comment,
      });
      console.log('ok');

      setWord('');
      setWordTranslation('');
      setExample('');
      setExampleTranslation('');
      getWordsFunc(user, 'users', 'words').then((data) => dispatch(getAllWords(data)));
      closeModal();
    } catch (error) {
      console.log('Error adding new word: ', error);
    }
  };

  return (
    <>
      <h3 className='text-xl text-center'>Add new Word</h3>
      <p className='text-red-700 text-center'>{error}</p>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='word' className='text-sm'>
          Word
        </label>
        <input
          type='text'
          id='word'
          value={word}
          onChange={handleForm}
          className='border border-slate-600 p-1 rounded-md'
        />
      </div>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='translation' className='text-sm'>
          Translation
        </label>
        <input
          type='text'
          id='translation'
          value={wordTranslation}
          onChange={handleForm}
          className='border border-slate-600 p-1 rounded-md'
        />
      </div>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='example' className='text-sm'>
          Example
        </label>
        <textarea
          id='example'
          cols={30}
          rows={2}
          value={example}
          onChange={handleForm}
          className='border border-slate-600 p-1 rounded-md'
        ></textarea>
      </div>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='example-translation' className='text-sm'>
          Example Translation
        </label>
        <textarea
          id='example-translation'
          cols={30}
          rows={2}
          value={exampleTranslation}
          onChange={handleForm}
          className='border border-slate-600 p-1 rounded-md'
        ></textarea>
      </div>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='comment' className='text-sm'>
          Comment
        </label>
        <textarea
          id='comment'
          cols={30}
          rows={2}
          value={comment}
          onChange={handleForm}
          className='border border-slate-600 p-1 rounded-md'
        ></textarea>
      </div>
      <footer className='flex'>
        <button
          type='button'
          className='flex-grow focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          onClick={addWord}
        >
          Add Word
        </button>
        <button
          type='button'
          className='text-white bg-gray-800 hover:bg-gray-900 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          onClick={closeModal}
        >
          Close
        </button>
      </footer>
    </>
  );
};

export default NewWord;
