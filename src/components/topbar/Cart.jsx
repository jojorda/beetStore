import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import Topbar from "../topbar/Topbar";
import Swal from "sweetalert2";
import Mt from "../../assets/mt.jpg";
import Cr from "../../assets/cart.jpg";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    setLoading(false);
  }, []);
  // Fungsi untuk menghitung total harga
  const calculateTotalPrice = () => {
    // Memeriksa apakah cart telah didefinisikan
    if (cart) {
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
    return 0; // Kembalikan 0 jika cart belum didefinisikan
  };

  // Fungsi untuk menambah jumlah produk dalam keranjang
  const incrementQuantity = (item) => {
    if (cart) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id) {
          return { ...cartItem, quantity: cartItem.quantity + 1 };
        }
        return cartItem;
      });
      setCart(updatedCart);

      // Simpan keranjang belanja di localStorage setelah diperbarui
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Fungsi untuk mengurangi jumlah produk dalam keranjang
  const decrementQuantity = (item) => {
    if (cart) {
      const updatedCart = cart.map((cartItem) => {
        if (cartItem.id === item.id && cartItem.quantity > 1) {
          return { ...cartItem, quantity: cartItem.quantity - 1 };
        }
        return cartItem;
      });
      setCart(updatedCart);

      // Simpan keranjang belanja di localStorage setelah diperbarui
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };
  const handleRemoveFromCart = (itemId) => {
    // Tampilkan SweetAlert untuk konfirmasi penghapusan item
    Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin menghapus item ini dari keranjang?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        // Jika pengguna mengonfirmasi penghapusan
        const updatedCart = cart.filter((item) => item.id !== itemId);
        setCart(updatedCart);

        // Simpan keranjang belanja di localStorage
        localStorage.setItem("cart", JSON.stringify(updatedCart));

        // Tampilkan SweetAlert bahwa item telah dihapus
        Swal.fire({
          icon: "success",
          title: "Item Telah Dihapus",
          showConfirmButton: false,
          timer: 1500, // Menampilkan alert selama 1,5 detik
          customClass: {
            title: "text-sm", // Mengatur ukuran teks judul menjadi lebih kecil
          },
        }).then(() => {
          // Setelah SweetAlert ditutup, muat ulang halaman
          window.location.reload();
        });
      }
    });
  };

  const handleCheckout = () => {
    Swal.fire({
      imageUrl: Mt,
      imageWidth: 300,
      imageHeight: 200,
      html: '<p class="text-sm text-gray-400 font-semibold">Belum Tersedia Saat Ini :(</p>',
      showConfirmButton: false,
      timer: 1500, // Menampilkan alert selama 1,5 detik
    });
  };
  const handleCheckout1 = () => {
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
    <div className="">
      <div className="block">
        <div className="">
          <h2 className="text-sm font-bold mb-4">Keranjang Belanja</h2>

          {cart && cart.length === 0 ? (
            <div className="block text-center m-0">
              {" "}
              {/* Menambahkan class "text-center" untuk pusatkan teks */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={Cr}
                  alt="Keranjang kosong"
                  style={{
                    maxWidth: "70%", // Maksimum lebar gambar adalah lebar container
                    height: "auto", // Tinggi gambar akan menyesuaikan
                    display: "block", // Agar gambar tidak memiliki margin bawah tambahan
                    margin: "0 auto", // Pusatkan gambar horizontal
                  }}
                />
                <div className="font-semibold text-sm text-gray-500 mt-0">
                  {" "}
                  {/* Menambahkan "mt-4" untuk jarak atas */}
                  Keranjang belanja Anda masih kosong.
                </div>
              </div>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  className="flex items-center border border-[#6E205E] rounded-lg mb-4"
                  key={item.id}
                >
                  <div className="flex pl-2">
                    <img
                      src={item.image}
                      alt=""
                      className="shadow w-20 h-20 border rounded-md"
                    />
                  </div>
                  <div className="flex-1 pl-3 pt-3">
                    <div className="mb-2 text-sm font-semibold tracking-tight text-gray-900">
                      {item.name}
                    </div>
                    <div className="flex items-center py-2 text-lg font-medium text-center text-gray-500">
                      <button
                        className={`px-3 py-1 bg-[#6E205E] rounded-full text-white text-sm ${
                          item.quantity === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }`}
                        onClick={() => decrementQuantity(item)}
                        disabled={item.quantity === 1}
                      >
                        <FaMinus />
                      </button>
                      <p className="font-bold pl-2 pr-2">{item.quantity}</p>
                      <button
                        className="px-3 py-1 bg-[#6E205E] rounded-full text-white text-sm"
                        onClick={() => incrementQuantity(item)}
                      >
                        <FaPlus />
                      </button>
                    </div>
                    <div className="py-2 text-lg  text-gray-500">
                      Rp {item.price * item.quantity}
                    </div>
                  </div>
                  <div className="flex mr-3">
                    <button
                      className="bg-[#6E205E] rounded-xl text-white font-semibold  text-sm  p-2 hover:bg-[#8f387d]"
                      onClick={() => handleRemoveFromCart(item.id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {cart && cart.length === 0 ? (
          <div></div>
        ) : (
          <div className="text-sm">
            <div className=" w-full ">
              <div className="border border-[#6E205E] mt-8 p-3 rounded-xl">
                <div className="flex">
                  <div className=" text-gray-500  w-3/5">
                    <div>Total Harga :</div>
                  </div>
                  <div className="">
                    <div>Rp {calculateTotalPrice()}</div>
                  </div>
                </div>
              </div>

              {/* Tombol Check Out */}

              <div className="pt-10">
                <button
                  className="bg-[#6E205E] text-white w-full p-2 hover:bg-[#8f387d] rounded-2xl"
                  onClick={handleCheckout}
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Total Harga */}
      </div>
    </div>
  );
};

export default Cart;
