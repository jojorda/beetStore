import React from "react";
import { Link } from "react-router-dom";

const BottomBar = () => {
  return (
    <footer className="text-black py-6">
      <hr className="h-1 bg-[#6E205E] border-0 mb-10" />
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold">Tentang Kami</h2>
            <p className="text-sm mt-2 text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <h2 className="text-xl font-semibold">Hubungi Kami</h2>
            <p className="text-sm mt-2 text-gray-700">
              Email: info@example.com
              <br />
              Telepon: (123) 456-7890
            </p>
          </div>
          <div className="text-center lg:text-left">
            <h2 className="text-xl font-semibold">Ikuti Kami</h2>
            <div className="flex mt-2 space-x-4">
              <a href="#" className="text-gray-600 hover:text-[#6E205E]">
                Facebook
              </a>
              <a href="#" className="text-gray-600 hover:text-[#6E205E]">
                Instagram
              </a>
              <a href="#" className="text-gray-600 hover:text-[#6E205E]">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 text-gray-700 font-semibold">
          <p className="text-sm">
            © {new Date().getFullYear()} PT. Lifetech Tanpa Batas. Hak Cipta
            Dilindungi.
          </p>
        </div>
      </div>
    </footer>
    // <nav className="fixed md:hidden  bottom-0 left-0 right-0 bg-white h-16 flex justify-around items-center shadow-lg">
    //   <Link to="/" className="text-gray-600 hover:text-blue-500">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6 mx-auto mb-1"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    //       />
    //     </svg>
    //     Beranda
    //   </Link>
    //   <Link to="/cari" className="text-gray-600 hover:text-blue-500">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6 mx-auto mb-1"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M16 16.793l4.853-4.853a1 1 0 00-1.414-1.414L15 15.086M10 18a8 8 0 100-16 8 8 0 000 16z"
    //       />
    //     </svg>
    //     Cari
    //   </Link>
    //   <Link to="/keranjang" className="text-gray-600 hover:text-blue-500">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6 mx-auto mb-1"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M14 5l7 7M5 5l7 7"
    //       />
    //     </svg>
    //     Keranjang
    //   </Link>
    //   <Link to="/profil" className="text-gray-600 hover:text-blue-500">
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       className="h-6 w-6 mx-auto mb-1"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       stroke="currentColor"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M12 4a4 4 0 100 8 4 4 0 000-8z"
    //       />
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         strokeWidth="2"
    //         d="M16 21v-1a4 4 0 00-4-4H8a4 4 0 00-4 4v1"
    //       />
    //     </svg>
    //     Profil
    //   </Link>
    // </nav>
  );
};

export default BottomBar;
