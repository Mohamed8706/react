import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { User } from "../context/Context";
import { useNavigate } from "react-router-dom";




export default function UpdateProduct() {
    const [title, setTitle] = useState("");
    const [accept, setAccept] = useState(false);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const id = window.location.pathname.split("/").slice(-1)[0];

    const context = useContext(User);
    const token = context.auth.token

    const nav = useNavigate();

    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)

    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/product/showbyid/${id}`, {
            headers: {
                Accept: "apllication/json",
                Authorization: "Bearer " + token,
            }
        })
    
        .then(res => {
            setTitle(res.data[0].title);
            setDescription(res.data[0].description)
        })
    }, [])

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

    
    try {
            //send data 
        let res = await axios.post(`http://127.0.0.1:8000/api/product/update/${id}`, 
            formData,
            {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        nav("/dashboard/products")


    } catch (err) {
        console.log(err.response.status);
    }
}


    return <div>
    <h1 style={{textAlign:'center', margin:"20px auto"}}>Update User</h1>
    <div className="parent">
    <div className="register">
        <form onSubmit={Submit}> 
            <label htmlFor="title">Title: </label>
            <input id="title"
            type="text" 
            placeholder="Title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
            {title.length < 1 && accept && (
            <p className="error">Title must be more than 2 chars</p>
            )
        }

            <label htmlFor="description">Description: </label>

            <input type="text" 
            id="description" 
            placeholder="description..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
            />


            <label htmlFor="image">Image: </label>
            <input type="file" 
            id="image" 
            onChange={(e) => setImage(e.target.value)}/>

            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <button type="submit">Update Product</button>
            </div>
        </form>
        </div>

    </div>
    </div>
}