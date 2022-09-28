import React from "react";
import API from "../utils/API.js";
import { Outlet, Navigate } from "react-router-dom";
import {useLocation} from "react-router-dom";

function PrivateRoute() {

    async function facebookToken() {
        const { data } = await API.facebookToken();
        console.log(data);
        if (data.success === true){
            await localStorage.setItem("token", data.token);
        }
    }

    async function googleToken() {
        const { data } = await API.googleToken();
        console.log(data);
        if (data.success === true){
            await localStorage.setItem("token", data.token);
        }
    }

    facebookToken();
    googleToken();

    if (!localStorage.getItem('reload')) {
        localStorage['reload'] = true;
        window.location.reload();
    } else {
        localStorage.removeItem('reload');
    }

    return API.isAuth() ? <Outlet/> : <Navigate to="/" />;
};

export default PrivateRoute;