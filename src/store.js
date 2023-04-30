import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { addModalReducer } from "./features/modal/addModalSlice";
import {vaccineReducer} from "./features/vaccine/vaccineSlice";
import { editModalReducer } from "./features/modal/editModalSlice";

export const store = configureStore({
  reducer: {
    addModal: addModalReducer,
    vaccine: vaccineReducer,
    editModal: editModalReducer,
  },
});

setupListeners(store.dispatch);