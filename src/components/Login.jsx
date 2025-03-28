import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmail, setPassword, loginUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import GI from '../images/GI.jpg'
const Login = () => {
  const dispatch = useDispatch();
  const { email, password, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") navigate("/users");
    });
  };

  return (
    <div className=" flex items-center justify-center bg-gradient-to-r from-green-300 to-green-500 py-8 min-h-screen p-2">
      <div className="flex flex-col lg:flex-row bg-white rounded-xl shadow-lg overflow-hidden max-w-4xl w-full p-2">
        {/* Left Side - Illustration */}
        <div className="w-full lg:w-1/2  bg-green-100 flex justify-center items-center p-5">
          <img src={GI} alt="Login Illustration" className="w-full rounded-xl h-40 lg:h-full object-cover" />
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 p-2 lg:p-10 flex flex-col justify-center  gap-1">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-green-400 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
              </svg>
            </div>
            <h2 className="text-6xl font-bold text-gray-700 mb-4">Welcome</h2>
          </div>
          {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
          <form onSubmit={handleLogin} className="space-y-4 ">
            <h3>Email</h3>
            <input
              type="email"
              value={email}
              placeholder="Username"
              onChange={(e) => dispatch(setEmail(e.target.value))}
              className="w-full p-3 border rounded focus:ring focus:ring-green-300"
              required
            />
            <h3>Password</h3>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => dispatch(setPassword(e.target.value))}
              className="w-full p-3 border rounded focus:ring focus:ring-green-300"
              required
            />
            <div className="flex justify-between text-sm text-gray-500">
              <a href="#" className="hover:text-green-600">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-600 transition-all"
            >
              LOGIN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
