import React, { useContext, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Loading, { SmallLoading } from "../components/Loading";
import { FaGoogle } from "react-icons/fa";
import { useNavigate } from "react-router";
import useAxios from "../hooks/useAxios";

export default function AuthForm() {
  const { axiosPublic } = useAxios();
  const {
    loading,
    updateUser,
    googleLogin,
    userLogin,
    setLoading,
    createUser,
  } = useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [error, setError] = useState("");

  const handleCredentialChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    if (!credentials.email || !credentials.password) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }
    try {
      await userLogin(credentials.email, credentials.password);
      navigate("/");
    } catch (err) {
      setError("Failed to login: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setError("");
    if (!credentials.username || !credentials.email || !credentials.password) {
      setError("Please fill all the fields");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      await createUser(credentials.email, credentials.password);
      await updateUser({ displayName: credentials.username });

      const taskObj = {
        name: credentials.username,
        email: credentials.email,
      };
      await axiosPublic.post("/users", taskObj);
      navigate("/");
    } catch (e) {
      setError("Failed to register: " + e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await googleLogin();
      const user = result.user;

      // Now create the taskObj with user.displayName and user.email

      const taskObj = {
        name: user.displayName,
        email: user.email,
      };

      await axiosPublic.post("/users", taskObj);
    } catch (e) {
      setError("Failed to login: " + e.message);
    } finally {
      navigate("/");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-96 p-6 bg-white shadow-md rounded-lg">
        <div className="relative flex justify-around mb-6 border-b border-gray-300">
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              isLogin ? "text-btn" : "text-gray-600"
            }`}
            onClick={() => {
              setError("");
              setIsLogin(true);
            }}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              !isLogin ? "text-btn" : "text-gray-600"
            }`}
            onClick={() => {
              setError("");
              setIsLogin(false);
            }}
          >
            Register
          </button>

          <div
            className={`absolute bottom-0 left-0 w-1/2 h-1 bg-btn transition-transform duration-300 ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <input
              onChange={(e) => handleCredentialChange(e)}
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-3 py-2 border  rounded-md"
            />
          )}
          <input
            type="email"
            name="email"
            onChange={(e) => handleCredentialChange(e)}
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
            onChange={(e) => handleCredentialChange(e)}
          />

          <div>
            <div
              className="w-full bg-btn hover:opacity-85 transition-all font-inter
            text-white py-2 border rounded-md"
            >
              {isLogin ? (
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full cursor-pointer flex items-center justify-center "
                >
                  Login
                </button>
              ) : (
                <button
                  onClick={handleRegister}
                  className="w-full cursor-pointer flex items-center justify-center"
                  disabled={loading}
                >
                  Register
                </button>
              )}
            </div>
            {error && <div className="text-red-500 font-semibold">{error}</div>}
          </div>
        </div>

        {/* Google Login Button */}
        <div className="mt-2">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full cursor-pointer flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100"
          >
            <FaGoogle />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
