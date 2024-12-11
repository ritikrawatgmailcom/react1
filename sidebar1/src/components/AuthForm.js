import React, { useState } from "react";
import './AuthForm.css';

export default function AuthForm({ setIsAuthenticated, setRole }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [users, setUsers] = useState([
    { email: "test@example.com", password: "password123" },
  ]);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    const userExists = users.find(
      (user) => user.email === email && user.password === password
    );

    if (userExists) {
      setSuccessMessage("Login successful!");
      setIsAuthenticated(true);
      setRole(email === 'employee@example.com' ? 'employee' : 'user');
    } else {
      setErrorMessage("Invalid email or password.");
    }
  };

  const handleSignUp = () => {
    setErrorMessage("");
    setSuccessMessage("");

    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (password.trim().length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setErrorMessage("User already exists. Please login.");
      return;
    }

    setUsers([...users, { email, password }]);
    setSuccessMessage("Sign-up successful! Please log in.");
    setIsLogin(true);
  };

  return (
    <div className="container">
      <div className="form-container">
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            SignUp
          </button>
        </div>

        {isLogin ? (
          <>
            <div className="form">
              <h2>Login Form</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin}>Login</button>
              <p>
                Not a Member?{" "}
                <button onClick={() => setIsLogin(false)} className="link-button">
                  SignUp Now
                </button>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="form">
              <h2>SignUp Form</h2>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button onClick={handleSignUp}>SignUp</button>
            </div>
          </>
        )}

        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </div>
    </div>
  );
}
