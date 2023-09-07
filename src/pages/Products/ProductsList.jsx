import ProductList1 from "../../components/Products/ProductList";
import Topbar2 from "../../components/topbar/Topbar2";

const ProductsList = () => {
  return (
   <>
    <Topbar2/>
    <div className="pt-14">
        <ProductList1/>
      </div>
   </>
  )
}

export default ProductsList