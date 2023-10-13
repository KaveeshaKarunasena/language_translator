import {Layout} from 'antd'
import Index from '../components/history-component'
import Avatar from '../components/history-component/avatar-component/avatar'

const {Sider} = Layout


const AppSider = ({user}): JSX.Element => {
  console.log(user)
  return (
    <Sider width={300} style={{backgroundColor:'#C0EEE4'}}>
      <Index />
      <div>
        <Avatar user = {user} />
      </div>
    </Sider>
  )
}

export default AppSider
