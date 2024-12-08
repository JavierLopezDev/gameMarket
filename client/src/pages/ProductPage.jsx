import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";

function ProductPage() {

    const { getProducts, products } = useProducts();
    
    useEffect(() => {
        getProducts();
    }, []);

    if (products.length === 0) return <h1>No products</h1>;

    return (
        <div className="grid grid-cols-4 gap-2">
            {
                products.map(product => (
                    <ProductCard key={product._id} product={product} />
                ))
            }
        </div>
    );
}

export default ProductPage;