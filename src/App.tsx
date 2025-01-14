import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import WordsListPage from './pages/WordsListPage';
import SingleWordPage from './pages/SingleWordPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='words' element={<WordsListPage />} />
          <Route path='words/:id' element={<SingleWordPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
