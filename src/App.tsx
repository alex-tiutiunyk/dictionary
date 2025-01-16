import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import SignIn from './pages/auth/SignIn';
import HomePage from './pages/Home';
import WordsListPage from './pages/WordsList';
import SingleWordPage from './pages/SingleWord';
import NotFoundPage from './pages/NotFound';
import SignUp from './pages/auth/SignUp';
import UserDetails from './pages/UserDetails';
import ProtectedRoutes from './utils/ProtectedRoutes';
import useAuth from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return <div className='flex items-center justify-center h-screen text-4xl'>Loading...</div>;

  return (
    <>
      <Routes>
        {!user && (
          <>
            <Route path='signin' element={<SignIn />} />
            <Route path='signup' element={<SignUp />} />
            <Route path='*' element={<Navigate to={'/signin'} />} />
          </>
        )}
        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<HomePage />} />
            <Route path='signin' element={<Navigate to={'/'} />} />
            <Route path='signup' element={<Navigate to={'/'} />} />
            <Route path='words' element={<WordsListPage />} />
            <Route path='words/:id' element={<SingleWordPage />} />
            <Route path='user' element={<UserDetails />} />
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
