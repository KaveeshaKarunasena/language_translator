import { Button, Layout, Space, Switch, Tooltip } from 'antd';
import '../App.css';
import TextArea from 'antd/es/input/TextArea';
import { PaperClipOutlined, AudioOutlined } from '@ant-design/icons';
import Convert from '../components/convertor';
import axios from 'axios';
import { useState } from 'react';
import React from 'react';
import { AuthContext } from '../auth/AuthProvider';
import jwt_decode from 'jwt-decode';
import logo from '../image/logo-white-removebg-preview.png';
import CachedIcon from '@mui/icons-material/Cached';

const { Content } = Layout;

const AppContent = (): any => {
  const [text, setText] = useState('');
  const [value, setValue] = useState('');
  const [fromLanguage, setFromLanguage] = useState('');
  const [toLanguage, setToLanguage] = useState('');

  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;
  const headers = { Authorization: 'Bearer ' + token };

  const decoded = jwt_decode(token);
  const decodedId = decoded.id;

  const [isVoiceTranslating, setIsVoiceTranslating] = useState(false);
  const [voiceMessage, setVoiceMessage] = useState('');

  async function handleVoiceTranslate(): Promise<void> {
    try {
      if (voiceMessage) {
        const translationOptions = {
          method: 'POST',
          url: 'https://translation.googleapis.com/language/translate/v2',
          headers: {
            'content-type': 'application/json',
          },
          data: {
            key: 'AIzaSyCq33nFEkUyeTMoFR0yO4VPF3o9Y88LyrY',
            from: 'en',
            to: 'si',
            q: [voiceMessage],
          },
        };

        const response = await axios.request(translationOptions);

        setValue(response.data);

        console.log(response.data);
      } else {
        console.log('No recognized voice message to translate.');
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function handleTranslate(): Promise<void> {
    console.log(fromLanguage);
    console.log(toLanguage);
    if (fromLanguage === 'Singlish') {
      console.log('sda', text);
      axios
        .post(
          'http://localhost:3000/translate/translate',
          {
            title: text,
          },
          { headers },
        )

        .then((response) => {
          console.log(response.data);
          setValue(response.data.text);
          axios
            .post(
              'http://localhost:3000/userhistory/create',
              {
                user_id: decodedId,
                title: text,
                description: value,
              },
              { headers },
            )

            .then((response) => {
              console.log(response);
            });
        });
    } else {
      const options = {
        method: 'POST',

        url: 'https://rapid-translate-multi-traduction.p.rapidapi.com/t',

        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key':
            '844dee9b82msh71b565e662a4fadp10eb89jsn2efb46c0e5a5',
          'X-RapidAPI-Host': 'rapid-translate-multi-traduction.p.rapidapi.com',
        },

        data: {
          from: fromLanguage,
          to: toLanguage,
          q: [`${text}`],
        },
      };

     
    }
     try {
        const response = await axios.request(options);
        setValue(response.data);
        axios
          .post(
            'http://localhost:3000/userhistory/create',
            {
              user_id: decodedId,
              title: text,
              description: value,
            },
            { headers },
          )

          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.error(error);
      }
      try {
        const response = await axios.request(options);
        setValue(response.data);
        axios
          .post(
            'http://localhost:3000/userhistory/create',
            {
              user_id: decodedId,
              title: text,
              description: value,
            },
            { headers },
          )

          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.error(error);
      }
  }

  return (
    <>
      <Content
        className="upper-layer"
        style={{
          margin: '24px 16px',
          padding: 24,
          borderRadius: '10px',
        }}
      >
        {' '}
        <img src={logo} alt="Logo" width="100" height="100" />
        <div style={{ marginTop: '5%' }}>
          <div>
            <select
              style={{
                width: '20%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
              onChange={(e) => setFromLanguage(e.target.value)}
            >
              <option value="si">Sinhala</option>
              <option value="en">English</option>
              <option value="Singlish">Singlish</option>
            </select>
            <CachedIcon style={{ fontSize: 20, color: 'black' }} />{' '}
            {/* Add the Cached icon here */}
            <select
              style={{
                width: '20%',
                padding: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                fontSize: '14px',
              }}
              onChange={(e) => setToLanguage(e.target.value)}
            >
              <option value="si">Sinhala</option>
              <option value="en">English</option>
              <option value="Singlish">Singlish</option>
            </select>
          </div>
          <br></br>

          <TextArea
            showCount
            style={{ height: 120 }}
            placeholder="Sinhala"
            onChange={(e) => setText(e.target.value)}
          />
          <br />
          <br />
          <TextArea
            showCount
            style={{ height: 120 }}
            placeholder=""
            value={value}
          />
          <br />
          <br />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
              onClick={handleTranslate}
              style={{
                width: '120px',
                backgroundColor: '#14C38E',
                color: 'black',
              }}
            >
              Translate
            </Button>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginLeft: 'auto',
              }}
            >
              <Space wrap>
                <div>
                  <Tooltip title="Attach">
                    <Button
                      type="primary"
                      shape="rectangle"
                      icon={<PaperClipOutlined />}
                      style={{
                        marginRight: 10,
                        backgroundColor: '#14C38E',
                        width: '70px',
                        color: 'black',
                      }}
                    />
                  </Tooltip>
                  <Tooltip title="Voice">
                    <Button
                      onClick={handleVoiceTranslate}
                      type="primary"
                      shape="rectangle"
                      icon={<AudioOutlined />}
                      style={{
                        marginRight: 0,
                        backgroundColor: '#14C38E',
                        width: '70px',
                        color: 'black',
                      }}
                    />
                  </Tooltip>
                </div>

                {/* <Switch
              checkedChildren="Spoken"
              unCheckedChildren="Written"
              defaultChecked
              style={{marginLeft: '1735%'}}
            /> */}
              </Space>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default AppContent;
