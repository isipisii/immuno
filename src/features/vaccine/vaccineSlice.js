import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vaccineList: JSON.parse(localStorage.getItem("vacList")) || [],
  vaccineRecord: {},
};

const vaccineSlice = createSlice({
  name: "vaccine",
  initialState,
  reducers: {
    addVaccine: (state, action) => {
      const { vaccineName } = action.payload;
      const isVaccineRecorded = state.vaccineList.some(
        (vaccineList) => vaccineList.vaccineName === vaccineName
      );

      if (isVaccineRecorded) {
        alert(`${vaccineName} vaccine has been recorded`);
      } else {
        state.vaccineList = [...state.vaccineList, action.payload];
      }
    },
    deleteVaccine: (state, action) => {
      state.vaccineList = state.vaccineList.filter(
        (vaccine) => vaccine.id !== action.payload
      );
    },
    // will return new array with updated vaccine
    updateVaccine: (state, action) => {
      state.vaccineList = state.vaccineList.map((vaccine) => {
        if (vaccine.id === action.payload.id) {
          return action.payload;
        }
        return vaccine;
      });
    },
    getVaccineRecord: (state, action) => {
      state.vaccineRecord = action.payload;
    },
  },
});

export const { addVaccine, deleteVaccine, updateVaccine, getVaccineRecord } =
  vaccineSlice.actions;
export const vaccineReducer = vaccineSlice.reducer;
