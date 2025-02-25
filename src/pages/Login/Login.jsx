import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { useContext } from "react";
import toast from "react-hot-toast";
import useAxiosPublic from "../../hooks/useAxiosPublic/useAxiosPublic";
import { Loader } from "lucide-react";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { user, setUser, loading, setLoading } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const axiosPublic = useAxiosPublic();

  const onSubmit = async (data) => {
    const { pin, email } = data;
    if (pin.length < 5) {
      return toast.error("PIN number must be 5 digits");
    }

    const userInfo = { email };
    setLoading(true);
    try {
      if (email) {
        await axiosPublic.post("/jwt", userInfo).then(async (res) => {
          if (res.data.token) {
            const resp = await axiosPublic.get(
              `/login?email=${email}&pin=${pin}`
            );

            if (!resp?.data?.success) {
              return toast.error(resp?.data?.message);
            } else {
              localStorage.setItem("token", res.data.token);
              toast.success("Login Successful");
              navigate(from);
            }
          }
        });
      } else {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error, "front-end error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center mt-[10px] md:mt-[30px]">
        <div className="border-2 border-gray-200 rounded-md">
          <div className="md:px-[60px] px-[20px] pb-[10px] md:pb-6">
            <h1 className="text-center text-lg md:text-xl my-4 md:my-6 uppercase">
              Login
            </h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="text-gray-500">Email / Number *</label>
                <br />
                <input
                  type="text"
                  className="md:py-[10px] py-2 mt-2 mb-4 px-3 w-full md:w-[400px] md:px-5 bg-[#f3f4f7] border-[1px]  outline-none rounded-none border-gray-200"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-red-400">
                    This Email / Number field is required
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
              <button
                disabled={loading}
                className={`bg-[#ef4323] text-white text-lg w-full py-[10px] mt-4 ${
                  loading ? "cursor-not-allowed opacity-75" : "cursor-pointer"
                }`}
              >
                {loading ? (
                  <Loader className="animate-spin mx-auto" size={25} />
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <div>
              <h2 className="mt-4 text-gray-500">
                You have no account ?{" "}
                <NavLink
                  to="/register"
                  className="text-[#ef4323] cursor-pointer"
                >
                  Register
                </NavLink>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
