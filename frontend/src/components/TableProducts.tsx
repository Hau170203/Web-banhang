import React, { useEffect, useState } from 'react';
import { Table, type TableProps } from 'antd';
import * as productService from '../services/productService';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from './DrawerComponent';
import Loading from './Loading';

interface DataType {
  _id: string;
  key: React.Key;
  name: string;
  image: string;
  address: string;
}

const rowSelection: TableProps<DataType>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  // getCheckboxProps: (record: DataType) => ({
  //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
  //   name: record.name,
  // }),
};
const getAllProduct = async () => {
  const res = await productService.getAllProduct();
  return res;
};

const TableProducts = () => {

  const [allProduct, setAllData] = useState<any>();
  const [detailProduct, setDetailProduct] = useState<productService.serviceProduct>();
  const [rowSelected, setRowSelected] = useState("");
  const [open, setOpen] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const {isLoading, isSuccess, data } = useQuery({ queryKey: ["products"], queryFn: getAllProduct });

  useEffect(() => {
    if (rowSelected) {
      const fetchDetailProduct = async () => {
        setLoadingData(true);
        const res = await productService.productDetail(rowSelected);
        // console.log("res", res);
        if (res.data) {
          // console.log("ok", res.data.name);
          setDetailProduct({
            name: res.data.name,
            image: res.data.image,
            imageDetail: res.data.imageDetail,
            type: res.data.type,
            price: res.data.price,
            countInStock: res.data.countInStock,
            description: res.data.description,
            discount: res.data.discount,
            seller: res.data.seller
          })
        }

      };

      fetchDetailProduct();
      setLoadingData(false);
      // console.log("detail product", detailProduct);
    }

  }, [rowSelected])

  // console.log("detail product", detailProduct);
  const handleClick = (e: React.MouseEvent) => {

    setOpen(true);
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img src={image} style={{ width: 100, height: 100 }} />
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div >
          <button className='mr-2 px-1 py-2 bg-blue-400 rounded text-white hover:bg-blue-300' onClick={handleClick}>Sửa</button>
          <button className='px-1 py-2  bg-red-400 rounded text-white hover:bg-red-300'>Xóa</button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      // setAllData(data.data);
      // console.log("data", data.data);
      const allProductWithKeys = data.data.map((product: any) => ({
        ...product,
        key: product._id, // Đảm bảo key là duy nhất
      }));
      setAllData(allProductWithKeys);
    }
  }, [isSuccess, data]);



  return (
    <div>
      <Loading isLoading={isLoading} delay={200}>
      <Table<DataType>
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        dataSource={allProduct}
        onRow={(record) => {
          return {
            onClick: (e) => {
              setRowSelected(record?._id)
            },
          };
        }}
      />
      </Loading>
      <DrawerComponent open={open} isLoading={loadingData} setOpen={setOpen} data={detailProduct || ({} as productService.serviceProduct)} id={rowSelected}/>
    </div>
  )
}

export default TableProducts