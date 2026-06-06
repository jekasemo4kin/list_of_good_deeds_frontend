'use client';
import { Todo } from '../../lib/types';
import { todosApi } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { removeTodoLocally } from '../../store/slices/todos';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await todosApi.delete(todo.id);
      dispatch(removeTodoLocally(todo.id));
    } catch (e) {
      alert('Ошибка при удалении');
    }
  };

  return (
    <div className="border rounded-md p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2">
      <h3 className="font-bold text-lg">{todo.title}</h3>
      <p className="text-gray-600 text-sm">{todo.description}</p>
      
      <div className="flex gap-2 mt-2">
        <button 
          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
          onClick={() => alert('Функционал редактирования будет здесь')}
        >
          Редактировать
        </button>
        <button 
          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
          onClick={handleDelete}
        >
          Удалить
        </button>
      </div>
    </div>
  );
}