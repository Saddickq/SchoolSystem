import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";


const RegisterPage = () => {
    const navigate = useNavigate()

  const [redirect, setRedirect] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleRgister = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/register-admin", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      console.log(data.message)
      setRedirect("/login");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

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
  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="flex justify-center w-screen h-screen bg-gray-700">
        <div className="absolute top-10 cursor-pointer" onClick={()=>navigate('/')}>
            <IoArrowBack className="text-neutral-100 size-8"/>
        </div>
      <form
        className="place-self-center border  p-12 rounded-md"
        onSubmit={handleRgister}
      >
        <h3 className="mb-4 text-2xl font-semibold text-gray-300">Register</h3>
        <div className="mb-4">
          <input
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className="mb-4">
          <input
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
            type="text"
          />
        </div>
        <div>
          <input
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            type="email"
          />
        </div>
        <div className="my-4">
          <input
            name="password"
            value={formData.password}
            placeholder="password"
            onChange={handleChange}
            type="password"
          />
        </div>
        <button type="submit">Register</button>
        {error && <p className="text-sm text-center text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
