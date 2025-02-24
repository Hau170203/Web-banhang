
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
    orderItem: [
        {
            name: string,
            amount: number,
            image: string,
            price: number,
            size: number,
            product: string,
        }
    ],
    shippingAddress: {
        address?: string,
        phone?: string,
    },
    paymentMethod: string,
    itemsPrice: number,
    ShippingPrice: number,
    totalPrice: number,
    user: string
}

const initialState: ProductState = {
    orderItem: <any>[],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    ShippingPrice: 0,
    totalPrice: 0,
    user: '',
}

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action: PayloadAction<any>) => {
            const { orderItem } = action.payload;
            // console.log('orderItem', orderItem);
            const index = state.orderItem.findIndex(item => item.product === orderItem.product && item.size === orderItem.size);
            if (index !== -1) {
                state.orderItem[index].amount += orderItem.amount;
            } else {
                state.orderItem.push({ ...orderItem});
            }
        },
        increacseAmount: (state, action: PayloadAction<any>) => {
            const { id, size } = action.payload;
            // console.log('action', id, size)
            const itemsOrder = state.orderItem.filter(item => item.product === id && item.size === size)
            console.log('index', itemsOrder)
            if (itemsOrder.length > 0) {
                itemsOrder[0].amount++;
            }
        },
        decreacseAmount: (state, action: PayloadAction<any>) => {
            const { id, size } = action.payload;
            // console.log('payload', action.payload);
            // console.log('state', state)
            const itemsOrder = state.orderItem.filter(item => item.product === id && item.size === size)
            console.log('index', itemsOrder)
            if (itemsOrder.length > 0) {
                itemsOrder[0].amount--
            }
        },
        removeOrderProduct: (state, action: PayloadAction<any>) => {
            const { id, size } = action.payload;
            // console.log("order", id, size)
            const itemsOrder: any = state.orderItem.filter(item => !(item.product === id && item.size === size))
            // console.log('itemsOrder', itemsOrder);
            state.orderItem = itemsOrder
        },
        addOrderAddress: (state, action: PayloadAction<any>) => {
            const {address, phone}= action.payload;
            state.shippingAddress.address = address;
            state.shippingAddress.phone = phone

        }
    },
})

// Action creators are generated for each case reducer function
export const { addOrderProduct, increacseAmount, decreacseAmount, removeOrderProduct, addOrderAddress} = orderSlice.actions

export default orderSlice.reducer