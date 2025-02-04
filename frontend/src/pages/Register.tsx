import { Input } from "antd"
import { Link } from "react-router"
import imageRegister from "../assets/image/imageSignIn.webp"
import React, { useState } from "react"
import { useMutationHook } from "../hooks/useMutationHook"
import * as userSevice from "../services/userService"
import Loading from "../components/Loading"

export interface DataFormRegister {
    name: string,
    email: string,
    phone: string,
    password: string,
    checkPassword: string
}

export const Register = () => {
    const [dataFormRegister, setDataFormRegister] = useState<DataFormRegister>({
        name: "",
        email: "",
        phone: "",
        password: "",
        checkPassword: ""
    });
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataFormRegister({
            ...dataFormRegister,
            name: value
        })
    };
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataFormRegister({
            ...dataFormRegister,
            email: value
        })
    };
    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataFormRegister({
            ...dataFormRegister,
            phone: value
        })
    };
    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataFormRegister({
            ...dataFormRegister,
            password: value
        })
    };
    const handleChangeCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataFormRegister({
            ...dataFormRegister,
            checkPassword: value
        })
    };
    const mutation = useMutationHook(
        (data: DataFormRegister) => userSevice.registerUser(data),
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("dataFormRegister", dataFormRegister);
        mutation.mutate(dataFormRegister);
    };
    // console.log("mutition", mutation);

    return (
        <>
            <div className="h-[80vh] flex justify-center items-center">
                <div className="flex rounded overflow-hidden">
                    <form className="w-96 bg-white p-4 " onSubmit={handleSubmit} >
                        <h4 className="text-3xl text-center font-semibold ">Đăng ký</h4>
                        <div className="space-y-4 my-5">
                            <Input type="text" size="large" placeholder="Họ tên " onChange={handleChangeName} />
                            <Input type="text" size="large" placeholder="Email" onChange={handleChangeEmail} autoComplete="email" />
                            <Input type="text " size="large" placeholder="Số điện thoại" onChange={handleChangePhone} />
                            <Input type="password" size="large" placeholder="Password" onChange={handleChangePassword} autoComplete="new-password" />
                            <Input type="password" size="large" placeholder="Check Password" onChange={handleChangeCheck} autoComplete="new-password" />
                        </div>
                        <Loading isLoading={mutation.isLoading} delay={200}>
                        <button type="submit" className="bg-blue-600 w-full py-1 text-lg font-semibold text-white rounded">Đăng ký</button>
                        </Loading>
                        <div className="mt-6">
                            <a href="#" className="text-blue-500">Quên mật khẩu? </a>
                            <p >Bạn đã có tài khoản? <span><Link to={"/sign-in"} className="text-blue-500">Đăng nhập</Link></span></p>
                        </div>
                    </form>
                    <div>
                        <img src={imageRegister} alt="" style={{ width: "300px", height: "510px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}
