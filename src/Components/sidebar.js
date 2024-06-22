
import { NavLink } from "react-router-dom";


export default function SideBar() {
    

    return (
        <div className="side-bar">
            <NavLink  to="/dashboard/users" className="items-link">
                <i className="fa-solid fa-users-line"></i> Users
            </NavLink>
            <NavLink to="/dashboard/user/create" className="items-link">
                <i className="fa-solid fa-user-plus"></i>  New user
            </NavLink>


            <NavLink  to="/dashboard/products/" className="items-link">
                <i className="fa-solid fa-brands fa-product-hunt"></i> Products
            </NavLink>
            <NavLink to="/dashboard/product/create" className="items-link">
                <i className="fa-solid fa-plus"></i> New Product
            </NavLink>
        </div>
    )
}