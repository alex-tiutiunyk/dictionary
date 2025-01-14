import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React from 'react';
import { auth } from '../firebase';

const SignUp = () => {
  // const [userName, setUserName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [password, setPassword] = React.useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const name: string = e.target.id;
    const value = e.target.value;

    // if (name === 'name') return setUserName(value);
    if (name === 'email') return setEmail(value);
    if (name === 'password') return setPassword(value);
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // await updateProfile(userCredential.user, { userName: userName });
      console.log('User registered successfully', userCredential);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
      <div className='w-full bg-gray-50 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
        <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
          <h1 className='text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
            Create your account
          </h1>
          <form className='space-y-4 md:space-y-6' action='#'>
            {/* <div>
              <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900'>
                Display Name
              </label>
              <input
                type='text'
                id='name'
                value={userName}
                onChange={handleChange}
                className='bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
              />
            </div> */}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
