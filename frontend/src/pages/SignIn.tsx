import { Input, message } from "antd"
import { Link, useLocation, useNavigate } from "react-router"
import imageSignIn from "../assets/image/imageSignIn.webp"
import React, { useEffect, useState } from "react"
import * as userSevice from "../services/userService"
import { useMutationHook } from "../hooks/useMutationHook"
import Loading from "../components/Loading"
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux"
import { updataUser } from "../redux/slice/userSlice"

export interface dataForm {
    email: string,
    password: string
}
export interface decode {
    exp: number
    iat: number
    id: string
    isAdmin: boolean
}
export const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    console.log('location', location)
    const [messageApi, contextHolder] = message.useMessage();
    const dispatch = useDispatch();
    const [dataForm, setDataForm] = useState<dataForm>({
        email: "",
        password: ""
    });
    const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataForm({
            ...dataForm,
            email: value
        })
    };
    const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setDataForm({
            ...dataForm,
            password: value
        })
    }

    const mutation = useMutationHook(
        (data: dataForm) => userSevice.loginUser(data),
    );
    useEffect(() => {
        if (mutation.isSuccess) {
            // console.log("mutation token", mutation.data);
            const token = mutation.data?.access_token;
            if (token) {
                localStorage.setItem("token", token);
                messageApi.success("Đăng nhập thành công");
                const decoded = jwtDecode<decode>(token);
                // console.log(decoded);
                if (decoded?.id) {
                    handleDetailUser(decoded?.id, token)
                }
                setTimeout(() => {
                    navigate(`${location.state?.from || "/"}`);
                }, 2000);
            }
        } else if (mutation.status == "error") {
            messageApi.error(mutation.error && (mutation.error as any).response.data.message);
        }
    }, [mutation.isSuccess, mutation.status]);

    const handleDetailUser = async (id: string, access_token: string) => {
        const res = await userSevice.detailUser(id);
        // console.log(res)
        if (res.user) {
            dispatch(updataUser({ ...res.user, access_token }))
        }
        console.log({ ...res.user, access_token })
    };
    console.log("mutation", mutation);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log("dataForm", dataForm);
        mutation.mutate(dataForm);
    };


    return (
        <>
            {contextHolder}
            <div className="min-h-[80vh] flex justify-center items-center z-0">
                <div className="flex rounded overflow-hidden">
                    <form className="w-96 bg-white p-4 " onSubmit={handleSubmit} >
                        <h4 className="text-3xl text-center font-semibold ">Đăng nhập</h4>
                        <div className="space-y-7 my-9">
                            <Input type="text" size="large" placeholder="Email" required onChange={changeEmail} autoComplete="email" />
                            <Input type="password" size="large" placeholder="Password" required onChange={changePassword} autoComplete="password" />
                        </div>
                        <Loading isLoading={mutation.isLoading} delay={200}>
                            <button type="submit" className="bg-blue-600 w-full py-2 text-lg font-semibold text-white rounded" >Đăng nhập</button>
                        </Loading>
                        <div className="mt-8">
                            <a href="#" className="text-blue-500">Quên mật khẩu? </a>
                            <p >Bạn chưa có tài khoản? <span><Link to={"/register"} className="text-blue-500">Đăng ký</Link></span></p>
                        </div>
                    </form>
                    <div>
                        <img src={imageSignIn} alt="" style={{ width: "300px", height: "400px" }} />
                    </div>
                </div>
            </div>
        </>
    )
}
