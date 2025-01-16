import React from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [displayName, setDisplayName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.id;
    const value: string = e.target.value;

    if (name === 'name') return setDisplayName(value);
    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const handleRegister = async (): Promise<void> => {
    if (!email || !password) return setErrorMessage('Fill all inputs');
    if (password.length < 6) return setErrorMessage('To short password');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, { displayName });

      console.log('User registered successfully');
      navigate('/');
      setDisplayName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/email-already-in-use':
            setErrorMessage(`Email address ${email} already in use.`);
            break;
          case 'auth/invalid-email':
            setErrorMessage(`Email address ${email} is invalid.`);
            break;
          case 'auth/operation-not-allowed':
            setErrorMessage(`Error during sign up.`);
            break;
          case 'auth/weak-password':
            setErrorMessage(
              `Password is not strong enough. Add additional characters including special characters and numbers.`,
            );
            break;
          default:
            console.log(error.message);
            break;
        }
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-gray-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Create your account
          </h1>
          <div className='space-y-4 md:space-y-6'>
            {errorMessage && <p className='text-red-700 text-center'>{errorMessage}</p>}
            <div>
              <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>
                Display Name
              </label>
              <input
                type='text'
                id='name'
                value={displayName}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              />
            </div>
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
              onClick={handleRegister}
              className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
              Sign up
            </button>
            <p className='text-sm font-light text-gray-500'>
              Already have an account?{' '}
              <Link to='/signin' className='font-medium text-primary-600 hover:underline'>
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
