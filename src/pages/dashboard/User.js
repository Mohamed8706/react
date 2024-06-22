import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { User } from "./context/Context";

export default function Users() {
    //show user with delete and update
    const [user, setUser] = useState([]);
    const [handleDelete, setDelete] = useState(0);

    const context = useContext(User);
    const token = context.auth.token;

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:8000/api/user/show`, {
                headers: {
                    Accept: "application/json",
                    Authorization: "Bearer " + token,
                },
            })
            .then((data) => setUser(data.data))
            .catch((err) => console.log(err));
    }, [handleDelete]);

    let showUsers = user.map((user, ind) => {
        return (
            <tr key={ind}>
                <td>{ind + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                    <Link to={`${user.id}`}>
                        <i
                            className="fa-solid fa-pen-to-square"
                            style={{
                                color: "#74afb9",
                                fontSize: "20px",
                                paddingRight: "4px",
                                cursor: "pointer",
                            }}
                        ></i>
                    </Link>
                    <i
                        onClick={() => deleteUser(user.id)}
                        className="fa-solid fa-trash"
                        style={{ color: "red", fontSize: "20px", cursor: "pointer" }}
                    ></i>
                </td>
            </tr>
        );
    });
    async function deleteUser(id) {
        try {
            let res = await axios.delete(
                `http://127.0.0.1:8000/api/user/delete/${id}`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: "Bearer " + token,
                    },
                }
            );
            if (res.status === 200) {
                setDelete((prev) => prev + 1);
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{showUsers}</tbody>
            </table>
        </div>
    );
}
