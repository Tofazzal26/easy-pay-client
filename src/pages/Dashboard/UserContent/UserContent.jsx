import { Search } from "lucide-react";
import React from "react";

const UserContent = () => {
  return (
    <div>
      <div className="text-right relative">
        <input
          type="number"
          placeholder="Search by Number"
          className="px-4 py-2 rounded-md outline-none border-gray-400"
        />
        <div className="absolute top-[10px] right-[10px]">
          <Search className="text-gray-400" size={22} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th className="font-semibold text-[15px] text-black">No</th>
              <th className="font-semibold text-[15px] text-black">Name</th>
              <th className="font-semibold text-[15px] text-black">Balance</th>
              <th className="font-semibold text-[15px] text-black">Phone</th>
              <th className="font-semibold text-[15px] text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">0</h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  Abir
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">00</h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  +880324242432
                </h1>
              </td>
              <td>
                <button className="bg-red-400 rounded-md px-[8px] font-semibold py-[6px] text-white">
                  Block
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserContent;
