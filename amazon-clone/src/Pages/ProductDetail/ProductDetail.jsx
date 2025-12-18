
import React, { useEffect, useState } from "react";
import classes from "./ProductDetail.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import FadeLoader from "react-spinners/FadeLoader";
import { productUrl }  from '../../Api/endPoints';

function ProductDetail() {
  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { productId } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `${productUrl}/products/${productId}`
        );

        setSingleProduct(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSingleProduct();
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <div className={classes.loader}>
          <FadeLoader color="#36d7b7" />
        </div>
      ) : (
        singleProduct && <ProductCard product={singleProduct} flex={true} />
      )}
    </LayOut>
  );
}

export default ProductDetail;

// before Modification and including spinners is as follows

// import React, { useEffect, useState } from "react";
// import classes from "./ProductDetail.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { useParams } from "react-router-dom";
// // import { productUrl } from "../../Api/endPoints";
// import axios from "axios";
// import ProductCard from "../../Components/Product/ProductCard";

// function ProductDetail() {
//   const [singleProduct, setSingleProduct] = useState(null);
//   const { productId } = useParams();

//   useEffect(() => {
//     const fetchSingleProduct = async () => {
//       try {
//         const response = await axios.get(
//           https://fakestoreapi.com/products/${productId}
//         );
//         console.log(response);

//         setSingleProduct(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchSingleProduct();
//   }, [productId]);

//   console.log(singleProduct);

//   return (
//     <LayOut>
//       {singleProduct ? (
//         <ProductCard product={singleProduct} />
//       ) : (
//         <p>Loading product...</p>
//       )}
//     </LayOut>
//   );
// }

// export default ProductDetail;
