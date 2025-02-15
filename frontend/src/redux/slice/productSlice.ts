import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface ProductState {
  search: string
}

const initialState: ProductState = {
  search: ''
}

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    searchProduct: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {  searchProduct } = productSlice.actions

export default productSlice.reducer