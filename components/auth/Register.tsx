'use client';
import { useState } from 'react';
import { authApi } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../store/slices/auth';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async () => {
    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      alert('Логин и пароль не могут быть пустыми');
      return;
    }

    if (password !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }

    dispatch(setLoading(true));
    try {
      await authApi.register({ 
        username: trimmedUsername, 
        password: trimmedPassword 
      });
      alert('Регистрация успешна! Теперь войдите.');
      router.push('/login');
    } catch (e) {
      alert('Ошибка регистрации');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-4 rounded border p-6 shadow-md">
      <h2 className="text-xl font-bold">Регистрация</h2>
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
      <input 
        className="border p-2 rounded"
        type="password" 
        value={confirmPassword} 
        onChange={e => setConfirmPassword(e.target.value)} 
        placeholder="Повторите пароль" 
      />
      <button 
        className="bg-blue-600 p-2 text-white rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Зарегистрироваться
      </button>
      <button 
        className="text-sm text-blue-500 hover:underline"
        onClick={() => router.push('/login')}
      >
        Уже есть аккаунт? Войти
      </button>
    </div>
  );
}