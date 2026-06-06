'use client';
import { useState } from 'react';
import { authApi } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const { data } = await authApi.login({ 
        username: username.trim(), 
        password: password.trim() 
      });
      dispatch(setUser(data));
    } catch (e) {
      alert('Ошибка входа');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Имя" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Пароль" />
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
}