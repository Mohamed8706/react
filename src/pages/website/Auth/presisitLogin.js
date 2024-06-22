import "./login.css"
import { useContext, useEffect, useState } from 'react';
import { User } from '../../dashboard/context/Context';
import { Outlet } from 'react-router-dom';
import Cookies from "universal-cookie"
import LoadingScreen from './../../../Components/loading';
import axios from "axios";


export default function PresistLogin() {
    // get current user
    const context = useContext(User);
    const token = context.auth.token;
    const [loading, setLoading] = useState(true);
    // make a new cookie 
    const cookie = new Cookies();
    const getToken = cookie.get("Bearer");
    // send refresh token
    useEffect(() => {
        async function refresh() {
            try {
                await axios.post('http://127.0.0.1:8000/api/refresh', null , {
                    headers: {
                        Authorization: "Bearer " + getToken,
                    },
                })
                .then((data) =>{ 
                    cookie.set('Bearer', data.data.token);
                    context.setAuth((prev) => {return {userDetails: data.data.user , token: data.data.token};
                });
            });
            } catch(err) {
                console.log(err)
            } finally {
                setLoading(false);
            }
        }
        !token ? refresh() : setLoading(false); 
    }, [])
    return loading ? <LoadingScreen /> : <Outlet /> ;
}