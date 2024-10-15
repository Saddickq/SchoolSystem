import { useContext, useState } from "react";
import { userContext } from "../../utils/context";
import { Navigate } from "react-router-dom";
import axios from "axios";

const StudentDashboard = () => {
  const { user, setUser } = useContext(userContext);
  const [redirect, setRedirect] = useState()

  const handleLogout = async () => {
    try {
      const { data } = await axios.get("/api/v1/logout");
      setUser('')
      setRedirect("/")
      console.log(data.message);
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className="bg-gray-700 min-h-screen py-8 px-24">
      <h1 className="text-3xl text-neutral-100 font-bold mb-6">
        Student Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Courses Section */}
        <div className="bg-gray-300 py-4 px-8 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Courses</h2>
          <ul className="list-disc ml-6">
            <li>Mathematics</li>
            <li>Science</li>
            <li>History</li>
            <li>English Literature</li>
          </ul>
        </div>

        {/* Assignments Section */}
        <div className="bg-gray-300 py-4 px-8 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Assignments</h2>
          <ul className="list-disc ml-6">
            <li>Math Homework - Due Oct 15</li>
            <li>Science Project - Due Oct 20</li>
            <li>History Essay - Due Oct 22</li>
          </ul>
        </div>

        {/* Notifications Section */}
        <div className="bg-gray-300 py-4 px-8 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Notifications</h2>
          <ul className="list-disc ml-6">
            <li>New assignment posted in Science</li>
            <li>Exam schedule updated</li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className="bg-gray-300 py-4 px-8 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Profile</h2>
          <p>Name: {user?.firstName ? user.firstName : "Setup your profile"}</p>
          <p>Email: {user.email}</p>
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
    </div>
  );
};
export default StudentDashboard;
