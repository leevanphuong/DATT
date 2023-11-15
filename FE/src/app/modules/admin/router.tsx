import { RouteObject } from "react-router-dom";
import CategoryAdmin from "./category/CategoryAdmin";
import AuthorAdmin from "./author/AuthorAdmin";
import Orderadmin from "./order/OrderAdmin";
import ProductAdmin from "./product/productAdmin";

export const adminRouter: RouteObject[] = [
    {
        path:"category",
        element:<CategoryAdmin/>
    },
    {
        path:"author",
        element:<AuthorAdmin/>
    },
    {
        path:"order",
        element:<Orderadmin/>
    },
    {
        path:"product",
        element:<ProductAdmin/>
    }
]