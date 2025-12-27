

import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";



function Payment() {
  const { user, basket } = useContext(DataContext);

  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");

  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
      };
    const total = basket?.reduce(
      (sum, item) => sum + item.price * item.amount,
      0
    );


  return (
    <LayOut>
      {/* HEADER */}
      <div className={classes.payment__header}>
        Checkout ({totalItems}) items
      </div>

      <section className={classes.payment}>
        {/* DELIVERY ADDRESS */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email || "Guest"}</div>
            <div>1122 Array Avenue</div>
            <div>Philadelphia, PA, USA</div>
          </div>
        </div>

        <hr />

        {/* REVIEW ITEMS */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard key={item.id} product={item} flex />
            ))}
          </div>
        </div>

        <hr />

        {/* PAYMENT METHOD */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>

          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form action="">
                <CardElement onChange={handleChange} />
                {cardError && (
                  <small className={classes.error}>{cardError}</small>
                )}
                <div className={classes.payment__price}>
                  <div>
                    <span>
                      Total Order |{" "}
                      <NumericFormat
                        value={total}
                        displayType="text"
                        thousandSeparator
                        prefix="$"
                        renderText={(value) => <strong>{value}</strong>}
                      />
                    </span>
                  </div>

                  <button>Pay Now</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
