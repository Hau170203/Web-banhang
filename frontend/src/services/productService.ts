import axios from "axios";
const base_URL = "http://localhost:3000/api/product/"

export const getAllProduct = async () => {
    const response = await axios.get(`${base_URL}/all-product`)
    return response.data;
}