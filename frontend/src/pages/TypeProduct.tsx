import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import * as productService from "../services/productService";
import { UnorderedListOutlined } from "@ant-design/icons";
import Loading from "../components/Loading";
import CartProduct from "../components/CartProduct";
import { Empty } from "antd";

const TypeProduct = () => {
    const { type } = useParams<{ type: string }>();
    const navigate = useNavigate();
    // console.log("id", type);
    const [typeProduct, setTypeProduct] = useState<string>(type || "");

    const allType = ["nike", "adidas", "puma", "gucci", "dior", "mlb", "vans", "lining", "balenciaga"];
    const getTypeProduct = async (type: string) => {
        const res = await productService.getProductByType(type);
        return res.data;
    };
    // console.log("typeProduct", typeProduct);

    const { data, isLoading } = useQuery({
        queryKey: ["typeProduct", typeProduct], queryFn: () => getTypeProduct(typeProduct),
        enabled: !!typeProduct,
        retry: 3,
        staleTime: 1000 * 60 * 5,
    });
    const handleTypeChange = (type: string) => {
        setTypeProduct(type);
        navigate(`/type-product/${type}`);
    }

    // console.log("data", data);
    return (
        <>
            <div className="flex justify-start">
                <div className="type w-[200px] ">
                    <h3 className="text-xl font-semibold border-b border-gray-500 py-2 mb-2">
                        <span className=" pl-1 pr-3"><UnorderedListOutlined /></span>
                        Tất cả danh mục
                    </h3>
                    <ul className="w-full bg-gray-300">
                        {allType.map((type, index) => (
                            <li className="py-2" key={index}>
                                <button className={`w-full text-left pl-6 text-lg hover:text-red-300 ${typeProduct === type ? "text-red-400" : ""} `} onClick={() => handleTypeChange(type)}>{type}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="product flex-1 ml-4 mt-11">
                    <Loading isLoading={isLoading} delay={200} >
                            {data?.length > 0 ? (
                                <>
                                <div className="grid grid-cols-4 gap-4">
                                    {data.map((product: any, index: number) => (
                                        <CartProduct key={index} product={product} />
                                    ))}
                                </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-center items-center  h-full w-full pt-5">
                                        <div>
                                            <Empty />
                                        <div className="text-center text-2xl">Không có sản phẩm nào</div>
                                        </div>
                                    </div>
                                </>
                            )}
                    </Loading>
                </div>
            </div>
        </>
    )
}

export default TypeProduct