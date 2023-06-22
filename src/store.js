import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { modalReducer } from "./features/modal/modalSlice";
import {vaccineReducer} from "./features/vaccine/vaccineSlice";


export const store = configureStore({
  reducer: {   
    vaccine: vaccineReducer,
    modal: modalReducer
  },
});

setupListeners(store.dispatch);