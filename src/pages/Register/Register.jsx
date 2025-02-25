import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import useAxiosPublic from "./../../hooks/useAxiosPublic/useAxiosPublic";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { Loader } from "lucide-react";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async (data) => {
    const { name, email, number, pin, nid, userType } = data;

    if (nid.length !== 10) {
      return toast.error("NID number must be 10 digits");
    }
    if (pin.length < 5) {
      return toast.error("PIN number must be 5 digits");
    }
    if (number.length < 10) {
      return toast.error(" Number must be 10 digits");
    }
    const userInfo = { email };
    const userAllData = {
      name,
      email,
      number,
      nid,
      pin,
      image: "",
      role: userType,
      balance: userType === "user" ? "40" : "0",
      isBlocked: false,
      notification: [
        {
          msg:
            userType === "user"
              ? "You have bonus of 40 taka"
              : "Wait For Admin Approval",
        },
        {
          msg: "Thank you for registering our app.",
        },
      ],
      ant: userType === "agent" ? "no" : "none",
    };
    setLoading(true);
    try {
      if (email) {
        await axiosPublic.post("/jwt", userInfo).then(async (res) => {
          if (res.data.token) {
            const resp = await axiosPublic.post("/user", userAllData);
            if (resp?.data?.success) {
              return toast.error(resp?.data?.message);
            } else {
              localStorage.setItem("token", res.data.token);
              setTimeout(() => {
                window.location.reload();
              }, 500);
              toast.success("Login Successful");
              navigate(from);
            }
          }
        });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div>
        <div className="flex justify-center items-center mt-[10px] md:mt-[30px]">
          <div className="border-2 border-gray-200 rounded-md">
            <div className="md:px-[60px] px-[20px] pb-[10px] md:pb-6">
              <h1 className="text-center text-lg md:text-xl my-4 md:my-6 uppercase">
                Register
              </h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <label className="text-gray-500">Name *</label>
                  <br />
                  <input
                    type="text"
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                    {...register("name", { required: true })}
                  />
                  <br />
                  {errors.name && (
                    <span className="text-red-400">
                      This Name field is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-gray-500">Email *</label>
                  <br />
                  <input
                    type="text"
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                    {...register("email", { required: true })}
                  />
                  <br />
                  {errors.email && (
                    <span className="text-red-400">
                      This Email field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-gray-500">Number *</label>
                  <br />
                  <input
                    type="number"
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                    {...register("number", { required: true })}
                  />
                  <br />
                  {errors.number && (
                    <span className="text-red-400">
                      This Number field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-gray-500">Pin *</label>
                  <br />
                  <input
                    type="number"
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                    {...register("pin", { required: true })}
                  />
                  <br />
                  {errors.pin && (
                    <span className="text-red-400">
                      This Pin field is required
                    </span>
                  )}
                </div>
                <div>
                  <label className="text-gray-500">NID *</label>
                  <br />
                  <input
                    type="number"
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                    {...register("nid", { required: true })}
                  />
                  <br />
                  {errors.nid && (
                    <span className="text-red-400">
                      This NID field is required
                    </span>
                  )}
                </div>

                <div>
                  <label className="text-gray-500">Account Type *</label>
                  <br />
                  <select
                    {...register("userType", { required: true })}
                    className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                  >
                    <option value="user">User</option>
                    <option value="agent">Agent</option>
                  </select>
                </div>

                <button
                  disabled={loading}
                  className={`bg-[#ef4323] text-white text-lg w-full py-[10px] mt-4 ${
                    loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                  }`}
                >
                  {loading ? (
                    <Loader className="animate-spin mx-auto" size={25} />
                  ) : (
                    "Register"
                  )}
                </button>
              </form>
              <div>
                <h2 className="mt-4 text-gray-500">
                  Already have an account ?{" "}
                  <NavLink
                    to="/login"
                    className="text-[#ef4323] cursor-pointer"
                  >
                    Login
                  </NavLink>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
