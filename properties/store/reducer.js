const {FETCH_SEARCH_DATA_SUCCESS} = require('./actions');

const initialState = {
  searchedProperties: [],
};
const RootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_DATA_SUCCESS:
      return {
        ...state,
        searchedProperties: action.payload,
      };
    default:
      return state;
  }
};

export default RootReducer;
