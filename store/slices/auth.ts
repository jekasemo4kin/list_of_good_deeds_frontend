import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../lib/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  isInitialized: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.isInitialized = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isInitialized = true;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setInitialized: (state) => {
      state.isInitialized = true;
},
  },
});

export const { setUser, logout, setLoading, setInitialized } = authSlice.actions;
export default authSlice.reducer;