
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
    orderItem: [
        {
            name?: string,
            amount?: number,
            image?: string,
            price?: number,
            size?: number,
            product?: string
        }
    ],
    shippingAddress: {
        fullName?: string,
        address?: string,
        city?: string,
        phone?: string,
    },
    paymentMethod:  string,
    itemsPrice: number,
    ShippingPrice: number,
    taxPrice: number,
    totalPrice: number,
    user: string,
    isPaid: boolean,
    paidAt: string,
    isDelivered: boolean,
    deliveredAt: string,
}

const initialState: ProductState = {
    orderItem: <any>[],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    ShippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action: PayloadAction<any>) => {
            const { orderItem } = action.payload;
            console.log('orderItem', orderItem);
            const index = state.orderItem.findIndex(item => item.product === orderItem.product && item.size === orderItem.size);
            console.log("checkItem", index);
            if(index !== -1){
                state.orderItem[index].amount += orderItem.amount;
            } else {
                state.orderItem.push(orderItem);
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct } = orderSlice.actions

export default orderSlice.reducer