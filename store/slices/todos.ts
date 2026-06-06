import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../lib/types';
import { todosApi } from '../../lib/api';

interface TodosState {
  todos: Todo[];
  loading: boolean;
  searchQuery: {
    title: string;
    name: string;
  };
  error: string | null;
}

const initialState: TodosState = {
  todos: [],
  loading: false,
  searchQuery: {
    title: '',
    name: '',
  },
  error: null,
};

// Асинхронный экшен для поиска/получения дел
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (params: { title: string; name: string }) => {
    const response = await todosApi.findAll(params);
    return response.data;
  }
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<{ title: string; name: string }>) => {
      state.searchQuery = action.payload;
    },
    // Для реактивного обновления через WebSocket
    updateTodoLocally: (state, action: PayloadAction<Todo>) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      } else {
        state.todos.push(action.payload);
      }
    },
    removeTodoLocally: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    removeTodoLocallyByAuthor: (state, action: PayloadAction<string>) => {
  // Фильтруем все дела, автор которых не совпадает с переданным userId
      state.todos = state.todos.filter((t) => t.authorId !== action.payload);
},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.loading = false;
        state.error = 'Не удалось загрузить дела';
      });
  },
});

export const { setSearchQuery, updateTodoLocally, removeTodoLocally, removeTodoLocallyByAuthor } = todosSlice.actions;
export default todosSlice.reducer;