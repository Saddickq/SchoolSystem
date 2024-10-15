import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { userContext } from "../../utils/context";

const LoginPage = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("");

  const { setUser } = useContext(userContext);

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
      const { data } = await axios.post("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });
      setUser(data.user);
      setRedirect(`/${data.user.role}-dashboard`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-700">
      <div
        className="absolute top-20 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <IoArrowBack className="text-neutral-100 size-8" />
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
            className="bg-transparent"
          />
        </div>
        <div className="my-4">
          <input
            name="password"
            placeholder="password"
            value={formData.password}
            onChange={handleChange}
            type="password"
            className="bg-transparent"
          />
        </div>
        <button
          className="focus:outline-none bg-neutral-300 text-neutral-800 font-semibold"
          type="submit"
        >
          Login
        </button>
        {error && <p className="text-center text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
