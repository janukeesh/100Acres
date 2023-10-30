import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import RootReducer from './reducer';

const configureStore = createStore(RootReducer, applyMiddleware(thunk));

export default configureStore;
