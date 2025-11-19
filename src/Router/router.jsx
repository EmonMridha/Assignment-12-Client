import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Home from "../Pages/Home/Home";
import AddProducts from "../Pages/AddProducts/AddProducts";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: 'addProduct', 
                Component: AddProducts
            }
        ]
    },
    {
        path: '/',
        Component: AuthLayouts,
        children: [
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component: Register
            }
        ]
    }
]);