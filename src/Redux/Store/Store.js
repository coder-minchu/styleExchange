import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../Reducer/Reducer';
// import categoriesReducer from '../reducers/categoriesReducer';

const rootReducer = combineReducers({
  // categories: categoriesReducer,
  Reducer: Reducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
