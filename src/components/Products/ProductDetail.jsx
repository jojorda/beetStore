import { useEffect, useState } from "react";
import Ms from "../../assets/Ms.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import ProductKeranjang from "./ProductKeranjang";
import Loading from "../Loading/Loading";

const ProductDetail = () => {
  const [number, setNumber] = useState(0);
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // State untuk menyimpan produk dalam keranjang

  const numberFront = () => setNumber(number + 1);
  const numberBack = () => setNumber(number - 1);

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");

        const response = await axios.get(
          `${API_URL}/api/v1/product/find-product/${id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(dataBusiness);
        setDetail([response.data.data]);
        setCart([response.data.data]);
        setLoading(false);
        // console.log(response.data.data);
        // console.log(dataOutlet);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setLoading(false);
          // setMsg(error.response.data.msg);
        }
      }
    };
    getData();
  }, [id]);

  const handleRemoveFromCart = (index) => {
    // Menghapus item dari keranjang belanja berdasarkan indeks
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };
  const handleAddToCart = (product) => {
    if (detail.length > 0) {
      const itemToAdd = {
        name: detail[0].name,
        price: detail[0].price,
      };

      setCart([...cart, itemToAdd]); // Tambahkan item ke keranjang
      setNumber(number + 1); // Update jumlah item
    }
  };
  return (
    <>
      <Topbar products={detail} loading={loading} />
      {loading ? (
        <div className="pt-20 flex text-center justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <>
          {detail.map((i) => (
            <div className=" bg-gray-100 h-screen" key={i.id}>
              {/* detail products */}
              <div className="p-12 pt-24 flex flex-wrap lg:flex-nowrap bg-white">
                <div className="flex-wrap shadow-lg rounded-xl">
                  <img
                    src={i.image}
                    className="rounded-xl"
                    style={{
                      width: "290px",
                      height: "260px",
                    }}
                  />
                </div>
                <div className="lg:pl-10 lg:pr-20 flex-wrap pt-10">
                  <div className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                    {i.name}
                  </div>
                  <div className="flex">
                    <div className="mb-3 mt-3 p-1 pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200">
                      {i.Product_Category?.name}
                    </div>
                  </div>

                  <div className="inline-flex items-center lg:pt-16 md:pt-16 py-2 text-2xl font-medium text-center text-[#F20000]">
                    Rp {i.price}
                  </div>
                  <div className="lg:flex md:flex hidden lg:fixed md:fixed mr-5 right-0">
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
                          <use
                            fill="#FFFFFF"
                            fillRule="nonzero"
                            xlinkHref="#a"
                          />
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
                          <use
                            fill="#FFFFFF"
                            fillRule="nonzero"
                            xlinkHref="#b"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="lg:hidden md:hidden block">
                    <div className="font-semibold mb-2">Description :</div>
                    <div className="">
                      {i.description == null ? (
                        <p>{i.description}</p>
                      ) : (
                        <p>Tidak Ada Description</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white mt-8 pt-5 pl-12 pr-12 pb-12 lg:block md:block hidden">
                <div className="font-semibold mb-2">Description :</div>
                <div className="">
                  {i.description == null ? (
                    <p>{i.description}</p>
                  ) : (
                    <p>Tidak Ada Description</p>
                  )}
                </div>
              </div>
              {/* close detail products */}
              {/* notes */}
              {/* <div className="pt-10">
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
          </div> */}
              {/* close notes */}

              <div className="flex mt-3">
                <div className=" lg:hidden md:hidden block ml-10">
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

                <div className="bg-[#6E205E] rounded-xl flex lg:fixed md:fixed mr-5 right-0">
                  <button
                    className="text-white font-semibold lg:pl-20 lg:pr-20 md:pl-20 md:pr-20 pl-10 pr-10 py-2"
                    onClick={() => handleAddToCart(i)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Menampilkan keranjang belanja */}
          <ProductKeranjang
            cart={cart}
            setCart={setCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </>
      )}
    </>
  );
};

export default ProductDetail;
