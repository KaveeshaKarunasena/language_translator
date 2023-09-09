import {Layout} from 'antd'
import AppHeader from './layout/AppHeader'
import AppContent from './layout/AppContent'
import AppFooter from './layout/AppFooter'
import AppSider from './layout/AppSider'
import './App.css'
import image from './image/5.png'

const App = (): JSX.Element => {
  return (
    <div>
      <Layout>
        <AppSider />
        <Layout
          style={{
            backgroundImage: `url('${image}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
          }}
        >
          <AppContent />
          <AppFooter />
        </Layout>
      </Layout>
    </div>
  )
}
export default App
