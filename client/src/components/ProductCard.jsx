import { useProducts } from "../context/ProductsContext";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-6 rounded-md">
      <h1 className="text-2xl font-bold text-center">{product.title}</h1>
      <p className="text-slate-300">Description: {product.description}</p>
      <p className="text-slate-300">Price: {product.price}</p>
      <p className="text-slate-300">Platform: {product.platform}</p>

      <div className="flex gap-x-4 items-center justify-center p-4">
        <button
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          onClick={() => {
            deleteProduct(product._id);
          }}
        >
          Delete
        </button>
        <Link className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md" to={`/products/${product._id}`}>Edit</Link>
      </div>
    </div>
  );
}

export default ProductCard;
