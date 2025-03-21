import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "./../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { useLocation, useNavigate } from "react-router";
import { Loader } from "lucide-react";
const SendMoney = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { allUserData, headerRefetch, loading, setLoading } =
    useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

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
  } = allUserData || {};

  const onSubmit = async (data) => {
    const { pin, sendNumber, amount } = data;
    let tranFee = 0;
    if (amount >= 100) {
      tranFee = 5;
    }
    if (parseFloat(amount) < 50) {
      return toast.error("Must send more than 50 taka");
    }
    if (parseFloat(balance) < parseFloat(amount) + parseFloat(tranFee)) {
      return toast.error("You have no enough money and fee");
    }

    const sendMoneyTransaction = {
      transactionId:
        "TXN-" + Date.now() + "-" + Math.floor(1000 + Math.random() * 9000),
      type: "SendMoney",
      amountSend: amount,
      senderId: number,
      receiverId: sendNumber,
      fee: tranFee,
      timestamp: Date.now() + 6 * 60 * 60 * 1000,
      status: "Success",
      pin,
    };
    setLoading(true);
    try {
      const resp = await axiosPublic.post("/sendMoney", sendMoneyTransaction);
      if (!resp?.data?.success) {
        return toast.error(resp?.data?.message);
      }
      headerRefetch();
      toast.success(resp?.data?.message);
      navigate(from);
    } catch (error) {
      // console.log(error, "front-end error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mx-auto">
      <div>
        <h2 className="text-center text-2xl my-5 lg:my-10">Send Money</h2>
        <div className="flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="font-semibold">
            <div>
              <label htmlFor="name">Recipient</label>
              <br />
              <input
                type="number"
                placeholder="Phone number"
                className="px-4 py-2 outline-none border-gray-400 my-2 rounded-sm w-full lg:w-[400px] text-gray-600"
                {...register("sendNumber", { required: true })}
              />
              <br />
              {errors.sendNumber && (
                <span className="text-red-400">This Number is required</span>
              )}
            </div>
            <div>
              <label htmlFor="name">Amount</label>
              <br />
              <input
                type="number"
                placeholder="Amount"
                className="px-4 py-2 outline-none border-gray-400 my-2 rounded-sm w-full lg:w-[400px] text-gray-600"
                {...register("amount", { required: true })}
              />
              <br />
              {errors.amount && (
                <span className="text-red-400">This Amount is required</span>
              )}
            </div>
            <div>
              <label htmlFor="name">Pin</label>
              <br />
              <input
                type="number"
                placeholder="Pin"
                className="px-4 py-2 outline-none border-gray-400 mt-2 rounded-sm w-full lg:w-[400px] text-gray-600"
                {...register("pin", { required: true })}
              />
              <br />
              {errors.pin && (
                <span className="text-red-400">This Pin is required</span>
              )}
            </div>
            <button
              disabled={loading}
              className={`bg-[#ef4323] text-white text-base rounded-sm w-full py-[10px] mt-4 ${
                loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
              }`}
            >
              {loading ? (
                <Loader className="animate-spin mx-auto" size={25} />
              ) : (
                "Send Money"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SendMoney;
