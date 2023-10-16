import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: null,
  },
  reducers: {
    getList: (state, action) => {
      state.user = action.payload;
    },
  },
});
export default slice.reducer


// Actions
const { getList } = slice.actions

export const pageList = () => async dispatch => {
  try {
    const res = await axios.get('http://dummy.restapiexample.com/api/v1/employees');
    return dispatch(getList())
  } catch (e) {
    return console.error(e.message);
  }
}