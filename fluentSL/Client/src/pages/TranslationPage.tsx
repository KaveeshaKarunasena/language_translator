import { Layout } from 'antd';
import AppContent from '../layout/AppContent';
import AppFooter from '../layout/AppFooter';
import AppSider from '../layout/AppSider';
import image from '../image/5.png';
import { useSnackbar } from 'notistack';
import { AuthContext } from '../auth/AuthProvider';
import React from 'react';

const TranslationPage = (): JSX.Element => {
  const { enqueueSnackbar } = useSnackbar();
  const [user, setUser] = React.useState({});

  let authPayload = React.useContext(AuthContext);
  const { fromStorage } = authPayload;
  const data = JSON.parse(fromStorage);

  const token = data.token;

  const headers = { Authorization: 'Bearer ' + token };

  React.useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/account/currentUser',
          { headers },
        );
        const res = await response.json();
        console.log(res.user);
        if (response.ok) {
          setUser(res.user);
        }
      } catch (err: any) {
        // const error = err.response.data.err;
        enqueueSnackbar(err.message, { variant: 'error' });
      }
    };
    fetchDetails();
  }, []);
  // AAE3E2
  return (
    <div>
      <Layout>
        <AppSider user={user} />
        <Layout
          style={{
            backgroundColor: '#6CC4A1',
            // backgroundImage: `url('${image}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        >
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  );
};
export default TranslationPage;
