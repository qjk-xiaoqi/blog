import React, { useState, useEffect } from 'react'
import { List, Row, Col, Modal, message, Button, Spin } from 'antd'
import moment from 'moment'
import { getCommentList, delComment } from '../util/api'
// import './CommentList.css'

const { confirm } = Modal

const CommentList = props => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)

  const getList = () => {
    setLoading(true)
    getCommentList()
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
      title: '确定删除这条留言吗？',
      content: '如果你点击确定按钮，文章将会永远被删除，无法恢复。',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        delComment({ id }).then(res => {
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
      <Spin size="large" spinning={loading}>
        <Row style={{ marginTop: 20, fontSize: 18 }}>
          <h1>留言列表</h1>
        </Row>
        <List
          header={
            <Row className="list-div">
              <Col span={3}>
                <b>id</b>
              </Col>
              <Col span={3}>
                <b>pid</b>
              </Col>
              <Col span={3}>
                <b>所属文章</b>
              </Col>
              <Col span={4}>
                <b>内容</b>
              </Col>
              <Col span={4}>
                <b>发布时间</b>
              </Col>
              <Col span={3}>
                <b>回复人</b>
              </Col>
              <Col span={4}>
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
                <Col span={3}>{item.id}</Col>
                <Col span={3}>{item.pid}</Col>
                <Col span={3}>{item.type}</Col>
                <Col span={4}>{item.content}</Col>
                <Col span={4}>{item.date ? moment(item.date).format('YYYY-MM-DD HH:mm') : ''}</Col>
                <Col span={3}>{item.fathername ? item.fathername : '--'}</Col>
                <Col span={4}>
                  <Button type="primary" onClick={() => handleDelete(item.id)}>
                    删除
                  </Button>
                </Col>
              </Row>
            </List.Item>
          )}></List>
      </Spin>
    </>
  )
}

export default CommentList
