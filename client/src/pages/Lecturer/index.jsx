import { useContext, useState } from "react";
import { userContext } from "../../utils/context";
import axios from "axios";

const LecturerDashbord = () => {
  const { user, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState();

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/v1/logout");
      setUser("");
      setRedirect("/");
      console.log(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <div className="bg-gray-700 min-h-screen py-8 px-24">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl text-neutral-100 font-bold">
          Lecturer Dashboard
        </h1>

        {/* Profile Section */}
        <div className="bg-gray-100 p-6 shadow-lg rounded-lg max-w-xs">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Profile</h2>
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Name: {user?.firstName ? user.firstName : "Setup your profile"}</p>
            <p className="text-gray-700 font-medium">Email: {user.email}</p>
          </div>
          <div className="flex gap-4 justify-between">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400">
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Courses Taught Section */}
        <div className="bg-gray-200 p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Courses Taught</h2>
          <ul className="list-disc ml-6 text-gray-800">
            <li>Calculus I</li>
            <li>Physics 101</li>
            <li>Web Development</li>
            <li>Networking Basics</li>
          </ul>
        </div>

        {/* Assignments to Review Section */}
        <div className="bg-gray-200 p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Assignments to Review</h2>
          <ul className="list-disc ml-6 text-gray-800">
            <li>Math Homework - 15 submissions pending</li>
            <li>Science Project - 10 submissions pending</li>
            <li>History Essay - 7 submissions pending</li>
          </ul>
        </div>

        {/* Messages Section */}
        <div className="bg-gray-200 p-6 shadow rounded-lg md:col-span-2">
          <h2 className="text-xl font-semibold mb-3">Messages</h2>
          <ul className="list-disc ml-6 text-gray-800">
            <li>Message from John Doe - "Clarification on Homework..."</li>
            <li>Message from Jane Smith - "Request for extension..."</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LecturerDashbord;
