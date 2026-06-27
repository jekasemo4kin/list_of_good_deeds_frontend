'use client';
import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setInitialized, logout } from '../../store/slices/auth';
import { RootState } from '../../store';
import { authApi } from '../../lib/api';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const isInitialized = useSelector((state: RootState) => state.auth.isInitialized);


  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await authApi.getMe();
        dispatch(setUser(data));
      } catch (e) {
        console.log(e);
      } finally {
        dispatch(setInitialized());
      }
    };
    initAuth();
  }, [dispatch]);

  if (!isInitialized) return <div>Загрузка...</div>;

  return <>{children}</>;
}