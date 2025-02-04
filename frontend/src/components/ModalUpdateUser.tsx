import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import * as userService from '../services/userService'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loading from './Loading';
import { useMutationHook } from '../hooks/useMutationHook';

interface pros {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalUpdateUser = ({ open, setOpen }: pros) => {
  const user = useSelector((state: RootState) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false)


  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [data, setData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || ""
  })

  useEffect(() => {
    setData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || ""
    })
  },[user])

  const handleCancel = () => {
    setOpen(false)
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setData({
      ...data,
      name: e.target.value,
    })
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setData({
      ...data,
      email: e.target.value,
    })
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setData({
      ...data,
      phone: e.target.value,
    })
  }

  const handleChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e.target.value)
    setData({
      ...data,
      address: e.target.value,
    })
  }

  const mutation = useMutationHook(
    ({ id, data }: { id: string; data: userService.updataUser }) => userService.updateUser(id, data)
  );

  const { isLoading, isSuccess, isError } = mutation
  useEffect(() => {
    if (isSuccess) {
      messageApi.success("Cập nhật thành công")
    }
    if (isError) {
      messageApi.error("Cập nhật thất bại")
    }
  }, [isSuccess, isError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    console.log(data)
    if (user._id) {
      mutation.mutate({ id: user._id, data });
    }
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Sửa thông tin"
        open={open}
        footer={false}
        onCancel={handleCancel}
      >
        <form className='mt-5 space-y-5' onSubmit={handleSubmit}>
          <div className='name'>
            <label htmlFor="name" className='text-base'>Họ tên:</label>
            <input type="text"
              name="name"
              className='border border-black ml-5 w-[300px] h-7 pl-1'
              defaultValue={data?.name}
              onChange={handleChangeName} />
          </div>
          <div className='email'>
            <label htmlFor="email" className='text-base'>Email:</label>
            <input type="email"
              name="email"
              className='border border-black ml-[30px] w-[300px] h-7 pl-1'
              defaultValue={data?.email}
              onChange={handleChangeEmail} />
          </div>
          <div className='phone'>
            <label htmlFor="phone" className='text-base'>Phone:</label>
            <input type="text"
              name="phone"
              className='border border-black ml-[23px] w-[300px] h-7 pl-1'
              defaultValue={data?.phone}
              onChange={handleChangePhone} />
          </div>
          <div className='address flex items-center'>
            <label htmlFor="address" className='text-base'>Address:</label>
            <textarea name="address"
              rows={2} cols={50}
              className='border border-black ml-[12px] pl-1 '
              onChange={handleChangeAddress} defaultValue={data?.address}></textarea>
          </div>
          <div className='flex justify-end'>
            <Loading isLoading={loading} delay={200}>
              <button type="submit" className="bg-blue-600 hover:bg-blue-400 px-4 py-2 text-lg font-semibold text-white rounded">Cập nhật</button>
            </Loading>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default ModalUpdateUser;