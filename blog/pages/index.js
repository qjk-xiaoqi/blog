import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Button, Col, Row, List } from 'antd'
import { CalendarOutlined, VideoCameraOutlined, UserOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { getArticleList } from '../util/api'
import '../styles/pages/index.css'

export default function Home() {
  const [myList, setMyList] = useState([])

  useEffect(() => {
    getArticleList().then(res => {
      if (!res) {
        return
      }
      setMyList(res.data)
    })
  }, [])

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <div className="comm-content">
        <Row className="comm-main" type="flex" justify="space-between">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={17}>
            <List
              header={<div>最新文章</div>}
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
                      5283人
                    </span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={6}>
            <Author />
            <Advert />
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  )
}
