import React, { useState } from "react";
import "./style.scss";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import { auth } from '../../auth/firebase';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => setError(error.message));
  };

  return (
    <ContentWrapper>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        <button type="submit">Log in</button>
        {error && <div>{error}</div>}
      </form>
    </ContentWrapper>
  )
}

export default Login

