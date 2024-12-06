import React from "react";
import { useAuth } from "../context/AuthContext";

function ProductPage() {

    const { user } = useAuth();
    console.log(user);

    return (
        <div>
            <h1>ProductPage</h1>
        </div>
    );
}

export default ProductPage;