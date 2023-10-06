import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useParams } from "react-router-dom";
import axios from "axios";
import Topbar from "../topbar/Topbar";
import ProductKeranjang from "./ProductKeranjang";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { FaMinus, FaPlus } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState(1);

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

        setDetail(response.data.data);
        setLoading(false);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setLoading(false);
        }
      }
    };
    getData();
  }, [id]);
  useEffect(() => {
    const getData1 = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");

        const response = await axios.post(
          `${API_URL}/api/v1/transaction-customer`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          setLoading(false);
        }
      }
    };
    getData1();
  }, [id]);

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (detail) {
      const itemToAdd = {
        id: detail.id,
        name: detail.name,
        price: detail.price,
        quantity: quantity,
      };

      const existingItemIndex = cart.findIndex(
        (item) => item.id === itemToAdd.id
      );

      if (existingItemIndex !== -1) {
        // Jika item dengan ID yang sama sudah ada dalam keranjang,
        // kita akan membuat salinan keranjang dan menambahkan item ke dalamnya.
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += quantity;
        setCart(updatedCart);

        // Perbarui quantity menjadi 1 setelah ditambahkan ke keranjang
        setQuantity(1);

        // Simpan keranjang belanja di localStorage setelah diperbarui
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Tampilkan SweetAlert untuk memberi tahu bahwa item telah ditambahkan ke keranjang
        Swal.fire({
          icon: "success",
          title: "Item Ditambahkan ke Keranjang",
          showConfirmButton: false,
          timer: 1500, // Menampilkan alert selama 1,5 detik
          customClass: {
            title: "text-sm", // Mengatur ukuran teks judul menjadi lebih kecil
          },
        }).then(() => {
          // Setelah SweetAlert ditutup, muat ulang halaman
          window.location.reload();
        });
      } else {
        // Jika item belum ada dalam keranjang, kita akan menambahkannya.
        const updatedCart = [...cart, itemToAdd];
        setCart(updatedCart);

        // Perbarui quantity menjadi 1 setelah ditambahkan ke keranjang
        setQuantity(1);

        // Simpan keranjang belanja di localStorage setelah diperbarui
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Tampilkan SweetAlert untuk memberi tahu bahwa item telah ditambahkan ke keranjang
        Swal.fire({
          icon: "success",
          title: "Item Ditambahkan ke Keranjang",
          showConfirmButton: false,
          timer: 1500, // Menampilkan alert selama 1,5 detik
          customClass: {
            title: "text-lg", // Mengatur ukuran teks judul menjadi lebih kecil
          },
        }).then(() => {
          // Setelah SweetAlert ditutup, muat ulang halaman
          window.location.reload();
        });
      }
    }
  };

  // Gunakan useEffect untuk memperbarui localStorage ketika cart berubah
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);

    // Simpan keranjang belanja di localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    // Kirim pesanan ke database (gunakan Axios atau metode lainnya)
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");

    axios
      .post(
        `${API_URL}/api/v1/order/checkout`,
        { cart },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Pesanan berhasil dikirim ke database:", response.data);

        // Hapus keranjang belanja dari localStorage setelah checkout
        localStorage.removeItem("cart");
      })
      .catch((error) => {
        console.error("Pesanan gagal:", error);
      });
  };

  return (
    <>
      <Topbar detail={detail} loading={loading} />
      {loading ? (
        <div className="pt-20 flex text-center justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div className="bg-gray-100  pt-14" key={detail.id}>
          <div className="lg:p-12 p-5 sm:p-7 flex flex-wrap md:justify-center lg:flex-nowrap bg-white">
            <div className="flex-wrap shadow-lg rounded-xl">
              <img
                src={detail.image}
                className="rounded-xl"
                style={{
                  width: "290px",
                  height: "260px",
                }}
                alt={detail.name}
              />
            </div>
            <div className="lg:pl-10 md:pl-10 lg:pr-20 flex-wrap pt-10">
              <div className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
                {detail.name}
              </div>
              <div className="flex">
                <div className="mb-3 mt-3 p-1 pl-2 pr-2 rounded-lg font-normal text-gray-500 bg-gray-200">
                  {detail.Product_Category?.name}
                </div>
              </div>

              <div className="inline-flex items-center lg:pt-16 md:pt-16 py-2 text-2xl font-medium text-center text-[#F20000]">
                Rp {detail.price}
              </div>
              <div className="lg:flex md:flex hidden  mr-5 right-0">
                <div className="bg-[#6E205E] rounded-xl flex items-center justify-between py-2 mr-4 ">
                  <button
                    className={`px-4 pl-5 text-white cursor-pointer hover:opacity-70 duration-500 ${
                      quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={decrementQuantity}
                    disabled={quantity === 1}
                  >
                    <FaMinus />
                  </button>
                  <p className="font-bold text-white pl-4 pr-4">{quantity}</p>
                  <button
                    className="px-5 hover:opacity-70 text-white cursor-pointer duration-500"
                    onClick={incrementQuantity}
                  >
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-5 lg:p-12  lg:mt-8 pt-5 lg:pl-12 pr-12 lg:pb-12 pb-6 block">
            <div className="font-semibold mb-2">Description :</div>
            <div className="">
              {detail.description == null ? (
                <p>Tidak Ada Description</p>
              ) : (
                <p>{detail.description}</p>
              )}
            </div>
          </div>

          <div className="lg:block flex justify-center lg:p-2 p-4">
            <div className="lg:hidden md:hidden block lg:ml-10 lg:mr-0 mr-2">
              <div className="bg-[#6E205E] rounded-xl flex items-center justify-between py-2 ">
                <button
                  className={`px-4 pl-5 text-white  cursor-pointer hover:opacity-70 duration-500 ${
                    quantity === 1 ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={decrementQuantity}
                  disabled={quantity === 1}
                >
                  <FaMinus />
                </button>
                <p className="font-bold text-white pl-4 pr-4">{quantity}</p>
                <button
                  className="px-5 hover:opacity-70 text-white  cursor-pointer duration-500"
                  onClick={incrementQuantity}
                >
                  <FaPlus />
                </button>
              </div>
            </div>

            <div className="lg:flex">
              <div className="lg:w-4/5"></div>
              <div className="">
                {" "}
                <button
                  className="text-white bg-[#6E205E] rounded-xl  font-semibold lg:pl-20 lg:pr-20 md:pl-20 md:pr-20 pl-8 pr-8 py-2"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
