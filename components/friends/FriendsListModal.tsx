'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchFriends, removeFriendLocally } from '../../store/slices/friends';
import { closeModal } from '../../store/slices/ui';
import { friendsApi } from '../../lib/api';
import { fetchTodos, setSearchQuery } from '../../store/slices/todos';

export default function FriendsListModal() {
  const dispatch = useDispatch<AppDispatch>();
  const { friends, loading } = useSelector((state: RootState) => state.friends);

  useEffect(() => {
    dispatch(fetchFriends());
  }, [dispatch]);

  const handleRemoveFriend = async (userId: string) => {
    try {
      await friendsApi.toggleFriend(userId);
      // Оптимистично удаляем или дожидаемся сокета (сокет сработает сам, 
      // но для надежности можно вызвать action удаления)
      dispatch(removeFriendLocally(userId));
    } catch (e) {
      alert('Не удалось удалить друга');
    }
  };

  const handleFriendClick = (username: string) => {
  dispatch(setSearchQuery({ title: '', name: username }));
  dispatch(fetchTodos({ title: '', name: username }));
  dispatch(closeModal());
};

  return (
    <div className="min-w-[300px]">
      <h2 className="text-xl font-bold mb-4">Мои друзья</h2>
      {loading ? <p>Загрузка...</p> : (
        <ul className="space-y-2">
          {friends.map(friend => (
            <li key={friend.id} className="flex justify-between items-center">
              <span 
                className="cursor-pointer text-blue-600 underline hover:text-blue-800"
                onClick={() => handleFriendClick(friend.username)}
              >
                {friend.username}
              </span>
              <button 
                onClick={() => handleRemoveFriend(friend.id)}
                className="text-red-500 text-sm hover:underline"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      )}
      <button 
        onClick={() => dispatch(closeModal())}
        className="mt-4 bg-gray-500 text-white px-4 py-2 rounded"
      >
        Закрыть
      </button>
    </div>
  );
}