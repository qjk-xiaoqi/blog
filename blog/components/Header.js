import React, { useEffect, useState } from 'react'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, VideoCameraOutlined, FileTextOutlined, SmileOutlined } from '@ant-design/icons'
import { useRouter } from 'next/router'
import Link from 'next/link'

const routerMap = {
  home: '/',
  article: '/list?type=1',
  photo: '/list?type=2',
  life: '/list?type=3',
}
const routerKey = Object.keys(routerMap)

const Header = () => {
  const router = useRouter()
  const [curNav, setCurNav] = useState('')

  const handleNav = e => {
    setCurNav(e.key)
  }

  useEffect(() => {
    const curKey = routerKey.find(item => routerMap[item] === router.asPath)
    if (!curKey) {
      return
    }
    setCurNav(curKey)
  }, [])
  return (
    <div className="header">
      <Row type="flex" justify="space-between" align="middle" className="comm-header">
        <Col xs={24} sm={24} md={10} lg={15} xl={4}>
          <span className="header-logo">小柒</span>
          <span className="header-text">爱前端</span>
        </Col>
        <Col className="menu-box" xs={0} sm={0} md={14} lg={8} xl={20}>
          <Menu mode="horizontal" selectedKeys={[curNav]} onClick={handleNav}>
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link href="/">
                <a>首页</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="article" icon={<FileTextOutlined />}>
              <Link href="/list?type=1">
                <a>文章</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="photo" icon={<VideoCameraOutlined />}>
              <Link href="/list?type=2">
                <a>摄影</a>
              </Link>
            </Menu.Item>
            <Menu.Item key="life" icon={<SmileOutlined />}>
              <Link href="/list?type=3">
                <a>生活</a>
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header
