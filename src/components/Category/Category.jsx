import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";
import { Navigation } from "swiper/modules";
import axios from "axios";

const Category = ({ selectedCategory, setSelectedCategory }) => {
  const [categoryData, setCategoryData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/api/v1/product-category`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(response);
        setCategoryData(response.data.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data.message);
        }
      }
    };
    getData();
  }, [id]);

  return (
    <div className="lg:p-10 p-5 shadow mb-5">
      <div className="text-gray-800 font-semibold pb-2">Pilihan Category</div>
      <div className="lg:pl-4">
        <div className="group flex whitespace-nowrap py-3">
          <Swiper
            spaceBetween={13}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 6,
              },
              1024: {
                slidesPerView: 9,
              },
            }}
            modules={[Navigation]}
            className="mySwiper pl-8"
          >
            <SwiperSlide>
              {" "}
              <div className="mr-10">
                <Link>
                  <div
                    className={`bg-gray-100 text-sm hover:bg-gray-300 rounded-2xl p-2 pl-3 pr-3 text-center ${
                      selectedCategory === "all" ? "text-[#6E205E]" : ""
                    }`}
                    onClick={() => setSelectedCategory("all")}
                  >
                    all
                  </div>
                </Link>
              </div>
            </SwiperSlide>
            {categoryData.map((category) => (
              <SwiperSlide key={category.id}>
                <div className="mr-10">
                  <div
                    className={`bg-gray-100 text-sm lowercase cursor-pointer hover:bg-gray-300 rounded-2xl p-2 pl-3 pr-3 text-center ${
                      selectedCategory === category.name.toLowerCase()
                        ? "text-[#6E205E]"
                        : ""
                    }`}
                    onClick={() =>
                      setSelectedCategory(category.name.toLowerCase())
                    }
                  >
                    {category.name}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="lg:flex lg:absolute md:absolute hidden left-0 inset-0  lg:mt-56 md:hidden opacity-0 group-hover:opacity-100 ">
            <div className="swiper-button-prev  p-3.5  text-gray-500 bg-white shadow-xl rounded-full"></div>
            <div className="swiper-button-next  p-3.5   text-gray-500 bg-white shadow-xl rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
