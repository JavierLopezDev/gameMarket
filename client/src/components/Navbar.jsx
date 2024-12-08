import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { isAuthenticated, logout, user } = useAuth();

    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <Link to='/'>
                <h1 className="text-2xl font-bold">Product Manager</h1>
            </Link>
            {
                !isAuthenticated ? (
                    <ul className="flex gap-x-2">
                        <li>
                            <Link to='/login'>Login</Link>
                        </li>

                        <li>
                            <Link to='/register'>Register</Link>
                        </li>
                    </ul>
                ) : 
                
                <ul className="flex gap-x-2">
                    <li>
                        <Link to='/profile'>Welcome {user.username}</Link>
                    </li>
                    <li>
                        <Link to='/add-product'>Add Product</Link>
                    </li>
                    <li>
                        <Link to='/login' onClick={() => {logout()}}>Logout</Link>
                    </li>
                </ul>
            }
        </nav>
    )
}

export default Navbar;