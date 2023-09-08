import {Layout} from 'antd'
import Index from '../components/history-component'
import Avatar from '../components/history-component/avatar-component/avatar'

const {Sider} = Layout

const AppSider = (): JSX.Element => {
  return (
    <Sider width={350}>
      <Index />
      <div>
        <Avatar />
      </div>
    </Sider>
  )
}

export default AppSider
