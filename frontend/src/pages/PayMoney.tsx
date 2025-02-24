import { Button, Flex, message, Radio, RadioChangeEvent } from "antd"
import { useSelector } from "react-redux"
import { RootState } from "../redux/store"
import { useEffect, useMemo, useState } from "react"
import { useMutationHook } from "../hooks/useMutationHook";
import { ProductState } from "../redux/slice/orderSlice";
import * as orderService from "../services/orderService";
import Loading from "../components/Loading";


const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 9,
};

const PayMoney = () => {
    const order = useSelector((state: RootState) => state.order);
    const user = useSelector((state: RootState) => state.user);
    const [value, setValue] = useState(1);
    const [value2, setValue2] = useState(1);
    const money = order.orderItem.reduce((acc, item) => acc + (item.price * item.amount), 0);
    // console.log('money', money)


    let moneyShip = useMemo(() => {
        let mone = money >= 5000000 ? 0 : 30000
        return Number(value === 1 ? mone + 10000 : mone)
    }, [money, value])
    let paymentMethod = useMemo(() => {
        return value2 === 1 ? "Thanh toán sau khi nhận hàng" : "Thanh toán qua thẻ ngân hàng"
    }, [value2])
    const totalMoney = useMemo(() => {
        return Number(money + moneyShip)
    }, [money, moneyShip])
    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    }
    const onChange2 = (e: RadioChangeEvent) => {
        setValue2(e.target.value);
    };


    const mutation = useMutationHook(
        (data: ProductState) => orderService.createProduct(data),
    );

    const { isLoading,error, isError, isSuccess} = mutation;

    useEffect(() => {
        if(isSuccess){
            message.success("Đặt hàng thành công!")
        } else if(isError){
            const err = error as any; 
            message.error(err?.response?.data?.message || "Đặt hàng không thành công!");
        }
    })
    const handleClick = () => {
        mutation.mutate({
            orderItem: order.orderItem,
            shippingAddress: order.shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice: money,
            ShippingPrice: moneyShip,
            totalMoney: totalMoney,
            user: user._id
        })
    }
    return (
        <>
            <Loading isLoading={isLoading} delay={200}>
            <div className='paymoney'>
                <div className='flex '>
                    <div className='flex-1 mr-2 p-3 bg-white rounded'>
                        <p className="mb-2">Chọn phương thức giao hàng:</p>
                        <div className="p-2 rounded bg-blue-100 w-[300px] border border-blue-300 mb-4">
                            <Radio.Group
                                onChange={onChange}
                                value={value}
                                style={style}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                <p><span className="text-lg font-medium text-orange-400">FAST</span> Giao hàng nhanh</p>
                                            </Flex>
                                        ),
                                    },
                                    {
                                        value: 2,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                <p><span className="text-lg font-medium text-orange-400">GHTT</span> Giao hàng tiết kiệm</p>
                                            </Flex>
                                        ),
                                    }
                                ]}
                            />
                        </div>

                        <p className="mb-2 pt-4 border-t">Chọn phương thức thanh toán:</p>
                        <div className="p-2 rounded bg-blue-100 w-[300px] border border-blue-300">
                            <Radio.Group
                                onChange={onChange2}
                                value={value2}
                                style={style}
                                options={[
                                    {
                                        value: 1,
                                        label: (
                                            <Flex gap="small" justify="center" align="center" vertical>
                                                <p> Thanh toán sau khi nhận hàng</p>
                                            </Flex>
                                        ),
                                    }
                                ]}
                            />
                        </div>
                    </div>
                    <div className='w-[300px] bg-white rounded pb-3'>
                        <div className='p-3'>
                            <p>Địa chỉ:
                                <span> {order.shippingAddress.address}</span>
                            </p>
                            <p>Số điện thoại:
                                <span> {order.shippingAddress.phone}</span>
                            </p>
                            <p className='text-blue-400 text-end hover:text-blue-500 pl-3 cursor-pointer' >Thay đổi</p>
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
                            <Button size='large' className='w-[150px]' color="danger" variant="solid" onClick={handleClick}>Đặt  hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
            </Loading>
        </>
    )
}

export default PayMoney