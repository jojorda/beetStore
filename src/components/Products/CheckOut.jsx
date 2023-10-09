import React, { useEffect, useState } from "react";
import Topbar from "../topbar/Topbar";
import axios from "axios";
import Swal from "sweetalert2";

import Mt from "../../assets/mt.jpg";

const CheckOut = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mengambil data dari localStorage
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    setLoading(false);
  }, []);

  const calculateTotalPrice = () => {
    // Menghitung total harga pesanan
    if (cart) {
      return cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    }
    return 0;
  };

  const handlePayment = () => {
    Swal.fire({
      imageUrl: Mt,
      imageWidth: 300,
      imageHeight: 200,
      html: '<p class="text-sm text-gray-400 font-semibold">Fitur Belum Tersedia Saat Ini :(</p>',
      showConfirmButton: false,
      timer: 2000, // Menampilkan alert selama 1,5 detik
    });
  };

  return (
    <>
      <Topbar products={cart} loading={loading} />
      <div className="container mx-auto pt-8 md:pt-24">
        <div className="bg-white shadow-lg rounded-lg p-4 md:p-8">
          <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

          <div className="mb-4 md:space-x-8">
            {/* Ringkasan Pesanan */}
            <div className="">
              <h2 className="text-xl font-semibold mb-2">Ringkasan Pesanan</h2>
              <div className="bg-gray-100 p-4 rounded-lg">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x Rp {item.price}
                    </span>
                  </div>
                ))}
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="font-semibold">Total Harga:</span>
                  <span>Rp {calculateTotalPrice()}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-4">
            {/* Metode Pembayaran */}
            <h2 className="text-xl font-semibold mb-2">Metode Pembayaran</h2>
            <div className="bg-gray-100 p-4 rounded-lg">
              {/* Tambahkan pilihan metode pembayaran di sini */}
              <div className="mb-2">
                <label
                  htmlFor="metodePembayaran"
                  className="block font-semibold"
                >
                  Pilih Metode Pembayaran:
                </label>
                <select
                  id="metodePembayaran"
                  className="w-full border rounded-md p-2"
                >
                  <option value="creditCard">Kartu Kredit</option>
                  <option value="bankTransfer">Transfer Bank</option>
                  {/* Tambahkan opsi lain jika diperlukan */}
                </select>
              </div>
            </div>
          </div>

          {/* Tombol Bayar */}
          <div className="text-center">
            <button
              className="bg-[#6E205E] text-white px-20 py-2 rounded-2xl hover:bg-[#8f387d]"
              onClick={handlePayment}
            >
              Bayar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
