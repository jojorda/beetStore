import { useState } from "react";
import Ms from "../../assets/Ms.png";

const ProductDetail = () => {
  const [number, setNumber] = useState(0);

  const numberFront = () => setNumber(number + 1);
  const numberBack = () => setNumber(number - 1);

  return (
    <>
      <div className="p-12 mt-10">
        {/* detail products */}
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="border flex-wrap border-[#6E205E] rounded-lg">
            <img
              src={Ms}
              className="bg-opacity-100"
              style={{
                width: "290px",
                height: "260px",
              }}
            />
          </div>
          <div className="lg:pl-10 lg:pr-20 flex-wrap">
            <div className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              Mushroom Seasoning Powder 100gr
            </div>
            <div className="flex">
              <div className="mb-3 p-1 pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200">
                Bumbu Kering
              </div>
            </div>

            <div className="inline-flex items-center py-2 text-2xl font-medium text-center text-[#F20000]">
              Rp 15.000
            </div>
            <div className="font-semibold mb-2">Description :</div>
            <div className="">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an{" "}
            </div>
          </div>
        </div>
        {/* close detail products */}
        {/* notes */}
        <div className="pt-10">
          <label
            htmlFor="message"
            className="block mb-2 text-sm uppercase font-medium text-gray-900 "
          >
            Notes (optional)
          </label>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-gray-900 bg-gray-50 rounded-lg border border-[#6E205E]  focus:border-[#8a397a] focus:ring-[#8a397a] focus:outline-none focus:ring focus:ring-opacity-5"
            placeholder=". . ."
          ></textarea>
        </div>
        {/* close notes */}

        <div className="flex mt-3">
          <div className="lg:w-5/6 lg:flex">
            {" "}
            <div className="bg-[#6E205E] rounded-xl flex items-center justify-between py-2 mr-4 ">
              <button
                className="px-4 pl-5 cursor-pointer hover:opacity-70 duration-500 disabled:opacity-80 disabled:hover:cursor-default"
                disabled={number === 0}
                onClick={() => numberBack()}
              >
                <svg
                  className="w-2 h-1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z"
                      id="a"
                    />
                  </defs>
                  <use fill="#FFFFFF" fillRule="nonzero" xlinkHref="#a" />
                </svg>
              </button>

              <p className="font-bold text-white pl-4 pr-4">{number}</p>

              <button
                className="px-5 hover:opacity-70 cursor-pointer duration-500"
                onClick={() => numberFront()}
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                >
                  <defs>
                    <path
                      d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z"
                      id="b"
                    />
                  </defs>
                  <use fill="#FFFFFF" fillRule="nonzero" xlinkHref="#b" />
                </svg>
              </button>
            </div>
          </div>

          <div className="bg-[#6E205E] rounded-xl flex justify-end ml-12">
            <div className="text-white font-semibold pl-6 pr-6 py-2">
              Add To Cart
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
