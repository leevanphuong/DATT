import { RouteObject } from 'react-router-dom'
import HomePageMain from './HomePage/HomePageMain'
import MainCategory from './Categories/MainCategory'
import ProductMain from './Product/ProductMain.component'
import Signinmain from './Signin/Signinmain.component'
import Signupmain from './Signup/SignupMain.component'
import CartMain from './Cart/CartMain.component'
import ManageClient from './Manage-client/ManageClient.component'
import ManageInfo from './Manage-info/ManageInfo.component'
import ChangePassword from './Manage-info/ChangerPassword/ChangePassword.component'
import ManageProduct from './Manage-product/ManageProduct.component'
import Payment from './payment/Payment.component'
export const clientRouter: RouteObject[] = [
    {
        path: '/',
        element:<HomePageMain/>
    },
    {
        path:'/category/:id',
        element: <MainCategory/>
    },
    {
        path:'/products',
        element: <ProductMain/>
    },
    {
        path:'/signin',
        element:<Signinmain/>
    },
    {
        path:'/signup',
        element:<Signupmain/>
    },
    {
        path:'/cart',
        element:<CartMain/>
    },
    {
        path:'/manage',
        element:<ManageClient/>
    },
    {
        path:'/manage-info',
        element:<ManageInfo/>
    },
    {
        path:"/chagerpassword",
        element:<ChangePassword/>
    },
    {
        path:'/manage-product',
        element:<ManageProduct/>
    },
    {
        path:'/payment',
        element:<Payment/>
    },
]