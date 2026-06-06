'use client';
import { useState } from 'react';
import { authApi } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { setUser, setLoading } from '../../store/slices/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

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
      // Предполагаем, что бэкенд возвращает объект пользователя
      dispatch(setUser(data));
      alert('Вход выполнен успешно');
    } catch (e) {
      alert('Ошибка входа: неверные данные');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 border rounded shadow-md">
      <input 
        className="border p-2"
        value={username} 
        onChange={e => setUsername(e.target.value)} 
        placeholder="Имя пользователя" 
      />
      <input 
        className="border p-2"
        type="password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        placeholder="Пароль" 
      />
      <button 
        className="bg-green-500 text-white p-2 rounded"
        onClick={handleLogin}
      >
        Войти
      </button>
    </div>
  );
}