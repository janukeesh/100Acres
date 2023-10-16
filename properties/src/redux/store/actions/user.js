import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Slice
const slice = createSlice({
  name: 'user',
  initialState: {
    user: [],
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
    const res = await axios.get('https://dummy.restapiexample.com/api/v1/employees');
    console.log(res.data.data);
    let dataUser = res.data.data;
    return dispatch(getList(dataUser));
  } catch (e) {
    return console.error(e.message);
  }
}