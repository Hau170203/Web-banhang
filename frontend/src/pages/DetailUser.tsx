import { useSelector } from "react-redux"
import { RootState } from "../redux/store";
import ModalUpdateUser from "../components/ModalUpdateUser";
import {  useState } from "react";


const DetailUser = () => {
    const user = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);
    return (
        <>
            <ModalUpdateUser open={open} setOpen={setOpen}  />
            <div className="h-[75vh]">
                <div className="detailUser mx-3 bg-white my-5 rounded py-5 ">
                    <div className="  border-b-2 border-black mx-5 pb-5">
                        <h2 className="text-2xl font-semibold">Thông tin cá nhân</h2>
                        <p className="text-base">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
                    </div>
                    <div className="mt-7 border-2  border-gray-500 rounded mx-5  py-6">
                            <div className="m-3 space-y-6 px-10">
                                <div className="name">
                                    <label htmlFor="name" className="text-base font-medium" >Họ tên: </label>
                                    <span>{user?.name}</span>
                                </div>
                                <div className="email">
                                    <label htmlFor="email" className="text-base font-medium">Email: </label>
                                    <span>{user?.email}</span>
                                </div>
                                <div className="phone">
                                    <label htmlFor="phone" className="text-base font-medium">Số điện thoại: </label>
                                    <span>{user?.phone}</span>
                                </div>
                                <div className="address">
                                    <label htmlFor="address" className="text-base font-medium">Địa chỉ: </label>
                                    <span>{user?.address}</span>
                                </div>
                                <div className="flex justify-end">
                                    <button className="text-base font-medium bg-blue-600 hover:bg-blue-400 px-4 py-2 text-white rounded" onClick={() => setOpen(true)}>chỉnh sửa</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailUser