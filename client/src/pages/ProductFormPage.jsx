import { useForm } from "react-hook-form";
import { useProducts } from "../context/ProductsContext";
import { useNavigate } from "react-router-dom";

function ProductFormPage() {
  const { register, handleSubmit } = useForm();
  const { createProduct } = useProducts();
  const navigate = useNavigate();
  
  const onSubmit = handleSubmit((data) => {
    createProduct(data);
    navigate("/products");
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
          <button className="flex my-0 mx-auto bg-zinc-500 rounded-md py-1 px-10" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}

export default ProductFormPage;