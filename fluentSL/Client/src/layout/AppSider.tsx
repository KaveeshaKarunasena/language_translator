import {
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined
} from '@ant-design/icons'
import {Layout, Menu} from 'antd'

const {Sider} = Layout

const AppSider = (): JSX.Element => {
  return (
    <Sider
      style={{
        padding: 0
      }}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={['1']}
        items={[
          {
            key: '1',
            icon: <UserOutlined />,
            label: 'nav 1'
          },
          {
            key: '2',
            icon: <VideoCameraOutlined />,
            label: 'nav 2'
          },
          {
            key: '3',
            icon: <UploadOutlined />,
            label: 'nav 3'
          }
        ]}
      />
    </Sider>
  )
}

export default AppSider
