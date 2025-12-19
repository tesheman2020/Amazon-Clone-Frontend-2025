
// import React, { useEffect, useState } from "react";
// import classes from "./ProductDetail.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import ProductCard from "../../Components/Product/ProductCard";
// import FadeLoader from "react-spinners/FadeLoader";
// import { productUrl }  from '../../Api/endPoints';

// function ProductDetail() {
//   const [singleProduct, setSingleProduct] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const { productId } = useParams();

//   useEffect(() => {
//     const fetchSingleProduct = async () => {
//       setIsLoading(true);

//       try {
//         const response = await axios.get(
//           `${productUrl}/products/${productId}`
//         );

//         setSingleProduct(response.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchSingleProduct();
//   }, [productId]);

//   return (
//     <LayOut>
//       {isLoading ? (
//         <div className={classes.loader}>
//           <FadeLoader color="#36d7b7" />
//         </div>
//       ) : (
//         singleProduct && <ProductCard product={singleProduct} flex={true} />
//       )}
//     </LayOut>
//   );
// }

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../../Components/Product/ProductCard";
import FadeLoader from "react-spinners/FadeLoader";
import classes from "./ProductDetail.module.css";

function ProductDetail() {
  const { productId } = useParams();
  const [singleProduct, setSingleProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setSingleProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <LayOut>
      {isLoading ? (
        <div className={classes.loader}>
          <FadeLoader color="#f0c14b" />
        </div>
      ) : (
        singleProduct && (
          <div className={classes.detailWrapper}>
            <ProductCard
              product={singleProduct}
              flex={true}
              renderDesc={true}
              renderAddBtn={true}
            />
          </div>
        )
      )}
    </LayOut>
  );
}

export default ProductDetail;
