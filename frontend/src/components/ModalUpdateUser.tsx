import { Button, message, Modal, Upload } from 'antd';
import React, { useEffect, useState } from 'react';
import * as userService from '../services/userService'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import Loading from './Loading';
import { useMutationHook } from '../hooks/useMutationHook';
import { updataUser } from '../redux/slice/userSlice';
import { UploadOutlined } from '@ant-design/icons';
import { UploadChangeParam } from "antd/es/upload/interface";
import { FileType, getBase64 } from '../ultis';

interface pros {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const ModalUpdateUser = ({ open, setOpen }: pros) => {
  const user = useSelector((state: RootState) => state.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState('');
  const dispatch = useDispatch();


  // const [confirmLoading, setConfirmLoading] = useState(false);
  const [dataUser, setDataUser] = useState({
    name: user?.name || "",
    email: user?.email || "",
    avatar: user?.avatar || "",
    phone: user?.phone || "",
    address: user?.address || ""
  })

  useEffect(() => {
    setDataUser({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      avatar: user?.avatar || "",
      address: user?.address || ""
    })
  }, [user])

  const handleCancel = () => {
    setOpen(false)
  }
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value);
    setDataUser({
      ...dataUser,
      name: e.target.value,
    })
  };

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setDataUser({
      ...dataUser,
      email: e.target.value,
    })
  }

  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e.target.value)
    setDataUser({
      ...dataUser,
      phone: e.target.value,
    })
  }

  const handleChangeAddress = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // console.log(e.target.value)
    setDataUser({
      ...dataUser,
      address: e.target.value,
    })
  };

  const handleChangeAvatar =async ( info: UploadChangeParam) => {
    // console.log(info.fileList[0]);
    const file = info.fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    };
    if(file.preview){
      setAvatar(file.preview)
    }
    setDataUser({
      ...dataUser,
      avatar
    })
  };


  const mutation = useMutationHook(
    ({ id, dataUser }: { id: string; dataUser: userService.updataUser }) => userService.updateUser(id, dataUser)
  );

  const { data, isSuccess, isError } = mutation;
  console.log(mutation)
  useEffect(() => {
    if (isSuccess) {
      messageApi.success(data?.message)
      dispatch(updataUser(data?.user))
    }
    if (isError) {
      messageApi.error(mutation.error && (mutation.error as any).response.data.message);
    }
  }, [isSuccess, isError])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    console.log(dataUser)
    if (user._id) {
      mutation.mutate({ id: user._id, dataUser });
    }
    setLoading(false)
    setOpen(false);
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
              defaultValue={dataUser?.name}
              onChange={handleChangeName} />
          </div>
          <div className='email'>
            <label htmlFor="email" className='text-base'>Email:</label>
            <input type="email"
              name="email"
              className='border border-black ml-[30px] w-[300px] h-7 pl-1'
              defaultValue={dataUser?.email}
              onChange={handleChangeEmail} />
          </div>
          <div className='avatar flex'>
            <label htmlFor="avatar" className='text-base'>Avatar: </label>
            <Upload className='ml-[19px] mr-5' onChange={handleChangeAvatar} maxCount={1}>
              <Button  icon={<UploadOutlined />}>Upload</Button>
            </Upload>
            {avatar && (
              <img src={avatar} alt="avatar" 
              style={{ width: "70px", height: "70px", borderRadius:"50%", objectFit:"cover"  }}/>
            )}
          </div>
          <div className='phone'>
            <label htmlFor="phone" className='text-base'>Phone:</label>
            <input type="text"
              name="phone"
              className='border border-black ml-[23px] w-[300px] h-7 pl-1'
              defaultValue={dataUser?.phone}
              onChange={handleChangePhone} />
          </div>
          <div className='address flex items-center'>
            <label htmlFor="address" className='text-base'>Address:</label>
            <textarea name="address"
              rows={2} cols={50}
              className='border border-black ml-[12px] pl-1 '
              onChange={handleChangeAddress} defaultValue={dataUser?.address}></textarea>
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