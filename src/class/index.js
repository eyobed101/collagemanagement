import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseAuth, firestoreDb, app } from "../../firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const getClasses = createAsyncThunk("class/getClasses", async (data) => {
  // var resp = await JSON.stringify(data.user);
  // const docRef = await doc(firestoreDb, "users", data.user.uid);
  // const docSnap = await getDoc(docRef);
  // const profile = await docSnap.data();
  // var data = { resp, profile };
  return data;
});

const getCourses = createAsyncThunk("class/getCourses", async (data) => {
  return null;
});

const classSlice = createSlice({
  name: "class",

  initialState: {
    loading: false,
    error: false,
    value: null,
    profile: null,
    role: "",
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getCourses.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload.resp;
      state.profile = action.payload.profile;
      state.error = "";
    });
    builder.addCase(getCourses.rejected, (state, action) => {
      state.loading = false;
      state.value = {};
      state.error = action.error.message;
    });
  },
});
export const getClassesData = getClasses;
export const getCoursesData = getCourses;
export const classAction = classSlice.actions;
export default classSlice.reducer;
