import {  Menu, MenuProps } from "antd";
import { useState } from "react";
import { UserOutlined, LaptopOutlined, NotificationOutlined } from "@ant-design/icons"
import HeaderAdmin from "../layout/HeaderAdmin";
import AdminUser from "../components/AdminUser";
import AdminProduct from "../components/AdminProduct";
import AdminOrder from "../components/AdminOrder";

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    key: '1',
    icon: <UserOutlined style={{ fontSize: "20px" }}/>,
    label: 'Người dùng' 
  },
  {
    key: '2',
    icon: <LaptopOutlined style={{ fontSize: "20px" }} />,
    label: 'Sản phẩm'
  },
  {
    key: '3',
    icon: <NotificationOutlined style={{ fontSize: "20px" }} />,
    label: 'Đơn hàng'
  },
];

interface LevelKeysProps {
  key?: string;
  children?: LevelKeysProps[];
}

const getLevelKeys = (items1: LevelKeysProps[]) => {
  const key: Record<string, number> = {};
  const func = (items2: LevelKeysProps[], level = 1) => {
    items2.forEach((item) => {
      if (item.key) {
        key[item.key] = level;
      }
      if (item.children) {
        func(item.children, level + 1);
      }
    });
  };
  func(items1);
  return key;
};

const Admin = () => {

  const [selected, setSelected] = useState("1");
  const rederPage = (key: string) => {
    switch (key) {
      case "1":
        return <AdminUser />
      case "2":
        return <AdminProduct />
      case "3":
        return <AdminOrder />
      default:
      return <></>
    }
  }

  const handleClick = ({ key }: {key: string}) => {
    console.log(key)
    setSelected(key);
  }
  return (
    <>
      <HeaderAdmin />
      <div className="flex">
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          style={{ width: 230, height: "100vh" , fontSize: 17 }}
          items={items}
          onClick={handleClick}
        />
        <div className="flex-1 ml-5 mt-2">
          {rederPage(selected)}
        </div>
      </div>
    </>
  )
}

export default Admin;