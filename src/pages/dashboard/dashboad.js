
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/sidebar";
import TopBar from "../../Components/topbar";
import "./dashboard.css";

export default function Dashboard(){

    return (
        <div>
        <TopBar />
        <div className="content-flex"> 
            <SideBar />
            <div style={{width:'80%', padding:"20px "}}>
                <Outlet />
            </div>
        </div>
        </div>
    );
}