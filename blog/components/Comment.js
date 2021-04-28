import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Avatar, Input, Button, Comment, Form, message, Spin, List, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { submitArticleComment } from '../util/api'

const CommentEditor = ({ id, getCommentList }) => {
  const loginInfo = JSON.parse(localStorage.getItem('login') || '{}')
  const [commentValue, setCommentValue] = useState('')
  const onChangeArea = e => setCommentValue(e.target.value)

  const onSubmit = async () => {
    if (!localStorage.getItem('login')) {
      message.info('请登录')
      return
    }
    if (!commentValue.trim()) {
      message.info('内容不能为空')
      return
    }

    const { username } = loginInfo
    const params = {
      author: username,
      avatar: '',
      content: commentValue,
      pid: 0,
      date: +new Date(),
      type: id,
    }

    submitArticleComment(params)
      .then(res => {
        if (!res.success) {
          message.error('留言失败！')
          return
        }
        message.success('留言成功！')
        setCommentValue('')
        getCommentList()
      })
      .catch(() => {
        message.error('留言失败！')
      })
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
const CommentItem = ({ data, id, getCommentList, children }) => {
  const loginInfo = JSON.parse(localStorage.getItem('login') || '{}')
  const { author, avatar, content, date, fathername } = data
  const [isShow, setIsShow] = useState(false)
  const [commentValue, setCommentValue] = useState('')

  const onChangeArea = e => setCommentValue(e.target.value)

  const toggleComment = () => {
    setIsShow(!isShow)
    setCommentValue('')
  }

  const handleSubmit = () => {
    if (!localStorage.getItem('login')) {
      message.error('请登录')
      return
    }
    if (!commentValue.trim()) {
      message.info('内容不能为空')
      return
    }

    const params = {
      author: loginInfo.username,
      avatar: '',
      content: commentValue,
      pid: data.pid || data.id,
      date: +new Date(),
      type: id,
      fathername: author,
    }

    submitArticleComment(params)
      .then(res => {
        if (!res.success) {
          message.error('留言失败！')
          return
        }
        message.success('留言成功！')
        setIsShow(false)
        setCommentValue('')
        getCommentList()
      })
      .catch(() => {
        message.error('留言失败！')
      })
  }

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
                placeholder={`回复...${author}`}
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
      author={fathername ? `${author} 回复 ${fathername}` : author}
      avatar={<Avatar icon={<UserOutlined />} />}
      content={content}
      children={children}
      datetime={
        <Tooltip title={moment(date).format('YYYY-MM-DD HH:mm:ss')}>
          <span>{moment(date).fromNow()}</span>
        </Tooltip>
      }
    />
  )
}

// 评论list
const CommentList = props => {
  const { list, ...rest } = props
  return (
    <List
      className="comment-list"
      itemLayout="horizontal"
      dataSource={list}
      renderItem={item => {
        return (
          <li>
            {item.children ? (
              <CommentItem data={item} children={<CommentList list={item.children} {...rest} />} />
            ) : (
              <CommentItem data={item} {...rest} />
            )}
          </li>
        )
      }}
    />
  )
}

const CommentCom = props => {
  const { id, commentList, loading, getCommentListById } = props
  useEffect(() => {
    getCommentListById()
  }, [])
  return (
    <>
      <CommentEditor getCommentList={getCommentListById} id={id} />
      <Spin spinning={loading} size="large">
        <CommentList list={commentList} getCommentList={getCommentListById} id={id} />
      </Spin>
    </>
  )
}

export default CommentCom
