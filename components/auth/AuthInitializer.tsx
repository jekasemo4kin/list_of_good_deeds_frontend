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
            dispatch(logout());
        } finally {
            dispatch(setInitialized());
        }
    };
    initAuth();
  }, [dispatch]);

  // Ждем пока Redux скажет, что инициализация прошла
  if (!isInitialized) return <div>Загрузка...</div>;

  return <>{children}</>;
}