'use client';
import { useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setInitialized, logout } from '../../store/slices/auth';
import { RootState } from '../../store';
import { authApi } from '../../lib/api';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isInitialized = useSelector((state: RootState) => state.auth.isInitialized);


  useEffect(() => {

    if (user) {
      dispatch(setInitialized());
      return;
    }

    console.log("AuthInitializer running...");

    const initAuth = async () => {
      try {
        console.log("Checking session...");
        const { data } = await authApi.getMe();
        console.log("Session valid:", data);
        dispatch(setUser(data));
      } catch (e) {
        console.error("Session check failed, status:", e);
      } finally {
        dispatch(setInitialized());
      }
    };
    initAuth();
  }, [dispatch, user]);

  if (!isInitialized) return <div>Загрузка...</div>;

  return <>{children}</>;
}