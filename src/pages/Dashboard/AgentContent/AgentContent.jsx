import React from "react";

const AgentContent = () => {
  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="font-semibold text-[15px] text-black">No</th>
            <th className="font-semibold text-[15px] text-black">Name</th>
            <th className="font-semibold text-[15px] text-black">Balance</th>
            <th className="font-semibold text-[15px] text-black">Phone</th>
            <th className="font-semibold text-[15px] text-black">
              Agent Permission
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <h1 className="font-semibold text-[14px] text-gray-600">0</h1>
            </td>
            <td>
              <h1 className="font-semibold text-[14px] text-gray-600">Abir</h1>
            </td>
            <td>
              <h1 className="font-semibold text-[14px] text-gray-600">00</h1>
            </td>
            <td>
              <h1 className="font-semibold text-[14px] text-gray-600">
                +880324242432
              </h1>
            </td>

            <td className="flex items-center gap-2 lg:gap-4">
              <button class="bg-red-400 cursor-pointer rounded-md px-[8px] font-semibold py-[6px] text-white">
                Block
              </button>
              <button class="bg-blue-400 cursor-pointer rounded-md px-[8px] font-semibold py-[6px] text-white">
                Accept
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AgentContent;
