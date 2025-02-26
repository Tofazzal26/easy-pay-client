import { Send, Wallet, Download, List, PlusCircle } from "lucide-react";
import { useContext } from "react";
import { NavLink } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Home = () => {
  const { headerUserData } = useContext(AuthContext);
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

  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-lg font-semibold my-2 lg:my-4 text-gray-600">
          Service
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4">
          <NavLink to="/sendMoney">
            <div className="bg-[#ef4323] rounded-2xl text-white cursor-pointer">
              <div className="flex justify-center items-center flex-col py-5 lg:py-10">
                <Send size={40} />
                <h2 className="text-lg lg:text-2xl mt-2">Send Money</h2>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/cashIn"
            className={role === "agent" ? "block" : "hidden"}
          >
            <div className="bg-[#ef4323] rounded-2xl text-white cursor-pointer">
              <div className="flex justify-center items-center flex-col py-5 lg:py-10">
                <Wallet size={40} />
                <h2 className="text-lg lg:text-2xl mt-2">Cash In</h2>
              </div>
            </div>
          </NavLink>
          <NavLink to="cashOut">
            <div className="bg-[#ef4323] rounded-2xl text-white cursor-pointer">
              <div className="flex justify-center items-center flex-col py-5 lg:py-10">
                <Download size={40} />
                <h2 className="text-lg lg:text-2xl mt-2">Cash Out</h2>
              </div>
            </div>
          </NavLink>
          <NavLink
            to="/addMoney"
            className={role === "agent" ? "block" : "hidden"}
          >
            <div className="bg-[#ef4323] rounded-2xl text-white cursor-pointer">
              <div className="flex justify-center items-center flex-col py-5 lg:py-10">
                <PlusCircle size={40} />
                <h2 className="text-lg lg:text-2xl mt-2">Add Money</h2>
              </div>
            </div>
          </NavLink>
        </div>
        <div className="mt-[50px] lg:mt-[150px]">
          <h2 className="text-lg font-semibold text-gray-600">Others</h2>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2 gap-4 lg:mt-4 mt-2">
          <div className="bg-[#ef4323] rounded-2xl text-white cursor-pointer">
            <div className="flex justify-center items-center flex-col py-5 lg:py-10">
              <List size={40} />
              <h2 className="text-lg lg:text-2xl mt-2">Transaction</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
