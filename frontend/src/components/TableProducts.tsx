import React, { useEffect, useRef, useState } from 'react';
import { Button, Input, InputRef, message, Popconfirm, PopconfirmProps, Space, Table, TableColumnType, type TableProps } from 'antd';
import * as productService from '../services/productService';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from './DrawerComponent';
import Loading from './Loading';
import { useMutationHook } from '../hooks/useMutationHook';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import { SearchOutlined } from '@ant-design/icons';

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
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);
  type DataIndex = keyof DataType;

  const mutation = useMutationHook(
    (id: string) => productService.deleteProduct(id),
  );

  const { isLoading, isSuccess, data, refetch } = useQuery({ queryKey: ["products"], queryFn: getAllProduct });
  const { isSuccess: isSuccessDelete, isError: isErrorDelete } = mutation;
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
  }, [rowSelected]);

  // console.log("detail product", detailProduct);
  const handleClick = () => {

    setOpen(true);
  }

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    mutation.mutate(rowSelected);
  };

  useEffect(() => {
    if (isSuccessDelete) {
      message.success("Xóa sản phẩm thành công");
      refetch();
    } else if (isErrorDelete) {
      message.error("Xóa sản phẩm thất bại");
    }
  }, [isSuccessDelete, isErrorDelete]);

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps['confirm'],
    dataIndex: DataIndex,
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <p>{text}</p>
      ) : (
        text
      ),
  });

  const columns: any = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
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
      sorter: (a: any, b: any) => a.type.length - b.type.length,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a: any, b: any) => a.price - b.price,
      filters: [
        { text: 'Price > 2 M', value: '>' },
        { text: 'Price < 2 M', value: '<' },
      ],
      onFilter: (value: any, record: any) => {
        if (value === '>') {
          return record.price > 2000000;
        }
        if (value === '<') {
          return record.price < 2000000;
        }
      }
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      sorter: (a: any, b: any) => a.discount - b.discount,
    },
    {
      title: 'Seller',
      dataIndex: 'seller',
      key: 'seller',
      sorter: (a: any, b: any) => a.seller - b.seller,
      filters: [
        { text: 'seller > 20', value: '>' },
        { text: 'seller < 20', value: '<' },
      ],
      onFilter: (value: any, record: any) => {
        if (value === '>') {
          return record.seller > 20;
        }
        if (value === '<') {
          return record.seller < 20;
        }
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <div >
          <button className='mr-2 px-1 py-2 bg-blue-400 rounded text-white hover:bg-blue-300' onClick={handleClick}>Sửa</button>
          <Popconfirm
            title="Xóa sản phẩm"
            description="Ban có chắc chắn muốn xóa sản phẩm này không?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <button className='px-1 py-2  bg-red-400 rounded text-white hover:bg-red-300'>Xóa</button>
          </Popconfirm>
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
  }, [isSuccess, data, isSuccessDelete]);



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
      <DrawerComponent open={open}
        isLoading={loadingData}
        setOpen={setOpen}
        data={detailProduct || ({} as productService.serviceProduct)}
        id={rowSelected}
        refetch={refetch}
      />
    </div>
  )
}

export default TableProducts