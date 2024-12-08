import { createContext, useContext, useState } from "react";
import {
  createProductRequest,
  getProductsRequest,
  deleteProductRequest,
  getProductRequest,
  updateProductRequest,
  getAllProductsRequest,
} from "../api/product";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }

  return context;
};

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await getProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      const res = await getAllProductsRequest();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createProduct = async (product) => {
    const res = await createProductRequest(product);
    console.log(res);
  };

  const deleteProduct = async (id) => {
    try {
      const res = await deleteProductRequest(id);
      if (res.status === 200)
        setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const getProduct = async (id) => {
    try {
      const res = await getProductRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (id, product) => {
    try {
      await updateProductRequest(id, product);
    } catch (error) {
      console.log(error);
    }
  };

  const buyProduct = async (id, product, user) => {
    try {
      console.log("product: ", product);
      console.log("id", id);
      if (!user._id !== id && user.amountMoney >= product.price && product.purchaseUser === null) {
        product.purchaseUser = id;
        await updateProductRequest(id, product);
        alert("Successfully purchased product");
      } else {
        alert("You cannot buy this product");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        createProduct,
        getProducts,
        deleteProduct,
        getProduct,
        updateProduct,
        getAllProducts,
        buyProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
