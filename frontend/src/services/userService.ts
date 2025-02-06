import axios from 'axios';
import { dataForm } from '../pages/SignIn';
import { DataFormRegister } from '../pages/Register';
const base_URL = "http://localhost:3000/api/user/";
export const axiosJWT = axios.create();

 export interface updataUser {
  name: string,
  email: string,
  phone: string,
  address?: string,
 }

export const loginUser = async (data: dataForm) => {
    const response = await axios.post(`${base_URL}sign-in`, data,{
        withCredentials: true 
    });
    return response.data;
}

export const registerUser = async (data: DataFormRegister) => {
    const response = await axios.post(`${base_URL}sign-up`, data);
    return response.data;
}

export const detailUser = async (id: string) => {
    const response = await axiosJWT.get(`${base_URL}detail-user/${id}`,{
    });
    return response.data
}

export const refreshToken = async () => {
    const response = await axios.post(`${base_URL}refresh-token`, {}, {
        withCredentials: true  
    });
    return response.data
}

export const logOut = async () => {
    const response = await axios.post(`${base_URL}log-out` ,{}, {
        withCredentials: true
    });
    return response.data
}

export const updateUser = async ( id: string, data: updataUser) => {
    const response = await axios.put(`${base_URL}update-user/${id}`,data);
    return response.data
}