
import { Layout } from "../layout/Layout"
import { DetailProduct } from "../pages/DetailProduct"
import DetailUser from "../pages/DetailUser"
import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import { Register } from "../pages/Register"
import { SignIn } from "../pages/SignIn"
export const routes = [
    {
        path: "/",
        element: <Layout/>,
        children: [
            {
                path:"/",
                element: <Home />
            },
            {
                path:"/detail-product",
                element: <DetailProduct />
            },
            {
                path: "/sign-in",
                element: <SignIn />
            },
            {
                path:"/register",
                element: <Register />
            },
            {
                path: "/detail-user",
                element: <DetailUser />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]