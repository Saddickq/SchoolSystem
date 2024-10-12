const LecturersTable = ({ setIsModalOpen }) => {
  return (
    <div className="bg-gray-300 p-4 shadow rounded-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Lecturers List</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Lecturer
        </button>
      </div>
      <table className="min-w-full border border-gray-800 bg-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {/* Example data for teachers */}
          <tr>
            <td className="py-2 px-4 border-b">Jane Smith</td>
            <td className="py-2 px-4 border-b">janesmith@example.com</td>
            <td className="py-2 px-4 border-b">Teacher</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Michael Johnson</td>
            <td className="py-2 px-4 border-b">michaeljohnson@example.com</td>
            <td className="py-2 px-4 border-b">Teacher</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LecturersTable;
