import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Loading from "../Loading/Loading";
import Mt from "../../assets/mt.jpg";
import { nanoid } from "nanoid";
import dayjs from "dayjs";

function CheckOut({ isOpen, closeModal, setIsModalOpen }) {
  const [cart, setCart] = useState([]);
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [checkoutTime, setCheckoutTime] = useState(new Date());
  const [TRANSIDMERCHANT] = useState(nanoid(12));
  const [nominal, setNominal] = useState(0);
  const [urlVendor, setUrlVendor] = useState(""); // Mendefinisikan urlVendor sebagai state dengan nilai awal kosong
  // ...

  useEffect(() => {
    const interval = setInterval(() => {
      setCheckoutTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

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

        const response = await axios.get(apiUrlWithQuery, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        setPayment(response.data.data.rows);
      } catch (error) {
        console.error(error);
      } finally {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1500);
        return () => {
          clearTimeout(timer);
        };
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handlePayment4 = async (nominal) => {
    try {
      setLoading1(true);
      const API_URL = import.meta.env.VITE_API_KEY;
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];

      const businessId = cartData.map((item) => item.business_id);
      const response = await axios.get(
        `${API_URL}/api/v1/business-noverify/${businessId}`
      );
      const dataBusiness = response.data.data;

      // Mengambil data dari localStorage
      const totalAmount = cartData.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      const generateSignature = {
        data: {
          request: {
            vendorIdentifier: dataBusiness.cz_vendor_identifier,
            token: "",
            referenceId: TRANSIDMERCHANT,
            entityId: dataBusiness.cz_entity_id,
            merchantName: dataBusiness.name,
            merchantDescription: "Cashlez Sunter",
            currencyCode: "IDR",
            amount: totalAmount,
            callbackSuccess: "",
            callbackFailure: "",
            message: "",
            description: "Test Transaction",
            transactionUsername: dataBusiness.cz_user,
          },
        },
        signature: "",
      };

      const resSignature = await axios.post(
        "https://api.beetpos.com/api/v1/signature/generate",
        generateSignature
      );
      console.log("coba", resSignature);
      generateSignature.signature = resSignature.data.data[0].result;

      const generateUrlVendor = await axios.post(
        `${API_URL}/api/v1/signature/generate-url-vendor`,
        generateSignature
      );
      console.log("data", generateUrlVendor);
      const responsPembayaran = resSignature.data; // Contoh: { status: 'success' }
      // Gantilah responsPembayaran sesuai dengan struktur respons aktual yang Anda terima

      if (responsPembayaran.status === "success") {
        // Transaksi berhasil, lakukan tindakan yang sesuai
        console.log("Transaksi berhasil!");
        // Tutup modal
        closeModal();
        // Hapus cart dari localStorage
        localStorage.removeItem("cart");
      } else {
        // Transaksi gagal atau respons tidak jelas
        console.log("Transaksi gagal atau respons tidak jelas.");
      }

      setLoading1(false);

      const urlVendor = generateUrlVendor.data.data.response.generatedUrl;
      setUrlVendor(urlVendor);

      // Setelah transaksi berhasil, tutup modal
      closeModal();
    } catch (error) {
      console.log(error);
    }
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

  const handlePayment3 = async (event) => {
    const url = event.target.getAttribute("data-url");

    if (url) {
      console.log("URL yang akan diolah:", url);

      try {
        const result = await axios.post(
          "https://api-link.cashlez.com/validate_url",
          {
            status: "",
            message: "",
            data: {
              request: {
                generatedUrl: url,
              },
            },
          }
        );

        console.log("Hasil proses URL:", result.data.data);
        console.log("Status proses:", result.data.data.response.processStatus);
        return result.data.data;
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("URL tidak ditemukan");
    }
  };

  const handlePayment1 = async (response) => {
    const API_URL = import.meta.env.VITE_API_KEY;

    try {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      const paymentMethods = cartData.map((item) => item.business_id);

      const customer_account_id = localStorage.getItem("user");
      const receiptId = `Pay_${customer_account_id}:${dayjs(new Date()).format(
        "YYYY/MM/DD:HH:mm:ss"
      )}`;
      let paymentMethod;
      let paymentMethodId;

      if (response && response.paymentType) {
        if (response.paymentType.id === 1) {
          paymentMethod = "ecomm";
        } else if (response.paymentType.id === 2) {
          paymentMethod = "virtual";
        } else if (response.paymentType.id === 3) {
          paymentMethod = "ovo";
        } else if (response.paymentType.id === 4) {
          paymentMethod = "qr";
        } else if (response.paymentType.id === 7) {
          paymentMethod = "virtual";
        }
      }

      cartData.forEach((value) => {
        if (value.business_id === paymentMethod) {
          paymentMethodId = value.id;
        }
      });

      const sendData = {
        receipt_id: receiptId,
        items: [],
        outlet_id: 3,
        business_id: 3, // Sesuaikan dengan nilai yang sesuai
        customer_account_id,
        payment_method_id: paymentMethodId,
        payment_discount: 0,
        payment_tax: 0,
        payment_service: 0,
        payment_total: 50000, // Sesuaikan dengan nilai yang sesuai
        amount: 50000, // Sesuaikan dengan nilai yang sesuai
        payment_change: 0,
        invoice: TRANSIDMERCHANT, // Ganti dengan variable yang sesuai
        paymentchannel:
          response && response.paymentType
            ? response.paymentType.code === "ECOMM"
              ? 15
              : response.paymentType.code === "TCASH_QR_PAYMENT"
              ? 0
              : null
            : null,
      };

      const token = localStorage.getItem("token");
      const resTransaction = await axios.post(
        `${API_URL}/api/v1/transaction-customer`,
        sendData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("response transaction", resTransaction.data.data);
      console.log("Success topup saldo");
    } catch (error) {
      console.log("Failed topup saldo");
      console.log(error);
    }
  };

  const handlePayment2 = async () => {
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
        <div className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 overflow-auto">
          <div className="fixed inset-0">
            <div className="absolute inset-0 bg-black opacity-70" />
          </div>
          <div className="relative z-10 w-full max-w-7xl m-5 bg-white shadow-lg rounded-lg lg:p-4 p-3.5 md:p-8">
            <h1 className="text-2xl font-semibold mb-4">Checkout</h1>

            <button
              onClick={closeModal}
              className="absolute top-0 right-0 m-2 px-4 text-5xl py-2  text-[#6E205E] hover:text-[#965088] "
            >
              &times;
            </button>

            {loading ? (
              <div className="p-40 flex justify-center">
                <Loading />
              </div>
            ) : (
              <>
                {loading1 ? (
                  <div className="p-40 flex justify-center">
                    <Loading />
                  </div>
                ) : urlVendor ? (
                  <>
                    {" "}
                    {urlVendor && (
                      <iframe
                        src={urlVendor}
                        className="w-full"
                        height="600px"
                        title="Konten Pembayaran"
                        allow="geolocation"
                      />
                    )}
                  </>
                ) : (
                  <div className="overflow-auto">
                    {/* Konten lainnya */}
                    <div className="mb-4 md:space-x-8">
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

                    {/* Tombol Bayar */}
                    <div className="text-center">
                      <button
                        className="bg-[#6E205E] text-white px-20 py-2 rounded-2xl hover-bg-[#8f387d]"
                        onClick={() => handlePayment4(nominal)}
                      >
                        Bayar
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckOut;
