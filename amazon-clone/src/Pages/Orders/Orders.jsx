// import React, { useContext, useState, useEffect } from "react";
// import classes from "./Orders.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import {
//   collection,
//   doc,
//   query,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";
// import { db } from "../../Components/Utility/firebase";

// function Orders() {
//   const { user } = useContext(DataContext);
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     if (!user) return;

//     const ordersRef = collection(db, "users", user.uid, "orders");
//     const q = query(ordersRef, orderBy("created", "desc"));

//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       setOrders(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }))
//       );
//     });

//     return unsubscribe;
//   }, [user]);

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>

//           {orders.length === 0 ? (
//             <p>No orders found.</p>
//           ) : (
//             <ul>
//               {orders?.map((order) => (
//                 <li key={order.id}>
//                   <strong>Order ID:</strong> {order.id} |{" "}
//                   <strong>Amount:</strong> ${order.amount / 100}{" "}
//                   {/* assuming amount is in cents */}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;

import React, { useContext, useState, useEffect } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import {
  collection,
  doc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../Components/Utility/firebase";
import ProductCard from "../../Components/Product/ProductCard";

function Orders() {
  const { user } = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;

    const ordersRef = collection(db, "users", user.uid, "orders");
    const q = query(ordersRef, orderBy("created", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return unsubscribe;
  }, [user]);

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.orders__container}>
          <h2>Your Orders</h2>
          {/* ordered items */}
          {orders?.length === 0 && (
            <div style={{ padding: "20px" }}>You don't have orders yet.</div>
          )}
          {/* ordered items */}
          <div>
            {orders.map((eachOrder) => (
              <div key={eachOrder.id}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>

                {eachOrder.basket?.map((item) => (
                  <ProductCard key={item.id} product={item} flex={true} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;

// import React, { useContext, useState, useEffect } from "react";
// import classes from "./Orders.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
// import { db } from "../../Components/Utility/firebase";
// import { DataContext } from "../../Components/DataProvider/DataProvider";
// import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";
// import { app } from "./firebase"; // your firebase config

// function Orders() {
//   const { user, dispatch } = useContext(DataContext);
//   const [orders, setOrders] = useState([]);
//   const db = getFirestore(app);

//   useEffect(() => {
//     if (user) {
//       db.collection("users")
//         .doc(user.uid)
//         .collection("orders")
//         .orderBy("created", "desc")
//         .onSnapShot((snapshot) => {
//           console.log(snapshot);
//         });
//     } else {
//     }
//   }, []);

//   return (
//     <LayOut>
//       <section className={classes.container}>
//         <div className={classes.orders__container}>
//           <h2>Your Orders</h2>
//           {/* ordered items */}
//         </div>
//       </section>
//     </LayOut>
//   );
// }

// export default Orders;
