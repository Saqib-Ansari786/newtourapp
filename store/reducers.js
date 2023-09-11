import { createReducer } from "@reduxjs/toolkit";

const datainitialState = {
  data: [],
  audiolist: [],
};

export const dataReducer = createReducer(datainitialState, {
  DATA: (state, action) => {
    state.data = action.payload;
  },
  AUDIO: (state, action) => {
    state.audiolist = action.payload;
  },
});
