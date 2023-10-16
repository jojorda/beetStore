import React, { useEffect, useState } from "react";
import Topbar from "../topbar/Topbar";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../Loading/Loading";
import Mt from "../../assets/mt.jpg";
import { nanoid } from "nanoid";

function CheckOut({ isOpen, closeModal, content }) {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState([10]);
  const [loading, setLoading] = useState(true);
  const [checkoutTime, setCheckoutTime] = useState(new Date());
  const [TRANSIDMERCHANT] = useState(nanoid(12));
  useEffect(() => {
    const interval = setInterval(() => {
      setCheckoutTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  // const { id } = useParams();
  // const clientIdCCVA = 2;
  // const resultAmount = 2500;
  // const dateNow = "2023-10-11T12:00:00";
  // const mallIdCCVA = 2;
  // const selected = {
  //   value: "doku-payment-channel",
  //   text: "Metode Pembayaran DOKU",
  // };

  // useEffect(() => {
  //   const getUserById = async () => {
  //     try {
  //       const token = localStorage.getItem("token");
  //       const userId = localStorage.getItem("user");
  //       const API_URL = import.meta.env.VITE_API_KEY;
  //       const response = await axios.get(
  //         `${API_URL}/api/v1/customer-account/${userId}`,
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     } catch (error) {
  //       if (error.response) {
  //         console.log("error", error.response.data.message);
  //       }
  //     }
  //   };
  //   getUserById();
  // }, [id]);

  const cartData = JSON.parse(localStorage.getItem("cart")) || [];
  const businessIds = cartData.map((item) => item.business_id);
  // const dataCustomer = {
  //   name: "Nama Pelanggan",
  //   email: "email@pelanggan.com",
  //   phoneNumber: "081234567890",
  // };

  const redirectToPayment = () => {
    // Menghasilkan URL pembayaran
    const API_URL = import.meta.env.VITE_API_FRONTEND_URL;
    const paymentUrl = `${API_URL}/payment/doku?BASKET=${cart
      .map((item) => `${item.itemId}:${item.price}`)
      .join(
        ";"
      )}&MALLID=${clientIdCCVA}&CHAINMERCHANT=NA&AMOUNT=${resultAmount}.00&PURCHASEAMOUNT=${resultAmount}.00&TRANSIDMERCHANT=${TRANSIDMERCHANT}&WORDS=&REQUESTDATETIME=${dateNow}&CURRENCY=360&PURCHASECURRENCY=360&SESSIONID=&PAYMENTCHANNEL=${
      selected.value
    }&ADDRESS=&COUNTRY=INDONESIA&STATE=&CITY=&PROVINCE=&ZIPCODE=&TAXSERVICE=${0}&SUBTOTAL=${resultAmount}&PAYMENTMETHOD=${
      selected.text
    }&NAME=${dataCustomer.name}&EMAIL=${dataCustomer.email}&PHONENUMBER=${
      dataCustomer.phoneNumber
    }&SHAREDKEY=${mallIdCCVA}`;

    // Mengarahkan pengguna ke URL pembayaran
    window.location.href = paymentUrl;
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    // Mengatur timer untuk mengubah loading menjadi false setelah misalnya 2 detik
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Membersihkan timer saat komponen unmount atau ketika loading sudah selesai
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = JSON.parse(localStorage.getItem("cart")) || [];
        const businessIds = cartData.map((item) => item.business_id);
        const businessIdsString = businessIds.join(",");
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const apiUrlWithQuery = `${API_URL}/api/v1/payment-method/development?businessId=${businessIdsString}`;

        axios
          .get(apiUrlWithQuery, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            console.log(response);
            setPayment(response.data.data.rows);
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            const timer = setTimeout(() => {
              setLoading(false);
            }, 1500);
            return () => {
              clearTimeout(timer);
            };
          });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = () => {
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
      timer: 2000,
    });
  };

  const handlePayment1 = async () => {
    const API_URL = import.meta.env.VITE_API_KEY;
    const token = localStorage.getItem("token");
    const sendData = {
      receipt_id: "1:23/10/15:09:28:52",
      items: [
        {
          product_id: 151,
          addons: [],
          quantity: 5,
          price_product: 5000,
          price_discount: 0,
          price_service: 0,
          price_addons_total: 1000,
          price_total: 6000,
          notes: "Semangka",
        },
      ],
      outlet_id: 3,
      business_id: 3,
      customer_id: 26,
      payment_method_id: 10,
      payment_discount: 4000,
      payment_tax: 2000,
      payment_service: 1000,
      payment_total: 33000,
      amount: 60900,
      payment_change: 8000,
      invoice: TRANSIDMERCHANT,
      status: "done",
    };
    try {
      const response = await axios.post(
        `${API_URL}/api/v1/transaction-customer`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(sendData);
      console.log(response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-black opacity-70" />
          </div>
          <div className="relative z-10 w-full max-w-xl m-5 bg-white shadow-lg rounded-lg lg:p-4 p-3.5 md:p-8">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-2 px-4 text-5xl py-2  text-[#6E205E] hover:text-[#965088] "
            >
              &times;
            </button>

            {loading ? (
              <div className="p-40 flex justify-center">
                {" "}
                <Loading />
              </div>
            ) : (
              <div>
                <div className="mb-4 ">
                  <h2 className="text-xl font-semibold mb-2">Waktu Checkout</h2>
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <div className="text-center font-bold">
                      {checkoutTime.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="mb-4 md:space-x-8">
                  {/* Ringkasan Pesanan */}
                  <div className="">
                    <h2 className="text-xl font-semibold mb-2">
                      Ringkasan Pesanan
                    </h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between mb-2"
                        >
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
                  <h2 className="text-xl font-semibold mb-2">
                    Metode Pembayaran
                  </h2>
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
                        {payment.map((i) => (
                          <option value={i.id} key={i.id}>
                            {i.name}
                          </option>
                        ))}
                        {/* Tambahkan opsi lain jika diperlukan */}
                      </select>
                    </div>
                  </div>
                </div>
                {/* <div>
                  <h1>Halaman Pembayaran DOKU</h1>
                  <button onClick={redirectToPayment}>Buat Pembayaran</button>
                </div> */}
                {/* Tombol Bayar */}
                <div className="text-center">
                  <button
                    className="bg-[#6E205E] text-white px-20 py-2 rounded-2xl hover-bg-[#8f387d]"
                    onClick={handlePayment1}
                  >
                    Bayar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
