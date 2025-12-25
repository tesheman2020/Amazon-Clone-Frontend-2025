// // import React from "react"
// import React, { useContext } from "react";
// import classes from "./Header.module.css";
// import { SlLocationPin } from "react-icons/sl";
// import { BsSearch } from "react-icons/bs";
// import { BiCart } from "react-icons/bi";
// import LowerHeader from "./LowerHeader";
// import { Link, useNavigate } from "react-router-dom";
// import { DataContext } from "../DataProvider/DataProvider";
// import { auth } from "../../Components/Utility/firebase"

// const Header = () => {
//   const { state } = useContext(DataContext);
//   const { user, basket } = state;
//   const navigate = useNavigate();


//   // ✅ TOTAL NUMBER OF ITEMS IN CART
//   const totalItems = basket.reduce((total, item) => total + item.amount, 0);

//     const handleSignOut = () => {
//       auth.signOut().then(() => {
//         navigate("/auth");
//       });
//     };

//   return (
//     <section className={classes.fixed}>
//       <section>
//         <div className={classes.header__container}>
//           {/* LOGO */}
//           <div className={classes.logo__container}>
//             <Link to="/">
//               <img
//                 src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
//                 alt="amazon logo"
//               />
//             </Link>

//             <div className={classes.delivery}>
//               <span>
//                 <SlLocationPin />
//               </span>
//               <div className={classes.delivery}>
//                 <p>Delivere to</p>
//                 <span>PA, USA</span>
//               </div>
//             </div>
//           </div>

//           {/* SEARCH */}
//           <div className={classes.search}>
//             <select>
//               <option>All</option>
//             </select>
//             <input type="text" />
//             <BsSearch size={37} />
//           </div>

//           {/* RIGHT SECTION */}
//           <div className={classes.order__container}>
//             <Link to="/" className={classes.language}>
//               <img
//                 src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
//                 alt="USA Flag"
//               />
//               <select>
//                 <option>EN</option>
//               </select>
//             </Link>

//             {/* <Link to={user ? "/account" : "/auth"}>
//               <div>
//                 <p>Hello {user ? user.email.split("@")[0] : "Sign In"}</p>
//               </div>
//               <span>Account & Lists</span>
//             </Link> */}

//             <Link to={!user && "/auth"}>
//               <div>
//                 {user ? (
//                   <>
//                     <p>Hello {user?.email?.split("@")[0]} </p>
//                     <span onClick={()=>auth.signOut()}>Sign Out</span>
//                   </>
//                 ) : (
//                   <>
//                     <p>Hello, Sign In</p>
//                     <span>Account & Lists</span>
//                   </>
//                 )}
//               </div>
//             </Link>

//             {/* <Link to={user ? "/" : "/auth"}>
//               {" "}
         
//               <div>
//                 {user ? (
//                   <p>Hello {user.email.split("@")[0]}</p>
//                 ) : (
//                   <p>Hello, Sign In</p>
//                 )}
//               </div>
//               <span>Account & Lists</span>
//             </Link> */}

//             <Link to="/orders">
//               <p>Returns</p>
//               <span>& Orders</span>
//             </Link>

//             {/* 🛒 CART */}
//             <Link to="/cart" className={classes.cart}>
//               <BiCart size={35} />
//               <span className={classes.cartCount}>{totalItems}</span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <LowerHeader />
//     </section>
//   );
// };

// export default Header;

import React, { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import { auth } from "../../Components/Utility/firebase";

const Header = () => {
  const { state } = useContext(DataContext);
  const { user, basket } = state;
  const navigate = useNavigate();

  // Total items in cart
  const totalItems = basket.reduce((total, item) => total + item.amount, 0);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigate("/auth"); // redirect to auth page after sign out
    });
  };

  return (
    <section className={classes.fixed}>
      <div className={classes.header__container}>
        {/* LOGO */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
              alt="Amazon Logo"
            />
          </Link>

          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div className={classes.delivery}>
              <p>Deliver to</p>
              <span>PA, USA</span>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className={classes.search}>
          <select>
            <option>All</option>
          </select>
          <input type="text" placeholder="Search products..." />
          <BsSearch size={37} />
        </div>

        {/* RIGHT SECTION */}
        <div className={classes.order__container}>
          {/* LANGUAGE */}
          <div className={classes.language}>
            <img
              src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
              alt="USA Flag"
            />
            <select>
              <option>EN</option>
            </select>
          </div>

          {/* USER ACCOUNT */}
          {/* <Link to={user ? "/account" : "/auth"} className={classes.account}>
            <div>
              <p>Hello {user ? user.email.split("@")[0] : "Sign In"}</p>
              {user ? (
                <span onClick={handleSignOut} style={{ cursor: "pointer" }}>
                  Sign Out
                </span>
              ) : (
                <span>Account & Lists</span>
              )}
            </div>
          </Link> */}

          <Link to={user ? "/" : "/auth"}>
            <div>
              {user ? (
                <>
                  <p>Hello {user.email.split("@")[0]}</p>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      auth.signOut();
                    }}
                  >
                    Sign Out
                  </span>
                </>
              ) : (
                <>
                  <p>Hello, Sign In</p>
                  <span>Account & Lists</span>
                </>
              )}
            </div>
          </Link>

          {/* ORDERS */}
          <Link to="/orders" className={classes.orders}>
            <p>Returns</p>
            <span>& Orders</span>
          </Link>

          {/* CART */}
          <Link to="/cart" className={classes.cart}>
            <BiCart size={35} />
            <span className={classes.cartCount}>{totalItems}</span>
          </Link>
        </div>
      </div>

      <LowerHeader />
    </section>
  );
};

export default Header;
