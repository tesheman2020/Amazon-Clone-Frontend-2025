// import React from "react";
// import classes from "./Header.module.css";
// import { SlLocationPin } from "react-icons/sl";
// import { BsSearch } from "react-icons/bs";
// import { BiCart } from "react-icons/bi";
// import LowerHeader from "./LowerHeader";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <>
//       <section>
//         <div className={classes.header__container}>
//           {/* logo section*/}
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

//               <div>
//                 <p>Delivered to</p>
//                 <span>PA,USA</span>
//               </div>
//             </div>
//           </div>
//           {/* search section*/}
//           <div className={classes.search}>
//             <select name="" id="">
//               <option value="">All</option>
//             </select>
//             <input type="text" />
//             <BsSearch size={25} />
//           </div>
//           {/* other section*/}
//           <div className={classes.order__container}>
//             <Link to="/" className={classes.language}>
//               <img
//                 src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
//                 alt="USA Flag"
//               />
//               <select>
//                 <option value="">EN</option>
//               </select>
//             </Link>

//             {/* three components */}
//             <Link to="/">
//               <p>Sign In</p>
//               <span>Account & Lists</span>
//             </Link>
//             {/* orders */}
//             <Link to="/orders">
//               <p>returns</p>
//               <span>& Orders</span>
//             </Link>
//             <Link to="/cart" className={classes.cart}>
//               <BiCart size={35} />
//               <span>0</span>
//             </Link>
//           </div>
//         </div>
//       </section>

//       <LowerHeader />
      
//     </>
//   );
// };

// export default Header;



import React, { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";

const Header = () => {
  const { state } = useContext(DataContext);
  const { basket } = state;

  // ✅ TOTAL NUMBER OF ITEMS IN CART
  const totalItems = basket.reduce((total, item) => total + item.amount, 0);

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header__container}>
          {/* LOGO */}
          <div className={classes.logo__container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG25.png"
                alt="amazon logo"
              />
            </Link>

            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Delivered to</p>
                <span>PA, USA</span>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div className={classes.search}>
            <select>
              <option>All</option>
            </select>
            <input type="text" />
            <BsSearch size={25} />
          </div>

          {/* RIGHT SECTION */}
          <div className={classes.order__container}>
            <Link to="/" className={classes.language}>
              <img
                src="https://pngimg.com/uploads/flags/small/flags_PNG14655.png"
                alt="USA Flag"
              />
              <select>
                <option>EN</option>
              </select>
            </Link>

            <Link to="/">
              <p>Sign In</p>
              <span>Account & Lists</span>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>

            {/* 🛒 CART */}
            <Link to="/cart" className={classes.cart}>
              <BiCart size={35} />
              <span className={classes.cartCount}>{totalItems}</span>
            </Link>
          </div>
        </div>
      </section>

      <LowerHeader />
    </section>
  );
};

export default Header;
