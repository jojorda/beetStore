import { Link } from "react-router-dom";
import Ds from "../../assets/dasboard.png";
import Bs from "../../assets/bs.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import Category from "../Category/Category";
import ProductList from "../Products/ProductList"

const Dashboard = () => {
  const [merchant, setMerchant] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  useEffect(() => {
    const getMerchant = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/v1/business`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setMerchant(response.data.data);
        setLoading(false);
        // console.log(response);
      } catch (error) {
        if (error.response) {
          setLoading(false);
          // setMsg(error.response.data.msg);
        }
      }
    };
    getMerchant();
  }, []);

  if (loading) {
    return (
      <div className="flex text-center justify-center items-center m-0">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <div className="">
        {/* Swiper */}
        <div className="h-64">
          <Swiper
            // centeredSlides={true}
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            // navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <div className="">
                <img src={Ds} className="" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="">
                <img src={Bs} className="" />
              </div>
            </SwiperSlide>
          </Swiper>
          {/* <Carousel
            autoplay
            selectedItem={activeIndex}
            onNext={nextSlide}
            onPrev={prevSlide}
          >
            {images.map((product) => (
              <div key={product.id}>
                <img
                  src={product.image}
                  alt={`Product ${product.id}`}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </Carousel> */}
        </div>
        {/* close swiper */}
        {/* Category */}
        <div>
          <Category/>
        </div>
        {/* close Category */}
        {/* main */}
        <div>
          <ProductList/>
        </div>
        {/* {merchant.length === 0 ? (
          <div className="text-center text-gray-500 lg:mt-32">
            Tidak ada data yang ditemukan.
          </div>
        ) : (
          <div>
            {merchant.map((item) => (
              <div className=" lg:pl-32 mt-10 overflow-auto" key={item.id}>
                <Link to={`/products/${item.id}`}>
                  <div className="bg-white hover:shadow-xl shadow-lg p-5 rounded-lg mb-10 overflow-x-auto">
                    <div className="flex">
                      <div className="justify-center              pt-5">
                        {" "}
                        <img
                          src={item?.image}
                          alt={item?.name}
                          className="bg-opacity-100 "
                          style={{
                            width: "170px",
                            height: "110px",
                            top: "75px",
                          }}
                        />
                      </div>
                      <div className="pl-2">
                        <div>
                          <b>{item?.name}</b>
                        </div>
                        <div className="">
                          <p>{item?.phone_number}</p>
                        </div>
                        <div>{item?.address}</div>
                        <div className="pt-10">
                          Total Transaction <b>8,766</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )} */}

        {/* close main */}
      </div>
    </>
  );
};

export default Dashboard;
