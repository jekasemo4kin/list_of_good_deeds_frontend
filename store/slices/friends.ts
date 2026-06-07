import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../lib/types';
import { friendsApi } from '../../lib/api';

interface FriendsState {
  friends: User[];
  loading: boolean;
}

const initialState: FriendsState = {
  friends: [],
  loading: false,
};

export const fetchFriends = createAsyncThunk('friends/fetchAll', async () => {
  const response = await friendsApi.getFriends();
  return response.data;
});

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriendLocally: (state, action: PayloadAction<User>) => {
      state.friends.push(action.payload);
    },
    removeFriendLocally: (state, action: PayloadAction<string>) => {
      state.friends = state.friends.filter(f => f.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.friends = action.payload;
    });
  },
});

export const { addFriendLocally, removeFriendLocally } = friendsSlice.actions;
export default friendsSlice.reducer;