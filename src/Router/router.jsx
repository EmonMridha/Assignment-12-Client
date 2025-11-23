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
import AllProducts from "../Pages/AllProducts";
import MyProfile from "../Pages/MyProfile";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: () => fetch('https://assignment-12-server-jade-two.vercel.app/products'),
                Component: Home
            },
            {
                path: 'addProduct',
                Component: AddProducts
            },
            {
                path: 'myProducts/:email',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/byEmail/${params.email}`).then(res => res.json()),
                Component: MyProducts
            },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/${params.id}`).then(res => res.json()),
                Component: Update
            },
            {
                path: 'productDetails/:id',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/${params.id}`),
                Component: ProductDetails
            },
            {
                path: 'allProducts',
                loader: () => fetch(`https://assignment-12-server-jade-two.vercel.app/products`),
                Component: AllProducts
            },
            {
                path:'myProfile',
                Component: MyProfile
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