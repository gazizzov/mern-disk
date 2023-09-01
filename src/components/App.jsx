import React, {useEffect} from 'react';
import Navbar from "./navbar/Navbar";
import './app.css'
import {Outlet, useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import user from '../store/User'


const App = observer(() => {
    const navigate = useNavigate();


    useEffect(() => {
        async function auth () {
            await user.auth();
            if (localStorage.getItem("auth") === "true") {
                navigate("/disk");

            } else {
                navigate("/login");
            }
        }

        auth();
    }, [])

    return (

        <div className='app'>
          <Navbar />
          <Outlet />
        </div>
    );
})

export default App;