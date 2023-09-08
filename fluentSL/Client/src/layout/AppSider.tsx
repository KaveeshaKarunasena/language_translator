
import {Layout} from 'antd'
import Index from '../components/history-component'
import Avatar from '../components/history-component/avatar-component/avatar'

const {Sider} = Layout

const AppSider = (): JSX.Element => {
  return (
    <Sider
      style={{
        padding: 0,
        display:'flex',
        flexDirection: 'column',
        maxHeight:"100%",
        width:400
      }}
    >
      <Index/>
      <div >
      <Avatar />
      </div>
      
    </Sider>
  )
}

export default AppSider
