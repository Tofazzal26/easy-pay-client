import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./../../../hooks/useAxiosPublic/useAxiosPublic";
import Swal from "sweetalert2";
const AgentContent = () => {
  const axiosPublic = useAxiosPublic();

  const { refetch: AgentRetch, data: AgentData = [] } = useQuery({
    queryKey: ["AgentData"],
    queryFn: async () => {
      const resp = await axiosPublic.get("/allAgent");
      return resp.data;
    },
  });

  const handleReject = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Reject",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await axiosPublic.patch(`/agentReject/${id}`, {
            newNotification: { msg: "Admin rejected you! no bonus money." },
          });
          AgentRetch();
          Swal.fire({
            title: "Rejected!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

  const handleAccept = async (id) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be Accept it",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Acccept it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await axiosPublic.patch(`/agentAccept/${id}`, {
            newNotification: { msg: "You revcieve 100000tk from Admin" },
          });
          AgentRetch();

          Swal.fire({
            title: "Accepted!",
            text: "Your file has been Accept.",
            icon: "success",
          });
        }
      });
    } catch (error) {
      // console.log(error);
    }
  };

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
            <th className="font-semibold text-[15px] text-black">NID</th>
            <th className="font-semibold text-[15px] text-black">
              Agent Balance
            </th>
          </tr>
        </thead>
        <tbody>
          {AgentData?.map((item, ind) => (
            <tr key={item._id}>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {ind + 1}
                </h1>
              </td>
              <td>
                <h1 className="font-semibold text-[14px] text-gray-600">
                  {item.name}
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
                  {item.nid}
                </h1>
              </td>

              <td className="flex items-center gap-2 lg:gap-4">
                {item.ant === "yes" ? (
                  ""
                ) : (
                  <>
                    <button
                      onClick={() => handleReject(item._id)}
                      className="bg-red-400 cursor-pointer rounded-md px-[8px] font-semibold py-[6px] text-white"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleAccept(item._id)}
                      className="bg-blue-400 cursor-pointer rounded-md px-[8px] font-semibold py-[6px] text-white"
                    >
                      Accept
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentContent;
