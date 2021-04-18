import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Col, Row, List, Breadcrumb } from 'antd'
import { CalendarOutlined, VideoCameraOutlined, UserOutlined } from '@ant-design/icons'
import { getListById } from '../util/api'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

const MyList = ({ data, type }) => {
  const [myList, setMyList] = useState([])
  const [typeName, setTypeName] = useState('')
  useEffect(() => {
    setMyList(data)
    setTypeName(type)
  })
  return (
    <>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className="bread-box">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List
            itemLayout="vertical"
            dataSource={myList}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link
                    href={{
                      pathname: '/detail',
                      query: { id: item.id, type_id: item.type_id, type_name: item.type_name },
                    }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <CalendarOutlined /> 2020-10-9
                  </span>
                  <span>
                    <VideoCameraOutlined />
                    {item.type_name}
                  </span>
                  <span>
                    <UserOutlined />
                    {item.view_count}人
                  </span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

MyList.getInitialProps = async context => {
  const type = context.query.type
  const res = await getListById({ type })
  let typeName = ''
  if (!res) {
    return
  }
  // 不同的type显示不同的类型名
  switch (type) {
    case '1':
      typeName = '技术文章'
      break
    case '2':
      typeName = '美好瞬间'
      break
    case '3':
      typeName = '快乐生活'
      break
    default:
      break
  }
  return {
    data: res.data,
    type: typeName,
  }
}

export default MyList
