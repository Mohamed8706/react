import { Link } from "react-router-dom";

export default function TopBar() {
    return (
        <div className="d-flex container shadow">
            <h1>Store</h1>
            <Link to="/" className="register-nav">Go to Website</Link>
        </div>
    )
}