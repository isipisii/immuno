import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false
}

const addModalSlice = createSlice({
    name: 'addModal',
    initialState,
     reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        }
     }
});

export const { openModal, closeModal } = addModalSlice.actions;
export const addModalReducer = addModalSlice.reducer;