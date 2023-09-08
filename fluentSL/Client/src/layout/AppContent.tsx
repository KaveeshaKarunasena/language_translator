import {Button, Layout, Space, Switch, Tooltip} from 'antd'
import '../App.css'
import TextArea from 'antd/es/input/TextArea'
import {PaperClipOutlined, AudioOutlined} from '@ant-design/icons'

const {Content} = Layout

const AppContent = (): JSX.Element => {
  return (
    <>
      <Content
        className="upper-layer"
        style={{
          margin: '24px 16px',
          padding: 24,
          borderRadius: '10px'
        }}
      >
        <div style={{marginTop: '15%'}}>
          <TextArea showCount style={{height: 120}} placeholder="Sinhala" />
          <br />
          <br />
          <TextArea showCount style={{height: 120}} placeholder="English" />
          <br />
          <br />

          <Space wrap>
            <Tooltip title="search">
              <Button
                type="primary"
                shape="circle"
                icon={<PaperClipOutlined />}
                style={{marginRight: 5}}
              />
              <Button type="primary" shape="circle" icon={<AudioOutlined />} />
            </Tooltip>

            <Switch
              checkedChildren="Spoken"
              unCheckedChildren="Written"
              defaultChecked
              style={{marginLeft: '1735%'}}
            />
          </Space>
        </div>
      </Content>
    </>
  )
}

export default AppContent
