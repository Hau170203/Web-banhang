import { DeleteOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Order = () => {
    const order = useSelector((state: RootState) => state.order);

    const coutCart = order.orderItem.reduce((acc, item) => acc + (item.amount ?? 0), 0);
  return (
    <>
        <div className='order'>
            <h1>Giỏ hàng</h1>
            <div className='flex '>
                <div className='flex-1 bg-white rounded'>
                    <table className='w-full m-4'>
                        <thead>
                            <tr >
                                <th className='text-left w-[450px]'>
                                <span className='pr-4'><input type="checkbox"/></span>
                                 Tất cả {`(${coutCart} sản phẩm)`}</th>
                                <th className='text-left  w-[150px]'>Size</th>
                                <th className='text-left w-[150px]'>Đơn giá</th>
                                <th className='text-left w-[250px]'>Số lượng</th>
                                <th className='text-left w-[150px]'>Thành tiền</th>
                                <th className='text-left w-[150px]'><DeleteOutlined /></th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.orderItem.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className='flex items-center'>
                                            <span className='pr-4'><input type="checkbox" /></span>
                                            <img src={item.image} className='w-12 h-12 object-cover' alt={item.name} />
                                            <div>
                                                {item.name && (
                                                    <p>{item.name.length > 30 ? (`${item.name.slice(0,30)} ...`) : item.name}</p>
                                                )} 
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item.size}</td>
                                    <td>{item.price ? item.price.toLocaleString("vi-VN") : 0}</td>
                                    <td>{item.amount}</td>
                                    <td>{((item.price ?? 0) * (item.amount ?? 0)).toLocaleString("vi-VN")}</td>
                                    <td>
                                        <button><DeleteOutlined /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    ddddddddddddddddddddddd
                </div>
            </div>
        </div>
    </>
  )
}

export default Order