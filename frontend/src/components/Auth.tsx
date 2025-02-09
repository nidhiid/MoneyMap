import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Auth: React.FC = () => {
  const { login }: any = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [customerId, setCustomerId] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "login" : "signup";
    const payload = isLogin ? { email, password } : { email, password, customerId };
    
    try {
      const { data } = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, payload);
      login(data.token, data.customerId);
      alert("Success! Redirecting...");
      window.location.reload();
    } catch (error) {
      alert("Authentication failed!");
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {!isLogin && <input type="text" placeholder="Customer ID" value={customerId} onChange={(e) => setCustomerId(e.target.value)} required />}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)}>{isLogin ? "Need an account? Sign up" : "Already have an account? Log in"}</button>
    </div>
  );
};

export default Auth;
