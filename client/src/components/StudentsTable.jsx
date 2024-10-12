const StudentsTable = ({ setIsModalOpen }) => {
  return (
    <div className="bg-gray-300 p-4 shadow rounded-lg mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold mb-4">Students List</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Student
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
          {/* Example data for students */}
          <tr>
            <td className="py-2 px-4 border-b">John Doe</td>
            <td className="py-2 px-4 border-b">johndoe@example.com</td>
            <td className="py-2 px-4 border-b">Student</td>
          </tr>
          <tr>
            <td className="py-2 px-4 border-b">Alice Brown</td>
            <td className="py-2 px-4 border-b">alicebrown@example.com</td>
            <td className="py-2 px-4 border-b">Student</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StudentsTable;
