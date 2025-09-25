// filepath: d:\RealtyHomes\RealtyHomes-frontend\realty-homes-frontend\src\store.js
import { configureStore } from "@reduxjs/toolkit";
import inquiryReducer from "../src/features/inquirySlice"; // Update the import

const store = configureStore({
  reducer: {
    inquiries: inquiryReducer,
    // Add other reducers here as needed
  },
});

export default store;
