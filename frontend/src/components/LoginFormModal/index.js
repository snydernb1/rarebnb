import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
// import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { useHistory } from "react-router-dom";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const history = useHistory()


  const demoOne = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
    closeModal();
    history.push('/');
  }

  const demoTwo = (e) => {
    e.preventDefault();
    dispatch(sessionActions.login({ credential: 'FakeUser1', password: 'password1' }))
    closeModal();
    history.push('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };


  let makeDisabled = false;

  if (credential.length > 3 && password.length > 5) {
    makeDisabled = true
  }

  return (
    <div className="loginDiv">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit} className="loginForm">
        {errors.credential && (
          <p className="errors">*{errors.credential}</p>
        )}
        <label>
          Username or Email
        </label>
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
            id="inputPadding"
          />
        <label>
          Password
        </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        <button type="submit" className={makeDisabled === false ? "loginButtonDisabled" : "loginButton"} disabled={!makeDisabled}>Log In</button>

        <section className="demoUser">
          <h5 onClick={demoOne} className="font">Log in as Demo User 01</h5>
          <h5 onClick={demoTwo} className="font">Log in as Demo User 02</h5>
        </section>

      </form>
    </div>
  );
}

export default LoginFormModal;
