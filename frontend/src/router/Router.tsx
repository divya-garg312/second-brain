import { createBrowserRouter } from "react-router-dom";
import Signin from "../Components/auth/Signin.tsx";
import Signup from "../Components/auth/Signup.tsx";
import Layout from "../Components/layout/Layout.tsx";
import ProtectedRoute from "../Components/common/ProtectedRoute.tsx";
import Home from "../pages/Home.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "tweets",
        element: <Home />
      },
      {
        path: "videos", 
        element: <Home />
      },
      {
        path: "documents",
        element: <Home />
      },
      {
        path: "links",
        element: <Home />
      }
    ]
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
    ]
  }
])