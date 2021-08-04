import { Layout, Menu, Avatar, Row, Col, Typography } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { Header } = Layout;

function HeaderPart(props) {
    return (
        <Header className="header-container" style={{ ...props.style, color: '#000000', background: '#FFFFFF' }}>
            <Row gutter={{ xs: 8, sm: 16, md: 24 }}>
                <Col flex="160px" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Title level={4} className="title" style={{ color: '#000000' }}>Wishlist Portal</Title>
                </Col>
            <Col flex={'auto'}>
                <Menu mode="horizontal" defaultSelectedKeys={['1']} style={{ float: 'right' }}>
                    <Menu.Item key={1} icon={<HomeOutlined />} >{`Home`}</Menu.Item>
                </Menu>
            </Col>
            <Col flex={'50px'}>
                <Avatar
                    style={{
                        backgroundColor: '#f56a00',
                        verticalAlign: 'middle',
                    }}
                    size="large"
                >
                    {'F'}
                </Avatar>
            </Col>

            </Row>
        </Header >
    )
}


export default HeaderPart