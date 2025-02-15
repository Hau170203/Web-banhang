
import { Button, Input, message, Modal, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { FileType, getBase64 } from '../ultis';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { useMutationHook } from '../hooks/useMutationHook';
import * as userService from '../services/userService';
import Loading from './Loading';
import TableUsers from './TableUsers';

const AdminUser = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataUser, setDataUser] = useState({
        name: "",
        image: "",
        email: "",
        password: "",
        checkPassword: "",
        address: "",
        phone: "",
        isAdmin: false
    });
    const [image, setImage] = useState("");
    const defaultFileList: UploadFile[] = dataUser.image
        ? [{ uid: "-1", name: "image.png", status: "done", url: dataUser.image }]
        : [];

    const handleClick = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            name: e.target.value
        })
    };

    const handleChangeImage = async (info: UploadChangeParam) => {
        // console.log(info.fileList[0]);
        const file = info.fileList[0];

        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        };
        if (file.preview) {
            setImage(file.preview)
        }
        setDataUser({
            ...dataUser,
            image
        })
    };

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            email: e.target.value
        })
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            password: e.target.value
        })
    };

    const handleChangeCheckPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            checkPassword: e.target.value
        })
    };

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            address: e.target.value
        })
    };

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            phone: e.target.value
        })
    };

    const handleChangeIsAdmin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataUser({
            ...dataUser,
            isAdmin: e.target.checked
        })
    };


    const mutation = useMutationHook(
        (data: userService.createUser) => userService.createUser(data)
    );

    const { data, error , isLoading, isSuccess, isError } = mutation;

    useEffect(() => {  
        if (isSuccess) {
            message.success("Tạo người dùng thành công");
        } else if (isError) {
            const err = error as any; 
            message.error(err?.response?.data?.message || "Tạo người dùng thất bại");
        }
    },[isError, isSuccess])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(dataUser);
        mutation.mutate(dataUser);
    };
    return (
        <>
            <div className='adminUser' >
                <h1 className='text-xl font-bold mb-2'>Quản lý người dùng</h1>
                <Button style={{ width: "120px", height: "120px", border: " dashed 1px" }} onClick={handleClick}><PlusOutlined style={{ fontSize: "40px" }} /></Button>
                <div className='mt-3'>
                    <TableUsers />
                </div>
                <Modal title="Tạo người dùng mới" onCancel={handleCancel} open={isModalOpen} footer={false}>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label htmlFor="name" className='text-base'>Tên người dùng: </label>
                            <Input className='w-[466px]' onChange={handleChangeName} required />
                        </div>
                        <div className='space-y-2 flex items-center'>
                            <label htmlFor="image" className='text-base'>Avatar: </label>
                            <Upload className='ml-[19px] mr-5' onChange={handleChangeImage} defaultFileList={defaultFileList} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                            {dataUser.image && (
                                <div>
                                    <img src={dataUser.image} style={{ width: 60, height: 60 }} alt={dataUser.name} />
                                </div>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="type">Email: </label>
                            <Input type='email' className='w-[466px]' onChange={handleChangeEmail} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password">Password: </label>
                            <Input type='password' className='w-[466px]' onChange={handleChangePassword} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="password">Check Password: </label>
                            <Input type='password' className='w-[466px]' onChange={handleChangeCheckPassword} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="address">Địa chỉ: </label>
                            <Input className='w-[466px]' onChange={handleChangeAddress} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="phone">Phone: </label>
                            <Input className='w-[466px]' onChange={handleChangePhone} required />
                        </div>
                        <div className='space-y-2 flex items-center'>
                            <label htmlFor="admin">Admin: </label>
                            <Input type="checkbox" className='w-4 h-4 ml-6' onChange={handleChangeIsAdmin} required />
                        </div>
                        <div className='flex justify-end'>
                            <Loading isLoading={isLoading} delay={200}>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-400 px-4 py-2 text-lg font-semibold text-white rounded">Tạo</button>
                            </Loading>
                        </div>
                    </form>
                </Modal>
            </div>
        </>

    )
}

export default AdminUser