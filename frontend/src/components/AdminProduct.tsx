import { Button } from 'antd'
import TableComponent from './TableComponent'
import { PlusOutlined } from '@ant-design/icons'

const AdminProduct = () => {
    return (
        <div className='adminProduct' >
            <h1 className='text-xl font-bold mb-2'>Quản lý sản phẩm</h1>
            <Button style={{ width: "120px", height: "120px", border: " dashed 1px" }}><PlusOutlined style={{ fontSize: "40px" }}/></Button>
            <div className='mt-3'>
                <TableComponent />
            </div>
        </div>
    )
}

export default AdminProduct