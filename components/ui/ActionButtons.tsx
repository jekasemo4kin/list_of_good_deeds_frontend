'use client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchTodos, setSearchQuery } from '../../store/slices/todos';
import { AppDispatch } from '../../store';
import Button from './Button';

export default function ActionButtons() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAllTodos = () => {
    dispatch(setSearchQuery({ title: '', name: '' }));
    dispatch(fetchTodos({ title: '', name: '' }));
  };

  const handleMyTodos = () => {
    if (user) {
      dispatch(setSearchQuery({ title: '', name: user.username }));
      dispatch(fetchTodos({ title: '', name: user.username }));
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button onClick={handleAllTodos} variant="secondary">Все Дела</Button>
      <Button onClick={() => alert('Мои друзья (модалка)')} variant="secondary">Мои Друзья</Button>
      <Button onClick={() => alert('Создать дело (модалка)')} variant="primary">Создать Дело</Button>
      <Button onClick={handleMyTodos} variant="secondary">Мои Дела</Button>
    </div>
  );
}