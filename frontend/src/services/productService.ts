import axios from "axios";

const base_URL = "http://localhost:3000/api/product/"

export interface serviceProduct {
    name: string,
    image: string,
    imageDetail: string,
    type: string,
    price: number,
    countInStock: number,
    description: string,
    discount: number,
    seller: number
}
const token = localStorage.getItem('token');
export const getAllProduct = async (search?: string) => {
    let response;
    if(search){
        response = await axios.get(`${base_URL}all-product?searchKey=name&searchValue=${search}`);
        return response.data;
    } else {
        response = await axios.get(`${base_URL}all-product`);
        return response.data;
    }
}

export const createProduct = async (data: serviceProduct) => {

    const response = await axios.post(`${base_URL}create-product`,data,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.data;
};

export const productDetail = async(id: string) => {
    const response = await axios.get(`${base_URL}detail-product/${id}`);
    return response.data
};

export const updateProduct = async (id: string, data: serviceProduct) => {
    const response = await axios.put(`${base_URL}update-product/${id}`, data ,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    } )
    return response;
}

export const deleteProduct = async (id: string) => {
    const response = await axios.delete(`${base_URL}delete-product/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}

export const getProductByType = async (type: string) => {
    const response = await axios.get(`${base_URL}type-product/${type}`);
    return response.data;
}