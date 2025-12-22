import React from "react";
import classes from "./SignUp.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { Link } from "react-router-dom";

function Auth() {
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
      <div className={classes.logingcontainer}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <lable html for="email">
              Email:
            </lable>
            <input type="email" id="email" />
          </div>
          <div>
            <lable html for="Password">
              Password:
            </lable>
            <input type="password" id="password" />
          </div>
          <button className={classes.login__SignInButton}>Sign In</button>
        </form>
        {/* agreement */}
        <p>
          By signing-in, you agree to Amazon fake clone conditions of use and
          sale. Please see our privacy notice, our cookies and our
          Interest-Based ads notice.
        </p>
        <button className={classes.login__registerButton}>
          Create your Amazon Account
        </button>
      </div>
    </section>
  );
}

export default Auth;
