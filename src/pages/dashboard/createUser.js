import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "./context/Context";


export default function CreateUser() {
    const [name, setName] = useState("");
    const [accept, setAccept] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const [emailError, setEmailError] = useState(false);



    const nav = useNavigate();

    const context = useContext(User);
    const token = context.auth.token;

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

    
    try {
            //send data 
        let res = await axios.post(`http://127.0.0.1:8000/api/user/create`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        nav("/dashboard/users")

    } catch (err) {
        if (err.response.status === 422 || err.response.status === 401){
            setEmailError(err.response.data.message);
            }
    }
}
    return (
    <div>
    <div className="parent">
    <div className="register">
        <form onSubmit={Submit}> 
            <label htmlFor="name">Name: </label>
            <input id="Name"
            type="text" 
            placeholder="Enter Name..." 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
            {name.length < 2 && accept && (
            <p className="error">Name must be more than 2 chars</p>
            )
        }

            <label htmlFor="email">Email: </label>
            <input type="email" 
            id="email" 
            placeholder="Enter Email..." 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            {emailError === "The email has already been taken."&& accept && <p className="error">Email is already taken</p>}


            <label htmlFor="password">Password: </label>
            <input type="password" 
            id="password" 
            placeholder="Enter Password..." 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}/>
            {password.length < 8 && accept &&<p className="error">Password Must be more than 8 chars</p>}

            <label htmlFor="repeat-password">Repeat-Password: </label>
            <input type="password" 
            id="repeat-password" 
            placeholder="Repeat-Password..." 
            value={passwordR} 
            onChange={(e) => setPasswordR(e.target.value)}/>
            {password !== passwordR && accept && <p className="error">Password does not match</p>}
            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <button type="submit">Create User</button>
            </div>
        </form>
        </div>

    </div>
        </div>
    )
}