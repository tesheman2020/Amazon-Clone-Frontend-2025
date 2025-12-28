import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { NumericFormat } from "react-number-format";
import { axiosInstance } from "../../Api/axios";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Components/Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Payment() {
  const { user, basket } = useContext(DataContext);

  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);

  const handleChange = (e) => {
    setCardError(e.error ? e.error.message : "");
  };
  const total = basket?.reduce(
    (sum, item) => sum + item.price * item.amount,
    0
  );

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      setProcessing(true);
      // 1. Backend  || functions===> contact to the client secret
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      // const response = await axiosInstance({
      //   method: "POST",
      //   url: `payment/create?total=${total}`,
      // });
      const clientSecret = response.data.clientSecret;

      // console.log("CLIENT SECRET:", clientSecret);
      // console.log("Full response:", response.data);

      // 2. Client side (react side confirmation)
      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmation.error) {
        // Handle card errors
        setCardError(confirmation.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = confirmation.paymentIntent;

      console.log(confirmation);
      //3. after confirmation==> order firestore
      // 1. Create a reference to the Firestore document
      const orderRef = doc(
        collection(db, "users", user.uid, "orders"),
        paymentIntent.id
      );

      // 2. Save the order
      await setDoc(orderRef, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created,
      });
      setProcessing(false);
    } catch (error) {
      console.error("Error fetching client secret:", error);
      setProcessing(false);
    }
  };

  // 1. Backend  || functions===> contact to the client secret

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
              <form onSubmit={handlePayment}>
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

                  <button
                    type="submit"
                    disabled={!stripe || !elements || processing}
                  >
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please wait...</p>
                      </div>
                    ) : (
                      " Pay Now"
                    )}
                  </button>
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
