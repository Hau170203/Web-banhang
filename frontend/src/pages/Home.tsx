import { SliderComponent } from "../components/SliderComponent";
import { Link } from "react-router";
import { RightCircleOutlined, TruckOutlined, SafetyCertificateOutlined, ReloadOutlined } from "@ant-design/icons";
import { CategoryComponent } from "../components/CategoryComponent";
import CartProduct from "../components/CartProduct";
import * as productService from "../services/productService"
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import Loading from "../components/Loading";

export interface product {
  _id: string,
  name: string,
  type: string,
  image: string,
  price: number,
  countInStock: number,
  rating: number,
  description: string,
  discount: number,
  seller: number
}
export const Home = () => {
  const search = useSelector((state: RootState)=> state.product.search);

  const fetchAllProduct = async (search: string) => {
    const res = await productService.getAllProduct(search);
    return res;
  }

  const { data: products, isLoading } = useQuery(
    { queryKey: ["products", search], // Truyền search vào queryKey
    queryFn: ({ queryKey }) => fetchAllProduct(queryKey[1]), // Lấy search từ queryKey
    retry: 3,
    retryDelay: 1000})

  // console.log("data", products);
  return (
    <div className="w-full h-full ">
      {/* slider & Category */}
      <div className="flex bg-white">
        <div className="w-[500px]">
          <SliderComponent />
        </div>
        <div className="ml-7">
          <h3 className="pt-1 pb-4 text-2xl font-bold">Danh mục</h3>
          <div className="grid grid-cols-5 gap-7">
            <CategoryComponent />
            <div className="flex justify-center items-center">
              <Link to={"/"}>Xem tất cả <span><RightCircleOutlined /></span></Link>
            </div>
          </div>
        </div>
      </div>

      {/* headline */}
      <div className="mt-4">
        <div className="flex px-2 py-4 bg-white ">
          <div className=" flex-1 py-4 text-center border-black border border-r-0 ">
            <SafetyCertificateOutlined style={{ fontSize: "35px" }} />
            <p>Hàng chính hãng 100%</p>
          </div>
          <div className="flex-1 py-4 text-center border-black border border-r-0">
            <TruckOutlined style={{ fontSize: "35px" }} />
            <p>{"Miễn phí giao hàng với đơn hàng >500k "}</p>
          </div>
          <div className="flex-1 py-4 text-center border-black border">
            <ReloadOutlined style={{ fontSize: "35px" }} />
            <p>Đổi hàng 30 ngày, bảo hành 12 tháng</p>
          </div>
        </div>
      </div>

      {/* product */}
      <Loading isLoading={isLoading} delay={200}>
      <div className="mt-4">
        <h3 className="text-center pt-4 pb-2 text-2xl font-bold text-blue-500 border-blue-400 border-b-2">GỢI Ý HÔM NAY</h3>
        <div className="grid grid-cols-5 gap-2 pt-2">
          {products?.data && (
            products.data.map((product: product) => (
              <CartProduct key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
      </Loading>
    </div>
  )
}
