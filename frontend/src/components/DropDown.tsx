import React, { useEffect, useMemo, useState } from 'react';
import { AreaChartOutlined, UserDeleteOutlined, UserOutlined, UserSwitchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Dropdown, Space } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../redux/store"
import * as userSevice from "../services/userService"
import { resetUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router';

const items: MenuProps['items'] = [
  {
    key: '3',
    label: (
      <a rel="noopener noreferrer" href="/sign-in">
        Đăng nhập
      </a>
    ),
    icon: <UserOutlined />
  },
  {
    key: '4',
    label: (
      <a rel="noopener noreferrer" href="/register">
        Đăng ký
      </a>
    ),
    icon: <UserDeleteOutlined />
  }
];

const items2: MenuProps['items'] = [
  {
    key: '1',
    label: 'Thông tin cá nhân',
    icon: <UserOutlined />
  },
  {
    key: '2',
    label: 'Đăng xuất',
    icon: <UserDeleteOutlined />
  }
];
const DropDown: React.FC = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState("");
  useEffect(() => {
    setName(user?.name)
    setAvatar(user?.avatar)
  }, [user?.name, user?.avatar]);

  const items3 = useMemo(() => {
    if (user?.isAdmin) {
      return [...items2, { key: '5', label: 'Quản lý hệ thống', icon: <AreaChartOutlined /> }];
    }
    return items2;
  }, [user?.isAdmin]);
  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === "1") {
      navigate('/detail-user');
    } else if(e.key ==="5"){
      navigate('/admin');
    } else {
      await userSevice.logOut();
      localStorage.removeItem('token');
      dispatch(resetUser());
      navigate('/');
    }
  }
  return (
    <Dropdown menu={{ items: user?.name ? items3 : items, onClick: handleMenuClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <div className='flex items-center text-white cursor-pointer'>
            {user.name ? (
              <div className='flex items-center'>
                {user.avatar ? (
                  <div className=''>
                    <Avatar size={45} src={avatar} />
                  </div>
                ) : (
                  <Avatar size={45} icon={<UserOutlined />} />
                )}
                <div className='pl-2 text-sm hidden lg:inline-block'>
                  {name}
                </div>
              </div>
            ) : (
              <>
                <div className="overflow-hidden  ">
                  <UserSwitchOutlined className='text-3xl' />
                </div>
                <div className='pl-2 hidden lg:inline-block'>
                  <p className="text-sm ">Tài khoản</p>
                  <p className='text-sm'>Đăng nhập / Đăng ký</p>
                </div>
              </>
            )}
          </div>
        </Space>
      </a>
    </Dropdown>
  );
}

export default DropDown;