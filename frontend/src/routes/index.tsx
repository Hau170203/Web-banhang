import { Layout } from "../layout/Layout"
import Admin from "../pages/Admin"
import { DetailProduct } from "../pages/DetailProduct"
import DetailUser from "../pages/DetailUser"
import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import Order from "../pages/Order"
import { Register } from "../pages/Register"
import { SignIn } from "../pages/SignIn"
import TypeProduct from "../pages/TypeProduct"
import { PrivateRouter } from "./PrivateRouter"
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
                path:"/detail-product/:id",
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
            },
            {
                path: "/type-product/:type",
                element: <TypeProduct />
            },
            {
                path: "/order",
                element: <Order />
            }
            
        ]
    },
    {
        element: <PrivateRouter />,
        children: [
            {
                path: '/admin',
                element: <Admin />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
]