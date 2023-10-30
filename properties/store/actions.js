// Search Actions
export const FETCH_SEARCH_DATA_SUCCESS = 'FETCH_SEARCH_DATA_SUCCESS';
export const FETCH_SEARCH_DATA_FAILED = 'FETCH_SEARCH_DATA_FAILED';

// Search Action Creators
export const fetchSearchedProperties = data => dispatch =>
  dispatch({
    type: FETCH_SEARCH_DATA_SUCCESS,
    payload: data,
  });
