import { combineReducers } from 'redux'
import productReducer from './productSlice/productSlice'
import categoryReducer from './categorySlice/categorySlice'
import authReducer from './authSlice/authSlice'
import orderReducer from './orderSlice/orderSlice'
import authorReducer from "./authorSlice/authorSilce"
export const clientReducer = combineReducers({
    productReducer,
    categoryReducer,
    authReducer,
    orderReducer,
    authorReducer
})
export default clientReducer