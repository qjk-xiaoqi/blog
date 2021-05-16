import React, { useState } from 'react'
import { Card, Input, Button, Spin, Form, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { checkLogin } from '../util/api'
import 'antd/dist/antd.css'
import './Login.css'

const Login = props => {
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()

  const handleSubmit = () => {
    form.validateFields().then(values => {
      const params = { ...values }
      setLoading(true)
      checkLogin(params)
        .then(res => {
          const { data, status } = res
          if (status === 0) {
            localStorage.setItem('Authorization', data.token)
            setLoading(false)
            props.history.push('/index')
          }
          if (status === 1) {
            message.error(data.message)
            setTimeout(() => {
              setLoading(false)
            }, 500)
          }
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
    })
  }
  return (
    <div className="login">
      <Spin tip="登录中..." spinning={loading}>
        <Card bordered title="博客后台管理系统">
          <Form form={form} name="login" className="login-form">
            <Form.Item name="userName" rules={[{ required: true, message: '请输入用户名' }]}>
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
              />
            </Form.Item>
            {/* <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item> */}

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-button" onClick={handleSubmit}>
                登录
              </Button>
              {/* Or <a href="">register now!</a> */}
            </Form.Item>
          </Form>
        </Card>
      </Spin>
    </div>
  )
}

export default Login
