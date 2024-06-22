import axios  from "axios";
import {Link} from "react-router-dom"
import Cookies from "universal-cookie";


export default function Header() {

    const cookie = new Cookies();
    const token = cookie.get('Bearer')
    console.log(token)


    async function handleLogOut() {
        await  axios.post('http://127.0.0.1:8000/api/logout', null, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        cookie.remove('Bearer');
        window.location.pathname = "/";
    }

    return (
        <div className="container shadow">

        <nav className="d-flex p-2">
        {!token ? ( 
        <>
            <div className="d-flex ">
            <Link to="/" className="register-nav">Home</Link>
            
            </div>
            <div className="d-flex">
                <Link 
                    to="/register" 
                    className="register-nav">
                    Register</Link>

                    <Link 
                    to="/login" 
                    className="register-nav">
                    Login
                    </Link> 
                    </div>
            </>): (
            <>
            <div className="d-flex ">
            <Link to="/" className="register-nav">Home</Link>
            <Link to="/about" className="register-nav">About</Link>
            </div>

            <div className="d-flex ">
            <Link to="/dashboard"className="register-nav">Dashboard</Link>   
            <div  className="register-nav" onClick={handleLogOut}>Logout</div>
            </div>
            </> 
            )}

            

        </nav>
        </div>

    )
};