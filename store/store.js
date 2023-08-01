import { configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "./reducers";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
