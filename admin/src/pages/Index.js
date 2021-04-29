import React from 'react'
import { Route, useLocation } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined, UserOutlined } from '@ant-design/icons'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import './Index.css'

const { Content, Sider } = Layout

const AdminIndex = props => {
  const location = useLocation()
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="admin-logo">小柒 爱前端</div>
        <Menu theme="dark" defaultSelectedKeys={['/index']} selectedKeys={[location.pathname]} mode="inline">
          <Menu.Item key="/index" icon={<PieChartOutlined />} onClick={() => props.history.push('/index')}>
            工作台
          </Menu.Item>
          <Menu.Item key="/index/add" icon={<DesktopOutlined />} onClick={() => props.history.push('/index/add')}>
            添加文章
          </Menu.Item>
          <Menu.Item key="/index/list" icon={<UserOutlined />} onClick={() => props.history.push('/index/list')}>
            文章列表
          </Menu.Item>
          <Menu.Item key="/index/leave" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '16px 16px' }}>
          <div className="site-layout-background content" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={AddArticle} />
              <Route path="/index/add" component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
