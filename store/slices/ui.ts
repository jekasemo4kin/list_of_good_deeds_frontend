import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  modalType: 'createTodo' | 'friendsList' | null;
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: { modalType: null } as UIState,
  reducers: {
    openModal: (state, action: PayloadAction<'createTodo' | 'friendsList'>) => {
      state.modalType = action.payload;
    },
    closeModal: (state) => {
      state.modalType = null;
    },
    resetUI: () => {
      return { modalType: null };
    },
  },
});

export const { openModal, closeModal, resetUI } = uiSlice.actions;
export default uiSlice.reducer;