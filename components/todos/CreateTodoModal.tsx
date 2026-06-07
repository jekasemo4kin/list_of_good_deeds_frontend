'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../store/slices/ui'; // Импортируем closeModal
import { todosApi } from '../../lib/api';

export default function CreateTodoModal() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleCreate = async () => {

    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      alert('Заполните поля (нельзя использовать только пробелы)');
      return;
    }


    try {
      await todosApi.create({ 
        title: trimmedTitle, 
        description: trimmedDescription 
      });
      dispatch(closeModal());
      setTitle('');
      setDescription('');
    } catch (e) {
      alert('Ошибка при создании (проверьте, что поля не пустые)');
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-lg">Новое дело</h2>
      <input 
        className="border p-2 rounded" 
        placeholder="Заголовок" 
        value={title} 
        onChange={e => setTitle(e.target.value)} 
      />
      <textarea 
        className="border p-2 rounded" 
        placeholder="Описание" 
        value={description} 
        onChange={e => setDescription(e.target.value)} 
      />
      <div className="flex gap-2">
        <button 
          onClick={handleCreate} 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Создать
        </button>
        <button 
          onClick={() => dispatch(closeModal())} 
          className="bg-gray-200 p-2 rounded hover:bg-gray-300"
        >
          Отмена
        </button>
      </div>
    </div>
  );
}