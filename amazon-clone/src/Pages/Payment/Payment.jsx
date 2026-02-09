
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

  // ✅ Use 'amount' from basket for correct totals
  const totalItems = basket.reduce((sum, item) => sum + item.amount, 0);
  const totalAmount = basket.reduce(
    (sum, item) => sum + item.price * item.amount,
    0,
  );

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

      // Send total in cents to backend
      const response = await axiosInstance.post(
        `/payment/create?total=${Math.round(totalAmount * 100)}`,
      );

      const clientSecret = response.data.clientSecret;

      if (!clientSecret) throw new Error("Client secret not returned");

      const confirmation = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (confirmation.error) {
        setCardError(confirmation.error.message);
        setProcessing(false);
        return;
      }

      const paymentIntent = confirmation.paymentIntent;

      // Save order in Firestore with correct amounts
      await setDoc(
        doc(collection(db, "users", user.uid, "orders"), paymentIntent.id),
        {
          basket: basket.map((item) => ({
            id: item.id,
            title: item.title,
            price: item.price,
            amount: item.amount, // ✅ Important: store quantity correctly
            image: item.image,
          })),
          amount: totalAmount,
          created: paymentIntent.created,
        },
      );

      // Clear basket
      dispatch({ type: Type.EMPTY_BASKET });

      setProcessing(false);
      alert("Payment successful! Your order has been saved.");
    } catch (err) {
      console.error("Payment error:", err);
      setCardError(err.message || "Payment failed");
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItems}) item{totalItems > 1 ? "s" : ""}
      </div>

      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Review items</h3>
          <div>
            {basket.map((item) => (
              <div key={item.id} style={{ marginBottom: "12px" }}>
                <ProductCard product={item} flex />
                <p style={{ marginLeft: "10px" }}>
                  Qty: <strong>{item.amount}</strong> | Subtotal:{" "}
                  <strong>{formatCurrency(item.price * item.amount)}</strong>
                </p>
              </div>
            ))}
          </div>
        </div>

        <hr />

        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <form onSubmit={handlePayment} className={classes.payment__form}>
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
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;


// import React, { useContext, useState } from "react";
// import classes from "./Payment.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import ProductCard from "../../Components/Product/ProductCard";
// import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
// import { NumericFormat } from "react-number-format";
// import { axiosInstance } from "../../Api/axios";
// import ClipLoader from "react-spinners/ClipLoader";
// import { db } from "../../Components/Utility/firebase";
// import { collection, doc, setDoc } from "firebase/firestore";
// import { Type } from "../../Components/Utility/action.Type";

// function Payment() {
//   const { user, basket, dispatch } = useContext(DataContext);

//   const stripe = useStripe();
//   const elements = useElements();

//   const [cardError, setCardError] = useState("");
//   const [processing, setProcessing] = useState(false);

//   const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);
//   const total = basket?.reduce(
//     (sum, item) => sum + item.price * item.amount,
//     0,
//   );

//   const handleChange = (e) => {
//     setCardError(e.error ? e.error.message : "");
//   };

//   const handlePayment = async (e) => {
//     e.preventDefault();

//     try {
//       setProcessing(true);

//       // 1️⃣ Get client secret from backend
//       const response = await axiosInstance.post(
//         `/payment/create?total=${Math.round(total * 100)}`,
//       );

//       const clientSecret = response.data?.clientSecret;
//       console.log("CLIENT SECRET:", clientSecret);
//       if (!clientSecret)
//         throw new Error("Client secret not returned from backend");

//       // 2️⃣ Confirm payment on Stripe
//       const confirmation = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//         },
//       });

//       if (confirmation.error) {
//         setCardError(confirmation.error.message);
//         setProcessing(false);
//         return;
//       }

//       const paymentIntent = confirmation.paymentIntent;

//       console.log("Payment succeeded:", paymentIntent);

//       // 3️⃣ Save order to Firestore
//       const orderRef = doc(
//         collection(db, "users", user.uid, "orders"),
//         paymentIntent.id,
//       );
//       await setDoc(orderRef, {
//         basket: basket,
//         amount: paymentIntent.amount,
//         created: paymentIntent.created,
//       });
//       // empty the basket
//       dispatch({ type: Type.EMPTY_BASKET });
//       setProcessing(false);
//     } catch (error) {
//       console.error(
//         "Error fetching client secret or processing payment:",
//         error,
//       );
//       setProcessing(false);
//     }
//   };

//   return (
//     <LayOut>
//       <div className={classes.payment__header}>
//         Checkout ({totalItems}) items
//       </div>

//       <section className={classes.payment}>
//         {/* Delivery Address */}
//         <div className={classes.flex}>
//           <h3>Delivery Address</h3>
//           <div>
//             <div>{user?.email || "Guest"}</div>
//             <div>1122 Array Avenue</div>
//             <div>Philadelphia, PA, USA</div>
//           </div>
//         </div>

//         <hr />

//         {/* Review Items */}
//         <div className={classes.flex}>
//           <h3>Review items and delivery</h3>
//           <div>
//             {basket?.map((item) => (
//               <ProductCard key={item.id} product={item} flex />
//             ))}
//           </div>
//         </div>

//         <hr />

//         {/* Payment Method */}
//         <div className={classes.flex}>
//           <h3>Payment Method</h3>
//           <div className={classes.payment__card__container}>
//             <div className={classes.payment__details}>
//               <form onSubmit={handlePayment}>
//                 <CardElement onChange={handleChange} />
//                 {cardError && (
//                   <small className={classes.error}>{cardError}</small>
//                 )}
//                 <div className={classes.payment__price}>
//                   <div>
//                     <span>
//                       Total Order |{" "}
//                       <NumericFormat
//                         value={total}
//                         displayType="text"
//                         thousandSeparator
//                         prefix="$"
//                         renderText={(value) => <strong>{value}</strong>}
//                       />
//                     </span>
//                   </div>

//                   <button
//                     type="submit"
//                     disabled={!stripe || !elements || processing}
//                   >
//                     {processing ? (
//                       <div className={classes.loading}>
//                         <ClipLoader color="gray" size={12} />
//                         <p>Please wait...</p>
//                       </div>
//                     ) : (
//                       " Pay Now"
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Payment;

