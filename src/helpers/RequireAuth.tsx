import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootStore } from '../store/store';

export const RequireAuth = ({children}: {children: ReactNode}) => {
  const jwt = useSelector((s: RootStore) => s.user.jwt);
  if (!jwt) {
    return <Navigate to='/auth/login' replace/>
    }
  return children;
}