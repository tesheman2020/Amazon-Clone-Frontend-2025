import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
// import LayOut from "../../Components/LayOut/LayOut";
import { Link } from "react-router-dom";
import { auth } from "../../Components/Utility/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Components/Utility/action.Type.jsx";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // const [{ user }, dispatch] = useContext(DataContext);
  const { state, dispatch } = useContext(DataContext);
  const { user } = state;

  console.log(user);

  const authHandler = (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name === "Sign in") {
      //firebase auth
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo);

          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((err) => {
          console.error(err);
          setError(err.message)
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to="/">
        <img
          src="https://images.seeklogo.com/logo-png/29/2/amazon-logo-png_seeklogo-291390.png"
          alt="Amazon Logo"
        />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label htmlFor="Password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            name="Sign in"
            onClick={authHandler}
            className={classes.login__SignInButton}
          >
            Sign In
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in, you agree to Amazon fake clone conditions of use and
          sale. Please see our privacy notice, our cookies and our
          Interest-Based ads notice.
        </p>
        <button
          type="submit"
          name="Sign up"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
