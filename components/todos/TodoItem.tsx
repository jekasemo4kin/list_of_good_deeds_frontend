'use client';
import { useState } from 'react';
import { Todo } from '../../lib/types';
import { todosApi, friendsApi } from '../../lib/api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { updateTodoLocally, fetchTodos, setSearchQuery } from '../../store/slices/todos';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user);
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [showDescription, setShowDescription] = useState(false);

  const isAuthor = currentUser?.id === todo.authorId;

  const handleSave = async () => {
    try {
      const updated = await todosApi.update(todo.id, { title, description });
      dispatch(updateTodoLocally(updated.data));
      setIsEditing(false);
    } catch (e) { alert('Ошибка при сохранении'); }
  };

  const handleAuthorClick = () => {
    dispatch(setSearchQuery({ title: '', name: todo.name }));
    dispatch(fetchTodos({ title: '', name: todo.name }));
  };

  const handleToggleFriend = async () => {
    try {
      await friendsApi.toggleFriend(todo.authorId);

    } catch (e) { alert('Не удалось изменить статус дружбы'); }
  };

  const handleDelete = async () => {
    try {
      await todosApi.delete(todo.id);
      // Успешное удаление также придет через сокет, 
      // либо можно диспатчить removeTodoLocally здесь
    } catch (e) { alert('Ошибка при удалении'); }
  };

  const friends = useSelector((state: RootState) => state.friends.friends);
  const isFriend = friends.some(f => f.id === todo.authorId);

  return (
    <div className="border rounded-md p-4 shadow-sm flex flex-col gap-2">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input className="font-bold text-lg border-b" value={title} onChange={e => setTitle(e.target.value)} />
        ) : (
          <h3 className="font-bold text-lg">{todo.title}</h3>
        )}
        <button onClick={() => setShowDescription(!showDescription)} className="text-blue-500">
          {showDescription ? 'Hide' : 'Show'}
        </button>
      </div>

      <p className="text-sm">Автор: <span className="cursor-pointer text-blue-600 underline" onClick={handleAuthorClick}>{todo.name}</span></p>

      {showDescription && (
        isEditing ? (
          <textarea className="border p-2" value={description} onChange={e => setDescription(e.target.value)} />
        ) : (
          <p className="text-gray-600 text-sm">{todo.description}</p>
        )
      )}

      <div className="flex gap-2 mt-2">
        {isAuthor ? (
          isEditing ? (
            <>
              <button onClick={handleSave} className="bg-green-500 text-white px-2 py-1 rounded">Save</button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white px-2 py-1 rounded">Cancel</button>
            </>
          ) : (
            <>
              <button onClick={() => setIsEditing(true)} className="bg-blue-500 text-white px-2 py-1 rounded">Edit</button>
              <button onClick={handleDelete} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
            </>
          )
        ) : (
          <button 
            onClick={handleToggleFriend} 
            className={`${isFriend ? 'bg-red-500' : 'bg-purple-500'} text-white px-2 py-1 rounded`}
          >
            {isFriend ? 'Удалить из друзей' : 'Подружиться'}
          </button>
        )}
      </div>
    </div>
  );
}