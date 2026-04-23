import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignupImg from "../../src/assets/HeroImg.jpg";
import { login } from "../redux/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, loading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="min-h-screen flex bg-black text-white">
      {/* Left: Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0f0f0f] shadow-[0_0_40px_rgba(255,255,255,0.05)] border border-white/10">
          <h1 className="pb-6 font-bold text-3xl text-center tracking-wide">
            Welcome Back
          </h1>

          {error && (
            <p className="mb-4 text-red-400 text-sm text-center">{error}</p>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm text-gray-400">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full p-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-400">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 rounded-lg bg-black border border-white/20 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/40 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-white text-black font-semibold tracking-wide hover:bg-gray-200 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>
          </form>

          {/* Register */}
          <div className="mt-6 text-center text-sm text-gray-400">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-white hover:underline">
              Register
            </Link>
          </div>

          {/* Social */}
          <div className="flex justify-center gap-4 mt-6">
            {[
              "https://ucarecdn.com/8f25a2ba-bdcf-4ff1-b596-088f330416ef/",
              "https://ucarecdn.com/be5b0ffd-85e8-4639-83a6-5162dfa15a16/",
              "https://ucarecdn.com/3277d952-8e21-4aad-a2b7-d484dad531fb/",
            ].map((src, idx) => (
              <button
                key={idx}
                className="p-3 rounded-full bg-black border border-white/20 hover:bg-white hover:text-black transition"
              >
                <img src={src} className="w-5 h-5" />
              </button>
            ))}
          </div>

          {/* Terms */}
          <p className="mt-6 text-xs text-gray-500 text-center leading-relaxed">
            By signing in, you agree to our{" "}
            <span className="underline cursor-pointer">Terms</span> and{" "}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>

      {/* Right: Image Section (smaller & elegant) */}
      <div className="hidden lg:flex w-1/2 items-center justify-center">
        <img
          src={SignupImg}
          alt="Login Visual"
          className="h-3/4 object-cover rounded-3xl opacity-90 shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Login;
