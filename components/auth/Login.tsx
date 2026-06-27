'use client';
import { useState } from 'react';
import { authApi } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../../store/slices/auth';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Логин и пароль не могут быть пустыми');
      return;
    }

    dispatch(setLoading(true));
    try {
      const { data } = await authApi.login({ 
        username: username.trim(), 
        password: password.trim() 
      });
      console.log('User data from server:', data);
      dispatch(setUser(data));
      console.log('Login success, current state')
      router.push('/');
    } catch (e) {
      alert('Ошибка входа: неверные данные');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded border p-6 shadow-md">
      <h2 className="text-xl font-bold">Вход</h2>
      <input 
        className="border p-2 rounded"
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        placeholder="Имя пользователя" 
      />
      <input 
        className="border p-2 rounded"
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Пароль" 
      />
      <button 
        className="bg-green-600 p-2 text-white rounded hover:bg-green-700"
        onClick={handleLogin}
      >
        Войти
      </button>
      <button 
        className="text-sm text-blue-500 hover:underline"
        onClick={() => router.push('/register')}
      >
        Нет аккаунта? Зарегистрироваться
      </button>
    </div>
  );
}