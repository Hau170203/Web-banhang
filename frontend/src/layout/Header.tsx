import { Link } from "react-router"
import DropDown from "../components/DropDown"
import { SearchOutlined, ShoppingCartOutlined } from "@ant-design/icons"


export const Header = () => {
  return (
    <header className=" bg-blue-500">
      <div className="flex items-center container h-[70px] w-screen px-5 z-50 mx-auto">
        <Link className="text-white text-3xl " to={"/"}>Shop shoes</Link>
        <div className=" relative flex flex-1  justify-center z-50 d-none ">
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="  h-12  sm:w-[300px] md:w-[400px] lg:w-[500px] xl:w-[600px]  rounded-md px-2  pr-14 focus:outline-none" />
          <button className="absolute hidden lg:inline-block   lg:right-[15%]  top-1.5 bg-blue-500 px-3 py-1.5 rounded-sm focus:outline-none">
            <SearchOutlined style={{ fontSize: "20px" }} />
          </button>
        </div>
        <div className="min-w-[200px]">
          <DropDown />
        </div>
        <button className="pl-5 pr-6">
          <ShoppingCartOutlined style={{ fontSize: "30px", color: "white" }} />
        </button>
      </div>
    </header>
  )
}
