import React from "react";
import {useSearchParams} from "react-router-dom";
import API from "../utils/API.js";

function Token(){
    const [searchParams, setSearchParams] = useSearchParams();

    async function createTokenAndId(){
//        console.log(searchParams.get("token"));
//        console.log(searchParams.get("id"))
        const result = await API.verifyToken(searchParams.get("token"));
        if (result.success === true){
            await localStorage.setItem("token", searchParams.get("token") );
            await localStorage.setItem("id", searchParams.get("id"))
        }
    }

    createTokenAndId();
}

export default Token;