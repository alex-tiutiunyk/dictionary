import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const SignIn: React.FC = () => {
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.id;
    const value = e.target.value;

    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const handleLogin = async (): Promise<void> => {
    console.log('Logg In Pressed');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
      console.log('User Sign In');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-gray-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Sign in to your account
          </h1>
          <div className='space-y-4 md:space-y-6'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900'>
                Your email
              </label>
              <input
                type='email'
                id='email'
                value={email}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              />
            </div>
            <div>
              <label htmlFor='password' className='block mb-2 text-sm font-medium text-gray-900'>
                Password
              </label>
              <input
                type='password'
                id='password'
                value={password}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              />
            </div>
            <button
              type='submit'
              onClick={handleLogin}
              className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Sign in
            </button>
            <p className='text-sm font-light text-gray-500'>
              Don’t have an account yet?{' '}
              <Link to='/signup' className='font-medium text-primary-600 hover:underline'>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
