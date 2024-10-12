// import UserOptions from "../components/UserOptions";
// import users from "../utils/Users";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-700">
      <div className="flex flex-col gap-5 items-center justify-center rounded-xl">
        <FaUserTie className="size-24 text-neutral-100" />
        <h3 className="text-3xl font-semibold text-neutral-100">
          Welcome Administrator
        </h3>
        <div className="flex gap-6">
          <button className="font-semibold text-xl" onClick={() => navigate("/login")}>
            login
          </button>
          <button className="font-semibold text-xl" onClick={() => navigate("/register-admin")}>
            register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
