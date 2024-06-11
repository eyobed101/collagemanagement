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
      expiration: response.data.expiration,
      roleName:response.data.roleName[0]
    };

    // const usernamel = atos(response.data.username);

    console.log("log the username", response.data.username);
    localStorage.setItem('accessToken', response.data.token);
    localStorage.setItem('username', response.data.username);

    // localStorage.setItem('username', transformString(response.data.username));


    setTimeout(() => {
      console.log("Logged out");
      dispatch(userAction.logout());
    }, response.data.expiration * 1000); 


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
      state.value = action.payload.roleName;
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
function transformString(input) {
  // Splitting the string by 'x0X' to isolate the parts
  const parts = input.split('x0X');

  // First part is used as is
  const prefix = parts[0]; // 'ADAD'

  // Middle part processing: remove the first character '4' and convert to integer
  const middlePartRaw = parts[1].substring(1); // Take the substring starting after the first character
  let middle = parseInt(middlePartRaw, 10); // Convert the string to an integer to remove any extra leading zeros
  middle = middle.toString().padStart(4, '0'); // Ensure it's four digits, adjusted if necessary

  // Last part processing: remove the first character '4' and convert to integer
  const lastPartRaw = parts[2].substring(1); // Take the substring starting after the first character
  const last = parseInt(lastPartRaw, 10).toString().padStart(2, '0'); // Convert to number, ensure two digits

  return `${prefix}/${middle}/${last}`;
}// export const userAction = userSlice.actions;


// Export the user reducer
export default userSlice.reducer;
