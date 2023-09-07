import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import Bg from "../assets/bg.png";
import User1 from "../assets/user.png";

const FogotPassword = () => {
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
              to={"/"}
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
        <div className=" px-11 flex flex-col md:flex-row items-center lg:pl-28 pt-6">
          {/* <!--Left Col--> */}
          <div className="w-full text-justify  lg:items-start overflow-y-hidden">
            <ul className="flex mb-4 ">
              <li className="pl-5">
                <a
                  href="#"
                  className="lg:text-xl text-xl pb-1  text-black font-semibold border-b-4 inline-block px-1 py-2  hover:border-b-4 border-[#6E205E]"
                >
                  Forgot Password
                </a>
              </li>
            </ul>

            <form className="lg:w-2/6 fade-in pl-5">
              <div className="mb-5">
                <label
                  htmlFor="website-admin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email Address
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
                      type="text"
                      className="block shadow-xl rounded-xl border w-full p-2.5 pl-10 text-sm text-gray-900 flex-1 min-w-0  focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                      placeholder="Email"
                      required
                    />
                  </div>
              </div>

              <div className="mt-10 ">
                <button
                  type="submit"
                  className="shadow-lg w-full px-5 py-2  text-white  bg-[#6E205E] rounded-lg hover:bg-[#8f397c] focus:outline-none focus:bg-[#8f397c]"
                >
                  Send Password Link
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="pt-36 px-11 text-sm text-center md:text-left fade-in">
          <Link
            className="text-gray-500 pt-10 no-underline hover:no-underline fade-in w-full pb-6 text-sm text-center md:text-left"
            to={"#"}
          >
            © BeetStore 2023
          </Link>
        </div>
      </div>
    </>
  );
};

export default FogotPassword;
