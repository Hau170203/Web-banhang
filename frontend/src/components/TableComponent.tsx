import React from 'react';
import { Table, type TableColumnsType, type TableProps } from 'antd';

interface DataType {
    key: React.Key;
    name: string;
    age: number;
    address: string;
  }

  const columns = [
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'image',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    // getCheckboxProps: (record: DataType) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    //   name: record.name,
    // }),
  };
const TableComponent = ({pros}: any) => {
  console.log(pros)

  return (
     <div>
      <Table<DataType>
        rowSelection={{ type: "checkbox", ...rowSelection }}
        columns={columns}
        // dataSource={}
      />
    </div>
  )
}

export default TableComponent