import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  players: [],
  scores: []
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    add: (state, action) => {
      console.log('--== startBoardGame 2 ', action)
      state.name = action.payload.name
      state.players = action.payload.players
    },
    save: (state, action) => {
      console.log('--== startBoardGame 2 ', action)
      state.scores.push(action.payload)
    },
  },
});

export const { add, save } = boardSlice.actions;

export const addBoard = (params) => (dispatch) => {
  console.log('--== startBoardGame 1 ', params)
    dispatch(add(params));
};
export const saveBoardScore = (params) => (dispatch) => {
  console.log('--== startBoardGame 1 ', params)
    dispatch(save(params));
};

export default boardSlice.reducer;
