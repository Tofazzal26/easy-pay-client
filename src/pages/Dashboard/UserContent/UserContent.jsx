import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic/useAxiosPublic";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";
const UserContent = () => {
  const [numberSearch, setNumberSearch] = useState("");
  const [modalNumber, setModalNumber] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  function open(num) {
    setModalNumber(num);
    setIsOpen(true);
  }
  function close() {
    setIsOpen(false);
  }

  const { data: modalTransactionData = [] } = useQuery({
    queryKey: ["modalTransactionData", isOpen],
    queryFn: async () => {
      const resp = await axiosPublic.get(
        `/singleUserTransaction/${modalNumber}`
      );
      return resp?.data;
    },
    enabled: !!modalNumber,
  });

  const axiosPublic = useAxiosPublic();
  const handleSearchNumber = (event) => {
    setNumberSearch(event.target.value);
  };
  const {
    refetch: allUserRefetch,
    isError,
    isLoading,
    data: allUser = [],
  } = useQuery({
    queryKey: ["allUser", numberSearch],
    queryFn: async () => {
      const resp = await axiosPublic.get(`/allUser?number=${numberSearch}`);
      return resp.data;
    },
  });

  const handleUserBlock = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Block It",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await axiosPublic.patch(`/userBlock/${id}`, {
            block: true,
          });
          allUserRefetch();
          Swal.fire({
            title: "Blocked!",
            text: "You blocking the user",
            icon: "success",
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="text-right relative">
        <input
          type="number"
          placeholder="Search by Number"
          className="px-4 py-2 rounded-md outline-none border-gray-400"
          value={numberSearch}
          onChange={handleSearchNumber}
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
              <th className="font-semibold text-[15px] text-black">Role</th>
              <th className="font-semibold text-[15px] text-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.map((item, ind) => (
              <tr key={item?._id}>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {ind + 1}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    <button
                      onClick={() => open(item?.number)}
                      className="cursor-pointer"
                    >
                      {item.name}
                    </button>

                    <Dialog
                      open={isOpen}
                      as="div"
                      className="relative z-10 focus:outline-none"
                      onClose={close}
                    >
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                          <DialogPanel
                            transition
                            className="w-full lg:w-[800px] text-black rounded-xl bg-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
                          >
                            <DialogTitle
                              as="h3"
                              className="text-base/7 font-medium text-center"
                            ></DialogTitle>

                            <div>
                              <div className="overflow-x-auto">
                                <table className="table">
                                  {/* head */}
                                  <thead className="bg-[#ef4323]">
                                    <tr>
                                      <th className="font-semibold text-[15px] text-white">
                                        No
                                      </th>
                                      <th className="font-semibold text-[15px] text-white">
                                        Type
                                      </th>
                                      <th className="font-semibold text-[15px] text-white">
                                        TransactionId
                                      </th>

                                      <th className="font-semibold text-[15px] text-white">
                                        Time
                                      </th>

                                      <th className="font-semibold text-[15px] text-white">
                                        Status
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {modalTransactionData?.map((item, ind) => (
                                      <tr key={item?._id}>
                                        <td>
                                          <h1 className="font-semibold text-[14px] text-gray-600">
                                            {ind + 1}
                                          </h1>
                                        </td>
                                        <td>
                                          <h1 className="font-semibold text-[14px] text-gray-600">
                                            {item.type === "CashIn" ? (
                                              <span className="text-green-600">
                                                {item.type}
                                              </span>
                                            ) : item.type === "CashOut" ? (
                                              <span className="text-red-600">
                                                {item.type}
                                              </span>
                                            ) : (
                                              <span className="text-gray-600">
                                                {item.type}
                                              </span>
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
                                            {
                                              new Date(item.timestamp)
                                                .toISOString()
                                                .split("T")[0]
                                            }
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
                          </DialogPanel>
                        </div>
                      </div>
                    </Dialog>
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item.balance}tk
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item.number}
                  </h1>
                </td>
                <td>
                  <h1 className="font-semibold text-[14px] text-gray-600">
                    {item.role}
                  </h1>
                </td>
                <td>
                  {item.role === "admin" ? (
                    ""
                  ) : item.isBlocked ? (
                    <button className="bg-gray-400 rounded-md px-[8px] cursor-pointer font-semibold py-[6px] text-white">
                      Blocked
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserBlock(item._id)}
                      className="bg-red-400 rounded-md px-[8px] cursor-pointer font-semibold py-[6px] text-white"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserContent;
