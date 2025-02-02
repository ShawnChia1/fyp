import React, { useState } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ email: "", password: "", username: "" });
  const [error, setError] = useState("");

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ email: "", password: "", username: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      // Login Logic
      const user = users.find((u) => u.email === formData.email && u.password === formData.password);
      if (user) {
        alert("Login Successful!");
      } else {
        setError("Invalid email or password.");
      }
    } else {
      // Signup Logic
      if (users.some((u) => u.email === formData.email)) {
        setError("User already exists.");
      } else {
        setUsers([...users, formData]);
        alert("Signup Successful! Please Login.");
        setIsLogin(true);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {!isLogin && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="p-2 border rounded mb-2"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="p-2 border rounded mb-2"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="p-2 border rounded mb-2"
            required
          />
          <button type="submit" className="bg-blue-500 text-white py-2 rounded">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        <button onClick={toggleMode} className="text-blue-500 mt-2">
          {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth;
