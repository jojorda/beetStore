import React from "react";

const ProductKeranjang = ({ cart, setCart }) => {
  // Fungsi untuk menghapus item dari keranjang
  const handleRemoveFromCart = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
  };

  // Fungsi untuk menghitung total harga
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  return (
    <div className="p-12 pt-20">
      <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>

      {cart.length === 0 ? (
        <p>Keranjang belanja Anda masih kosong.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              className="flex flex-wrap lg:flex-nowrap border border-[#6E205E] rounded-lg mb-4"
              key={item.id}
            >
              <div className="lg:pl-10 lg:pr-20 flex-wrap">
                <div className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
                  {item.name}
                </div>
                <div className="inline-flex items-center py-2 text-lg font-medium text-center text-gray-500">
                  Rp {item.price}
                </div>
              </div>
              <div className="flex justify-end ml-12">
                <button
                  className="bg-[#6E205E] rounded-2xl text-white font-semibold pl-4 pr-4 p-1 hover:bg-[#8f387d]"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Harga */}
      {cart.length > 0 && (
        <div className="border border-[#6E205E] mt-10 p-4 rounded-2xl">
          <div className="flex pb-2">
            <div className="pl-28 text-gray-500 w-3/4">
              <div>Total Harga</div>
            </div>
            <div className="pl-28">
              <div>Rp {calculateTotalPrice()}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Check Out */}
      {cart.length > 0 && (
        <div className="pt-10">
          <button className="bg-[#6E205E] text-white w-full p-2 hover:bg-[#8f387d] rounded-2xl">
            Check Out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductKeranjang;
