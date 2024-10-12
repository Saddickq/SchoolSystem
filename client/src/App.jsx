import { createBrowserRouter, RouterProvider } from "react-router-dom";
import axios from "axios";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Auth/LoginPage.jsx";
import { UserContextProvider } from "./utils/context.jsx";
import ActivateAccount from "./pages/Admin/ActivateAccount.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register-admin",
    element: <RegisterPage />,
  },
  {
    path: "/admin-dashboard",
    element: <Admin />,
  },
  {
    path: "/active-account/:invitationCode",
    element: <ActivateAccount />,
  },
]);

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </div>
  );
}

export default App;
