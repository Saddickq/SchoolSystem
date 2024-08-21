import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const LoginPage = () => {
  const [redirect, setRedirect] = useState("");
  const [formData, setFormData] = useState({
    username: "",
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
      await axios.post("/login", {
        username: formData.email,
        password: formData.password,
      });
      setRedirect("/home");
    } catch (error) {
      console.log("hello am the one crushing");
      console.error(error);
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="grid h-screen bg-gray-700">
      <form
        className="place-self-center border p-12 rounded-md"
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
        <button type="submit">Login</button>
        <div className="text-sm text-center text-gray-300">
          Need an account?{" "}
          <Link to={"/register"} className="font-semibold cursor-pointer">
            signup here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
