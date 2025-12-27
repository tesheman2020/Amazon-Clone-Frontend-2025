import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
// import { CheckoutProvider } from "@stripe/react-stripe-js/checkout";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_test_51SiBplBmFWlOTwBQOyst96ko1CoTjnokg9PIkFejjBqVMoy3nXwKfocaSGP7KusJ0Y2kYRxVOPCy3QorJZtmS5w400iswMvDP1 "
);

// import Account from "./Pages/Account/Account";

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />
      <Route
        path="/account"
        element={<div>Welcome to your Account Page</div>}
      />
      <Route
        path="/payments"
        element={
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        }
      />
      <Route path="/orders" element={<Orders />} />
      <Route path="/category/:categoryName" element={<Results />} />
      <Route path="/products/:productId" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;


