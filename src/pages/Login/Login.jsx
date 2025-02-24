import { useForm } from "react-hook-form";
import { NavLink } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
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
                  {...register("emailNumber", { required: true })}
                />
                <br />
                {errors.emailNumber && (
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
              <button className="bg-[#ef4323] text-white text-lg w-full py-[10px] mt-4 cursor-pointer">
                Login
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
