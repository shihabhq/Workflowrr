import { use, useState } from "react";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";
import { FaGoogle } from "react-icons/fa";

export default function AuthForm() {
  const {
    loading,
    updateUser,
    googleLogin,
    userLogin,
    setLoading,
    createUser,
  } = use(AuthContext);
  const [isLogin, setIsLogin] = useState(true);

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
    try {
      await userLogin(credentials.email, credentials.password);
    } catch (err) {
      setError("Failed to login", err.message);
    }
    setLoading(false);
  };

  const handleRegister = async () => {
    try {
      await createUser(credentials.email, credentials.password);
      await updateUser({ displayName: credentials.username });
    } catch (e) {
      setError("Failed to register", e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (e) {
      setError("Failed to login", e.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-96 p-6 bg-white shadow-md rounded-lg">
        <div className="relative flex justify-around mb-6 border-b border-gray-300">
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              isLogin ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-lg font-semibold ${
              !isLogin ? "text-blue-500" : "text-gray-600"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>

          <div
            className={`absolute bottom-0 left-0 w-1/2 h-1 bg-blue-500 transition-transform duration-300 ${
              isLogin ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        <div className="space-y-4">
          {!isLogin && (
            <input
              onChange={handleCredentialChange}
              type="text"
              placeholder="Username"
              className="w-full px-3 py-2 border rounded-md"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />

          {/* Submit Button */}
          <div>
            <div
              className="w-full bg-[#17A2B8] hover:opacity-85 transition-all font-inter
            text-white py-2 border rounded-md"
            >
              {isLogin ? (
                <button
                  disabled={loading}
                  className="w-full cursor-pointer flex items-center justify-center "
                >
                  {loading ? <Loading /> : <span>Login</span>}
                </button>
              ) : (
                <button
                  className="w-full cursor-pointer flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? <Loading /> : <span>Register</span>}
                </button>
              )}
            </div>
            {error && <div className="text-red-500 font-semibold">{error}</div>}
          </div>
        </div>

        {/* Google Login Button */}
        <div className="mt-2">
          <button className="w-full cursor-pointer flex items-center justify-center gap-2 border py-2 rounded-md hover:bg-gray-100">
            <FaGoogle />
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
