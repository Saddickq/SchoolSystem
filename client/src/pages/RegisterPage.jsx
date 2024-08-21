import axios from "axios";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";


const RegisterPage = () => {
    const [redirect, setRedirect] = useState("")
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleRgister = async (event) => {
        event.preventDefault()
        try {
            await axios.post("/register/", {
                username: formData.username,
                email: formData.email,
                password: formData.password
            })
            setRedirect("/login")
        } catch (error) {
            console.error(error)
        }
    }

    const handleChange = (event) => {
        event.preventDefault()
        const { name, value } = event.target

        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })

    }
    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="grid h-screen bg-gray-700">
            <form className="place-self-center border p-12 rounded-md" onSubmit={handleRgister}>
                <h3 className="mb-4 text-2xl font-semibold text-gray-300">Register</h3>
                <div className="mb-4">
                    <input name="username" placeholder="Username" onChange={handleChange} type="text" />
                </div>
                <div>
                    <input name="email" placeholder="Email" onChange={handleChange} type="email" />
                </div>
                <div className="my-4">
                    <input name="password" placeholder="password" onChange={handleChange} type="password" />
                </div>
                <button type="submit">Register</button>
                <div className="text-sm text-center text-gray-300">
                    Aready have an account? <Link to={"/login"} className="font-semibold">signin here</Link>
                </div>
            </form>
        </div>
      );
}

export default RegisterPage;
