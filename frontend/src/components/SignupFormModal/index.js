import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  let makeDisabled = false;

  if (username.length > 3 &&
    password.length > 5 &&
    email.length > 0 &&
    firstName.length > 0 &&
    lastName.length > 0 &&
    confirmPassword.length > 0) {
    makeDisabled = true
  }



  return (
    <div className="signupDiv">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signupForm">
        {errors.username && <p className="errors">* {errors.username}</p>}
        {errors.email && <p className="errors">* {errors.email}</p>}
        {errors.confirmPassword && (<p className="errors">* {errors.confirmPassword}</p>)}
        <label className="formLabel">
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        <label className="formLabel">
          Username
        </label>
          <input
            type="text"
            className="inputPadding"
            placeholder="Username must be at least 4 characters"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <label className="formLabel">
          First Name
        </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        {errors.firstName && <p>{errors.firstName}</p>}
        <label className="formLabel">
          Last Name
        </label>
          <input
            type="text"
            value={lastName}
            className="inputPadding"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        {errors.lastName && <p>{errors.lastName}</p>}
        <label className="formLabel">
          Password
        </label>
          <input
            type="password"
            value={password}
            placeholder="Password must be at least 6 characters"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.password && <p>{errors.password}</p>}
        <label className="formLabel">
          Confirm Password
        </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        <button type="submit" className={makeDisabled === false ? "loginButtonDisabled" : "signupButton"} disabled={!makeDisabled}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
