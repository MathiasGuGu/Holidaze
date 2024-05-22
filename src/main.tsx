import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./lang/i18n";
import "./index.css";

import PageNotFound from "./routeElements/PageNotFound.tsx";
import Layout from "./routeElements/Layout.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import Discover from "./pages/Discover.tsx";
import Venue from "./pages/Venue.tsx";
import Profile from "./pages/Profile.tsx";
import MyBookings from "./pages/MyBookings.tsx";
import CreateVenue from "./pages/CreateVenue.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/sign-in",
        element: <Login />,
      },
      {
        path: "/sign-up",
        element: <Register />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/venues/create",
        element: <CreateVenue />,
      },
      {
        path: "/profile/bookings",
        element: <MyBookings />,
      },
      {
        path: "/discover",
        element: <Discover />,
      },
      {
        path: "/discover/:id",
        element: <Venue />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
