import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import todosReducer from './slices/todos';
import friendsReducer from './slices/friends';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    friends: friendsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;