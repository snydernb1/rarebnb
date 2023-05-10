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

  return (
    <div className="signupDiv">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} className="signupForm">
        <label className="formLabel">
          Email
        </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        {errors.email && <p>{errors.email}</p>}
        <label className="formLabel">
          Username
        </label>
          <input
            type="text"
            className="inputPadding"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        {errors.username && <p>{errors.username}</p>}
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
        {errors.confirmPassword && (
          <p>{errors.confirmPassword}</p>
        )}
        <button type="submit" className="signupButton">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
