
import { configureStore } from "@reduxjs/toolkit";
import inquiryReducer from "../src/features/inquirySlice"; // Update the import

const store = configureStore({
  reducer: {
    inquiries: inquiryReducer,
    
  },
});

export default store;
