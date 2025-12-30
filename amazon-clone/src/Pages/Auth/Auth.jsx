import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Components/Utility/firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Components/Utility/action.Type.jsx";

function Auth() {
  const { state, dispatch } = useContext(DataContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const navigate = useNavigate();
  const navStateData = useLocation();
  console.log(navStateData);

  const authHandler = (e) => {
    e.preventDefault();
    setError(""); // ✅ CLEAR OLD ERRORS FIRST

    const action = e.currentTarget.name;

    if (action === "Sign in") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log("Sign In Successful:", userInfo.user); // Success Log
          dispatch({ type: Type.SET_USER, user: userInfo.user });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          // console.error("Sign In Error:", err.message); // Error Log
          console.error(err.message);
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log("Account Created:", userInfo.user); // Success Log
          dispatch({ type: Type.SET_USER, user: userInfo.user });

          setError(""); // ✅ CLEAR AGAIN ON SUCCESS
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.error(err.message); // Error Log
          setError(err.message);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://images.seeklogo.com/logo-png/29/2/amazon-logo-png_seeklogo-291390.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            name="Sign in"
            onClick={authHandler}
            className={classes.login__SignInButton}
          >
            {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in, you agree to Amazon fake clone conditions of use and
          sale. Please see our privacy notice, our cookies and our
          Interest-Based ads notice.
        </p>

        <button
          type="button"
          name="Sign up"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ paddingTop: "5px", color: "red", display: "block" }}>
            {error}
          </small>
        )}
      </div>
    </section>
  );
}

export default Auth;
