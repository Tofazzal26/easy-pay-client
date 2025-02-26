import React, { useContext } from "react";
import { AuthContext } from "./../../AuthProvider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";

const Transaction = () => {
  const { allUserData, user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const { number } = allUserData || {};

  const { isLoading, data: transactionData = [] } = useQuery({
    queryKey: ["transactionData", user],
    queryFn: async () => {
      const resp = await axiosPublic.get(`/transaction/${number}`);
      return resp?.data;
    },
    enabled: !!number,
  });

  return (
    <div className="container mx-auto">
      <h2 className="text-center text-2xl my-2 lg:my-5">
        Transaction: {transactionData?.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#ef4323]">
            <tr>
              <th className="font-semibold text-[15px] text-white">No</th>
              <th className="font-semibold text-[15px] text-white">Type</th>
              <th className="font-semibold text-[15px] text-white">
                TransactionId
              </th>
              <th className="font-semibold text-[15px] text-white">Amount</th>
              <th className="font-semibold text-[15px] text-white">Reciver</th>
              <th className="font-semibold text-[15px] text-white">Time</th>
              <th className="font-semibold text-[15px] text-white">Fee</th>
              <th className="font-semibold text-[15px] text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionData?.map((item, ind) => (
              <tr key={item?._id}>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {ind + 1}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item.type === "CashIn" ? (
                      <span className="text-green-600">{item.type}</span>
                    ) : item.type === "CashOut" ? (
                      <span className="text-red-600">{item.type}</span>
                    ) : (
                      <span className="text-gray-600">{item.type}</span>
                    )}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item.transactionId}
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
                    {new Date(item.timestamp).toISOString().split("T")[0]}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item?.fee ? item?.fee : "0"}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-green-600">
                    {item.status}
                  </h1>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
