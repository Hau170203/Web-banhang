import { Spin } from 'antd'

const Loading = ({children, isLoading, delay }: {children:any, isLoading: any, delay: number}) => {
  return (
    <Spin delay={delay} spinning={isLoading}>
        {children}
    </Spin>
  )
}

export default Loading