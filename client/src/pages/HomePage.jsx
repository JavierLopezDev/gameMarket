import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import ProductCardSell from "../components/ProductCardSell";

function HomePage() {
  const { getAllProducts, products } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      getAllProducts();
    }
  }, []);

  if (products.length === 0) return <h1>No products</h1>;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {products.map((product) => (
        <ProductCardSell key={product._id} product={product} />
      ))}
    </div>
  );
}

export default HomePage;
