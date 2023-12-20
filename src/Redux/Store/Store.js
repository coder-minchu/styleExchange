import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from '../Reducer/Reducer';
import LoginReducer from '../Reducer/LoginReducer';
import OtpVerifyReducer from '../Reducer/OtpVerifyReducer';
import CategoriesReducer from '../Reducer/CategoriesReducer';
import ProductListReducer from '../Reducer/GetAllProductListReducer';
import SearchSuggetionsReducer from '../Reducer/SearchSuggetionsReducer';
import BrandsReducer from '../Reducer/GetBrandsReducer';
import GetUserReducer from '../Reducer/GetUserReducer';
import WishlistReducer from '../Reducer/WishlistReducer';

const rootReducer = combineReducers({
  Reducer: Reducer,
  LoginReducer: LoginReducer,
  OtpVerifyReducer: OtpVerifyReducer,
  CategoriesReducer: CategoriesReducer,
  ProductListReducer:ProductListReducer,
  SearchSuggetionsReducer:SearchSuggetionsReducer,
  BrandsReducer:BrandsReducer,
  GetUserReducer:GetUserReducer,
  WishlistReducer:WishlistReducer
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
