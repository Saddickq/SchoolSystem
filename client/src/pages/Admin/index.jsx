import { useContext, useState } from "react";
import { userContext } from "../../utils/context";
import StudentsTable from "../../components/StudentsTable";
import LecturersTable from "../../components/LecturersTable";
import axios from "axios";

const AdminDashboard = () => {
  const { user } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ email: "", role: "student" });

  const students = 10;
  const teachers = 5;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleAddUser = async () => {
    // console.log(newUser)
    const { data } = await axios.post("/api/v1/invite-user", {
      role: newUser.role,
      email: newUser.email,
    });
    console.log(data.response.message);
    setIsModalOpen(false);
  };

  return (
    <div className="py-6 px-24 bg-gray-700 min-h-screen">
      <h2 className="text-3xl text-neutral-100 font-bold mb-6">
        Welcome {user.firstName} {user.lastName}
      </h2>

      {/* Tiles */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-300 p-4 shadow rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Total Students</h3>
          <p className="text-3xl font-bold text-blue-600">{students}</p>
        </div>
        <div className="bg-gray-300 p-4 shadow rounded-lg flex flex-col items-center justify-center">
          <h3 className="text-lg font-semibold">Total Lecturers</h3>
          <p className="text-3xl font-bold text-green-600">{teachers}</p>
        </div>
      </div>

      {/* List Section */}
      <StudentsTable setIsModalOpen={setIsModalOpen} />

      <LecturersTable setIsModalOpen={setIsModalOpen} />

      {/* Modal for adding a new user */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-[30vw]">
            <h3 className="text-xl font-semibold mb-4">Add User</h3>
            <label className="block mb-2">Email:</label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 border bg-transparent rounded mb-4"
              placeholder="Enter email"
            />
            <label className="block mb-2">Role:</label>
            <select
              name="role"
              onChange={handleInputChange}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
            </select>
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
              >
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
