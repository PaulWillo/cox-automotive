import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mocked data from task
const vehicleData = [
  { make: "Toyota", model: "Camry", year: 2021, price: 23450, mileage: 15000, colour: "White", id: "veh001" },
  { make: "Honda", model: "Civic", year: 2020, price: 19800, mileage: 22000, colour: "Blue", id: "veh002" },
  { make: "Ford", model: "F-150", year: 2019, price: 27500, mileage: 30000, colour: "Black", id: "veh003" },
  { make: "Tesla", model: "Model 3", year: 2022, price: 38990, mileage: 5000, colour: "Red", id: "veh004" },
  { make: "Chevrolet", model: "Malibu", year: 2018, price: 15500, mileage: 45000, colour: "Silver", id: "veh005" },
  { make: "Nissan", model: "Altima", year: 2021, price: 21000, mileage: 18000, colour: "Gray", id: "veh006" },
  { make: "BMW", model: "X3", year: 2020, price: 35500, mileage: 25000, colour: "White", id: "veh007" },
  { make: "Hyundai", model: "Elantra", year: 2019, price: 16200, mileage: 35000, colour: "Blue", id: "veh008" },
  { make: "Kia", model: "Sorento", year: 2022, price: 29900, mileage: 12000, colour: "Green", id: "veh009" },
  { make: "Volkswagen", model: "Jetta", year: 2018, price: 14500, mileage: 48000, colour: "Black", id: "veh010" }
];

export const fetchVehicles = createAsyncThunk('vehicles/fetchVehicles', async () => {
  return new Promise((resolve) => {
    //You wouldnt really do this in a real app, but simulating network delay
    setTimeout(() => {
      resolve(vehicleData);
    }, 500);
  });
});

const vehiclesSlice = createSlice({
  name: 'vehicles',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVehicles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchVehicles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default vehiclesSlice.reducer;
