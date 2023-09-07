import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductList = () => {
  const [product, setProduct] = useState([]);

  const { id } = useParams();
  // console.log(id)

  useEffect(() => {
    const getData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/v1/product/beetstore?business_id=${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(dataBusiness);
        setProduct(response.data.data)
        console.log(response.data.data);
        // console.log(dataOutlet);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message)
          // setMsg(error.response.data.msg);
        }
      }
    };
    getData();
  }, [id]);
  return (
    <>
      <div>
        {/* search */}
        <div className=" lg:pl-52 lg:pr-52 p-6">
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

        {/* kategori list */}
        <div className="lg:pl-32 lg:pr-32 flex ">
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="text-white border rounded-3xl p-2 pl-8 pr-8 bg-[#6E205E]">
                all
              </div>
            </Link>
          </div>
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className="flex-nowrap mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
        </div>
        {/* close kategori list */}

        {/* products list */}
        <div className="lg:pl-32 lg:pr-24 pt-14 flex flex-wrap w-full ">
        {product.map((item) => (
          <div className="w-64 mr-5 mb-5 bg-white border border-[#6E205E] rounded-lg shadow " key={item.id}>
            <Link
              to={`/products/detail/${item.id}`}
              className="flex justify-center items-center"
            >
              <img src={item?.image} className="bg-opacity-100 rounded-t-lg" />
            </Link>
            <div className="p-3">
              <Link to={`/products/detail/${item.id}`}>
                <div className="mb-2 text-xl font-bold tracking-tight text-gray-900">
                  {item.name}
                </div>
              </Link>
              <div className="flex">
                <p className="mb-3 p-1 pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200 flex">
                  {item?.Product_Category?.name}
                </p>
              </div>

              <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[#F20000]">
                Rp {item.price}
              </div>
            </div>
          </div>
           ))}
        </div>
        {/* close products list */}
      </div>
    </>
  );
};

export default ProductList;
