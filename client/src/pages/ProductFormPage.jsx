import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function ProductFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createProduct, getProduct, updateProduct } = useProducts();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("title", product.title);
        setValue("description", product.description);
        setValue("price", product.price);
        setValue("platform", product.platform);
      }
    }
    loadProduct();
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateProduct(params.id, { ...data, price: parseFloat(data.price) });
    } else {
      createProduct({ ...data, price: parseFloat(data.price) });
    }
    navigate("/profile");
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md w-full">
        <h1 className="text-2xl font-bold text-center">New Product</h1>
        <form onSubmit={onSubmit}>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            type="text"
            placeholder="Title"
            {...register("title")}
            autoFocus
          />
          <textarea
            rows="3"
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            placeholder="Description"
            {...register("description")}
          ></textarea>
          <input
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            type="number"
            placeholder="Price"
            {...register("price")}
          />
          <select
            className="w-full bg-zinc-700 text-white px-4 py-2 my-2 rounded-md"
            {...register("platform")} // Registra el campo 'platform'
          >
            <option value="">Select Platform</option> {/* Placeholder */}
            <option value="PC">PC</option>
            <option value="Xbox">Xbox</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
          </select>
          <button
            className="flex my-0 mx-auto bg-zinc-500 rounded-md py-1 px-10"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;
