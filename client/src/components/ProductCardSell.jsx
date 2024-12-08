import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";

function ProductCardSell({ product }) {
  const { buyProduct } = useProducts();
  const { user } = useAuth();

  return (
    <div className="bg-zinc-800 max-w-md w-full p-6 rounded-md">
      <h1 className="text-2xl font-bold text-center">{product.title}</h1>
      <p className="text-slate-300">Description: {product.description}</p>
      <p className="text-slate-300">Price: {product.price}</p>
      <p className="text-slate-300">Platform: {product.platform}</p>

      {product.purchaseUser === null || product.purchaseUser === undefined ? (
        <div className="flex gap-x-4 items-center justify-center p-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            onClick={() => {
              buyProduct(product._id, product, user);
            }}
          >
            Buy
          </button>
        </div>
      ) : (
        <div className="flex gap-x-4 items-center justify-center p-4">
          <button
            className="bg-gray-500 text-black px-4 py-2 rounded-md"
          >
            Buyed
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductCardSell;
