import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Avatar, Input, Button, Comment, Form, message, Spin, List } from 'antd'
import { submitArticleMessageApi, initArticleMessageApi } from '../util/api'
import { UserOutlined } from '@ant-design/icons'

const CommentEditor = ({ id }) => {
  const loginInfo = JSON.parse(localStorage.getItem('login') || '{}')
  const [commentValue, setCommentValue] = useState('')
  const onChangeArea = e => setCommentValue(e.target.value)

  const onSubmit = async () => {
    if (!commentValue) {
      message.info('内容不能为空')
      return
    }
    if (!localStorage.getItem('login')) {
      message.info('请登录')
      return
    }

    const { userName, avatar } = loginInfo
    const params = {
      author: userName,
      avatar: avatar,
      content: commentValue,
      pid: '0',
      date: +new Date(),
      type: id,
    }
    const result = await submitArticleMessageApi(params)
    if (!result.success) {
      message.error('留言失败！')
      return
    }
    const res = await initArticleMessageApi({ id })
    if (!res.success) {
      message.error('留言失败！')
      return
    }
    message.success('留言成功！')
  }

  return (
    <>
      <Comment
        author={loginInfo.username ? loginInfo.username : null}
        avatar={
          loginInfo.avatar ? (
            <Avatar src={loginInfo.avatar} alt={loginInfo.username} />
          ) : (
            <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#1890ff' }} />
          )
        }
        content={
          <>
            <Form.Item>
              <Input.TextArea rows={4} onChange={onChangeArea} value={commentValue} />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" onClick={onSubmit} type="primary">
                评论
              </Button>
            </Form.Item>
          </>
        }
      />
    </>
  )
}

// 评论item
const CommentItem = ({ data }) => {
  const { userName, author, avatar, content, date } = data
  const [isShow, setIsShow] = useState(false)
  const [commentValue, setCommentValue] = useState('')

  const onChangeArea = e => setCommentValue(e.target.value)
  const toggleComment = () => setIsShow(!isShow)
  const handleSubmit = () => {}

  return (
    <Comment
      actions={[
        <>
          <span onClick={toggleComment}>回复</span>
          {isShow && (
            <>
              <Input.TextArea
                onChange={onChangeArea}
                value={commentValue}
                placeholder={`回复...`}
                style={{ width: '100%', marginBottom: 5, fontSize: 12 }}
              />
              <Button onClick={handleSubmit} size="small" type="primary" style={{ fontSize: 12, marginRight: 10 }}>
                Submit
              </Button>
              <Button onClick={toggleComment} size="small" style={{ fontSize: 12 }}>
                Cancel
              </Button>
            </>
          )}
        </>,
      ]}
      author={author}
      avatar={avatar}
      content={content}
      datetime={
        <Tooltip title={moment(date).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(date).subtract(1, 'days').fromNow()}</span>
        </Tooltip>
      }
    />
  )
}

// 评论list
const CommentList = ({ list }) => {
  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={item => (
        <li>
          <CommentItem data={item} />
        </li>
      )}
    />
  )
}

const CommentCom = ({ id }) => {
  const [loading, setLoading] = useState(false)
  const [commentList, setCommentList] = useState([])

  useEffect(() => {
    setLoading(true)
    initArticleMessageApi({ id })
      .then(res => {
        const { data, success } = res
        if (!success) {
          return
        }
        setCommentList(data)
      })
      .catch(err => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <CommentEditor />
      <Spin spinning={loading} size="large">
        <CommentList list={commentList} id={id} />
      </Spin>
    </>
  )
}

export default CommentCom
