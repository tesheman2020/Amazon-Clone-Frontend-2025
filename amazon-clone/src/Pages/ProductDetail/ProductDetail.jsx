import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
// import { productUrl } from "../../Api/endPoints";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";

function ProductDetail() {
  const [singleProduct, setSingleProduct] = useState(null);
  const { productId } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        console.log(response);

        setSingleProduct(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleProduct();
  }, [productId]);

  console.log(singleProduct);

  return (
    <LayOut>
      {singleProduct ? (
        <ProductCard product={singleProduct} />
      ) : (
        <p>Loading product...</p>
      )}
    </LayOut>
  );
}

export default ProductDetail;
