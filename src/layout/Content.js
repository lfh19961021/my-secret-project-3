import { useState } from 'react';
import { Layout, PageHeader, Button, Typography  } from 'antd';
import { UnorderedListOutlined, ProjectOutlined } from '@ant-design/icons';
import TrelloBoard from './components/TrelloBoard'
import NewRequest from './components/NewRequest'
import ListView from './components/ListView'


const { Content } = Layout;
const { Title  } = Typography;

function ContentPart(props) {
    const [listMode, setListMode] = useState(false)

    return (
        <Content style={{ ...props.style, padding: '20px 80px', display: 'flex', flexDirection: 'column' }}>
            <div className="content-container" style={{
                background: '#fff', padding: '12px 24px',
                flexGrow: '1', display: 'flex',
                flexDirection: 'column'
            }}>
                <PageHeader
                    title={<Title level={4} >All Requests</Title>}
                    extra={[
                        listMode ?
                            <Button key="1" icon={<ProjectOutlined />} type='text' size='large' onClick={() => setListMode(state => !state)}> Board View</Button> :
                            <Button key="2" icon={<UnorderedListOutlined />} type='text' size='large' onClick={() => setListMode(state => !state)}> List View</Button>,
                        <NewRequest />
                    ]}
                />
                {listMode ?  <ListView /> : <TrelloBoard />}
            </div>
        </Content >
    )
}


export default ContentPart