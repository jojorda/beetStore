import React, { useState, useEffect } from 'react';
import axios from 'axios';
import randomstring from 'randomstring';
import dayjs from 'dayjs';

function Cart({ dataBusiness }) {
  const [stateModalCz, setStateModalCz] = useState(false);
  const [paymentGateway, setPaymentGateway] = useState('');
  const [mallIdCCVA, setMallIdCCVA] = useState('');
  const [clientIdCCVA, setClientIdCCVA] = useState('');
  const [mallIdQR, setMallIdQR] = useState('');
  const [clientIdQR, setClientIdQR] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [enableWaiting, setEnableWaiting] = useState(true);
  const [allAmount, setAllAmount] = useState(null);
  const [urlPayment, setUrlPayment] = useState('');
  const [dateNow, setDateNow] = useState('');
  const [selected, setSelected] = useState({
    value: null,
    text: ''
  });
  const [options, setOptions] = useState([]);
  const [optionPaymentMethod, setOptionPaymentMethod] = useState([]);
  const [allDataBusiness, setAllDataBusiness] = useState({});
  const [urlVendor, setUrlVendor] = useState('');
  const [TRANSIDMERCHANT, setTRANSIDMERCHANT] = useState(randomstring.generate(12));
  const [customerAccountId, setCustomerAccountId] = useState(localStorage.getItem('customer_account_id') || null);
  const [dataCustomer, setDataCustomer] = useState({
    name: '',
    email: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const dateNow = new Date();
    setDateNow(dayjs(dateNow).format('YYYYMMDDHHMMss'));
    handleDataCustomer();
    handleOptionPaymentMethods();
  }, []);

  const handleCloseModal = () => {
    setStateModalCz(false);
  };

  const checkStatusPaymentCz = async (url) => {
    try {
      const result = await axios.post('https://api-link.cashlez.com/validate_url', {
        status: '',
        message: '',
        data: {
          request: {
            generatedUrl: url
          }
        }
      });
      return result.data.data;
    } catch (error) {
      console.error('Error checking payment status:', error);
    }
  };

  const handleCZ = async () => {
    setStateModalCz(true);
    const generateSignature = {
      data: {
        request: {
          vendorIdentifier: dataBusiness.czVendorIdentifier,
          token: '',
          referenceId: TRANSIDMERCHANT,
          entityId: dataBusiness.czEntityId,
          merchantName: dataBusiness.outletName,
          merchantDescription: 'Cashlez Sunter',
          currencyCode: 'IDR',
          amount: allAmount.resultAmount,
          callbackSuccess: '',
          callbackFailure: '',
          message: '',
          description: 'Test Transaction',
          transactionUsername: dataBusiness.czUser
        }
      }
    };

    try {
      const { data } = await axios.post('https://api.beetpos.com/api/v1/signature/generate', generateSignature);
      generateSignature.signature = data.data[0].result;
      const generateUrlVendor = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/signature/generate-url-vendor`, generateSignature);
      setUrlVendor(generateUrlVendor.data.data.response.generatedUrl);
    } catch (error) {
      console.error('Error generating CZ URL:', error);
    }
  };

  const handleOptionPaymentMethods = async () => {
    try {
      if (dataBusiness.dokuClientId || dataBusiness.czEntityId) {
        const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/payment-method/development?businessId=${dataBusiness.businessId}`);
        const resultPayment = data.data.rows.filter(value => !value.outlet_id || value.outlet_id === dataBusiness.outletId || value.outlet_id == 1);

        const options = [];
        const optionPaymentMethod = [];

        resultPayment.forEach((value) => {
          options.push(value);

          if (dataBusiness.dokuClientId) {
            setPaymentGateway('doku');
            const dokuclientSecret = dataBusiness.dokuclientSecret;
            setClientIdCCVA(dataBusiness.dokuClientId);
            setMallIdCCVA(dataBusiness.dokuSharedKey);

            if (value.doku_type === 'virtual') {
              options.push(
                { value: 36, text: 'Permata Bank (VA)' },
                { value: 34, text: 'Bank BRI (VA)' }
              );
            }

            if (value.doku_type === 'debit') {
              options.push(
                { value: 15, text: 'Credit Card (VISA, Master Card, JCB)' }
              );
            }
          }

          if (dataBusiness.dokuClientIdQris) {
            setClientIdQR(dataBusiness.dokuClientIdQris);
            setMallIdQR(dataBusiness.dokuSharedKeyQris);
            setClientSecret(dokuclientSecret);

            if (value.doku_type === 'qr') {
              options.push(
                { value: 0, text: 'QRIS' }
              );
            }
          }
        });

        setOptions(options);
        setOptionPaymentMethod(optionPaymentMethod);
      }

      if (dataBusiness.czEntityId) {
        setPaymentGateway('cz');
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error);
    }
  };

  const handleDataCustomer = async () => {
    try {
      const { data } = await axios.get(`${process.env.VUE_APP_API_URL}/api/v1/customer-account/${customerAccountId}`);
      setDataCustomer({
        name: data.data.name,
        email: data.data.email,
        phoneNumber: data.data.phone_number
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleTransactionDoku = async () => {
    let paymentMethod;
    let paymentMethodId;

    if (selected.value === 0) paymentMethod = 'qr';
    if (selected.value === 15) paymentMethod = 'debit';
    if (selected.value === 34) paymentMethod = 'virtual';
    if (selected.value === 36) paymentMethod = 'virtual';

    optionPaymentMethod.forEach((value) => {
      if (value.doku_type === paymentMethod) {
        paymentMethodId = value.id;
      }
    });

    setEnableWaiting(false);

    const tempItems = [];
    const receiptId = 'ORDER_' +
      dataBusiness.outletId +
      ':' +
      customerAccountId || null +
      ':' +
      dayjs(new Date()).format('YYYY/MM/DD:HH:mm:ss');

    getCart.forEach((value) => {
      const tempAddons = [];
      if (value.fullDataAddons) {
        value.fullDataAddons.forEach((value2) => {
          tempAddons.push({
            id: value2.id,
            price: value2.price
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
        notes: value.notes
      });
    });

    const sendData = {
      receipt_id: receiptId,
      items: tempItems,
      outlet_id: parseInt(dataBusiness.outletId),
      business_id: parseInt(dataBusiness.businessId),
      customer_account_id: customerAccountId || null,
      payment_method_id: paymentMethodId,
      payment_discount: 0,
      payment_tax: allAmount.tax,
      payment_service: allAmount.service,
      payment_total: allAmount.paymentTotal,
      amount: allAmount.resultAmount,
      payment_change: 0,
      invoice: TRANSIDMERCHANT,
      paymentchannel: selected.value
    };

    try {
      const resTransaction = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/transaction-customer`, sendData);

      if (selected.value === 0) {
        const resQRString = await axios.get(`${process.env.VUE_APP_PAYMENT_DOKU_QRIS}?amount=${allAmount.resultAmount}&sharedKey=${mallIdQR}&clientId=${clientIdQR}&clientSecret=${clientSecret}`);
        const transactionId = resTransaction.data.data.id;
        const transactionIdQRIS = resQRString.data.data.transactionId;

        await axios.put(`${process.env.VUE_APP_API_URL}/api/v1/transaction-customer?id=${transactionId}&transactionIdQRIS=${transactionIdQRIS}`);

        // Redirect to a QRISDoku component or handle the QR code as needed
        // this.$router.push({ name: 'QRISDoku', query: { qrString: resQRString.data.data.qrCode, businessName: dataBusiness.businessName, outletName: dataBusiness.outletName } });
      } else {
        window.location = urlPayment;
      }
    } catch (error) {
      console.error('Error handling Doku transaction:', error);
    }
  };

  const handleTransactionCz = (data) => {
    let paymentMethod;
    let paymentMethodId;

    if (data.response.paymentType.id === 1) paymentMethod = 'ecomm';
    if (data.response.paymentType.id === 2) paymentMethod = 'virtual';
    if (data.response.paymentType.id === 3) paymentMethod = 'ovo';
    if (data.response.paymentType.id === 4) paymentMethod = 'qr';
    if (data.response.paymentType.id === 7) paymentMethod = 'virtual';

    optionPaymentMethod.forEach((value) => {
      if (value.cz_type === paymentMethod) {
        paymentMethodId = value.id;
      }
    });

    setEnableWaiting(false);

    const tempItems = [];
    const receiptId = 'ORDER_' +
      dataBusiness.outletId +
      ':' +
      customerAccountId || null +
      ':' +
      dayjs(new Date()).format('YYYY/MM/DD:HH:mm:ss');

    getCart.forEach((value) => {
      const tempAddons = [];
      if (value.fullDataAddons) {
        value.fullDataAddons.forEach((value2) => {
          tempAddons.push({
            id: value2.id,
            price: value2.price
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
        notes: value.notes
      });
    });

    const sendData = {
      receipt_id: receiptId,
      items: tempItems,
      outlet_id: parseInt(dataBusiness.outletId),
      business_id: parseInt(dataBusiness.businessId),
      customer_account_id: customerAccountId || null,
      payment_method_id: paymentMethodId,
      payment_discount: 0,
      payment_tax: allAmount.tax,
      payment_service: allAmount.service,
      payment_total: allAmount.paymentTotal,
      amount: allAmount.resultAmount,
      payment_change: 0,
      invoice: TRANSIDMERCHANT,
      status: 'done'
    };

    try {
      const resTransaction = await axios.post(`${process.env.VUE_APP_API_URL}/api/v1/transaction-customer`, sendData);

      // Handle the result of the transaction as needed
      // console.log(resTransaction.data.data);
    } catch (error) {
      console.error('Error handling CZ transaction:', error);
    }
  };

  const proceedPayment = () => {
    // Handle payment processing, e.g., open the payment modal
    // or trigger the payment process.
    console.log('');
  };

  const pushToDetailCart = (id) => {
    // Navigate to the DetailCart route and pass the cart item's ID
    console.log('Push to detail cart:', id);
    // this.$router.push({ name: 'DetailCart', params: { idCart: id } });
  };

  const decrement = (id) => {
    console.log('Decrement:', id);
    const tempData = getCart[id];

    if (tempData.totalItem > 1) {
      pushToDetailCart(id);
      tempData.totalItem = tempData.totalItem - 1;
      getCart[id].totalAmount = getCart[id].priceItem * getCart[id].totalItem;
    } else {
      getCart.splice(id, 1);
    }
  };

  const increment = (id) => {
    pushToDetailCart(id);
    console.log('Increment:', id);
    const tempData = getCart[id];
    tempData.totalItem = tempData.totalItem + 1;
    getCart[id].totalAmount = getCart[id].priceItem * getCart[id].totalItem;
  };

  const deleteCart = (id) => {
    // Remove the item from the cart by its ID
    getCart.splice(id, 1);
  };

  return (
    <div>
      <div v-if="stateModalCz" class="custom-modal">
        <div class="modal-box">
          <div class="d-flex justify-content-end header-custom-modal">
            <div class="wrapper-icon-close" @click={handleCloseModal}>
              <img src="@/assets/images/icons8-macos-close-90.png" alt="Close" />
            </div>
          </div>
          <iframe class="iframe-cz" src={urlVendor} frameborder="0" />
        </div>
      </div>

      <div v-if={getCart.length > 0} class="wrapper-cart">
        <div class="container list-cart">
          <div class="item-cart row mb-2" v-for="(data, index) of getCart" :key="index" onClick={() => pushToDetailCart(index)}>
            <div class="col-md-12 d-flex justify-content-between align-items-start">
              <div class="desc-item d-flex">
                <div class="container-images">
                  <div class="wrapper-image" v-if={data.imageItem}>
                    <img src={data.imageItem} alt="Product Image" />
                  </div>
                  <div class="wrapper-image" v-else>
                    <img src="@/assets/images/websiteplanet-dummy-540X400.png" alt="Product Image" />
                  </div>
                </div>
                <div>
                  <div class="name-item">{data.nameItem}</div>
                  <div class="price-item">Rp. {data.totalAmount | numFormat}</div>
                  <div class="notes-item">{data.notes}</div>
                  {data.notesItem ? (
                    <div class="notes-item">{data.notesItem}</div>
                  ) : (
                    <div />
                  )}
                </div>
              </div>
              <div class="wrapper-action">
                <div class="total-item d-flex justify-content-between align-items-center">
                  <div class="button-minus" onClick={() => decrement(index)}>-</div>
                  {data.totalItem}
                  <div class="button-plus" onClick={() => increment(index)}>+</div>
                </div>
                <div class="badge badge-danger btn-delete-cart" onClick={() => deleteCart(index)}>
                  delete
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="desc-price mb-3">
            <div class="tax d-flex justify-content-between">
              <h6>Tax (10%)</h6>
              <h5>Rp. {handleAllAmount.tax | numFormat}</h5>
            </div>
            <div class="service d-flex justify-content-between">
              <h6>Service (5%)</h6>
              <h5>Rp. {handleAllAmount.service | numFormat}</h5>
            </div>
            <div class="grand-total d-flex justify-content-between">
              <h4>Sub Total :</h4>
              <h5>Rp. {handleAllAmount.resultAmount | numFormat}</h5>
            </div>
            <div>
              <b-modal modal-footer id="modal-1" title="Please select payment method">
                <div>
                  {options.length ? (
                    <div class="select-payment-method" v-for="(data, index) in options" :key="index">
                      <b-button
                        size="lg"
                        variant="success"
                        block
                        class="button-payment"
                        onClick={() => setSelected(data)}>
                        {data.text}
                      </b-button>
                    </div>
                  ) : (
                    <div />
                  )}
                </div>
                <div>
                  <b-button size="lg" variant="danger" block @click={handleCZ}>
                    Cashlez
                  </b-button>
                </div>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
