import {Layout} from 'antd'
import '../App.css'

const {Content} = Layout

const AppContent = (): JSX.Element => {
  return (
    <>
      <Content
        className="upper-layer"
        style={{
          margin: '24px 16px',
          padding: 24,
          minHeight: 280,
          borderRadius: '10px'
        }}
      >
        Content
      </Content>
    </>
  )
}

export default AppContent
