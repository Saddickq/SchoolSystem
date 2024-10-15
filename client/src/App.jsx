import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import RegisterPage from "./pages/Auth/RegisterPage.jsx";
import Admin from "./pages/Admin";
import LandingPage from "./pages/LandingPage.jsx";
import Login from "./pages/Auth/LoginPage.jsx";
import { userContext, UserContextProvider } from "./utils/context.jsx";
import ActivateAccount from "./pages/Admin/ActivateAccount.jsx";
import LecturerDashbord from "./pages/Lecturer/index.jsx";
import StudentDashboard from "./pages/Student/index.jsx";
import { useContext } from "react";

const ProtectedRoute = ({ children, requiredRole }) => {
    const { user } = useContext(userContext);
    const isAuthenticated = !!user;
    const hasRequiredRole = user?.role === requiredRole;
  
    return isAuthenticated && hasRequiredRole ? children : <Navigate to="/login" />;
  };

  const GuestRoute = ({ children }) => {
    const { user } = useContext(userContext);
    const isAuthenticated = !!user;
    return isAuthenticated ? <Navigate to="/" /> : children;
  };

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
    element: (
      <ProtectedRoute requiredRole='admin'>
        <Admin />
      </ProtectedRoute>
    ),
  },
  {
    path: "/lecturer-dashboard",
    element: (
      <ProtectedRoute requiredRole='lecturer'>
        <LecturerDashbord />
      </ProtectedRoute>
    ),
  },
  {
    path: "/student-dashboard",
    element: (
      <ProtectedRoute requiredRole='student'>
        <StudentDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activate-account/:invitationCode",
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
