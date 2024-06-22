import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "./context/Context";




export default function UpdateUser() {
    const [name, setName] = useState("");
    const [accept, setAccept] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');
    const [passwordR, setPasswordR] = useState('');
    const id = window.location.pathname.split("/").slice(-1)[0];

    const context = useContext(User);
    const token = context.auth.token

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/user/showbyid/${id}`, {
            headers: {
                Accept: "apllication/json",
                Authorization: "Bearer " + token,
            }
        })
    
        .then(res => {
            setName(res.data[0].name);
            setEmail(res.data[0].email)
        })
    }, [])

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

    
    try {
            //send data 
        let res = await axios.post(`http://127.0.0.1:8000/api/user/update/${id}`, {
            name: name,
            email: email,
            password: password,
            password_confirmation: passwordR,
        }, {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        if (res.status === 200) {
            window.location.pathname = "/";
        }


    } catch (err) {
        console.log(err.response.status);
    }
}


    return <div>
    <h1 style={{textAlign:'center', margin:"20px auto"}}>Update User</h1>
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
            {/* {emailError === 422 && accept && <p className="error">Email is already taken</p>} */}

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
                <button type="submit">Update User</button>
            </div>
        </form>
        </div>

    </div>
    </div>
}