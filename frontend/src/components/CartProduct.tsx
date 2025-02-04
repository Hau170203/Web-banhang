import { Card } from 'antd';
import image1 from "../assets/image/image1.jpeg";


const CartProduct = () => (
    <Card
        hoverable
        style={{ width: 250, borderRadius: 0, padding:0,  overflow:"hidden"}}
        cover={<img alt="example" src={image1}  />}
    >
        <div >
            <h4 className='text-center text-base text-gray-400'>Nike</h4>
            <h3 className='text-base'>Giày Nike Quest 6 Nam - Xám</h3>
            <p className='text-base text-red-500'>2.390.000₫ <span>-11%</span></p>
            <p className='text-base line-through'>2.700.000₫</p>
        </div>
    </Card>
);

export default CartProduct;