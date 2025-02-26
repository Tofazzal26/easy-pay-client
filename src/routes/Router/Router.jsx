import { createBrowserRouter } from "react-router";
import Root from "../../pages/Root/Root";
import Home from "../../pages/Home/Home";
import NotFound from "../../components/NotFound/NotFound";
import UserProfile from "../../pages/UserProfile/UserProfile";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import PrivateRoute from "../../pages/PrivateRoute/PrivateRoute";
import Dashboard from "../../pages/Dashboard/Dashboard";
import AdminPrivateRoute from "../../pages/AdminPrivateRoute/AdminPrivateRoute";
import SendMoney from "../../pages/SendMoney/SendMoney";
import CashOut from "../../pages/CashOut/CashOut";
import CashIn from "../../pages/CashIn/CashIn";
import Transaction from "../../pages/Transaction/Transaction";
import AgentPrivateRoute from "../../pages/AgentPrivateRoute/AgentPrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/sendMoney",
        element: (
          <PrivateRoute>
            <SendMoney />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashOut",
        element: (
          <PrivateRoute>
            <CashOut />
          </PrivateRoute>
        ),
      },
      {
        path: "/cashIn",
        element: (
          <AgentPrivateRoute>
            <CashIn />
          </AgentPrivateRoute>
        ),
      },
      {
        path: "/transaction",
        element: (
          <PrivateRoute>
            <Transaction />
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard",
        element: (
          <AdminPrivateRoute>
            <Dashboard />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
]);

export default Router;
