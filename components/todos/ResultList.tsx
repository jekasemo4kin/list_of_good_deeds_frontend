'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchTodos } from '../../store/slices/todos';
import TodoItem from './TodoItem';

export default function ResultList() {
  const dispatch = useDispatch<AppDispatch>();
  const { todos, loading, error } = useSelector((state: RootState) => state.todos);

  useEffect(() => {
    // Загружаем все дела при монтировании компонента
    dispatch(fetchTodos({ title: '', name: '' }));
  }, [dispatch]);

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (todos.length === 0) return <div>Дел пока нет.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}