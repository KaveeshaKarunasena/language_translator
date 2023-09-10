import {Button, Layout, Space, Switch, Tooltip} from 'antd'
import '../App.css'
import TextArea from 'antd/es/input/TextArea'
import {PaperClipOutlined, AudioOutlined} from '@ant-design/icons'
import Convert from '../components/convertor'
import axios from 'axios'

const {Content} = Layout

const AppContent = async (): Promise<JSX.Element> => {
  const options = {
    method: 'POST',
    url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': '43b21a7caamsh3408ac81c5316dap17b63ejsn6a92ff519187',
      'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com'
    },
    data: {
      from: 'en',
      to: 'si',
      q: 'Hello ! i want to go home'
    }
  }

  try {
    const response = await axios.request(options)
    console.log(response.data)
  } catch (error) {
    console.error(error)
  }
  return (
    <>
      {/* <Convert
  language = 'uz'
  text='my name is amal'/> */}
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
              //style={{display: 'flex', justify-content: 'end'}}
            />
          </Space>
        </div>
      </Content>
    </>
  )
}

export default AppContent
