
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Components/Utility/action.Type";
import ProductCard from "../../Components/Product/ProductCard";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { basket, user } = state;

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

  // const total = basket.reduce(
  //   (amount, item) => amount + item.price * item.amount,
  //   0
  // );

  // const total = basket.reduce((amount, item) => {
  //   const price = Number(item.price) || 0;
  //   const qty = Number(item.amount) || 1;
  //   return amount + price * qty;
  // }, 0);
const total = basket.reduce((sum, item) => sum + item.price * item.amount, 0);


// const total = basket.reduce((sum, item) => {
//   const price = Number(item.price.replace("$", ""));
//   return sum + price * item.amount;
// }, 0);

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
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAddBtn={false}
                  flex={true}
                />

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

        <div className={classes.totalBox}>
          <h3>Total: ${total.toFixed(2)}</h3>
        </div>
      </section>
    </LayOut>
  );
}

export default Cart;




