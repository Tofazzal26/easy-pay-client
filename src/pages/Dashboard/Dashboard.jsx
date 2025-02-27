import { useState } from "react";
import { Users, CreditCard, Briefcase } from "lucide-react";
import UserContent from "./UserContent/UserContent";
import AgentContent from "./AgentContent/AgentContent";
import TransactionContent from "./TransactionContent/TransactionContent";
const menuItems = [
  { name: "All Users", icon: <Users size={20} />, key: "Users" },
  { name: "Agents Request", icon: <Briefcase size={20} />, key: "Agents" },
  { name: "Transactions", icon: <CreditCard size={20} />, key: "Transactions" },
];
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Users");
  return (
    <div className="flex lg:flex-row flex-col h-screen">
      <div className="lg:w-64 bg-gray-900 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.key}
              className={`flex items-center gap-2 p-2 w-full text-left rounded-lg transition-all hover:bg-gray-700 ${
                activeTab === item.key ? "bg-[#ef4323]" : ""
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              {item.icon}
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-semibold">{activeTab}</h1>
        <div className="mt-4 p-4 rounded-lg shadow-md">
          {activeTab === "Users" && <UserContent />}
          {activeTab === "Transactions" && <TransactionContent />}
          {activeTab === "Agents" && <AgentContent />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
