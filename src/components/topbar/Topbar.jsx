import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const Topbar = () => {
  const [isopen, setisOpen] = useState(false);

  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      text: "Anda Berhasil Logout",
    });
    navigate("/");
  };
  // useEffect(() => {
  //   getUsers();
  // }, []);
  return (
    <>
      <div>
        <div className="bg-[#6E205E] shadow-md">
          <div className="flex">
            <ul className=" text-xl p-3 ml-3 text-white">
              <li className="relative">
                <a
                  className="px-3 flex text-sm rounded-full focus:outline-none"
                  id="user-menu-button"
                  onClick={() => setisOpen(!isopen)}
                >
                  <FaRegUserCircle />
                  <div className="relative cursor-pointer">
                    <div>{/* <UserPicture /> */}</div>
                    {/* <img className="h-10 w-10 rounded-full border border-gray-300 bg-gray-700" /> */}
                    <span
                      title="online"
                      className="flex justify-center absolute -bottom-0.5 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-3 h-3 rounded-full"
                    ></span>
                  </div>
                  {/* {users.map((item) => (
                    <span
                      className="hidden md:block ml-1 mr-1 self-center cursor-pointer"
                      key={item._id}
                    >
                      {" "}
                      {item.name}
                    </span>
                  ))} */}
                </a>
                {isopen ? (
                  <div className="absolute z-10 w-40 mt-4 origin-top-left bg-white border border-gray-100 rounded-md shadow-lg">
                    <div className="p-2 items-center">
                      <Link
                        // to={`/profile/${item._id}`}
                        className="flex w-full mt-1 px-4 py-2 text-gray-500 rounded-lg hover:bg-[#6E205E] hover:text-gray-50"
                      >
                        {/* <i className="fa-solid fa-user text-lg m-1"></i> */}
                        <span className="pt-2 pl-1 text-lg"> Profile</span>
                      </Link>

                      <button
                        type="button"
                        onClick={logout}
                        className="flex w-full text-lg  px-4 py-2 text-gray-500 rounded-lg hover:bg-[#6E205E] hover:text-gray-50"
                      >
                        {/* <CgLogOut className="text-xl m-1" /> */}
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul>

            <div className="text-xl p-3 text-white fixed mr-3 right-0">
              <FaShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
