'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchTodos, setSearchQuery } from '../../store/slices/todos';
import Input from './Input';
import Button from './Button';

export default function SearchBar() {
  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = () => {
    const cleanTitle = title.trim();
    const cleanName = name.trim();
    
    // Сохр запроса в стейт и запуск поиска
    dispatch(setSearchQuery({ title: cleanTitle, name: cleanName }));
    dispatch(fetchTodos({ title: cleanTitle, name: cleanName }));
  };

  return (
    <div className="flex w-full flex-col gap-2 md:flex-row md:items-center">
      <Input value={title} onChange={setTitle} placeholder="Название дела..." />
      <Input value={name} onChange={setName} placeholder="Имя автора..." />
      <Button onClick={handleSearch} className="w-full md:w-auto">Search</Button>
    </div>
  );
}