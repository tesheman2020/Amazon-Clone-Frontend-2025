import React, { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../Utility/action.Type";
import classes from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({
  product,
  renderAddBtn = true,
  flex = false,
  renderDesc = false,
}) {
  const { dispatch } = useContext(DataContext);

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: product,
    });
  };

  return (
    <div className={`${classes.card} ${flex ? classes.flex : ""}`}>
      <Link to={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className={classes.image}
        />
      </Link>

      <div className={classes.info}>
        <h4>{product.title}</h4>
        <p>${product.price}</p>

        {renderDesc && <p>{product.description}</p>}

        {renderAddBtn && (
          <button
            className={classes.button}   
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}

        {product.amount && (
          <span className={classes.amount}>Qty: {product.amount}</span>
        )}
      </div>
    </div>
  );
}

export default ProductCard;





// import React, { useContext } from "react";
// import { DataContext } from "../DataProvider/DataProvider";
// import { Type } from "../Utility/action.Type";
// import classes from "./ProductCard.module.css"
// import { Link } from "react-router-dom";
// function ProductCard({
//   product,
//   renderAddBtn = true,
//   flex = false,
//   renderDesc = false,
// }) {
//   const { dispatch } = useContext(DataContext);
  

//   const addToCart = () => {
//     dispatch({
//       type: Type.ADD_TO_BASKET,
//       item: product,
//     });
    
//   };

//   return (
//     <div className={`${classes.card} ${flex ? classes.flex : ""}`}>
//       {/* <img src={product.image} alt={product.title} className={classes.image} /> */}
//       <Link to={`/products/${product.id}`}>
//         <img
//           src={product.image}
//           alt={product.title}
//           className={classes.image}
//         />
        
//       </Link>
//       <div className={classes.info}>
//         <h4>{product.title}</h4>
//         <p>${product.price}</p>
//         {renderDesc && <p>{product.description}</p>}
//         {renderAddBtn &&
//          <button onClick={addToCart}>Add to Cart</button> }
//         {product.amount && (
//           <span className={classes.amount}>Qty: {product.amount}</span>
          
//         )}
        
//       </div>
//     </div>
//   );
// }

// export default ProductCard;

// import React, { useContext } from "react";
// import { DataContext } from "../DataProvider/DataProvider";
// import { Type } from "../Utility/action.Type";

// function ProductCard({ product, renderAddBtn = true }) {
//   const { dispatch } = useContext(DataContext);

//   const addToCart = () => {
//     dispatch({
//       type: Type.ADD_TO_BASKET,
//       item: product,
//     });
//   };

//   return (
//     <div>
//       <h4>{product.title}</h4>
//       <p>${product.price}</p>
//       {renderAddBtn && <button onClick={addToCart}>Add to Cart</button>}
//     </div>
//   );
// }

// export default ProductCard;

// import React from "react";
// import Rating from "@mui/material/Rating";
// import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
// import classes from "./Product.module.css"
// import { Link } from "react-router-dom";

// function ProductCard({ product, flex }) {
//   const { image, title, id, rating, price } = product;
//   return (
//     <div className={`${classes.card__container}`}>
//       <Link to={`/products/${id}`}>
//         <img src={image} alt={title} />
//       </Link>
//       <div>
//         <h3>{title}</h3>
//         <div className={classes.rating}>
//           {/* rating */}
//           <Rating value={rating?.rate} precision={0.1} />
//           {/* count */}
//           <small>{rating?.count}</small>
//         </div>
//         <div>
//           {/* price */}
//           <CurrencyFormat amount={price} />
//         </div>
//         <button className={classes.button}>add to cart</button>
//       </div>
//     </div>
//   );
// }

// export default ProductCard;
