import { createBrowserRouter } from "react-router";
import Root from "../../pages/Root/Root";
import Home from "../../pages/Home/Home";
import NotFound from "../../components/NotFound/NotFound";
import UserProfile from "../../pages/UserProfile/UserProfile";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);

export default Router;
