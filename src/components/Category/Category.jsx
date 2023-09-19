import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// Import Swiper React components

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { Navigation } from "swiper/modules";
import axios from "axios";

const Category = () => {
  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const getData = async () => {
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

        // setProduct(response.data.data);
        // setLoading(false);
        setCategoryData(response.data.data);
        console.log(response.data.data);
        // console.log(dataOutlet);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
          //   setLoading(false);
          // setMsg(error.response.data.msg);
        }
      }
    };
    getData();
  }, [id]);

  return (
    <div className="lg:p-10 p-5">
      <div className="text-gray-800 font-semibold pb-5">Pilihan Category</div>
      <div className="lg:pl-4">
        <div className="group flex whitespace-nowrap">
          <Swiper
            slidesPerView={8}
            spaceBetween={100}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            modules={[Navigation]}
            className="mySwiper pl-8"
          >
            <SwiperSlide>
              {" "}
              <div className="mr-10">
                <Link>
                  <div className="text-gray-200 border rounded-3xl text-sm  pl-4 pr-4 bg-[#6E205E]">
                    all
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            {categoryData.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="mr-10">
                  <Link>
                    <div className="bg-white text-gray-600 text-sm border rounded-3xl  pl-4 pr-4 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                      {item?.Product_Category?.name.toLowerCase()}
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex absolute inset-0 lg:mt-48 mt-48 opacity-0 group-hover:opacity-100 ">
            <div className="swiper-button-prev lg:left-8 p-3.5  text-gray-500 bg-white shadow-xl rounded-full"></div>
            <div className="swiper-button-next lg:right-6 p-3.5   text-gray-500 bg-white shadow-xl rounded-full"></div>
            {/* <Nav />
            <Nav /> */}
          </div>
        </div>

        {/* <div className="flex whitespace-nowrap">
          <div className="mr-5">
            <Link>
              <div className="text-white border rounded-3xl p-2 pl-8 pr-8 bg-[#6E205E]">
                all
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
          <div className=" mr-5">
            <Link>
              <div className="bg-white border rounded-3xl p-2 pl-8 pr-8 border-[#6E205E] hover:bg-[#6E205E] hover:text-white">
                Bumbu Kering
              </div>
            </Link>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Category;
