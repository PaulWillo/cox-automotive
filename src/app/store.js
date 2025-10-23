import { configureStore } from '@reduxjs/toolkit';
import vehiclesReducer from '../features/vehicles/vehiclesSlice';

// You can add reducers here later
export const store = configureStore({
  reducer: {
    vehicles: vehiclesReducer,
  },
});