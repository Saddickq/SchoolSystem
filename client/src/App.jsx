import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LandingPage, LoginPage, RegisterPage } from "./pages";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
