import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import Bg from "../assets/bg.png";
import Pass from "../assets/pass.png";
import User1 from "../assets/user.png";
import Telp from "../assets/telp.png";

import { LoginUser, RegisterUser, reset } from "../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const Login = () => {
  const [openTab, setOpenTab] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setNumberPhone] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, userRegister, isSuccess } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user || isSuccess) {
      //

      navigate("/dashboard");
    }
    // Authorization = "Bearer" + localStorage.getItem("token");
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);
  useEffect(() => {
    if (userRegister || isSuccess) {
      //
      
      navigate("/");
    }
    // Authorization = "Bearer" + localStorage.getItem("token");
    dispatch(reset());
  }, [userRegister, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(LoginUser({ email, password }));
  };
  const Register = (e) => {
    e.preventDefault();
    dispatch(RegisterUser({ email, password, phoneNumber }));
  };

  function togglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }
  return (
    <>
      <div
        className="lg:bg-right lg:h-screen bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url(${Bg})`,
        }}
      >
        <div className="w-full mx-auto p-11 lg:pl-20 lg:pt-20">
          <div className="w-full flex items-center justify-between">
            <Link
              className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="#"
            >
              <img
                src={Logo}
                className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                style={{
                  width: "60px",
                  height: "70px",
                  left: "109px",
                  top: "75px",
                }}
              />
            </Link>
          </div>
        </div>
        {/* <!--Main--> */}
        <div className=" px-11 flex flex-col md:flex-row items-center lg:pl-28 pt-3">
          {/* <!--Left Col--> */}
          <div className="w-full  text-justify  lg:items-start overflow-y-hidden">
            <ul className="flex mb-3 ">
              <li className="w-3/12 pl-5">
                <a
                  href="#"
                  onClick={() => setOpenTab(1)}
                  className={`lg:text-xl text-xl pb-1  text-black font-semibold  ${
                    openTab === 1 ? "border-b-4 border-[#6E205E]" : ""
                  } inline-block px-1 py-2  hover:border-b-4 border-[#6E205E] `}
                >
                  Login
                </a>
              </li>
              <li className="">
                <a
                  href="#"
                  onClick={() => setOpenTab(2)}
                  className={`lg:text-xl  text-xl pb-1  text-black font-semibold ${
                    openTab === 2 ? "border-b-4 border-[#6E205E]" : ""
                  } inline-block px-1 py-2 hover:border-b-4 border-[#6E205E]`}
                >
                  Sign Up
                </a>
              </li>
            </ul>
            <div className={openTab === 1 ? "block" : "hidden"}>
              <form className="lg:w-2/6 fade-in pl-5" onSubmit={Auth}>
                <div className="mb-5">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img
                        src={User1}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="example@gmail.com"
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-90"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img
                        src={Pass}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="********"
                      required
                    />
                  </div>

                  <label className="flex items-center mt-5">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={isPasswordVisible}
                      onChange={togglePasswordVisibility}
                    />
                    <span className="text-sm text-gray-600">Show password</span>
                  </label>
                </div>
                <div className="flex">
                  <div className="mt-6 w-3/4">
                    <Link
                      to={"/forgotPassword"}
                      className="w-full text-sm font-medium  text-black hover:text-[#6E205E]"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <div className="mt-6 ">
                    <button
                      type="submit"
                      className="shadow-lg w-full px-5 py-1  text-white  bg-[#6E205E] rounded-lg hover:bg-[#8f397c] focus:outline-none focus:bg-[#8f397c]"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className={openTab === 2 ? "block" : "hidden"}>
              <form className="lg:w-2/6 fade-in pl-5" onSubmit={Register}>
                <div className="mb-5">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img
                        src={User1}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img
                        src={Telp}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <input
                      type="number"
                      value={phoneNumber}
                      onChange={(e) => setNumberPhone(e.target.value)}
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="website-admin"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <img
                        src={Pass}
                        className="lg:h-auto lg:w-auto bounce-top-icons bg-opacity-100 "
                        style={{
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    </div>
                    <input
                      type={isPasswordVisible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="********"
                      required
                    />
                  </div>
                  <label className="flex items-center mt-5">
                    <input
                      type="checkbox"
                      className="mr-2 w-4 h-4"
                      checked={isPasswordVisible}
                      onChange={togglePasswordVisibility}
                    />
                    <span className="text-sm text-gray-600">Show password</span>
                  </label>
                </div>
                <div className="flex">
                  <div className="w-2/3"></div>
                  <div>
                    <button
                      type="submit"
                      className="shadow-lg w-full px-5 py-1  text-white  bg-[#6E205E] rounded-lg hover:bg-[#8f397c]  focus:bg-[#8f397c]"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* <!--Right Col--> */}
          {/* <div className="lg:pr-20">
          <img
            className="slide-in-bottom  "
            src={Login1}
            style={{ width: "40rem" }}
          />
        </div> */}
        </div>
        <div className={openTab === 1 ? "block" : "hidden"}>
          <div className="pt-8 px-11 text-sm text-center md:text-left fade-in">
            <Link
              className="text-gray-500 pt-10 no-underline hover:no-underline fade-in w-full pb-6 text-sm text-center md:text-left"
              to={"#"}
            >
              © BeetStore 2023
            </Link>
          </div>
        </div>
        <div className={openTab === 2 ? "block" : "hidden"}>
          <div className=" px-11 text-sm text-center md:text-left">
            <Link
              className="text-gray-500 no-underline hover:no-underline w-full pb-6 text-sm text-center md:text-left"
              to={"#"}
            >
              © BeetStore 2023
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;