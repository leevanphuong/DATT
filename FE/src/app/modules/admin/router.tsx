import { RouteObject } from "react-router-dom";
import CategoryAdmin from "./category/CategoryAdmin";
import AuthorAdmin from "./author/AuthorAdmin";

export const adminRouter: RouteObject[] = [
    {
        path:"category",
        element:<CategoryAdmin/>
    },
    {
        path:"author",
        element:<AuthorAdmin/>
    }
]