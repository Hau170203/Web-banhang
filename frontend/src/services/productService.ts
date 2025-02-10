import axios from "axios";
import { FieldType } from "../components/AdminProduct";
const base_URL = "http://localhost:3000/api/product/"

export const getAllProduct = async () => {
    const response = await axios.get(`${base_URL}all-product`);
    return response.data;
}

export const createProduct = async (data: FieldType) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${base_URL}create-product`,data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
}