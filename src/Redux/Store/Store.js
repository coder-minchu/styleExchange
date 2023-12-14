import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../Reducer/Reducer';
import LoginReducer from '../Reducer/LoginReducer';
import OtpVerifyReducer from '../Reducer/OtpVerifyReducer';
import CategoriesReducer from '../Reducer/CategoriesReducer';
import ProductListReducer from '../Reducer/GetAllProductListReducer';
import SearchSuggetionsReducer from '../Reducer/SearchSuggetionsReducer';
import BrandsReducer from '../Reducer/GetBrandsReducer';

const rootReducer = combineReducers({
  Reducer: Reducer,
  LoginReducer: LoginReducer,
  OtpVerifyReducer: OtpVerifyReducer,
  CategoriesReducer: CategoriesReducer,
  ProductListReducer:ProductListReducer,
  SearchSuggetionsReducer:SearchSuggetionsReducer,
  BrandsReducer:BrandsReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
