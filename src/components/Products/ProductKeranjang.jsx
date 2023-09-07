import { useState } from "react";
import Ms from "../../assets/Ms.png";

const ProductKeranjang = () => {
  const [number, setNumber] = useState(0);

  const numberFront = () => setNumber(number + 1);
  const numberBack = () => setNumber(number - 1);
  return (
    <>
      <div className="p-12 mt-10">
        {/* detail products */}
        <div className="flex flex-wrap lg:flex-nowrap">
          <div className="border border-[#6E205E] rounded-lg">
            <img
              src={Ms}
              className="bg-opacity-100"
              style={{
                width: "190px",
                height: "160px",
              }}
            />
          </div>
          <div className="lg:pl-10 lg:pr-20 flex-wrap">
            <div className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
              Mushroom Seasoning Powder 100gr
            </div>
            <div className="inline-flex items-center py-2 text-2xl font-medium text-center text-gray-500">
              Rp 15.000
            </div>
            <div className="flex mt-3">
              <div className="">
                {" "}
                <div className="bg-[#6E205E] rounded-2xl flex items-center justify-between p-1 mr-4 ">
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

              <div className="flex justify-end ml-12">
                <button className="bg-[#6E205E] rounded-2xl text-white font-semibold pl-10 pr-10 p-1 hover:bg-[#8f387d]">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* close detail products */}
        {/* total */}
        <div className="border border-[#6E205E] mt-10 p-10 rounded-2xl">
          <div className="flex pb-3">
            <div className="pl-28 text-gray-500 w-3/4">
              <div>Price</div>
              <div>Tax (10%)</div>
              <div>Service (5%)</div>
            </div>
            <div className="pl-28">
              <div>15.000</div>
              <div>1.500</div>
              <div>750</div>
            </div>
          </div>
          <div className="border border-[#6E205E] ml-28 mr-28"></div>
          <div className="flex pt-3 font-semibold">
            <div className="pl-28 w-3/4">
              <div>Total Price</div>
            </div>
            <div className=" pl-28">
              <div>17.050</div>
            </div>
          </div>
        </div>
        {/* close total */}
        <div className="pt-10">
            <button className="bg-[#6E205E] text-white w-full p-1 hover:bg-[#8f387d] rounded-2xl">Check Out</button>
        </div>
      </div>
    </>
  );
};

export default ProductKeranjang;
