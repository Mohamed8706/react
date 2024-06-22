import axios from "axios";

import { useNavigate } from "react-router-dom";
import { User } from "../context/Context";
import { useContext, useState } from "react";


export default function NewProduct() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState();
    const [accept, setAccept] = useState(false);

    


    const nav = useNavigate();

    const context = useContext(User);
    const token = context.auth.token;

    const formData = new FormData();
    formData.append('title', title)
    formData.append('description', description)
    formData.append('image', image)

    async function Submit(e) {
        e.preventDefault();
        setAccept(true);

    
    try {
            //send data 
        let res = await axios.post(`http://127.0.0.1:8000/api/product/create`,
            formData,
        {
            headers: {
                Authorization: "Bearer " + token,
            }
        });
        nav("/dashboard/products")

    } catch (err) {
        setAccept(true)
    }
}
    return (
    <div>
    <div className="parent">
    <div className="register">
        <form onSubmit={Submit}> 
            <label htmlFor="name">Title: </label>
            <input id="Name"
            type="text" 
            placeholder="Enter Title..." 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}/>
            {title.length < 1 && accept && (
            <p className="error">Title must be more than 2 chars</p>
            )
        }

            <label htmlFor="Description">Description: </label>
            <input type="text" 
            id="Description" 
            placeholder="Description..." 
            value={description} 
            onChange={(e) => setDescription(e.target.value)}
            required
            />
            
            <label htmlFor="image">Image: </label>
            <input type="file"
            id="image"
            onChange={(e) => setImage(e.target.files.item(0))}
            required
            />

            <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <button type="submit">Create Product</button>
            </div>
        </form>
        </div>

    </div>
        </div>
    )
}