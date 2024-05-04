import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../../pages/home";
import { ROUTE_PATH } from "shared/config/routes";
import { AddWishPage } from "pages/add-wish/AddWishPage";
import { MyWishListPage } from "pages/my-wish-list/MyWishListPage";

export const router = createBrowserRouter([
    {
        path: ROUTE_PATH.home,
        element: <HomePage />
    },
    {
        path: ROUTE_PATH.addWish,
        element: <AddWishPage />
    },
    {
        path: ROUTE_PATH.myWishList,
        element: <MyWishListPage />
    }
])