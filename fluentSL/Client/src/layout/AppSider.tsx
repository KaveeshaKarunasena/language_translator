import {Layout} from 'antd'
import Index from '../components/history-component'
import Avatar from '../components/history-component/avatar-component/avatar'

const {Sider} = Layout

// 116D6E
const AppSider = ({user}): JSX.Element => {
  console.log(user)
  return (
    <Sider width={300} style={{backgroundColor:'#14C38E'}}>
      <Index />
      <div>
        <Avatar user = {user} />
      </div>
    </Sider>
  )
}

export default AppSider
