import React, { useContext } from "react";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../Utility/action.Type";
import classes from "./ProductCard.module.css";
import { Link, useLocation } from "react-router-dom";

function ProductCard({
  product,
  renderAddBtn = true,
  flex = false,
  renderDesc = false,
}) {
  const { dispatch } = useContext(DataContext);
  const location = useLocation();

  const isDetailPage = location.pathname.startsWith("/products/");

  const addToCart = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: product,
    });
  };

  const ImageWrapper = isDetailPage ? "div" : Link;

  return (
    <div className={`${classes.card} ${flex ? classes.flex : ""}`}>
      <ImageWrapper
        {...(!isDetailPage && { to: `/products/${product.id}` })}
        className={classes.imageWrapper}
      >
        <img
          src={product.image}
          alt={product.title}
          className={classes.image}
        />
      </ImageWrapper>

      <div className={classes.info}>
        <h2>{product.title}</h2>
        <p className={classes.price}>${product.price}</p>

        {product?.rating && (
          <div className={classes.rating}>
            ⭐ {product.rating.rate} ({product.rating.count})
          </div>
        )}

        {renderDesc && (
          <p className={classes.description}>{product.description}</p>
        )}

        {renderAddBtn && (
          <button className={classes.button} onClick={addToCart}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
