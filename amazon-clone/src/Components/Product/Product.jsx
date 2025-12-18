import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import FadeLoader from "react-spinners/FadeLoader";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ correct useState

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // 👈 start loading

      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setIsLoading(false); // 👈 stop loading
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className={classes.loader}>
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        <section className={classes.products_container}>
          {products.map((singleProduct) => (
            <ProductCard product={singleProduct} key={singleProduct.id} />
          ))}
        </section>
      )}
    </>
  );
}

export default Product;


