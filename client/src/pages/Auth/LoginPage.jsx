import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

const LoginPage = () => {
    const navigate = useNavigate()
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });
      setRedirect("/admin-dashboard");
    } catch (error) {
      console.error(error);
      setError(error.response.data.error)
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
        <div className="absolute top-20 cursor-pointer" onClick={()=>navigate('/')}>
            <IoArrowBack className="text-neutral-100 size-8"/>
        </div>
      <form
        className="place-self-center border p-10 rounded-md"
        onSubmit={handleLogin}
      >
        <h3 className="text-2xl font-semibold text-gray-300">Login</h3>
        <div className="my-4">
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            type="email"
          />
        </div>
        <div className="my-4">
          <input
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
          />
        </div>
        {error && <p className="text-sm text-center text-red-300">{error}</p>}
        <button type="submit">Login</button>
        {/* <div className="text-sm text-center text-gray-300">
          Need an account?{" "}
          <Link to={"/register"} className="font-semibold cursor-pointer">
            signup here
          </Link>
        </div> */}
      </form>
    </div>
  );
};

export default LoginPage;
