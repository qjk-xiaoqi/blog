import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button } from 'antd'
import { getArticleList, delArticle } from '../util/api'
import './ArticleList.css'

const { confirm } = Modal

const ArticleList = props => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const getList = () => {
    setLoading(true)
    getArticleList()
      .then(res => {
        const { data } = res
        if (!data) {
          return
        }
        setList(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleDelete = id => {
    confirm({
      title: '确定删除这篇文章吗？',
      content: '如果你点击确定按钮，文章将会永远被删除，无法恢复。',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        delArticle({ id }).then(res => {
          const { data } = res
          if (!data) {
            return
          }
          if (data) {
            getList()
            message.success('删除成功')
          } else {
            message.error('删除失败')
          }
        })
      },
    })
  }

  const handleUpdate = id => {
    props.history.push({ pathname: '/index/add', search: `id=${id}` })
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <List
        header={
          <Row className="list-div">
            <Col span={6}>
              <b>标题</b>
            </Col>
            <Col span={4}>
              <b>类别</b>
            </Col>
            <Col span={4}>
              <b>发布时间</b>
            </Col>
            <Col span={4}>
              <b>浏览量</b>
            </Col>

            <Col span={6}>
              <b>操作</b>
            </Col>
          </Row>
        }
        loading={loading}
        bordered
        dataSource={list}
        itemLayout="vertical"
        pagination={{
          pageSize: 10,
          showTotal: total => `共${total}条`,
        }}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={6}>{item.title}</Col>
              <Col span={4}>{item.type_name}</Col>
              <Col span={4}>{item.add_time}</Col>
              <Col span={4}>{item.view_count}</Col>
              <Col span={6}>
                <Button type="primary" onClick={() => handleUpdate(item.id)}>
                  修改
                </Button>
                &nbsp;
                <Button onClick={() => handleDelete(item.id)}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}></List>
    </>
  )
}

export default ArticleList
