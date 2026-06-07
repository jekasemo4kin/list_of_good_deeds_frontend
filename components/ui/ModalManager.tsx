'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { closeModal } from '../../store/slices/ui';
import CreateTodoModal from '../todos/CreateTodoModal';
import FriendsListModal from '../friends/FriendsListModal';

export default function ModalManager() {
  const { modalType } = useSelector((state: RootState) => state.ui);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!modalType || !isAuthenticated) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        // Если кликнули ровно по оверлею (черному фону), а не по контенту внутри
        if (e.target === e.currentTarget) {
        dispatch(closeModal());
        }
    };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" 
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-6 rounded shadow-lg">
        {modalType === 'createTodo' && <CreateTodoModal />}
        {modalType === 'friendsList' && <FriendsListModal />}
      </div>
    </div>
  );
}