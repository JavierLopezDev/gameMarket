import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to={isAuthenticated ? "/" : "/login"}>
        <h1 className="text-2xl font-bold">GameMarket</h1>
      </Link>

      {isAuthenticated ?? (
        <h3>Current balance: {user.amountMoney > 0 ? user.amountMoney : 0}$</h3>
      )}

      {!isAuthenticated ? (
        <ul className="flex gap-x-2">
          <li className="hover:font-bold">
            <Link to="/login">Login</Link>
          </li>

          <li className="hover:font-bold">
            <Link to="/register">Register</Link>
          </li>
        </ul>
      ) : (
        <ul className="flex gap-x-2">
          <li className="hover:font-bold">
            <Link to="/profile">{user.username}</Link>
          </li>
          <li className="hover:font-bold">
            <h3>Current balance: {user.amountMoney > 0 ? user.amountMoney : 0}$</h3>
          </li>
          <li className="hover:font-bold">
            <Link
              to="/login"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
