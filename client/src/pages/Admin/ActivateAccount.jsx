import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ActivateAccount = () => {
  const [password, setPassword] = useState({
    newPwd: "",
    confPwd: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPassword((password) => ({ ...password, [name]: value }));
  };

  const { invitationCode } = useParams();

  const submitPassword = async (event) => {
      event.preventDefault();
    if (password.newPwd !== password.confPwd) {
      console.log("Passwords dont Match");
      return;
    }
    console.log(invitationCode);
    // console.log(id);
    return;
    const { data } = await axios.post(
      `/api/v1/activate-account/${invitationCode}`,
      { password: password.newPwd }
    );
    console.log(data);
    return;
  };
  return (
    <div className="flex items-center bg-gray-200 w-full h-[100vh] justify-center">
      <form
        className="flex flex-col border bg-white rounded-lg p-10 gap-3 w-[35vw] "
        onSubmit={submitPassword}
      >
        <h3 className="text-xl text-gray-700 font-semibold mb-2">
          Change Password
        </h3>
        <label className="">Email:</label>
        <input className="bg-transparent w-full p-2" type="email" disabled />

        <label className="">New Password:</label>
        <input
          value={password.newPwd}
          name="newPwd"
          onChange={handleChange}
          type="password"
          className="bg-transparent text-black w-full p-2"
        />

        <label className="">Confirm Password:</label>
        <input
          value={password.confPwd}
          name="confPwd"
          onChange={handleChange}
          type="password"
          className="bg-transparent text-black w-full p-2"
        />
        <button className="w-full font-semibold bg-blue-600 p-2">
          Change password
        </button>
      </form>
    </div>
  );
};

export default ActivateAccount;
