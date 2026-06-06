'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/slices/auth';
import { authApi } from '../../lib/api';
import { useRouter } from 'next/navigation';

export default function Header() {
  const { user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    await authApi.logout();
    dispatch(logout());
    router.push('/login');
  };

  const handleDeleteUser = async () => {
    await authApi.deleteProfile();
    dispatch(logout());
    router.push('/login');
  };

  return (
    <header className="flex w-full items-center justify-between border-b p-4 md:px-8">
      <button 
        onClick={handleDeleteUser}
        className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
      >
        удалить пользователя
      </button>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm font-medium md:block">Привет, {user?.username}!</span>
        <button 
          onClick={handleLogout}
          className="rounded bg-gray-200 px-3 py-1 text-sm hover:bg-gray-300"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}