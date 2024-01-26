import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const createCourse = createAsyncThunk("courses/createCourse", async (data) => {
  // console.log(data);
  // await setDoc(doc(firestoreDb, "courses", uuid()), data);
  return data;
});
const listCourses = createAsyncThunk("courses/listCourses", async (data) => {
  var children = [];
  //   const q = query(
  //     collection(firestoreDb, "class"),
  //     where("school_id", "==", uid.school)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     var datas = doc.data();
  //     children.push({
  //       ...datas,
  //       key: doc.id,
  //     });
  //   });
  //   await setDoc(doc(firestoreDb, "courses", uuid()), data);
  return data;
});
const coursesSlice = createSlice({
  name: "courses",

  initialState: {
    loading: false,
    error: false,
    value: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(listCourse.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(listCourse.fulfilled, (state, action) => {
      state.loading = false;
      state.value = action.payload;
      state.error = "";
    });
    builder.addCase(listCourse.rejected, (state, action) => {
      state.loading = false;
      state.value = {};
      state.error = action.error.message;
    });
  },
});
export const createCourses = createCourse;
export const listCourse = listCourses;
export const studentAction = coursesSlice.actions;
export default coursesSlice.reducer;
