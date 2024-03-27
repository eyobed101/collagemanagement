import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../user";
import studentReducer from "../student";
import coursesReducer, { listCourse } from "../courses";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "user",
  storage: storage,
};

const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer),
    // student: studentReducer,
    // courses: coursesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// store.dispatch(listCourse());
setupListeners(store.dispatch);

export default store;