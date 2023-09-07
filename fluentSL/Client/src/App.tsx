import {Layout} from 'antd'
import AppHeader from './layout/AppHeader'
import AppContent from './layout/AppContent'
import AppFooter from './layout/AppFooter'
import AppSider from './layout/AppSider'
import './App.css'

const App = (): JSX.Element => {
  return (
    <div className="bgcolor">
      <Layout style={{minHeight: '100vh'}}>
          <AppSider/>
        <Layout
          style={{
            backgroundImage: `url("https://mcdn.wallpapersafari.com/medium/5/83/QnuR8r.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <AppHeader />
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  )
}
export default App
