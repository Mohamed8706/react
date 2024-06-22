
import { useContext, useEffect, useState } from 'react';
import axios  from 'axios';
import { Link } from 'react-router-dom';
import { User } from '../context/Context';

export default function Products() {
//show user with delete and update
    const [products, setProducts] = useState([]);
    const [handleDelete, setDelete] = useState(0);

    const context =  useContext(User);
    const token = context.auth.token;


    useEffect(()=> {
    axios.get(`http://127.0.0.1:8000/api/product/show`, {
        headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
        }
    })
    .then(data => setProducts(data.data))
    .catch((err) => console.log(err))
    }, [handleDelete]) 



    let showProducts = products.map((product, ind) => {
        return (
        <tr key={ind}>
            <td>{ind + 1}</td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>
                <Link to={`${product.id}`}>
                <i className='fa-solid fa-pen-to-square' style={{color:'#74afb9', fontSize:'20px', paddingRight:"4px", cursor:'pointer'}}></i>
                </Link>
                <i onClick={()=> deleteUser(product.id)} className='fa-solid fa-trash' style={{color:'red', fontSize:'20px', cursor:"pointer"}}></i>
            </td>

        </tr>
        )
    })
    async function deleteUser(id) {
        try {
            let res = await axios.delete(`http://127.0.0.1:8000/api/product/delete/${id}`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                }
            });
            if (res.status === 200) {
                setDelete(prev => prev + 1)
            }
        }
        catch(err) {
            console.log(err)
        }
    }


    return (
        <div style={{padding: '20px'}}>
            <table>
                <thead>
                    <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {showProducts}
                </tbody>
            </table>
        </div>
    )
}