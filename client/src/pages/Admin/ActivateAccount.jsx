import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../utils/context";

const ActivateAccount = () => {
  const [password, setPassword] = useState({
    newPwd: "",
    confPwd: "",
  });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState("");

  const { user, setUser } = useContext(userContext);

  const { invitationCode } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/api/v1/profileFromToken/${invitationCode}`);
        setUser(data);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchUser();
  }, [invitationCode]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((password) => ({ ...password, [name]: value }));
  };

  const submitPassword = async (event) => {
    event.preventDefault();
    if (!password.newPwd) {
      setError("Please provide a strong Passwords");
      return;
    }
    try {
      if (password.newPwd !== password.confPwd) {
        setError("Passwords don't Match");
        return;
      }
      const { data } = await axios.post(
        `/api/v1/activate-account/${invitationCode}`,
        { password: password.newPwd }
      );
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
    <div className="flex items-center bg-gray-700 w-full h-[100vh] justify-center">
      <form
        className="flex flex-col border bg-gray-300 rounded-lg p-10 gap-3 w-[35vw] "
        onSubmit={submitPassword}
      >
        <h3 className="text-xl text-gray-700 font-semibold mb-2">
          Change Password
        </h3>
        <label className="">Email:</label>
        <input
          className="bg-transparent text-black border-gray-700 w-full p-2"
          type="email"
          disabled
          defaultValue={user?.email}
        />

        <label className="">New Password:</label>
        <input
          value={password.newPwd}
          name="newPwd"
          onChange={handleChange}
          type="password"
          className="bg-transparent border-gray-700 text-black w-full p-2"
        />

        <label className="">Confirm Password:</label>
        <input
          value={password.confPwd}
          name="confPwd"
          onChange={handleChange}
          type="password"
          className="bg-transparent border-gray-700 text-black w-full p-2"
        />
        <button className="w-full font-semibold bg-blue-600 p-2">
          Change password
        </button>
        {error && <p className="text-center text-red-400">{error}</p>}
      </form>
    </div>
  );
};

export default ActivateAccount;
