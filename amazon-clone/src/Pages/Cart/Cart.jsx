import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Components/Utility/action.Type";
import ProductCard from "../../Components/Product/ProductCard";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function Cart() {
  // const { state, dispatch } = useContext(DataContext);
  // const { basket, user } = state;
  const { basket, user, dispatch } = useContext(DataContext);

  const navigate = useNavigate();
  const [isGift, setIsGift] = useState(false);

  /* ✅ SUBTOTAL CALCULATION */
  // const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);
  const totalItems = basket?.reduce((sum, item) => sum + item.amount, 0) || 0;

  const subtotal = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET,
      id,
    });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Cart__container}>
          <h2>Hello {user?.email || "Guest"}</h2>
          <h3>Your shopping basket</h3>
          <hr />

          {basket.length === 0 ? (
            <p>Oops : No item in your cart</p>
          ) : (
            basket.map((item) => (
              <section key={item.id} className={classes.cartItem}>
                <div className={classes.cartContent}>
                  <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAddBtn={false}
                    flex={true}
                  />
                </div>

                <div className={classes.itembtn}>
                  <button onClick={() => increment(item)}>
                    <IoIosArrowUp />
                  </button>

                  <span className={classes.amount}>{item.amount}</span>

                  <button onClick={() => decrement(item.id)}>
                    <IoIosArrowDown />
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        <aside className={classes.subtotalBox}>
          <p>
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"}):
            <strong> ${subtotal.toFixed(2)}</strong>
          </p>

          {/* 🎁 Gift Checkbox */}
          <div className={classes.giftOption}>
            <input
              type="checkbox"
              id="isGift"
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
            />
            <label htmlFor="isGift">This order contains a gift</label>
          </div>

          <button
            disabled={basket.length === 0}
            onClick={() => navigate("/payments")}
            className={classes.checkoutBtn}
          >
            Proceed to Checkout
          </button>
        </aside>
      </section>
    </LayOut>
  );
}

export default Cart;
