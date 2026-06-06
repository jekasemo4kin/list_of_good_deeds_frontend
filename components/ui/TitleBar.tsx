'use client';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function TitleBar() {
  const { searchQuery } = useSelector((state: RootState) => state.todos);
  const { title, name } = searchQuery;

  const renderTitle = () => {
    // Кейс: Поиск по конкретным параметрам
    if (title || name) {
      return `Дела с названием '${title || '...'}' пользователя '${name || '...'}'`;
    }
    // Кейс: Все дела (пустые параметры)
    return "Дела всех пользователей";
  };

  return (
    <div className="my-4 border-b pb-2 text-lg font-semibold text-gray-700">
      {renderTitle()}
    </div>
  );
}