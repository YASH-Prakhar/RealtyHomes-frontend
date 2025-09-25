import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inquiries: [],
  loading: false,
  error: null,
};

// Async thunk for fetching inquiries
export const fetchInquiries = createAsyncThunk(
  "inquiries/fetchInquiries",
  async (userId) => {
    const token = localStorage.getItem("SESSION_TOKEN"); // Get the token
    const response = await axios.get(
      "http://localhost:5000/api/inquiries/my-inquiries", // Updated endpoint
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in headers
        },
        params: {
          user_id: userId, // Pass user ID as a parameter
        },
      }
    );
    return response.data; // Assuming the response contains the inquiries
  }
);

// Async thunk for adding an inquiry
export const addInquiry = createAsyncThunk(
  "inquiries/addInquiry",
  async (inquiryData) => {
    const token = localStorage.getItem("SESSION_TOKEN");
    const response = await axios.post(
      "http://localhost:5000/api/inquiries",
      inquiryData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming the response contains the added inquiry
  }
);

const inquirySlice = createSlice({
  name: "inquiries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInquiries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInquiries.fulfilled, (state, action) => {
        state.loading = false;
        state.inquiries = action.payload.inquiries || []; // Ensure to access inquiries correctly
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.inquiries.push(action.payload); // Add the new inquiry to the state
      });
  },
});

export default inquirySlice.reducer;
