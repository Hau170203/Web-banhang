import { Button, Image, Modal, Rate } from "antd"
import imageDetail1 from "../assets/image/imageDetail1.webp";
import imageDetail2 from "../assets/image/imageDetail2.webp";
import imageDetail3 from "../assets/image/imageDetail3.webp";
import { useState } from "react";
export const DetailProductComponent = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  }
  const handleCancel = () => {
    setShow(!show);
  }
  return (
    <>
      <div className="">
        {/* detail */}
        <div className="flex bg-white">
          <div className="pr-8">
            {/* image */}
            <div className="p-2 pb-0">
              <Image
                src={imageDetail1}
                alt="Image detail 1"
                height={"500px"}
                width={"500px"}
                preview={false} />
            </div>
            {/* list image Detail */}
            <div className="flex p-2 gap-1">
              <Image
                src={imageDetail2}
                alt="Image detail 2"
                height={"79px"}
                width={"79px"}
                preview={true} />
              <Image
                src={imageDetail3}
                alt="Image detail 3"
                height={"79px"}
                width={"79px"}
                preview={true} />
            </div>
          </div>
          {/* information */}
          <div className="p-2 space-y-4">
            <h3 className="text-2xl font-semibold">GIÀY AF1 DA LỘN XÁM LÔNG CHUỘT CHUỘT</h3>
            <div>
              <Rate disabled defaultValue={5} />
            </div>
            <p className="text-lg">Giá bán: <span className="text-lg font-semibold text-red-500">2,800,000 đ</span></p>
            <p className="text-lg">Kho hàng: <span className="text-lg font-semibold text-green-500">Còn hàng</span></p>
            <p className="text-lg">Thương hiệu: <span className="text-lg font-semibold">NIKE</span></p>
            <div className="space-y-2">
              <p className="text-lg ">Chọn size:</p>
              <div className="space-x-2">
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">38</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">39</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">40</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">41</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">42</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">43</button>
                <button className="btn border py-2 px-4 hover:bg-blue-700 hover:text-white">44</button>
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
                <button className="size-9 border">-</button>
                <input type="number" defaultValue={1} className="text-center w-12 h-9 border" />
                <button className="size-9 border">+</button>
              </div>
            </div>
            <div className="space-x-2">
              <button className="bg-blue-600 p-4 text-lg font-semibold text-white rounded">THÊM VÀO GIỎ HÀNG</button>
              <button className="bg-red-600 p-4 text-lg font-semibold text-white rounded">MUA NGAY</button>
            </div>
          </div>
        </div>
        {/* describe */}
        <div className="px-2 mt-3 bg-white">
        <h3 className="text-xl font-semibold">Mô tả sản phẩm</h3>
        <div>
          <p className="text-base font-semibold">QUYỀN LỢI KHÁCH VÀ CAM KẾT</p>
          <p className="text-base">Tất cả sản phẩm đều đi kèm hộp, bill và phụ kiện đầy đủ. </p>
          <p>✔ Nếu bạn nhận được sản phẩm lỗi hoặc thiếu phụ kiện và quà tặng. Mong các bạn nhắn tin cho shop khắc phục trước khi đánh giá sản phẩm. Shop cam kết sẽ luôn có trách nhiệm với sản phẩm đã bán</p>
          <p>✔ Đổi ngay hàng mới nếu nhận hàng bị lỗi, hỏng từ phía nhà sản xuất</p>
        </div>
        </div>
      </div>
    </>
  )
}
