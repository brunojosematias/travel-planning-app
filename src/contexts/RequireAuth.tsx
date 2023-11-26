import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Login } from '../screens/Login';

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useContext(AuthContext);
  console.log(auth);

  if (!auth.user) {
    console.log(auth);
    return <Login />;
  }

  return children;
}
