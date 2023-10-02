import React, { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import randomstring from "randomstring";

import "./Cart.css"; // Import file CSS jika diperlukan

export default function Cart(props) {
  const [stateModalCz, setStateModalCz] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState("");
  const [mallIdCCVA, setMallIdCCVA] = useState("");
  const [clientIdCCVA, setClientIdCCVA] = useState("");
  const [mallIdQR, setMallIdQR] = useState("");
  const [clientIdQR, setClientIdQR] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [enableWaiting, setEnableWaiting] = useState(true);
  const [allAmount, setAllAmount] = useState(null);
  const [urlPayment, setUrlPayment] = useState("");
  const [dateNow, setDateNow] = useState("");
  const [selected, setSelected] = useState({ value: null, text: "" });
  const [options, setOptions] = useState([]);
  const [optionPaymentMethod, setOptionPaymentMethod] = useState([]);
  const [allDataBusiness, setAllDataBusiness] = useState({});
  const [urlVendor, setUrlVendor] = useState("");
  const [TRANSIDMERCHANT, setTRANSIDMERCHANT] = useState(
    randomstring.generate(12)
  );
  const [customerAccountId, setCustomerAccountId] = useState(
    localStorage.getItem("customer_account_id") || null
  );
  const [dataCustomer, setDataCustomer] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });

  useEffect(() => {
    const dateNow = new Date();
    setDateNow(dayjs(dateNow).format("YYYYMMDDHHMMss"));
    handleDataCustomer();
    handleOptionPaymentMethods();
  }, []);

  const handleCloseModal = () => {
    setStateModalCz(false);
  };

  const checkStatusPaymentCz = async (url) => {
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

      return result.data.data;
    } catch (error) {
      console.error("Error checking payment status:", error);
      return null;
    }
  };

  const handleCZ = async () => {
    setStateModalCz(true);

    const generateSignature = {
      data: {
        request: {
          vendorIdentifier: props.dataBusiness.czVendorIdentifier,
          token: "",
          referenceId: TRANSIDMERCHANT,
          entityId: props.dataBusiness.czEntityId,
          merchantName: props.dataBusiness.outletName,
          merchantDescription: "Cashlez Sunter",
          currencyCode: "IDR",
          amount: handleAllAmount.resultAmount,
          callbackSuccess: "",
          callbackFailure: "",
          message: "",
          description: "Test Transaction",
          transactionUsername: props.dataBusiness.czUser,
        },
      },
    };

    try {
      const { data } = await axios.post(
        "https://api.beetpos.com/api/v1/signature/generate",
        generateSignature
      );

      generateSignature.signature = data.data[0].result;

      const generateUrlVendor = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/v1/signature/generate-url-vendor`,
        generateSignature
      );

      setUrlVendor(generateUrlVendor.data.data.response.generatedUrl);
    } catch (error) {
      console.error("Error generating CZ URL:", error);
    }
  };

  const handleOptionPaymentMethods = async () => {
    try {
      if (props.dataBusiness.dokuClientId || props.dataBusiness.czEntityId) {
        const { data } = await axios.get(
          `${process.env.VUE_APP_API_URL}/api/v1/payment-method/development?businessId=${props.dataBusiness.businessId}`
        );
        const resultPayment = [];

        data.data.rows.forEach((value) => {
          if (
            !value.outlet_id ||
            value.outlet_id === props.dataBusiness.outletId ||
            value.outlet_id == 1
          ) {
            resultPayment.push(value);
          }
        });

        resultPayment.forEach((value) => {
          setOptionPaymentMethod((prevOptions) => [...prevOptions, value]);
        });

        if (props.dataBusiness.dokuClientId) {
          setPaymentGateway("doku");
          const dokuclientSecret = props.dataBusiness.dokuclientSecret;

          if (props.dataBusiness.dokuClientId) {
            setClientIdCCVA(props.dataBusiness.dokuClientId);
            setMallIdCCVA(props.dataBusiness.dokuSharedKey);

            resultPayment.forEach((value) => {
              if (value.doku_type == "virtual") {
                setOptions((prevOptions) => [
                  ...prevOptions,
                  { value: 36, text: "Permata Bank (VA)" },
                  { value: 34, text: "Bank BRI (VA)" },
                ]);
              }
              if (value.doku_type == "debit") {
                setOptions((prevOptions) => [
                  ...prevOptions,
                  { value: 15, text: "Credit Card (VISA, Master Card, JCB)" },
                ]);
              }
            });
          }

          if (props.dataBusiness.dokuClientIdQris) {
            setClientIdQR(props.dataBusiness.dokuClientIdQris);
            setMallIdQR(props.dataBusiness.dokuSharedKeyQris);
            setClientSecret(dokuclientSecret);

            resultPayment.forEach((value) => {
              if (value.doku_type == "qr") {
                setOptions((prevOptions) => [
                  ...prevOptions,
                  { value: 0, text: "QRIS" },
                ]);
              }
            });
          }
        }

        if (props.dataBusiness.czEntityId) {
          setPaymentGateway("cz");
        }
      }
    } catch (error) {
      console.error("Error handling payment options:", error);
    }
  };

  const handleDataCustomer = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.VUE_APP_API_URL}/api/v1/customer-account/${customerAccountId}`
      );
      setDataCustomer({
        name: data.data.name,
        email: data.data.email,
        phoneNumber: data.data.phone_number,
      });
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  const handleTransactionDoku = async () => {
    let paymentMethod;
    let paymentMethodId;

    if (selected.value === 0) paymentMethod = "qr";
    if (selected.value === 15) paymentMethod = "debit";
    if (selected.value === 34) paymentMethod = "virtual";
    if (selected.value === 36) paymentMethod = "virtual";

    optionPaymentMethod.forEach((value) => {
      if (value.doku_type === paymentMethod) {
        paymentMethodId = value.id;
      }
    });

    setEnableWaiting(false);

    const tempItems = [];
    const receiptId = `ORDER_${props.dataBusiness.outletId}:${
      customerAccountId || null
    }:${dayjs(new Date()).format("YYYY/MM/DD:HH:mm:ss")}`;

    props.getCart.forEach((value) => {
      const tempAddons = [];

      if (value.fullDataAddons) {
        value.fullDataAddons.forEach((value2) => {
          tempAddons.push({
            id: value2.id,
            price: value2.price,
          });
        });
      }

      tempItems.push({
        sales_type_id: 1,
        product_id: value.idItem,
        addons: tempAddons || [],
        quantity: value.totalItem,
        price_product: value.priceItem,
        price_discount: 0,
        price_service: 0,
        price_addons_total: value.totalPriceAddons || 0,
        price_total: value.totalAmount,
        notes: value.notes,
      });
    });

    const sendData = {
      receipt_id: receiptId,
      items: tempItems,
      outlet_id: parseInt(props.dataBusiness.outletId),
      business_id: parseInt(props.dataBusiness.businessId),
      customer_account_id: customerAccountId || null,
      payment_method_id: paymentMethodId,
      payment_discount: 0,
      payment_tax: handleAllAmount.tax,
      payment_service: handleAllAmount.service,
      payment_total: handleAllAmount.paymentTotal,
      amount: handleAllAmount.resultAmount,
      payment_change: 0,
      invoice: TRANSIDMERCHANT,
      paymentchannel: selected.value,
    };

    try {
      const resTransaction = await axios.post(
        `${process.env.VUE_APP_API_URL}/api/v1/transaction-customer`,
        sendData
      );

      if (selected.value === 0) {
        const resQRString = await axios.get(
          `${process.env.VUE_APP_PAYMENT_DOKU_QRIS}?amount=${handleAllAmount.resultAmount}&sharedKey=${mallIdQR}&clientId=${clientIdQR}&clientSecret=${clientSecret}`
        );
        const transactionId = resTransaction.data.data.id;
        const transactionIdQRIS = resQRString.data.data.transactionId;

        await axios.put(
          `${process.env.VUE_APP_API_URL}/api/v1/transaction-customer?id=${transactionId}&transactionIdQRIS=${transactionIdQRIS}`
        );
        window.location = resQRString.data.data.qrCode;
      } else {
        window.location = urlPayment;
      }
    } catch (error) {
      console.error("Error handling Doku transaction:", error);
    }
  };

  const handleTransactionCz = (data) => {
    let paymentMethod;
    let paymentMethodId;

    if (data.response.paymentType.id === 1) paymentMethod = "ecomm";
    if (data.response.paymentType.id === 2) paymentMethod = "virtual";
    if (data.response.paymentType.id === 3) paymentMethod = "ovo";
    if (data.response.paymentType.id === 4) paymentMethod = "qr";
    if (data.response.paymentType.id === 7) paymentMethod = "virtual";

    optionPaymentMethod.forEach((value) => {
      if (value.cz_type === paymentMethod) {
        paymentMethodId = value.id;
      }
    });

    setEnableWaiting(false);

    const tempItems = [];
    const receiptId = `ORDER_${props.dataBusiness.outletId}:${
      customerAccountId || null
    }:${dayjs(new Date()).format("YYYY/MM/DD:HH:mm:ss")}`;

    props.getCart.forEach((value) => {
      const tempAddons = [];

      if (value.fullDataAddons) {
        value.fullDataAddons.forEach((value2) => {
          tempAddons.push({
            id: value2.id,
            price: value2.price,
          });
        });
      }

      tempItems.push({
        sales_type_id: 1,
        product_id: value.idItem,
        addons: tempAddons || [],
        quantity: value.totalItem,
        price_product: value.priceItem,
        price_discount: 0,
        price_service: 0,
        price_addons_total: value.totalPriceAddons || 0,
        price_total: value.totalAmount,
        notes: value.notes,
      });
    });

    const sendData = {
      receipt_id: receiptId,
      items: tempItems,
      outlet_id: parseInt(props.dataBusiness.outletId),
      business_id: parseInt(props.dataBusiness.businessId),
      customer_account_id: customerAccountId || null,
      payment_method_id: paymentMethodId,
      payment_discount: 0,
      payment_tax: handleAllAmount.tax,
      payment_service: handleAllAmount.service,
      payment_total: handleAllAmount.paymentTotal,
      amount: handleAllAmount.resultAmount,
      payment_change: 0,
      invoice: TRANSIDMERCHANT,
      status: "done",
    };

    try {
      axios.post(
        `${process.env.VUE_APP_API_URL}/api/v1/transaction-customer`,
        sendData
      );
    } catch (error) {
      console.error("Error handling Cashlez transaction:", error);
    }
  };

  const proceedPayment = () => {
    // Implement payment logic here
  };

  const pushToDetailCart = (id) => {
    // Implement navigation logic to the detail cart page with the given id
  };

  const decrement = (id) => {
    // Implement decrement logic here
  };

  const increment = (id) => {
    // Implement increment logic here
  };

  const deleteCart = (id) => {
    // Implement delete cart item logic here
  };

  const computedHandleAllAmount = () => {
    const tempAllAmount = [];
    const basket = [];
    const result = {};
    let priceAllItem = null;

    props.getCart.forEach((value) => {
      tempAllAmount.push(value.totalAmount);
    });

    if (tempAllAmount.length > 0) {
      const resultAmount = tempAllAmount.reduce((acc, curr) => {
        return acc + curr;
      });

      priceAllItem = resultAmount;
      result.resultAmount = resultAmount;
    }

    result.tax = Math.ceil((result.resultAmount * 10) / 100);
    result.service = Math.ceil((result.resultAmount * 5) / 100);
    result.paymentTotal = result.resultAmount;
    result.resultAmount = Math.ceil(
      result.resultAmount + result.tax + result.service
    );

    props.getCart.forEach((value) => {
      basket.push([
        value.nameItem,
        value.priceItem,
        value.totalItem,
        value.totalAmount,
      ]);
    });

    basket.push(
      ["tax", result.tax, 1, result.tax],
      ["service", result.service, 1, result.service]
    );

    const urlPayment = `${
      process.env.VUE_APP_FRONTEND_URL
    }/payment/doku?BASKET=${basket.join(
      ";"
    )}&MALLID=${clientIdCCVA}&CHAINMERCHANT=NA&AMOUNT=${
      result.resultAmount
    }.00&PURCHASEAMOUNT=${
      result.resultAmount
    }.00&TRANSIDMERCHANT=${TRANSIDMERCHANT}&WORDS=&REQUESTDATETIME=${dateNow}&CURRENCY=360&PURCHASECURRENCY=360&SESSIONID=&PAYMENTCHANNEL=${
      selected.value
    }&ADDRESS=&COUNTRY=INDONESIA&STATE=&CITY=&PROVINCE=&ZIPCODE=&TAXSERVICE=${
      result.tax + result.service
    }&SUBTOTAL=${priceAllItem}&PAYMENTMETHOD=${selected.text}&NAME=${
      dataCustomer.name
    }&EMAIL=${dataCustomer.email}&PHONENUMBER=${
      dataCustomer.phoneNumber
    }&SHAREDKEY=${mallIdCCVA}`;

    return {
      ...result,
      urlPayment,
    };
  };

  // Use useEffect to fetch data and initialize state
  useEffect(() => {
    const dateNow = new Date();
    setDateNow(dayjs(dateNow).format("YYYYMMDDHHMMss"));
    handleDataCustomer();
    handleOptionPaymentMethods();
  }, []);

  // Use watch to monitor changes in urlVendor and check status
  useEffect(() => {
    let intervalId;

    const checkStatus = async () => {
      try {
        console.log("urlnya", urlVendor);
        const result = await axios.post(
          "https://api-link.cashlez.com/validate_url",
          {
            status: "",
            message: "",
            data: {
              request: {
                generatedUrl: urlVendor,
              },
            },
          }
        );

        console.log("result.data.data", result.data.data);
        console.log(
          "result.data.data.response.processStatus",
          result.data.data.response.processStatus
        );

        if (!stateModalCz) {
          clearInterval(intervalId);
        }

        if (result.data.data.response.processStatus === "APPROVED") {
          handleTransactionCz(result.data.data);
          console.log("Data ketika Approved", result.data.data);
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking Cashlez payment status:", error);
      }
    };

    if (stateModalCz) {
      intervalId = setInterval(checkStatus, 3000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [stateModalCz, urlVendor]);

  return (
    <div>
      <div v-if={stateModalCz} class="custom-modal">
        <div class="modal-box">
          <div class="d-flex justify-content-end header-custom-modal">
            <div class="wrapper-icon-close" onClick={handleCloseModal}>
              <img
                src="@/assets/images/icons8-macos-close-90.png"
                alt="Close"
              />
            </div>
          </div>
          <iframe class="iframe-cz" src={urlVendor} frameborder="0"></iframe>
        </div>
      </div>

      <div v-if={getCart.length > 0} class="wrapper-cart">
        <div class="container list-cart">
          {getCart.map((data, index) => (
            <div class="item-cart row mb-2" key={index}>
              <div class="col-md-12 d-flex justify-content-between align-items-start">
                <div
                  class="desc-item d-flex"
                  onClick={() => pushToDetailCart(index)}
                >
                  <div class="container-images">
                    <div class="wrapper-image" v-if={data.imageItem}>
                      <img src={data.imageItem} alt="Product Image" />
                    </div>
                    <div class="wrapper-image" v-else>
                      <img
                        src="@/assets/images/websiteplanet-dummy-540X400.png"
                        alt="Product Image"
                      />
                    </div>
                  </div>
                  <div>
                    <div class="name-item">{data.nameItem}</div>
                    <div class="price-item">Rp. {data.priceItem}</div>
                  </div>
                </div>
                <div class="actions-item d-flex flex-column justify-content-end align-items-end">
                  <div class="total-item">{data.totalItem}</div>
                  <div class="d-flex justify-content-end mt-2">
                    <button
                      class="btn-delete"
                      onClick={() => deleteCart(index)}
                    >
                      <img
                        src="@/assets/images/icons8-delete-40.png"
                        alt="Delete"
                      />
                    </button>
                    <button
                      class="btn-decrement"
                      onClick={() => decrement(index)}
                    >
                      <img
                        src="@/assets/images/icons8-minus-40.png"
                        alt="Decrement"
                      />
                    </button>
                    <button
                      class="btn-increment"
                      onClick={() => increment(index)}
                    >
                      <img
                        src="@/assets/images/icons8-plus-40.png"
                        alt="Increment"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div v-if={getCart.length > 0} class="container total-cart">
        <div class="content-total-cart d-flex justify-content-between align-items-center">
          <div class="d-flex flex-column justify-content-start">
            <div class="text-total">Total</div>
            <div class="text-tax">Tax 10%</div>
            <div class="text-service">Service 5%</div>
          </div>
          <div class="d-flex flex-column justify-content-end align-items-end">
            <div class="total-cart-value">
              Rp. {handleAllAmount.resultAmount.toLocaleString()}
            </div>
            <div class="total-cart-value">
              Rp. {handleAllAmount.tax.toLocaleString()}
            </div>
            <div class="total-cart-value">
              Rp. {handleAllAmount.service.toLocaleString()}
            </div>
          </div>
        </div>
        <div class="text-total-cart text-center">
          <button class="btn-proceed-payment" onClick={proceedPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
