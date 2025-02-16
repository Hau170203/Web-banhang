import { Button, Image, Modal, Rate } from "antd"
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import * as productService from "../services/productService";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addOrderProduct } from "../redux/slice/orderSlice";
export const DetailProductComponent = () => {
  const { id } = useParams();
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(38);
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sizeShoes = [38, 39, 40, 41, 42, 43, 44];
  const handleClick = () => {
    setShow(!show);
  }
  const handleCancel = () => {
    setShow(!show);
  }

  const handleClickAdd = () => {
    setCount(count + 1);
  }
  const handleClickMinus = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  }
  const handleClickSize = (item: number) => {
    setSize(item);
  }


  const getDetailProduct = async (id: string) => {
    // console.log("id", id);
    const res = await productService.productDetail(id);
    return res.data;
  };

  const { data, isLoading } = useQuery(
    ["product", id],
    ({ queryKey }) => getDetailProduct(queryKey[1] as string),
    {
      enabled: !!id
    }
  );
  const handleClickAddCart = () => {
    console.log("add to cart");
    dispatch(addOrderProduct({
      orderItem: {
        name: data.name,
        amount: count,
        image: data.image,
        price: data.price,
        size: size,
        product: data._id
      }
    }))
    if (!user._id) {
      navigate("/sign-in", { state: { from: `/detail-product/${id}` } });
    }
  }
  const handleClickBuy = () => {
    console.log("buy now");
  }
  // console.log("user", user);
  return (
    <>
      {data && (
        <Loading isLoading={isLoading} delay={200}>
          <div className="">
            {/* detail */}
            <div className="flex bg-white">
              <div className="pr-8">
                {/* image */}
                <div className="p-2 pb-0">
                  <Image
                    src={data?.image}
                    alt="Image detail 1"
                    height={"500px"}
                    width={"500px"}
                    preview={false} />
                </div>
                {/* list image Detail */}
                <div className="flex p-2 gap-1">
                  {data?.imageDetail && (
                    data.imageDetail.map((image: string, index: number) => (
                      <Image
                        key={index}
                        src={image}
                        alt={`image detail ${index}`}
                        height={"79px"}
                        width={"79px"}
                        preview={true} />
                    ))
                  )}
                </div>
              </div>
              {/* information */}
              <div className="p-2 space-y-4">
                <h3 className="text-2xl font-semibold">{data.name.toUpperCase()}</h3>
                <div>
                  <Rate disabled defaultValue={data.rating} />
                </div>
                <p className="text-lg">Giá bán: <span className="text-lg font-semibold text-red-500">{data.price.toLocaleString("vi-VN")} đ</span></p>
                <p className="text-lg">Kho hàng: <span className="text-lg font-semibold text-green-500">{data.countInStock.toLocaleString("vi-VN")}</span></p>
                <p className="text-lg">Thương hiệu: <span className="text-lg font-semibold">{data.type}</span></p>
                <div className="space-y-2">
                  <p className="text-lg ">Chọn size:</p>
                  <div className="space-x-2">
                    {sizeShoes?.map((item, index) => (
                      <button key={index} className={`btn border py-2 px-4 hover:bg-blue-700  hover:text-white  ${size === item && " bg-blue-700"} `} onClick={() => handleClickSize(item)}>{item}</button>
                    ))}

                  </div>
                  <Button type="link" onClick={handleClick}>Hưỡng dẫn chọn size</Button>
                  <Modal title="Hưỡng dẫn chọn size" open={show} onCancel={handleCancel} footer={null} >
                    <img src="https://admin.thegioigiay.com/upload/news/content/2022/04/cach-do-size-giay-nu-1-jpg-1650510797-21042022101317.jpg"
                      alt="anh size giay"
                    />
                  </Modal>
                </div>
                <div className="flex">
                  <p className="text-lg">Số lượng: </p>
                  <div className="flex ml-6 space-x-2">
                    <Button className="size-9 border" onClick={handleClickMinus}>-</Button>
                    <input type="number" value={count} className="text-center w-12 h-9 border" readOnly />
                    <Button className="size-9 border" onClick={handleClickAdd}>+</Button>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button className="bg-blue-600 p-4 h-14 text-lg font-semibold text-white rounded" onClick={handleClickAddCart}>THÊM VÀO GIỎ HÀNG</Button>
                  <Button className="bg-red-600 p-4  h-14 text-lg font-semibold text-white rounded" onClick={handleClickBuy}>MUA NGAY</Button>
                </div>
              </div>
            </div>
            {/* describe */}
            <div className="px-2 mt-3 bg-white">
              <h3 className="text-xl font-semibold">Mô tả sản phẩm</h3>
              <div dangerouslySetInnerHTML={{ __html: data?.description }} />
            </div>
          </div>
        </Loading>
      )}
    </>
  )
}