// import { useEffect } from "react"
import { useEffect } from "react"
import { AllRoutes } from "./components/AllRoutes"
import { jwtDecode } from "jwt-decode";
import { decode } from "./pages/SignIn";
import * as userSevice from "./services/userService";
import { useDispatch } from "react-redux";
import { updataUser } from "./redux/slice/userSlice";

export const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const {Data, decoded}= handleDecode();
    // console.log(Data, decoded);
      if (decoded?.id && Data) {
        handleDetailUser(decoded?.id, Data)
      }
  }, []);

  const handleDecode = (): { Data: string | null; decoded: decode | null } => {
    const Data = localStorage.getItem('token');
    let decoded:decode | null = null
     if(Data) {
       decoded = jwtDecode<decode>(Data);
     }
    return {Data, decoded}
  }

  const handleDetailUser = async (id: string, access_token: string) => {
    const res = await userSevice.detailUser(id);
    if (res.user) {
      dispatch(updataUser({ ...res.user, access_token }))
    }
  }

  userSevice.axiosJWT.interceptors.request.use(async (config) => {
    const timeNow = new Date();
    // console.log("date", timeNow.getTime()/1000);
    const { decoded } = handleDecode();
    if(decoded && decoded?.exp < timeNow.getTime() / 1000){
      const data = await userSevice.refreshToken();
      config.headers['token'] = `Bearer ${data?.access_token}`
    }
    return config;
  }, (error) => {
    // Do something with request error
    return Promise.reject(error);
  });
  return (
    <>
      <AllRoutes />
    </>
  )
}
