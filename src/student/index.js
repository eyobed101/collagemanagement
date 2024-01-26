import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uuid from "react-uuid";



const createStudent = createAsyncThunk(
  "student/createStudent",
  async (data) => {
    
    return data;
  }
);
const listClasses = createAsyncThunk("student/listClasses", async (data) => {
  // setDoc(doc(firestoreDb, "students", uuid()), data);
  return null;
});
const studentSlice = createSlice({
  name: "student",

  initialState: {
    loading: false,
    error: false,
    value: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(createStudent.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(createStudent.rejected, (state, action) => {
      state.loading = false;
      state.value = {};
      state.error = action.error.message;
    });
    builder.addCase(listClasses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listClasses.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(listClasses.rejected, (state, action) => {
      state.loading = false;
      state.value = {};
      state.error = action.error.message;
    });
  },
});
export const createStd = createStudent;
export const listClass = listClasses;
export const studentAction = studentSlice.actions;
export default studentSlice.reducer;
