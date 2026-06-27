'use client';
import { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setInitialized, logout } from '../../store/slices/auth';
import { RootState } from '../../store';
import { authApi } from '../../lib/api';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); 
    const initAuth = async () => {
        try {
            const { data } = await authApi.getMe();
            dispatch(setUser(data));
        } catch (e) {
            console.log("Not authenticated yet",e);
            //dispatch(logout());
        } finally {
            dispatch(setInitialized());
        }
    };
    initAuth();
  }, [dispatch]);


  if (!isClient) return <div>Загрузка...</div>;

  return <>{children}</>;
}