import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAddModalOpen: false,
  isEditModalOpen: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openAddModal: (state) => {
      state.isAddModalOpen = true;
    },
    closeAddModal: (state) => {
      state.isAddModalOpen = false;
    },
    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
      state.isEditModalOpen = false;
    },
  },
});

export const { openAddModal, closeAddModal, openEditModal, closeEditModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
