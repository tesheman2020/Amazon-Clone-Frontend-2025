import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./Product.module.css";
import FadeLoader from "react-spinners/FadeLoader";
import { DataContext } from "../DataProvider/DataProvider";
import { Type } from "../Utility/action.Type";

function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { dispatch } = useContext(DataContext);
  const [amounts, setAmounts] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get("https://fakestoreapi.com/products");
        setProducts(res.data);

        // Initialize each product quantity to 1
        const amtObj = {};
        res.data.forEach((p) => (amtObj[p.id] = 1));
        setAmounts(amtObj);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToBasket = (product) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { ...product, amount: amounts[product.id] || 1 }, // use current input value
    });
  };

  if (isLoading) {
    return (
      <div className={classes.loader}>
        <FadeLoader color="#36d7b7" />
      </div>
    );
  }

  return (
    <section className={classes.products_container}>
      {products.map((product) => (
        <div key={product.id} className={classes.card__container}>
          <ProductCard product={product} renderAddBtn={false} />

          <div className={classes.quantity_and_button}>
            <div className={classes.quantity_selector}>
              <label>Qty: </label>
              <input
                type="number"
                min={1}
                value={amounts[product.id] || 1}
                onChange={(e) =>
                  setAmounts({
                    ...amounts,
                    [product.id]: Number(e.target.value),
                  })
                }
              />
            </div>

            <button
              className={classes.add_to_cart}
              onClick={() => addToBasket(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}

export default Product;
