import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../lib/socket';
import { updateTodoLocally, removeTodoLocally, removeTodoLocallyByAuthor } from '../store/slices/todos';
import { removeFriendLocally, addFriendLocally, fetchFriends } from '../store/slices/friends';
import { logout } from '../store/slices/auth';
import { RootState } from '../store';

export const useSocketEvents = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!currentUser) {
      socket.disconnect();
      return;
    }

    socket.connect();

    socket.on('todo_updated', (event) => {
      if (event.type === 'deleted') {
        dispatch(removeTodoLocally(event.todo.id));
      } else {
        dispatch(updateTodoLocally(event.todo));
      }
    });

    socket.on('user_deleted', (data) => {
      if (currentUser?.id === data.userId) {
        dispatch(logout());
      } else {
        dispatch(removeTodoLocallyByAuthor(data.userId));
        // Добавьте также удаление из друзей, если вдруг удаленный пользователь был другом
        dispatch(removeFriendLocally(data.userId));
      }
    });

    socket.on('friendship_updated', (data) => {
      if (data.type === 'added') {
        dispatch(addFriendLocally(data.user)); 
      } else {
        dispatch(removeFriendLocally(data.user.id));
      }
    });

    return () => {
      socket.off('todo_updated');
      socket.off('user_deleted');
      socket.off('friendship_updated');
      socket.disconnect();
    };
  }, [dispatch, currentUser]);
};