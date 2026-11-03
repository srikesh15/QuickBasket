import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLocation: null,
  selectedAddress: null,
};

const locationSlice = createSlice({
  name: 'location',

  initialState,

  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },

    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },

    clearLocation: state => {
      state.currentLocation = null;
      state.selectedAddress = null;
    },
  },
});

export const {
  setCurrentLocation,
  setSelectedAddress,
  clearLocation,
} = locationSlice.actions;

export default locationSlice.reducer;