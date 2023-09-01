import React from 'react';
import App from './components/App';
import { createRoot } from "react-dom/client";

import {
    createBrowserRouter,
    RouterProvider
} from "react-router-dom";
import Registration from "./components/authoriztion/Registration";
import Login from "./components/authoriztion/Login";
import Disk from "./components/disk/Disk";
import Profile from "./components/profile/Profile";

const router = createBrowserRouter([
    {
        path: "/",
        element: (<App/>),
        children: [
            {
                path: 'registration',
                element: (<Registration/>)
            },
            {
                path: 'login',
                element: (<Login/>)
            },
            {
                path: 'disk',
                element: (<Disk/>)
            },
            {
                path: 'profile',
                element: (<Profile/>)
            },
            {
                path: "*",
                element: <div>ERROR, PAGE NOT FOUND</div>,
            },

        ]
    },

]);

createRoot(document.getElementById("root")).render(
    <RouterProvider router={router} />
);


