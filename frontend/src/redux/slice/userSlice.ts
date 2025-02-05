import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface user {
  _id: string,
  name: string,
  email: string,
  avatar: string,
  phone: string,
  address: string,
  access_token: string,
}

const initialState: user = {
  _id: "",
  name: "",
  email: "",
  avatar: "",
  phone: "",
  address: "",
  access_token: "",
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    updataUser: (state, action: PayloadAction<user>) => {
      const { _id, name, email, avatar, phone, address, access_token } = action.payload;
      // console.log(action)
      state._id = _id,
        state.name = name || "",
        state.email = email,
        state.avatar = avatar || "",
        state.phone = phone,
        state.address = address || "",
        state.access_token = access_token
    },
    resetUser: (state) => {
      state._id = "",
        state.name = "",
        state.email = "",
        state.phone = "",
        state.address = "",
        state.access_token = ""
    }
  },
})

// Action creators are generated for each case reducer function
export const { updataUser, resetUser } = userSlice.actions

export default userSlice.reducer