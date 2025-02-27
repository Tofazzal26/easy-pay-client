import React, { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const UserProfile = () => {
  const [edite, setEdite] = useState(false);
  const [pin, setPin] = useState(false);
  const [newPin, setNewPin] = useState("");
  const { allUserData } = useContext(AuthContext);

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
    _id,
  } = allUserData || {};

  const handleEdit = () => {
    if (pin) {
      setPin(false);
    }
    setEdite(!edite);
  };
  const handlePin = () => {
    if (edite) {
      setEdite(false);
    }
    setPin(!pin);
  };

  const handlePinChange = (event) => {
    event.preventDefault();
    const pin = event.target.pin.value;
    if (pin.length < 5) {
      return toast.error("PIN number must be 5 digits");
    }
    try {
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mt-5 lg:mt-10">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Number of Transactions: 10
        </h2>
        <div className="flex flex-col justify-center p-6 shadow-md rounded-xl">
          <img
            src={image ? { image } : "/profile.png"}
            alt=""
            className="w-32 h-32 mx-auto rounded-full  aspect-square"
          />
          <div className="space-y-4 text-center divide-y">
            <div className="my-2 space-y-1">
              <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>
              <p className="px-5 text-xs sm:text-base text-gray-600">
                +88{number}
              </p>
              <p className="px-5 text-xs sm:text-base text-gray-600">{email}</p>
              <p className="px-5 text-xs sm:text-base text-gray-600">{nid}</p>
              <p className="px-5 text-xs sm:text-base text-gray-600">{role}</p>
              <div className="space-x-2 mt-2">
                <button
                  onClick={handleEdit}
                  className="bg-red-100 px-4 py-2 rounded-md cursor-pointer"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handlePin}
                  className="bg-red-100 px-4 py-2 rounded-md cursor-pointer"
                >
                  Change PIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className={`shadow-lg bg-white p-5 lg:p-10 rounded-lg mt-3 lg:mt-6 ${
            edite ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold text-center">Edit Profile</h2>

          <fieldset className="w-full space-y-1 dark:text-gray-800">
            <label htmlFor="files" className="block text-sm font-medium">
              Choose Photo
            </label>
            <div className="flex">
              <input
                type="file"
                id="files"
                className="px-8 py-8 border-2 border-dashed rounded-md dark:border-gray-300 dark:text-gray-600 dark:bg-gray-50 font-semibold w-full mb-4"
              />
            </div>
          </fieldset>
          <div>
            <label htmlFor="name">Name</label>
            <br />
            <input
              type="text"
              name="name"
              placeholder="Name here"
              className="outline-none border-[1px] border-gray-300 rounded-md w-full px-4 py-2 mb-4 mt-1"
            />
          </div>
          <div>
            <label htmlFor="name">Email</label>
            <br />
            <input
              type="email"
              name="email"
              placeholder="Email here"
              className="outline-none border-[1px] border-gray-300 rounded-md w-full px-4 py-2 mt-1"
            />
          </div>
          <button
            className="bg-[#ef4323] w-full text-white py-2 font-semibold mt-4 cursor-pointer rounded-md
            "
          >
            Change
          </button>
        </div>
        <div
          className={`shadow-lg bg-white p-5 lg:p-10 rounded-lg mt-3 lg:mt-6 ${
            pin ? "block" : "hidden"
          }`}
        >
          <h2 className="text-lg font-semibold text-center">Change Pin</h2>

          <form onSubmit={handlePinChange}>
            <div>
              <label htmlFor="name">New Pin</label>
              <br />
              <input
                type="number"
                name="pin"
                placeholder="Name here"
                className="outline-none border-[1px] border-gray-300 rounded-md w-full px-4 py-2 mb-4 mt-1"
              />
            </div>
            <button
              className="bg-[#ef4323] w-full text-white py-2 font-semibold mt-4 cursor-pointer rounded-md
            "
            >
              Change
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
