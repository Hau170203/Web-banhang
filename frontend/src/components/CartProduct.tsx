import { Badge, Card, Rate } from 'antd';
import { product } from '../pages/Home';
import { useNavigate } from 'react-router';



const CartProduct: React.FC<{ product: product }> = ({ product }) => {
    const { name, type, image, price, countInStock, rating, seller, discount } = product;
    const navigate = useNavigate();

    const handleClick = (id: string) => {
        navigate(`/detail-product/${id}`);
    }
        
    return (
        <>
            <Badge.Ribbon text={(discount || "11") + " %"} color='red'>
                <Card
                    hoverable
                    style={{ width: 250, borderRadius: 0, padding: 0, overflow: "hidden" }}
                    cover={<img alt={name} src={image} />}
                    onClick={() => handleClick(product._id)}
                >
                    <div className='space-y-2'>
                        <div className="flex justify-center">
                            <Rate disabled allowHalf defaultValue={rating} />
                        </div>
                        <h4 className='text-center text-base text-gray-500 bg-gray-200'>{type}</h4>
                        <h3 className='text-base'>{name.length > 20 ? (`${name.slice(0,20)} ...`) : name}</h3>
                        <p className='text-lg font-semibold text-red-500'><span className='text-black text-base'>Giá: </span>{price.toLocaleString("vi-VN")} đ</p>
                        <p className='text-base'>Số lượng còn lại: {countInStock.toLocaleString("vi-VN")}</p>
                        <p className='text-base'>Đã bán: {seller}</p>
                    </div>
                </Card>
            </Badge.Ribbon>
        </>
    )
}


export default CartProduct;