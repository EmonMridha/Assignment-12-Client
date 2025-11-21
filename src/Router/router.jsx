import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import AuthLayouts from "../Layouts/AuthLayouts";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import Home from "../Pages/Home/Home";
import AddProducts from "../Pages/AddProducts/AddProducts";
import MyProducts from "../Pages/MyProducts/MyProducts";
import Update from "../Pages/Update/Update";
import ProductDetails from "../Pages/ProductDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: () => fetch('http://localhost:3000/products'),
                Component: Home
            },
            {
                path: 'addProduct',
                Component: AddProducts
            },
            {
                path: 'myProducts',
                loader: () => fetch(`http://localhost:3000/products`).then(res => res.json()),
                Component: MyProducts
            },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`).then(res=>res.json()),
                Component: Update
            },
            {
                path: 'productDetails/:id',
                loader: ({ params }) => fetch(`http://localhost:3000/products/${params.id}`),
                Component: ProductDetails
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