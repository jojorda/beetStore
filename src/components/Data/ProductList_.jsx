import React, { useEffect, useState } from "react";
import LoadingProduct from "../Loading/LoadingProduct";
import { Link } from "react-router-dom";
import Pro from "../../assets/pro.jpg";
import Lg from "../../assets/logo.png";
const ProductList_ = ({ searchTerm, selectedCategory }) => {
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const itemsToShow = showMore ? searchTerm.length : 10;
  const [visibleData, setVisibleData] = useState([]);
  const [showNotFound, setShowNotFound] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false); // State baru untuk loading tombol "Muat Lebih Banyak"
  const API_URL = import.meta.env.VITE_API_KEY;
  
  useEffect(() => {
    const filterProductsByCategory = () => {
      if (!selectedCategory || selectedCategory === "all") {
        setVisibleData(searchTerm.slice(0, itemsToShow));
      } else {
        const filtered = searchTerm.filter(
          (product) =>
            product.Product_Category?.name.toLowerCase() === selectedCategory
        );
        setVisibleData(filtered.slice(0, itemsToShow));
      }
    };

    // Simulasikan penundaan 2 detik sebelum menampilkan data
    const timeout = setTimeout(() => {
      filterProductsByCategory();
      setLoading(false);

      if (searchTerm.length === 0) {
        setShowNotFound(true);
        setTimeout(() => {
          setShowNotFound(false);
        }, 3000);
      }
    }, 3000); // Sesuaikan waktu tunda sesuai kebutuhan

    return () => clearTimeout(timeout); // Hapus batas waktu jika komponen dilepas
  }, [searchTerm, itemsToShow, selectedCategory]);

  const toggleShowMore = () => {
    setLoadingMore(true); // Set loadingMore ke true saat tombol "Muat Lebih Banyak" diklik
    setShowMore(!showMore);
    setVisibleData(!showMore ? searchTerm : searchTerm.slice(0, itemsToShow));
    setTimeout(() => {
      setLoadingMore(false);
    }, 1500); // Sesuaikan dengan waktu simulasi loading yang sesuai
  };

  return (
    <div className="px-3 sm:px-8 lg:px-12 xl:px-16 2xl:px-24">
      <div className="font-bold text-gray-900 mb-3 text-xl">Daftar Produk</div>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
          <LoadingProduct />
        </div>
      ) : (
        <div>
          {showNotFound ? (
            <div className="text-center font-semibold text-gray-500">
              <img
                src={Pro} // Gantilah dengan path gambar Anda
                alt="Tidak ada Outlet"
                className="responsive-image" // Tambahkan class untuk styling gambar
              />
              <p> Tidak ada produk yang tersedia.</p>
            </div>
          ) : (
            <>
              {visibleData.length === 0 ? (
                <div className="text-center font-semibold text-gray-500">
                  <img
                    src={Pro} // Gantilah dengan path gambar Anda
                    alt="Tidak ada Outlet"
                    className="responsive-image" // Tambahkan class untuk styling gambar
                  />
                  <p> Tidak ada produk yang tersedia.</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                  {visibleData.map((item) => (
                    <Link
                      to={`/products/detail/${item.id}`}
                      className="bg-white border rounded-lg shadow hover:shadow-2xl"
                      key={item.id}
                    >
                      {/* <div className="flex items-center justify-center h-40 bg-gray-300 rounded-t-lg">
                        <svg
                          className="w-10 h-10 text-gray-200"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 16 20"
                        >
                          <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
                          <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
                        </svg>
                      </div> */}
                      <div className="flex justify-center items-center">
                        <img
                          src={
                            item.image == null ? Lg : `${API_URL}/${item.image}` // Gunakan Lg sebagai sumber gambar default jika item.image == null
                          }
                          className="w-auto h-36 object-cover  rounded-t-lg"
                          alt={item.name}
                        />
                      </div>
                      <div className="p-4">
                        <Link to={`/products/detail/${item.id}`}>
                          <div className="mb-2 text-sm tracking-tight text-gray-900">
                            {item.name}
                          </div>
                        </Link>
                        <div className="flex">
                          {item && item.Product_Category && (
                            <p className="mb-2 p-1 text-sm lowercase pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200 flex">
                              {item.Product_Category.name}
                            </p>
                          )}
                        </div>

                        <div className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-[#F20000]">
                          Rp {item.price}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div>
                {visibleData.length === 0 ? (
                  ""
                ) : (
                  <div className="flex justify-center mt-6">
                    {visibleData.length > 3 && (
                      <div>
                        <button
                          onClick={toggleShowMore}
                          className="px-4 py-2 rounded-lg font-bold text-[#6E205E] focus:outline-none bg-white border border-[#6E205E] hover:bg-gray-100 hover:text-[#6E205E] focus:z-10 focus:ring-4 focus:ring-gray-200"
                        >
                          {loadingMore ? (
                            <div className="flex justify-center">
                              <div className="h-4 w-4 mt-1 mr-2 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]">
                                {/* <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                              Loading...
                            </span> */}
                              </div>
                              <div>Loading...</div>
                            </div>
                          ) : showMore ? (
                            "Tampilkan Kurang"
                          ) : (
                            "Muat Lebih Banyak"
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductList_;
