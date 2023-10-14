import { Layout } from 'antd';
import AppHeader from './layout/AppHeader';
import AppContent from './layout/AppContent';
import AppFooter from './layout/AppFooter';
import AppSider from './layout/AppSider';
import './App.css';
import image from './image/5.png';
import { Route, Routes } from 'react-router-dom';
import SignIn from './userComponent/SignIn';
import SignUp from './userComponent/SignUp';
import { AuthGuard, UserGuard } from './auth/AuthGuard';
import TranslationPage from './pages/translationPage';

const App = (): JSX.Element => {
  return (
    <div>
      <AuthGuard>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </AuthGuard>
      <UserGuard>
      <Routes>
        <Route path="/user/translate" element={<TranslationPage />} />
      </Routes>
      </UserGuard>
    </div>
  );
};
export default App;
