import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import moment from 'moment'
import { Col, Row, List } from 'antd'
import { CalendarOutlined, HeartOutlined, UserOutlined } from '@ant-design/icons'
import Header from '../components/Header'
import Author from '../components/Author'
import Sentence from '../components/Sentence'
import User from '../components/User'
import { getArticleList } from '../util/api'

export default function Home() {
  const router = useRouter()
  const [myList, setMyList] = useState([])

  const handleClick = item => {
    router.push({
      pathname: '/detail',
      query: { id: item.id, type_id: item.type_id, type_name: item.type_name },
    })
  }

  useEffect(() => {
    getArticleList().then(res => {
      if (!res) {
        return
      }
      setMyList(res.data)
    })
  }, [])

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <div className="comm-header">
        <Header />
      </div>
      <div className="comm-content">
        {/* <div className="comm-banner"></div> */}
        <Row className="comm-main" type="flex" justify="space-between">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={17}>
            <List
              header={<div className="new-article">最新文章</div>}
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
          <Col className="comm-right" xs={0} sm={0} md={8} lg={8} xl={6}>
            <Author />
            <User />
            <Sentence />
          </Col>
        </Row>
      </div>

      {/* <Footer /> */}
    </div>
  )
}
