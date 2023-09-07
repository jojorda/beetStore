import { Link } from "react-router-dom";
import Ds from "../../assets/dasboard.png";
import { useEffect, useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [merchant, setMerchant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const getMerchant = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/v1/business`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setMerchant(response.data.data);
        setLoading(false);
        // console.log(response);
      } catch (error) {
        if (error.response) {
          setLoading(false);
          // setMsg(error.response.data.msg);
        }
      }
    };
    getMerchant();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="">
        {/* image */}
        <div className="flex justify-center items-center w-screen">
          <img
            src={Ds}
            className="bg-opacity-100"
            style={{
              width: "1000px",
              height: "250px",
              top: "75px",
            }}
          />
        </div>
        {/* close image */}
        {/* search */}
        <div className="lg:pl-52 lg:pr-52 p-6">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block shadow-lg w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-xl focus:border-[#6E205E] focus:ring-[#6E205E] focus:outline-none focus:ring focus:ring-opacity-5"
                placeholder="Search..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center mr-6 pointer-events-none">
                <svg
                  className="w-6 h-6  text-[#6E205E]"
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
              </div>
            </div>
          </form>
        </div>
        {/* close search */}
        {/* main */}
        {merchant.map((item) => (
          <div className=" lg:pl-32 lg:pr-32 " key={item.id}>
            <Link to={`/products/${item.id}`}>
              <div className="bg-white hover:shadow-xl shadow-lg p-5 rounded-lg mb-10">
                <div className="flex">
                  <div className="flex justify-center items-center pt-5">
                    {" "}
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="bg-opacity-100 "
                      style={{
                        width: "170px",
                        height: "110px",
                        top: "75px",
                      }}
                    />
                  </div>
                  <div className="pl-2">
                    <div>
                      <b>{item?.name}</b>
                    </div>
                    <div>{item?.phone_number}</div>
                    <div>{item?.address}</div>
                    {/* <div className="pt-10">
                      Total Transaction <b>8,766</b>
                    </div> */}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* close main */}
      </div>
    </>
  );
};

export default Dashboard;
