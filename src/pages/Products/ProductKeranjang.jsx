import ProductKeranjang2 from "../../components/Products/ProductKeranjang";
import Topbar2 from "../../components/topbar/Topbar2";

const ProductKeranjang = () => {
  return (
    <>
      {" "}
      <Topbar2 />
      <div className="pt-3">
        <ProductKeranjang2 />
      </div>
    </>
  );
};

export default ProductKeranjang;
