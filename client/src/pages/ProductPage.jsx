import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

function ProductPage() {

    const { user } = useAuth();
    const { getProducts, products } = useProducts();
    
    useEffect(() => {
        getProducts();
    }, []);

    if (products.length === 0) return <h1>No products</h1>;

    return (
        <div>
            {
                products.map(product => (
                    <div key={product._id}>
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p>Price: {product.price}</p>
                    </div>
                ))
            }
        </div>
    );
}

export default ProductPage;