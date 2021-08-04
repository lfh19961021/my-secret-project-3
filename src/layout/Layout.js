import { Layout } from 'antd';
import Header from './Header'
import Content from './Content'
import Footer from './Footer'

function LayoutPart() {
    return (
        <Layout className="layout" style={{minHeight: '100vh'}}>
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%', minWidth: '480px'}} />
            <Content style={{marginTop: 64}}/>
            {/* <Footer /> */}
        </Layout>
    )
}


export default LayoutPart