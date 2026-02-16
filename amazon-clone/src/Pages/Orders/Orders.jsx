import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../../Components/Utility/firebase";
import ProductCard from "../../Components/Product/ProductCard";
import { Type } from "../../Components/Utility/action.Type";
import { Navigate } from "react-router-dom";

function Orders() {
  const { user, dispatch } = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [user]);

  if (user === undefined) return null;
  if (user === null) return <Navigate to="/auth" />;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const addToCartSingle = (item) => {
    dispatch({ type: Type.ADD_TO_BASKET, item: { ...item, amount: 1 } });
  };

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {orders.length === 0 && <p>You don't have any orders yet.</p>}

          {orders.map((order) => {
            const orderTotal = order.basket.reduce(
              (sum, i) => sum + i.price * i.amount,
              0,
            );

            return (
              <div key={order.id} className={classes.order}>
                <hr />
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>

                {order.basket.map((item) => (
                  <div key={item.id}>
                    <ProductCard product={item} flex renderAddBtn={false} />
                    <p>
                      Qty: {item.amount} | Subtotal:{" "}
                      {formatCurrency(item.price * item.amount)}
                    </p>
                    <button
                      className={classes.orders_add}
                      onClick={() => addToCartSingle(item)}
                    >
                      Add to Cart
                    </button>
                  </div>
                ))}

                <h3>Order Total: {formatCurrency(orderTotal)}</h3>
              </div>
            );
          })}
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
