import React from 'react';

interface ModalProps {
  closeModal: () => void;
}

const AddWord: React.FC<ModalProps> = ({ closeModal }) => {
  const [word, setWord] = React.useState<string>('');
  const [wordTranslation, setWordTranslation] = React.useState<string>('');
  const [example, setExample] = React.useState<string>('');
  const [exampleTranslation, setExampleTranslation] = React.useState<string>('');

  // 1 example for event type
  const changeInput: React.ComponentProps<'input'>['onChange'] = (e) => {
    const value: string = e.target.value;
    const name: string = e.target.id;

    if (name === 'word') return setWord(value);
    if (name === 'translation') return setWordTranslation(value);
  };

  // 2 example for event type
  const changeArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value: string = e.target.value;
    const name: string = e.target.id;

    if (name === 'example') return setExample(value);
    if (name === 'example-translation') return setExampleTranslation(value);
  };

  return (
    <>
      <h3 className='text-xl text-center'>Add new Word</h3>
      <div className='gap-1 flex flex-col'>
        <label htmlFor='word' className='text-sm'>
          Word
        </label>
        <input
          type='text'
          id='word'
          value={word}
          onChange={changeInput}
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
          onChange={changeInput}
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
          onChange={changeArea}
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
          onChange={changeArea}
          className='border border-slate-600 p-1 rounded-md'
        ></textarea>
      </div>
      <footer className='flex'>
        <button
          type='button'
          className='flex-grow focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          // onClick={addWord}
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

export default AddWord;
