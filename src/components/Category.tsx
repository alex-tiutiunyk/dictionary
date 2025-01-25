import React from 'react';

const Category: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState<string>('All');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  return (
    <>
      <select
        value={selectValue}
        onChange={handleChange}
        className='min-w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      >
        <option>All</option>
        <option>1</option>
        <option>2</option>
      </select>
    </>
  );
};

export default Category;
