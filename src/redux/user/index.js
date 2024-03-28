import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiurl } from "../../components/constants";


// Define an async thunk for user login
const loginUser = createAsyncThunk("user/loginUser", async (data) => {
  try {
    const response = await axios.post(`${apiurl}/api/Authenticate/login`, {
      email: data.email,
      password: data.password
  });

    // Assuming the response contains user data and profile
    const responseData = {
      message: response.data.message,
      token: response.data.token,
      expiration: response.data.expiration
    };
    localStorage.setItem('accessToken', response.data.token);
    return responseData;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
});

// Define a slice for user data management
const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    error: false,
    value: null,
    token: null,
    expiration: null
  },
  reducers: {
    logout: (state) => {
      state.value = null;
      state.token = null;
      state.expiration = null;
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
      state.value = action.payload.message;
      state.token = action.payload.token;
      state.expiration = action.payload.expiration;
      state.error = false;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// Export the user login thunk and slice actions
export const userLogin = loginUser;
// export const { logout } = userSlice.actions;
export const userAction = userSlice.actions;


// export const userAction = userSlice.actions;


// Export the user reducer
export default userSlice.reducer;
