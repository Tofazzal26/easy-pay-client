import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Bell } from "lucide-react";

const Header = () => {
  const [showBalance, setShowBalance] = useState(true);
  const location = useLocation();
  const { allUserData, headerUserData } = useContext(AuthContext);
  const {
    balance,
    email,
    image,
    isBlocked,
    name,
    nid,
    number,
    role,
    transaction,
    notification,
  } = headerUserData || {};

  const handleBalance = () => {
    setShowBalance(false);
    setTimeout(() => {
      setShowBalance(true);
    }, 5000);
  };

  const handleLogOut = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <div
      className={
        location.pathname === "/login" || location.pathname === "/register"
          ? "hidden"
          : ""
      }
    >
      <div className="shadow-md">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <ul className="menu menu-vertical px-1">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sendMoney"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Send-Money
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cashIn"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Cash-In
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cashOut"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Cash-Out
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/transaction"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Transaction
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/balance"
                      className={({ isActive }) =>
                        isActive ? "text-base text-[#ef4323]" : "text-base"
                      }
                    >
                      Balance
                    </NavLink>
                  </li>
                </ul>
              </ul>
            </div>
            <NavLink
              to="/"
              className="btn btn-ghost text-[16px] lg:text-[22px] hidden lg:flex"
            >
              {" "}
              <img src="/logo.png" alt="logo" className="w-[40px] h-[40px]" />
              Easy-Pay
            </NavLink>
          </div>
          <div className="navbar-center justify-center">
            <div>
              <button
                onClick={handleBalance}
                className={`font-semibold flex items-center gap-2 bg-[#ef4323] px-4 py-1 text-white rounded-full cursor-pointer`}
              >
                <img src="/logo.png" alt="logo" className="w-[20px] h-[20px]" />{" "}
                {showBalance
                  ? "Tap for Balance"
                  : `${parseFloat(balance).toFixed(2)} Tk`}
              </button>
            </div>
          </div>
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="cursor-pointer relative"
              >
                <div className="w-10 rounded-full ">
                  <Bell />
                </div>
                <div className="w-[20px] h-[20px] bg-[#ef4323] left-[8px] top-[-8px] rounded-full text-white absolute font-semibold flex justify-center items-center">
                  {notification?.length}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-[200px] lg:w-[300px] p-2 shadow"
              >
                {notification?.map((item, ind) => (
                  <li key={ind}>
                    <a className="text-sm lg:text-base border-t-[1px] border-gray-200">
                      {item?.msg}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    src="/profile.png"
                    alt="userImage"
                    className="w-[40px] h-[40px]"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>{name}</a>
                </li>
                <li>
                  <a>{email}</a>
                </li>
                <li>
                  {role === "user" ? (
                    <NavLink to="/profile"> My Account</NavLink>
                  ) : role === "admin" ? (
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  ) : (
                    <NavLink to="/profile"> My Account</NavLink>
                  )}
                </li>
                <li>
                  <button onClick={handleLogOut} className="text-red-500">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
