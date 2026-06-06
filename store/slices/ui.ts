import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: { isCreateModalOpen: false },
  reducers: {
    setCreateModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateModalOpen = action.payload;
    },
  },
});

export const { setCreateModalOpen } = uiSlice.actions;
export default uiSlice.reducer;