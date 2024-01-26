import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { firebaseAuth, firestoreDb, app } from "../../firebase";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const phoneUser = createAsyncThunk("user/phoneUser", async (data) => {
  var resp = await JSON.stringify(data.user);
  const docRef = await doc(firestoreDb, "users", data.user.uid);
  const docSnap = await getDoc(docRef);
  const profile = await docSnap.data();
  // const profile = await JSON.stringify(pro);
  var data = { resp, profile };
  return data;
});

const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  var datas ={
    resp: {
      email: data.email,
      password :data.password
    },
    profile: {
      role: {
        'isAdmin': true,
         isTeacher: false,
      }
    },

  }
  return datas;
});

const userSlice = createSlice({
  name: "user",

  initialState: {
    loading: false,
    error: false,
    value: null,
    school: null,
    profile: null,
    role: "",
  },
  reducers: {
    logout: (state) => {
      state.value = null;
      state.profile = null;
      state.school = null;
      state.error = false;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload.resp;
      state.profile = action.payload.profile
      state.school = action.payload.datas;
      state.error = "";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.value = null;
      state.error = action.error.message;
    });
    builder.addCase(phoneLogin.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(phoneLogin.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload.resp;
      state.profile = action.payload.profile;
      state.error = "";
    });
    builder.addCase(phoneLogin.rejected, (state, action) => {
      state.loading = false;
      state.value = {};
      state.error = action.error.message;
    });
  },
});
export const userLogin = loginUser;
export const phoneLogin = phoneUser;
export const userAction = userSlice.actions;
export default userSlice.reducer;
