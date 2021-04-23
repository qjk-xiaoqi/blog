import React, { useState } from 'react'
import { Route } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd'
import { DesktopOutlined, PieChartOutlined, FileOutlined, UserOutlined } from '@ant-design/icons'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
import './Index.css'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

const AdminIndex = props => {
  const [collapsed, setCollapsed] = useState('false')

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }

  const handleClickArticle = e => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="admin-logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="work" icon={<PieChartOutlined />}>
            工作台
          </Menu.Item>
          <Menu.Item key="add" icon={<DesktopOutlined />}>
            添加文章
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="文章管理" onClick={handleClickArticle}>
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          <Menu.Item key="leave" icon={<FileOutlined />}>
            留言管理
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background content" style={{ padding: 24, minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={AddArticle} />
              <Route path="/index/add" component={AddArticle} />
              <Route path="/index/list" component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}

export default AdminIndex
