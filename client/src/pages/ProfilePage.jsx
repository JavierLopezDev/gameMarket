import { useEffect } from "react";
import { useProducts } from "../context/ProductsContext";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { getProducts, products } = useProducts();
  let titleProducts = "Your Products";

  useEffect(() => {
    getProducts();
  }, []);

  function handleView(param) {
    if (param === "Your Products") {
      getProducts();
      titleProducts = "Your Products";
    } else if (param === "Purchased Products") {
      //getPurchasedProducts();
      getProducts();
      titleProducts = "Purchased Products";
    }
  }

  return (
    <div>
      <div className="flex gap-x-4 items-center justify-center p-4">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          to={"/add-product"}
        >
          Add Product
        </Link>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => handleView("Your Products")}
        >
          Your Products
        </button>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          onClick={() => handleView("Purchased Products")}
        >
          Purchased Products
        </button>
      </div>

      <h1 className="text-2xl font-bold py-2">{titleProducts}</h1>
      {products.length === 0 ? (
        <h1>No products</h1>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
