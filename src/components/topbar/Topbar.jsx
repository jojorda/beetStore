import { Link, useNavigate, useParams } from "react-router-dom";
import { FaDollarSign, FaRegUserCircle, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Bs from "../../assets/bs.png";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    Swal.fire({
      icon: "success",
      text: "Anda Berhasil Logout.",
      confirmButtonColor: "#6E205E",
      confirmButtonText: "Yes!",
    });
    navigate("/");
  };
  // useEffect(() => {
  //   getUsers();
  // }, []);
  return (
    <>
      <div>
        <nav className="bg-white shadow-md fixed w-full z-50 max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:block flex items-center justify-between h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 text-white">
                {" "}
                <img src={Bs} className="bg-transparent lg:w-40 w-32" />
              </div>
              <div className="w-full lg:pr-10">
                {" "}
                <form className="lg:pt-3 pt-2 pl-3 lg:pl-10">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-6 h-6  text-[#6E205E] text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      {/* <img
                        src={"/"}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      /> */}
                    </div>
                    <input
                      type="text"
                      className="block rounded-xl w-full border p-2.5 pl-10 text-sm text-gray-900 focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </div>

              <div className="p-5 pt-8 text-2xl hidden md:block">
                <FaShoppingCart />
              </div>
              <div className="p-5 pt-6 text-gray-400 text-2xl hidden md:block">
                |
              </div>
              <div className=" md:flex hidden">
                <div>
                  <button
                    type="button"
                    className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-[#6E205E] hover:bg-gray-100 hover:text-[#6E205E] focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >
                    Login
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white bg-[#6E205E] rounded-xl hover:bg-[#77376a] hover:text-gray-50"
                  >
                    Register
                  </button>
                </div>
              </div>
              {/* <ul className=" text-xl p-3 ml-3">
              <li className="relative">
                <a
                  className="px-3 flex text-2xl cursor-pointer rounded-full focus:outline-none"
                  id="user-menu-button"
                  onClick={() => setisOpen(!isopen)}
                >
                  <FaRegUserCircle />
                  <div className="relative cursor-pointer">
                    <span
                      title="online"
                      className="justify-center absolute -bottom-0 ltr:right-1 rtl:left-1 text-center bg-green-500 border border-white w-2 h-2 rounded-full"
                    ></span>
                  </div>
              
                </a>

                {isopen ? (
                  <div className="absolute z-10 w-40 mt-4 origin-top-left bg-white border border-gray-100 rounded-md shadow-lg">
                    <div className="p-2 items-center">
                      {user.map((item) => (
                        <Link
                          to={`/profile/${item._id}`}
                          className="flex w-full mt-1 px-4 py-2 text-gray-500 rounded-lg hover:bg-[#6E205E] hover:text-gray-50"
                          key={item.id}
                        >
                          <i className="fa-solid fa-user text-lg m-1"></i>
                          <span className="pl-1 text-lg"> Profile</span>
                        </Link>
                      ))}
                      <button
                        type="button"
                        onClick={logout}
                        className="flex w-full text-lg  px-4 py-2 text-gray-500 rounded-lg hover:bg-[#6E205E] hover:text-gray-50"
                      >
                      
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </li>
            </ul> */}

              {/* <div className="text-xl p-3  fixed mr-3 right-0">
              <FaShoppingCart />
            </div> */}
            </div>
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-500 hover:text-[#6E205E] focus:outline-none focus:text-[#6E205E]"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link className="text-gray-600  hover:bg-[#6E205E] hover:text-white flex px-3 py-2 rounded-md text-base font-medium">
                  <div className="mt-1">
                    <FaShoppingCart />
                  </div>{" "}
                  <div className="pl-2">Keranjang</div>
                </Link>
               
                <div className="right-0">
                  <div className="flex md:hidden ">
                    <div className="right-0">
                      <button
                        type="button"
                        className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-xl border border-[#6E205E] hover:bg-gray-100 hover:text-[#6E205E] focus:z-10 focus:ring-4 focus:ring-gray-200"
                      >
                        Login
                      </button>
                    </div>
                    <div>
                      <button
                        type="button"
                        className="mt-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-white bg-[#6E205E] rounded-xl hover:bg-[#77376a] hover:text-gray-50"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default Topbar;
