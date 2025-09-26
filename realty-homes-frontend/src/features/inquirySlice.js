import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  inquiries: [],
  loading: false,
  error: null,
};


export const fetchInquiries = createAsyncThunk(
  "inquiries/fetchInquiries",
  async (userId) => {
    const token = localStorage.getItem("SESSION_TOKEN"); 
    const response = await axios.get(
      "http://localhost:5000/api/inquiries/my-inquiries", 
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
        params: {
          user_id: userId, 
        },
      }
    );
    return response.data; 
  }
);


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
    return response.data; 
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
        state.inquiries = action.payload.inquiries || []; 
      })
      .addCase(fetchInquiries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addInquiry.fulfilled, (state, action) => {
        state.inquiries.push(action.payload); 
      });
  },
});

export default inquirySlice.reducer;
