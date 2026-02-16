import React, { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import ClipLoader from "react-spinners/ClipLoader";
import { db } from "../../Components/Utility/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Type } from "../../Components/Utility/action.Type";
import { axiosInstance } from "../../Api/axios";

function Payment() {
  const { user, basket, dispatch } = useContext(DataContext);
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!user) return null;

  const totalAmount = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );
  const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    try {
      setProcessing(true);

      const response = await axiosInstance.post(
        `/payment/create?total=${Math.round(totalAmount * 100)}`,
      );
      const clientSecret = response.data.clientSecret;
      if (!clientSecret) throw new Error("Client secret not returned");

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (confirmation.error) {
        setCardError(confirmation.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = confirmation.paymentIntent;

      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            amount: item.amount,
            image: item.image,
          })),
          amount: totalAmount,
          created: paymentIntent.created,
        },
      );

      dispatch({ type: Type.EMPTY_BASKET });
      setProcessing(false);
      alert("Payment successful!");
    } catch (err) {
      setCardError(err.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <h3>Checkout ({totalItems}) items</h3>
      <div>
        {basket.map((item) => (
          <div key={item.id}>
            <ProductCard product={item} flex />
            <p>
              Qty: {item.amount} | Subtotal:{" "}
              {formatCurrency(item.price * item.amount)}
            </p>
          </div>
        ))}
      </div>

      <form onSubmit={handlePayment} className={classes.payment__form}>
        {/* Stripe Card Input Wrapper */}
        <div className={classes.card_wrapper}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": { color: "#aab7c4" },
                },
                invalid: { color: "#9e2146" },
              },
            }}
          />
        </div>

        {cardError && (
          <p className={classes.error} style={{ marginTop: "8px" }}>
            {cardError}
          </p>
        )}

        <h3 style={{ marginTop: "12px" }}>
          Total: {formatCurrency(totalAmount)}
        </h3>

        <button
          type="submit"
          disabled={!stripe || processing}
          className={classes.pay_button}
        >
          {processing ? <ClipLoader size={12} color="#fff" /> : "Pay Now"}
        </button>
      </form>
    </LayOut>
  );
}

export default Payment;
