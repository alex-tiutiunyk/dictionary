import React from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getWordsFunc } from '../services/wordsService';
import { getAllCategories } from '../redux/categoriesSlice';

const Category: React.FC = () => {
  const [selectValue, setSelectValue] = React.useState<string>('All');

  // get user info from redux
  const user = useAppSelector((state) => state.user.value);
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
  };

  // Gategories
  const categories = useAppSelector((state) => state.categories.value);
  React.useEffect(() => {
    getWordsFunc(user, 'users', 'categories').then((data) => {
      dispatch(getAllCategories(data));
    });
  }, []);

  return (
    <>
      <select
        value={selectValue}
        onChange={handleChange}
        className='min-w-[150px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
      >
        <option>All</option>
        {categories?.map((item) => (
          <option>{item.name}</option>
        ))}
      </select>
    </>
  );
};

export default Category;
