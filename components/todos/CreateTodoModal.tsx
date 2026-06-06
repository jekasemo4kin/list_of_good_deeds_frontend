'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCreateModalOpen } from '../../store/slices/ui';
import { todosApi } from '../../lib/api';
import { RootState } from '../../store';

export default function CreateTodoModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const isOpen = useSelector((state: RootState) => state.ui.isCreateModalOpen);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleCreate = async () => {
    try {
      await todosApi.create({ title, description });
      dispatch(setCreateModalOpen(false));
      setTitle('');
      setDescription('');
      // Здесь можно вызвать fetchTodos для обновления списка
    } catch (e) {
      alert('Ошибка при создании');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm flex flex-col gap-4">
        <h2 className="font-bold">Новое дело</h2>
        <input className="border p-2" placeholder="Заголовок" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="border p-2" placeholder="Описание" value={description} onChange={e => setDescription(e.target.value)} />
        <div className="flex gap-2">
          <button onClick={handleCreate} className="bg-blue-500 text-white p-2 rounded">Создать</button>
          <button onClick={() => dispatch(setCreateModalOpen(false))} className="bg-gray-200 p-2 rounded">Отмена</button>
        </div>
      </div>
    </div>
  );
}