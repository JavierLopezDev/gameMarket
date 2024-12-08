import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-6 rounded-md">
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-slate-300">{product.description}</p>
      <p className="text-slate-300">Price: {product.price}</p>

      <div className="flex gap-x-4 items-center justify-center p-4">
        <button
          onClick={() => {
            deleteProduct(product._id);
          }}
        >
          Delete
        </button>
        <Link to={`/products/${product._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default ProductCard;
