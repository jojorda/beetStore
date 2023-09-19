import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import LoadingProduct from "../Loading/LoadingProduct";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleData, setVisibleData] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const itemsToShow = showMore ? product.length : 12;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/v1/product/beetstore`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Simpan data yang diambil dari API ke dalam state data
        setProduct(response.data.data);

        // Set data yang akan ditampilkan sesuai dengan kondisi showMore
        setVisibleData(response.data.data.slice(0, itemsToShow));

        // Set loading menjadi false setelah data berhasil dimuat
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);

        // Set error dan loading menjadi false jika terjadi kesalahan
        setError("Terjadi kesalahan saat mengambil data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [itemsToShow]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="px-10 lg:ml-24 ml-8">
      <div className="font-bold text-gray-900 mb-2 text-xl">Daftar Produk</div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mr-32">
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />

          {/* <LoadingProduct /> */}
          {/* <Loading /> */}
        </div>
      ) : (
        <div>
          {/* products list */}
          {product.length === 0 ? (
            <div className="text-center pt-10 text-gray-500">
              Tidak ada data yang ditemukan.
            </div>
          ) : (
            <div className="lg:flex lg:flex-wrap w-full ">
              {visibleData.map((item) => (
                <div
                  className="lg:w-48 mr-5 mb-5 bg-white border justify-center items-center rounded-lg shadow hover:shadow-2xl "
                  key={item.id}
                >
                  <div className="flex items-center justify-center h-36 mb-4 bg-gray-300 rounded ">
                    <svg
                      className="w-10 h-10 text-gray-200 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 20"
                    >
                      <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                      <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                    </svg>
                  </div>
                  <Link
                    to={`/products/detail/${item.id}`}
                    className="flex justify-center items-center"
                  >
                    <img
                      src={item.image}
                      className="bg-opacity-100 rounded-t-lg"
                    />
                  </Link>
                  <div className="p-2">
                    <Link to={`/products/detail/${item.id}`}>
                      <div className="mb-2 text-sm tracking-tight text-gray-900">
                        {item.name}
                      </div>
                    </Link>
                    <div className="flex">
                      <p className="mb-2 p-1 text-sm lowercase pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200 flex">
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
          )}
          <div>
            {product.length === 0 ? (
              ""
            ) : (
              <div className="flex justify-center">
                {product.length > 3 && (
                  <button
                    onClick={toggleShowMore}
                    className="px-4 py-2 rounded-lg mt-4 font-bold text-[#6E205E] focus:outline-none bg-white border border-[#6E205E] hover:bg-gray-100 hover:text-[#6E205E] focus:z-10 focus:ring-4 focus:ring-gray-200"
                  >
                    {showMore ? "Tampilkan Kurang" : "Muat Lebih Banyak"}
                  </button>
                )}
              </div>
            )}
          </div>
          {/* close products list */}
        </div>
      )}
    </div>
  );
};

export default ProductList;
