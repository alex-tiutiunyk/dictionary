import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/SignIn';
import HomePage from './pages/Home';
import WordsListPage from './pages/WordsList';
import SingleWordPage from './pages/SingleWord';
import NotFoundPage from './pages/NotFound';
import SignUp from './pages/SignUp';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path='signin' element={<SignIn />} />
          <Route path='signup' element={<SignUp />} />
          <Route path='words' element={<WordsListPage />} />
          <Route path='words/:id' element={<SingleWordPage />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
