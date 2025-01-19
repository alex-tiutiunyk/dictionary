import React from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';

const useAuth = () => {
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);

  const auth = getAuth();

  React.useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
      setLoading(false);
    });
    return () => {
      listen();
    };
  }, []);
  return { user, loading };
};

export default useAuth;
