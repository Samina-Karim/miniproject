import React from "react";
import { useState, useEffect } from "react";
import "../index.css";
import currencyServices from "../services/currenciesApiSrv";
import countryServices from "../services/countriesApiSrv";

const LoginForm = () => {
 /********************************************************/
  // Event handler for login/signup button
  const handleLoginSignupClick = (e) => {
    // NOT SUPPOSED TO BE IMPLEMENTED
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleLoginSignupClick}>
        <input
          id="username"
          name="username"
          type="text"
          required
          pattern="[A-Za-z ]+"
          placeholder="Username"
        />
        <input
          id="password"
          name="password"
          type="text"
          required
          pattern="[A-Za-z0-9 ]+"
          placeholder="Password"
        />
        <br></br>
        <br></br>
        <button type="login">Login</button>
        &nbsp;&nbsp;
        <button type="signup">Signup</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default LoginForm;
