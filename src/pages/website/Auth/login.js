import Header from "../../../Components/Header";
import { useContext, useState } from "react";
import { User } from "../../dashboard/context/Context";
import axios from "axios";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


export default function SignUp() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState(false);
    const [accept, setAccept] = useState(false);

    const nav = useNavigate();

    const userNow = useContext(User);
    
    // set cookie
    const cookie = new Cookies();


    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

    
    try {
            //send data 
        let res = await axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password,

        });
        const token = res.data.data.token;
        cookie.set("Bearer", token);
        const userDetails = res.data.data.user;
        userNow.setAuth({token , userDetails});
        nav('/dashboard')
        

    } catch (err) {
        if (err.response.status === 401){
        setErr(true);

        }
    }
}

    return <div>
        <Header />
    <div 
    className="parent section" 
    style={{height:'85vh',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'}}>
        <div className="register">
        <form onSubmit={Submit}> 


            <label htmlFor="email">Email: </label>
            <input type="email" 
            id="email" 
            placeholder="Enter Email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            />

            <label htmlFor="password">Password: </label>
            <input type="password" 
            id="password" 
            placeholder="Enter Password..." 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
            {password.length < 8 && accept &&<p className="error">Password Must be more than 8 chars</p>}

            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <button type="submit">Login</button>
            </div>
            {err && accept && <p className="error">Wrong Email Or Password</p>}
            <p className="foot-note">Don't have an email? <Link to="/register">Sign Up</Link></p>

        </form>
        </div>

    </div>
    </div>
}