import {Row,Col,Menu,Icon} from 'antd'
import {HomeOutlined,VideoCameraOutlined,SmileOutlined} from '@ant-design/icons'
import "../styles/components/header.css"

const Header = ()=>{
  return (
      <div className="header">
        <Row type="flex" justify="center">
            <Col xs={24} sm={24} md={10} lg={15} xl={12}>
                <span className="header-logo">小柒</span>
                <span className="header-text">爱前端</span>
            </Col>
            <Col className="menu-box" xs={0} sm={0} md={14} lg={8} xl={6}>
                <Menu mode="horizontal">
                    <Menu.Item key="home" icon={<HomeOutlined />}>首页</Menu.Item>
                    <Menu.Item key="video" icon={<VideoCameraOutlined />}>视频</Menu.Item>
                    <Menu.Item key="life" icon={<SmileOutlined />}>生活</Menu.Item>
                </Menu>
            </Col>
        </Row>
      </div>
  )
}
export default Header;