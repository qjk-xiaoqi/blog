import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Col, Row, List, Breadcrumb } from 'antd'
import { CalendarOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import { getListById } from '../util/api'
import Header from '../components/Header'
import Author from '../components/Author'
import Sentence from '../components/Sentence'
import User from '../components/User'

const MyList = ({ data, type }) => {
  const router = useRouter()
  const [myList, setMyList] = useState([])

  const handleClick = item => {
    router.push({
      pathname: '/detail',
      query: { id: item.id, type_id: item.type_id, type_name: item.type_name },
    })
  }
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
      <div className="comm-header">
        <Header />
      </div>
      <div className="comm-content">
        <Row className="comm-main" type="flex" justify="space-between">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={17}>
            <div className="bread-box">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <Link href="/">
                    <a>首页</a>
                  </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>{typeName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              itemLayout="vertical"
              dataSource={myList}
              renderItem={item => (
                <List.Item>
                  <div className="list-box" onClick={() => handleClick(item)}>
                    <div className="list-image">
                      <Image src="/sleep.png" alt="Picture of the author" width={260} height={165} />
                    </div>
                    <div className="list-content">
                      <div className="list-title">
                        <span className="list-type">{item.type_name}</span>
                        <span>{item.title}</span>
                      </div>
                      <div className="list-context">{item.introduce}</div>
                      <div className="list-icon">
                        <span>
                          <HeartOutlined />
                          {0} 人
                        </span>
                        <span>
                          <UserOutlined />
                          {item.view_count || 0} 人
                        </span>
                        <span>
                          <CalendarOutlined /> {moment.unix(item.add_time).format('YYYY-MM-DD hh:mm').toString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={6}>
            <Author />
            <User />
            <Sentence />
          </Col>
        </Row>
      </div>
      {/* <Footer /> */}
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
