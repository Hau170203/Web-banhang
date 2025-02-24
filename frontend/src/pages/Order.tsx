import { DeleteOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Button, Input, Modal } from 'antd';
import { addOrderAddress, decreacseAmount, increacseAmount, removeOrderProduct } from '../redux/slice/orderSlice';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

const Order = () => {
    const order = useSelector((state: RootState) => state.order);
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [updateAddress, setUpdateAddress] = useState('');
    const [updatePhone, setUpdatePhone] = useState('');
    const [modalOpen, setModalOpen] = useState(false)
    const dispatch = useDispatch();
    const coutCart = order.orderItem.reduce((acc, item) => acc + (item.amount ?? 0), 0);
    const money = order.orderItem.reduce((acc, item) => acc + (item.price * item.amount), 0)
    // console.log('money', money)

    useEffect(() => {
        setAddress(user.address)
        setPhone(user.phone)
    }, [user.address, user.phone]);

    // console.log('address', address)

    let moneyShip = 0;
    money >= 5000000 ? moneyShip = 0 : moneyShip = 300000;

    const totalMoney = useMemo(() => {
        return Number(money + moneyShip)
    }, [money, moneyShip])

    const handleClicksSubtraction = (id: string, size: number, amount: number) => {
        if (amount > 1) {
            dispatch(decreacseAmount({ id, size }));
        }
    }
    const handleClicksAdd = (id: string, size: number) => {
        dispatch(increacseAmount({ id, size }));
    }
    const handleClickRemove = (id: string, size: number) => {
        dispatch(removeOrderProduct({ id, size }));
    }
    const handleClickAddress = () => {
        setModalOpen(true)
    };
    const handleCancel = () => {
        setModalOpen(false)
    }

    const handleChangeAddress = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateAddress(e.target.value);
    };
    const handleChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatePhone(e.target.value)
    }
    const handleOK = () => {
        if (updateAddress.length > 0) {
            setAddress(updateAddress);
        } else if (updatePhone.length > 0) {
            setPhone(updatePhone);
        }
        setModalOpen(false)
    }
    const handleBuy = () => {
        dispatch(addOrderAddress({address, phone}));
        navigate('/pay-money');
    }
    return (
        <>
            <div className='order'>
                <div className='flex '>
                    <div className='flex-1 mr-2 bg-white rounded'>
                        <table className=' order-separate border-spacing-3  m-4'>
                            <thead className='mb-3 border-b bg-gray-300'>
                                <tr className='py-5'>
                                    <th className='text-left w-[450px] py-4'>
                                        <span className='pr-4'><input type="checkbox" /></span>
                                        Tất cả {`(${coutCart} sản phẩm)`}</th>
                                    <th className='text-left  w-[150px] py-4'>Size</th>
                                    <th className='text-left w-[150px] py-4'>Đơn giá</th>
                                    <th className='text-left w-[250px] py-4'>Số lượng</th>
                                    <th className='text-left w-[150px] py-4'>Thành tiền</th>
                                    <th className='text-left w-[150px] py-4'><DeleteOutlined /></th>
                                </tr>
                            </thead>
                            <tbody >
                                {order.orderItem.map((item, index) => (
                                    <tr key={index} >
                                        <td className='py-4'>
                                            <div className='flex items-center'>
                                                <span className='pr-4'><input type="checkbox" /></span>
                                                <img src={item.image} className='w-16 h-16 object-cover' alt={item.name} />
                                                <div>
                                                    {item.name && (
                                                        <p>{item.name.length > 25 ? (`${item.name.slice(0, 25)} ...`) : item.name}</p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className='py-4'>{item.size}</td>
                                        <td className='py-4'>{item.price ? item.price.toLocaleString("vi-VN") : 0}</td>
                                        <td className='py-4'>
                                            <Button className='mr-2' onClick={() => handleClicksSubtraction(item.product, item.size, item.amount)}>-</Button>
                                            <Input type='number' value={item.amount} size='middle' style={{ width: "50px" }} />
                                            <Button className='ml-2' onClick={() => handleClicksAdd(item.product, item.size)}>+</Button>
                                        </td>
                                        <td className='py-4'>{((item.price ?? 0) * (item.amount ?? 0)).toLocaleString("vi-VN")}</td>
                                        <td className='py-4'>
                                            <button onClick={() => handleClickRemove(item.product, item.size)}><DeleteOutlined /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='w-[300px] bg-white rounded pb-3'>
                        <div className='p-3'>
                            <p>Địa chỉ:
                                <span> {address}</span>
                            </p>
                            <p>Số điện thoại:
                                <span> {phone}</span>
                            </p>
                            <p className='text-blue-400 text-end hover:text-blue-500 pl-3 cursor-pointer' onClick={handleClickAddress}>Thay đổi</p>
                        </div>
                        <div className='p-3 space-y-3 pb-2 border-b'>
                            <p className='flex justify-between'><span >Tạm tính: </span> <span >{money.toLocaleString('vi-VN')}</span></p>
                            <p className='flex justify-between'><span>Giảm giá: </span><span>0</span></p>
                            <p className='flex justify-between'><span>Phí giao hàng: </span> <span>{moneyShip.toLocaleString('vi-VN')}</span></p>
                        </div>
                        <div className='p-3'>
                            <h4>Tổng tiền: </h4>
                            <p className='flex justify-end text-xl font-medium text-red-500'>{totalMoney.toLocaleString("vi-VN")} đ</p>
                            <p className='flex justify-end'>(Đã bao gồm VAT nếu có)</p>
                        </div>
                        <div className='w-full flex justify-center'>
                            <Button size='large' className='w-[150px]' color="danger" variant="solid" onClick={handleBuy}>Mua hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal title="Thay đổi địa chỉ nhận hàng" open={modalOpen} onCancel={handleCancel} footer={false}>
                <div className='space-y-2'>
                    <Input type='text' defaultValue={address} onChange={handleChangeAddress} />
                    <Input type='text' defaultValue={phone} onChange={handleChangePhone} />
                </div>
                <div className='flex justify-end mt-3'>
                    <Button onClick={handleOK}>Thay đổi</Button>
                </div>
            </Modal>
        </>
    )
}

export default Order