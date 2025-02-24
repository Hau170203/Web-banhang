import { ProductState } from "../redux/slice/orderSlice";
import { axiosJWT } from "./userService";

const base_URL = "http://localhost:3000/api/order/"
const token = localStorage.getItem('token');
export const createProduct = async (data: ProductState) => {

    const response = await axiosJWT.post(`${base_URL}create-order`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};