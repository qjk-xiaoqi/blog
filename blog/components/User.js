import React, { useEffect, useState } from 'react'
import { Divider, Card, Avatar, Button, Modal, Form, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { userRegister, userLogin, checkUsername } from '../util/api'

// 登录
const LoginForm = ({ closeModal, setUserInfo }) => {
  const [form] = Form.useForm()
  const handleSubmit = values => {
    userLogin(values)
      .then(res => {
        const { data, success, message: msg } = res
        const { user_info } = data
        const curInfo = { username: user_info.username }
        if (!success) {
          message.error(msg)
          return
        }
        form.resetFields()
        closeModal()
        setUserInfo(curInfo)
        localStorage.setItem('login', JSON.stringify(curInfo))
        message.success(msg)
        history.go(0)
      })
      .catch(() => {
        message.error('登录失败')
      })
    return
  }

  return (
    <Form form={form} name="user_login" className="user-form" onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入账号' }]}>
        <Input prefix={<UserOutlined />} placeholder="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input prefix={<LockOutlined />} type="password" placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="user-login-from-btn">
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

// 注册
const RegisterForm = ({ closeModal }) => {
  const [form] = Form.useForm()

  // 检查用户名是否重复
  const checkUser = () => {
    const username = form.getFieldValue('username')
    if (!username) {
      return
    }
    checkUsername({ username })
      .then(res => {
        const { data, message } = res
        if (data?.userList.length) {
          form.setFields([{ name: 'username', value: username, errors: [message] }])
        }
      })
      .catch(err => {})
  }

  // 确认密码是否一致
  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不一致')
    } else {
      callback()
    }
  }

  // 提交
  const handleSubmit = values => {
    userRegister(values)
      .then(res => {
        if (!res.success) {
          message.error(res.message)
          return
        }
        message.success(res.message)
        closeModal()
      })
      .catch(err => {
        message.error('注册失败')
      })
  }

  return (
    <Form form={form} onFinish={handleSubmit} className="user-form">
      <Form.Item
        name="username"
        hasFeedback
        rules={[
          { required: true, message: '请输入账号' },
          // {
          //   validator: checkUser,
          // },
          { max: 6, message: '最多6字符' },
          { min: 2, message: '最少2字符' },
        ]}>
        <Input onBlur={checkUser} prefix={<UserOutlined />} placeholder="username" />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请输入密码',
          },
          { max: 6, message: '最多6字符' },
          { min: 2, message: '最少2字符' },
          {
            // validator: validateToNextPassword,
          },
        ]}>
        <Input.Password prefix={<LockOutlined />} type="password" placeholder="password" />
      </Form.Item>
      <Form.Item
        name="confirm"
        hasFeedback
        rules={[
          {
            required: true,
            message: '请再次输入密码',
          },
          {
            validator: compareToFirstPassword,
          },
          { max: 6, message: '最多6字符' },
          { min: 2, message: '最少2字符' },
        ]}>
        <Input.Password
          // onBlur={handleConfirmBlur}
          prefix={<LockOutlined />}
          type="password"
          placeholder="Confirm Password"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

const User = props => {
  const [userInfo, setUserInfo] = useState({ username: '' })
  const [registerShow, setRegisterShow] = useState(false)
  const [visible, setVisible] = useState(false)

  // 注销
  const handleLoginOut = () => {
    localStorage.removeItem('login')
    setUserInfo({ username: '' })
    history.go(0)
  }

  // 打开弹窗
  const showModal = () => setVisible(true)

  // 关闭弹窗
  const closeModal = () => {
    setRegisterShow(false)
    setVisible(false)
  }

  // 是否注册
  const handleRegister = () => setRegisterShow(!registerShow)

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem('login') || '{}')
    if (!info.username) {
      return
    }
    setUserInfo(info)
  }, [])

  return (
    <div className="user-box comm-box">
      <Divider style={{ color: '#888', fontSize: '14px' }}>USER</Divider>
      <Card bordered={false}>
        <div className="user-card-box">
          <Avatar size={55} style={{ backgroundColor: '#cce3fb' }} icon={<UserOutlined />} />
          {userInfo.username && <p className="user-name">{userInfo.username}</p>}
        </div>
      </Card>
      {userInfo.username ? (
        <Button className="user-btn" block onClick={handleLoginOut}>
          注销
        </Button>
      ) : (
        <Button className="user-btn" block onClick={showModal}>
          登录
        </Button>
      )}

      <Modal
        title={registerShow ? '注册' : '登录'}
        width={500}
        visible={visible}
        footer={null}
        onCancel={closeModal}
        maskClosable={false}>
        {registerShow ? (
          <RegisterForm closeModal={closeModal} />
        ) : (
          <LoginForm closeModal={closeModal} setUserInfo={setUserInfo} />
        )}
        <div style={{ padding: '0 50px' }}>
          <span onClick={handleRegister} style={{ color: '#70acf0', cursor: 'pointer' }}>
            {registerShow ? '返回登录' : '没有账号? 前往注册'}
          </span>
        </div>
      </Modal>
    </div>
  )
}

export default User
