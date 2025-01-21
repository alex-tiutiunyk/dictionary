import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/auth/SignIn';
import HomePage from './pages/Home';
import WordsListPage from './pages/WordsList';
import SingleWordPage from './pages/SingleWord';
import NotFoundPage from './pages/NotFound';
import SignUp from './pages/auth/SignUp';
import User from './pages/User';
import ProtectedRoutes from './utils/ProtectedRoutes';
import useAuth from './hooks/useAuth';
import { setUser } from './redux/userSlice';
import { useAppDispatch } from './redux/hooks';

function App() {
  // get user info
  const { user, loading } = useAuth();

  // set User info to redux
  const dispatch = useAppDispatch();
  dispatch(setUser(user));

  if (loading)
    return <div className='flex items-center justify-center h-screen text-4xl'>Loading...</div>;

  return (
    <>
      <Routes>
        {!user && (
          <>
            <Route path='/dictionary/signin' element={<SignIn />} />
            <Route path='/dictionary/signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to={'/dictionary/signin'} />} />
          </>
        )}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<HomePage />} />
            <Route path='/dictionary/signin' element={<Navigate to={'/dictionary/'} />} />
            <Route path='/dictionary/signup' element={<Navigate to={'/dictionary/'} />} />
            <Route path='/dictionary/words' element={<WordsListPage />} />
            <Route path='/dictionary/words/:id' element={<SingleWordPage />} />
            <Route path='/dictionary/user' element={<User />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
