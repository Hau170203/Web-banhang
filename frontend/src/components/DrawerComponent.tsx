import { Button, Drawer, Input, message, Upload, UploadFile } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react';
import { UploadChangeParam } from 'antd/es/upload';
import { FileType, getBase64 } from '../ultis';

import { Editor } from '@tinymce/tinymce-react';
import Loading from './Loading';
import { useMutationHook } from '../hooks/useMutationHook';
import * as productService from '../services/productService';

const DrawerComponent = ({ open, setOpen, isLoading, data, id }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, isLoading: boolean, data: productService.serviceProduct, id: string }) => {
    const [dataProduct, setDataProduct] = useState<productService.serviceProduct>({
        name: data.name,
        image: data.image,
        imageDetail: data.imageDetail,
        type: data.type,
        price: data.price,
        countInStock: data.countInStock,
        description: data.description,
        discount: data.discount,
        seller: data.seller
    });
    useEffect(() => {
        if (data.name) {
            setDataProduct({
                name: data.name,
                image: data.image,
                imageDetail: data.imageDetail,
                type: data.type,
                price: data.price,
                countInStock: data.countInStock,
                description: data.description,
                discount: data.discount,
                seller: data.seller
            });
        }
        // console.log('dataProduct.imageDetail', dataProduct.imageDetail);
    }, [data]);
    // console.log("dataProduct", dataProduct);

    const [image, setImage] = useState("");
    const defaultFileList: UploadFile[] = data?.image
        ? [{ uid: "-1", name: "image.png", status: "done", url: data.image }]
        : [];

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
        // console.log("Danh sách ảnh Base64:", newImageList);
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
        // console.log("content: ", content)
        setDataProduct({
            ...dataProduct,
            description: content
        })
    }
    const handleClose = () => {
        setOpen(false);
    }
    const mutation = useMutationHook(
        ({ id, data }: { id: string, data: productService.serviceProduct }) => productService.updateProduct(id, data)
    );
    const { isLoading: isLoadingProduct, isSuccess, isError } = mutation;
    // console.log("name", data.discount);
    useEffect(() => {
        if (isSuccess) {
            message.success("Cập nhật mới thành công");
        } else if (isError) {
            message.error("Cập nhật không thành công");
        }

    }, [isSuccess,dataProduct.image]);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(dataProduct);
        mutation.mutate({ id, data: dataProduct });
    };
    return (
        <>
            <Loading isLoading={isLoadingProduct} delay={200}>
                <Drawer title="Update product" onClose={handleClose} open={open} width={1200}>
                    <form className='space-y-5 grid grid-cols-2' onSubmit={handleSubmit} >
                        <div className='space-y-2 flex items-center'>
                            <label htmlFor="name" className='text-base'>Tên sản phẩm: </label>
                            <input type="text" onChange={handleChangeName} defaultValue={dataProduct.name} style={{ width: 460, height: 28, fontSize: 18, border: "1px solid black", paddingLeft: 3 }} required />
                        </div>
                        <div className=' flex items-center'>
                            <label htmlFor="image" className='text-base'>Image: </label>
                            <Upload className='ml-[19px] mr-5' onChange={handleChangeImage} defaultFileList={defaultFileList} maxCount={1}>
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                            {data.image && (
                                <div>
                                    <img src={dataProduct.image} style={{ width: 70, height: 70 }} alt={data.name} />
                                </div>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="imageDetail">Ảnh chi tiết:</label>
                            <input type="file" multiple onChange={handleChangeImageDetail} defaultValue={data.imageDetail} className='ml-5' />
                            {dataProduct.imageDetail && (
                                <div className='image-detail flex space-x-3'>
                                    {Array.isArray(dataProduct.imageDetail)
                                        ? dataProduct.imageDetail.map((image: string, index: number) => (
                                            <img src={image} style={{ width: 70, height: 70 }} key={index} alt="Ảnh chi tiết" />
                                        ))
                                        : JSON.parse(dataProduct.imageDetail || "[]").map((image: string, index: number) => (
                                            <img src={image} style={{ width: 70, height: 70 }} key={index} alt="Ảnh chi tiết" />
                                        ))
                                    }
                                </div>
                            )}
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="type">Thương hiệu: </label>
                            <input type="text" onChange={handleChangeType} defaultValue={data.type} style={{ width: 460, height: 28, fontSize: 18, border: "1px solid black", paddingLeft: 3 }} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="price">Giá: </label>
                            <input type="text" onChange={handleChangePrice} defaultValue={data.price} style={{ width: 460, height: 28, fontSize: 18, border: "1px solid black", paddingLeft: 3 }} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="discount">Giảm: </label>
                            <Input onChange={handleChangeDiscount} key={data.discount} defaultValue={data?.discount || 0} style={{ width: 460, height: 28, fontSize: 18, border: "1px solid black", paddingLeft: 3 }} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="seller">Đã bán: </label>
                            <Input type="number" key={data.seller} onChange={handleChangeSeller} defaultValue={data.seller || 0} style={{ width: 460, height: 28, fontSize: 18, border: "1px solid black", paddingLeft: 3 }} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor="coutInStock">Số lượng còn lại:</label>
                            <span className='hidden'>{data.countInStock}</span >
                            <Input type="number" key={data.countInStock} onChange={handleChangeCounInStock} defaultValue={data.countInStock || 0} style={{ width: 400, height: 28, fontSize: 18, border: "1px solid black", marginLeft: 3, paddingLeft: 3 }} required />
                        </div>
                        <div className='space-y-2'>
                            <label htmlFor='description'>Mô tả: </label>
                            <Editor
                                apiKey="ueyyhyaglq62aq9nhyabvnor3ayc2olvzn1y1qt75frd1qnk"
                                init={{
                                    width: "700px",
                                    plugins:
                                        "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                                    toolbar:
                                        "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                                }}
                                onEditorChange={handleEditorChange}
                                initialValue={data.description}
                            />
                        </div>
                        <div className='flex justify-end items-end pr-20'>
                            <Loading isLoading={isLoadingProduct} delay={200}>
                            <button type="submit" className="bg-blue-600 hover:bg-blue-400 w-24 h-16 text-lg font-semibold text-white rounded">Cập nhật</button>
                            </Loading>
                        </div>
                    </form>
                </Drawer>
            </Loading>
        </>
    )
}

export default DrawerComponent