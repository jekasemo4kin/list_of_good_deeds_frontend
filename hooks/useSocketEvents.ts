import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../lib/socket';
import { updateTodoLocally, removeTodoLocally, removeTodoLocallyByAuthor } from '../store/slices/todos';
import { logout } from '../store/slices/auth';
import { RootState } from '../store';

export const useSocketEvents = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    socket.connect();

    socket.on('todo_updated', (event) => {
      if (event.type === 'deleted') {
        dispatch(removeTodoLocally(event.todo.id));
      } else {
        dispatch(updateTodoLocally(event.todo));
      }
    });

    socket.on('user_deleted', (data) => {
      // Если удалили нас — разлогиниваем
      if (currentUser?.id === data.userId) {
        dispatch(logout());
      } else {
        // Если удалили кого-то другого — убираем его дела
        dispatch(removeTodoLocallyByAuthor(data.userId));
      }
    });

    socket.on('friendship_updated', (data) => {
      // Здесь будет логика обновления списка друзей
    });

    return () => {
      socket.off('todo_updated');
      socket.off('user_deleted');
      socket.off('friendship_updated');
      socket.disconnect();
    };
  }, [dispatch, currentUser?.id]);
};