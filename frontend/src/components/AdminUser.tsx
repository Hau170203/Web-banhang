import TableComponent from './TableComponent'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

const AdminUser = () => {
    return (
        <>
            <div className='adminUser' >
                <h1 className='text-xl font-bold mb-2'>Quản lý người dùng</h1>
                <Button style={{ width: "120px", height: "120px", border: " dashed 1px" }}><PlusOutlined style={{ fontSize: "40px" }}/></Button>
                <div className='mt-3'>
                    <TableComponent />
                </div>
            </div>
        </>

    )
}

export default AdminUser