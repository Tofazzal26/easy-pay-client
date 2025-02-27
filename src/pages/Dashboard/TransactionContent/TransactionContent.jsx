import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";

const TransactionContent = () => {
  const axiosPublic = useAxiosPublic();

  const { data: allTransaction = [] } = useQuery({
    queryKey: ["allTransaction"],
    queryFn: async () => {
      const resp = await axiosPublic.get("/allTransaction");
      return resp.data;
    },
  });

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th className="font-semibold text-[15px] text-black">No</th>
            <th className="font-semibold text-[15px] text-black">Status</th>
            <th className="font-semibold text-[15px] text-black">Balance</th>
            <th className="font-semibold text-[15px] text-black">Phone</th>
            <th className="font-semibold text-[15px] text-black">TXN-ID</th>
            <th className="font-semibold text-[15px] text-black">Type</th>
          </tr>
        </thead>
        <tbody>
          {allTransaction?.map((item, ind) => (
            <tr key={item._id}>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {ind + 1}
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.status}
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.amountSend}tk
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.receiverId}
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.transactionId}
                </h1>
              </td>

              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.type}
                </h1>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionContent;
