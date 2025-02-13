import { Button, Input, message, Modal, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { UploadChangeParam, UploadFile } from 'antd/es/upload';
import { FileType, getBase64 } from '../ultis';
import { useMutationHook } from '../hooks/useMutationHook';
import * as productService from '../services/productService';
import Loading from './Loading';
import TableProducts from './TableProducts';



const AdminProduct = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataProduct, setDataProduct] = useState<productService.serviceProduct>({
        name: "",
        image: "",
        imageDetail: "",
        type: "",
        price: 0,
        countInStock: 0,
        description: "",
        discount: 0,
        seller: 0
    });
    const [image, setImage] = useState("");
    const defaultFileList: UploadFile[] = dataProduct.image
        ? [{ uid: "-1", name: "image.png", status: "done", url: dataProduct.image }]
        : [];

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataProduct({
            ...dataProduct,
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
        setDataProduct({
            ...dataProduct,
            image
        })
    };

    const handleChangeImageDetail = async (info: any) => {
        console.log(info.target)
        console.log(info.target.files);
        const files = info.target.files;
        const imageList: string[] = []
        const promises = Array.from(files).map(async (file: any) => {
            return await getBase64(file);
        });

        const base64Images = await Promise.all(promises); // Chờ tất cả ảnh convert xong

        imageList.push(...base64Images);
        const newImageList = JSON.stringify(imageList)
        console.log("Danh sách ảnh Base64:", newImageList);
        setDataProduct({
            ...dataProduct,
            imageDetail: newImageList
        })
    }
    const handleChangeType = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setDataProduct({
            ...dataProduct,
            type: e.target.value
        })
    }
    const handleChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataProduct({
            ...dataProduct,
            price: parseInt(e.target.value)
        })
    }

    const handleChangeDiscount = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataProduct({
            ...dataProduct,
            discount: parseInt(e.target.value)
        })
    }
    const handleChangeSeller = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataProduct({
            ...dataProduct,
            seller: parseInt(e.target.value)
        })
    }
    const handleChangeCounInStock = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDataProduct({
            ...dataProduct,
            countInStock: parseInt(e.target.value)
        })
    }
    const handleEditorChange = (content: any) => {
        console.log("content: ", content)
        setDataProduct({
            ...dataProduct,
            description: content
        })
    }
    const mutation = useMutationHook(
        (data: productService.serviceProduct) => productService.createProduct(data)
    );
    const { isLoading, isSuccess, isError } = mutation;

    useEffect(() => {
        if (isSuccess) {
            message.success("Tạo mới thành công");
            setIsModalOpen(false);
            handleCancel();
            setDataProduct({
                name: "",
                image: "",
                imageDetail: "",
                type: "",
                price: 0,
                countInStock: 0,
                description: "",
                discount: 0,
                seller: 0
            })
        } else if (isError) {
            message.error("Tạo sản phẩm không thành công");
        }

    }, [isSuccess, isModalOpen]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(dataProduct);
        mutation.mutate(dataProduct);
    };
    return (
        <div className='adminProduct' >
            <h1 className='text-xl font-bold mb-2'>Quản lý sản phẩm</h1>
            <Button style={{ width: "120px", height: "120px", border: " dashed 1px" }} onClick={() => setIsModalOpen(true)} ><PlusOutlined style={{ fontSize: "40px" }} /></Button>
            <div className='mt-3'>
                <TableProducts />
            </div>
            <Loading isLoading={isLoading} delay={200}>
                <Modal title="Tạo mới sản phẩm" onCancel={handleCancel} open={isModalOpen} footer={false}>
                    <form className='space-y-5' onSubmit={handleSubmit}>
                        <div className='space-y-2'>
                            <label htmlFor="name" className='text-base'>Tên sản phẩm: </label>
                            <Input className='w-[466px]' onChange={handleChangeName} defaultValue={dataProduct.name} required />
                        </div>
                        <div className='space-y-2 flex items-center'>
                            <label htmlFor="image" className='text-base'>Image: </label>
                            <Upload className='ml-[19px] mr-5' onChange={handleChangeImage} defaultFileList={defaultFileList} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                            {dataProduct.image && (
                                <div>
                                    <img src={dataProduct.image} style={{ width: 60, height: 60 }} alt={dataProduct.name} />
                                </div>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="imageDetail">Ảnh chi tiết:</label>
                            <input type="file" multiple onChange={handleChangeImageDetail} defaultValue={dataProduct.imageDetail} className='ml-5' />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="type">Thương hiệu: </label>
                            <Input className='w-[466px]' onChange={handleChangeType} defaultValue={dataProduct.type} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="price">Giá: </label>
                            <Input className='w-[466px]' onChange={handleChangePrice} defaultValue={dataProduct.price} />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="discount">Giảm: </label>
                            <Input className='w-[466px]' onChange={handleChangeDiscount} defaultValue={dataProduct.discount} />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="seller">Đã bán: </label>
                            <Input className='w-[466px]' onChange={handleChangeSeller} defaultValue={dataProduct.seller} />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="coutInStock">Số lượng còn lại:</label>
                            <Input className='w-[466px]' onChange={handleChangeCounInStock} defaultValue={dataProduct.countInStock} required />
                        </div>


                        <div className='space-y-2'>
                            <label htmlFor='description'>Mô tả: </label>
                            <Editor
                                apiKey="ueyyhyaglq62aq9nhyabvnor3ayc2olvzn1y1qt75frd1qnk"
                                init={{
                                    width: "466px",
                                    plugins:
                                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                }}
                                onEditorChange={handleEditorChange}
                                initialValue={dataProduct.description}
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-400 px-4 py-2 text-lg font-semibold text-white rounded">Tạo</button>
                        </div>
                    </form>
                </Modal>
            </Loading>
        </div>
    )
}

export default AdminProduct