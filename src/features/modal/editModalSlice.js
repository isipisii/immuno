import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isEditOpen: false
}

const editModalSlice = createSlice({
    name: 'editModal',
    initialState,
     reducers: {
        openEditModal: (state) => {
            state.isEditOpen = true;
        },
        closeEditModal: (state) => {
            state.isEditOpen = false;
        }
     }
});

export const { openEditModal, closeEditModal } = editModalSlice.actions;
export const editModalReducer = editModalSlice.reducer;