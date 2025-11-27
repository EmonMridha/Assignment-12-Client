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
import ReviewQueue from "../Pages/ReviewQueue";
import ReportedContent from "../Pages/ReportedContent";
import ManageUsers from "../Pages/ManageUsers";
import StatisticsPage from "../Pages/StatisticsPage";
import ManageCoupons from "../Pages/ManageCoupons";
import CouponEdit from "../Pages/CouponEdit";
import PrivateRoute from "./PrivateRoute/PrivateRoute";


export const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                loader: () => fetch('https://assignment-12-server-jade-two.vercel.app/products/accepted'),
                Component: Home
            },
            {
                path: 'addProduct',
                element: <PrivateRoute><AddProducts></AddProducts></PrivateRoute>
            },
            {
                path: 'myProducts/:email',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/byEmail/${params.email}`).then(res => res.json()),
                element: <PrivateRoute><MyProducts></MyProducts></PrivateRoute>
            },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/${params.id}`).then(res => res.json()),
                Component: Update
            },
            {
                path: 'productDetails/:id',
                loader: ({ params }) => fetch(`https://assignment-12-server-jade-two.vercel.app/products/${params.id}`),
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
            },
            {
                path: 'allProducts',
                loader: () => fetch(`https://assignment-12-server-jade-two.vercel.app/products/accepted`),
                element: <PrivateRoute><AllProducts></AllProducts></PrivateRoute>
            },
            {
                path: 'myProfile',
                element: <PrivateRoute><MyProfile></MyProfile></PrivateRoute>
            },
            {
                path: 'reviewQueue',
                loader: () => fetch('https://assignment-12-server-jade-two.vercel.app/products'),
                element: <PrivateRoute><ReviewQueue></ReviewQueue></PrivateRoute>
            },
            {
                path: 'reportedContent',
                element: <PrivateRoute><ReportedContent></ReportedContent></PrivateRoute>
            },
            {
                path: 'manageUsers',
                element: <PrivateRoute>< ManageUsers></ManageUsers></PrivateRoute>
            },
            {
                path: 'staticsPage',
                element: <PrivateRoute><StatisticsPage></StatisticsPage></PrivateRoute>
            },
            {
                path: 'manageCoupons',
                element: <PrivateRoute><ManageCoupons></ManageCoupons></PrivateRoute>
            },
            {
                path: 'couponEdit/:id',
                element: <PrivateRoute><CouponEdit></CouponEdit></PrivateRoute>
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