import { configureStore } from "@reduxjs/toolkit";
import { audioReducer, dataReducer } from "./reducers";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
