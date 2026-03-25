import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      const userRole = res.data.role;

      if (userRole === "admin") navigate("/admin/dashboard");
      else if (userRole === "hr") navigate("/hr/dashboard");
      else navigate("/employee/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">

      {/* MAIN CONTAINER */}
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT SIDE (Branding - Desktop Only) */}
        <div className="hidden md:flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-600 text-white p-10">

  {/* Glow Effect */}
  <div className="absolute -top-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
  <div className="absolute bottom-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

  {/* Content */}
  <div className="relative z-10">

    <h1 className="text-5xl font-extrabold tracking-tight mb-4">
      SPMS
    </h1>

    <p className="text-lg text-indigo-100 mb-6">
      Software Personnel Management System
    </p>

    <p className="text-sm text-indigo-200 mb-8 leading-relaxed">
      Manage employees, track attendance, handle leave requests,
      and organize projects — all in one powerful platform.
    </p>

    {/* Features */}
    <div className="space-y-3 text-sm">

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Employee & Department Management
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Smart Attendance Tracking
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Leave Approval Workflow
      </div>

      <div className="flex items-center gap-2">
        <span className="w-2 h-2 bg-white rounded-full"></span>
        Project Assignment System
      </div>

    </div>

  </div>

</div>

        {/* RIGHT SIDE (FORM) */}
        <div className="p-8 md:p-10">

          {/* Header */}
          <div className="text-center mb-8 md:text-left">
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome Back 
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

            {/* Role */}
            <div>
              <label className="text-sm text-gray-600">Login As</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm text-gray-600">Email</label>
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label className="text-sm text-gray-600">Password</label>

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="absolute right-3 top-[38px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white p-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          

          <p className="text-center text-xs text-gray-400 mt-6">
            © 2026 SPMS • All rights reserved
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;