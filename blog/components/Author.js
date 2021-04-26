import { Avatar, Divider, Popover } from 'antd'
import Image from 'next/image'
import { GithubOutlined, WechatOutlined } from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-box comm-box">
      <Image width={100} height={100} src="/crazy.jpg" className="author-img" />
      <div className="author-introduction">
        <p className="author-name">小柒</p>
        <p className="author-introduce">@字节跳动</p>
        <Divider>
          <span className="author-info-divider">社交账号</span>
        </Divider>
        <a href="https://github.com/qjk-xiaoqi" target="_blank">
          <Avatar size={30} icon={<GithubOutlined />} className="author-info  author-info-github" />
        </a>
        <Popover content={<Image width={120} height={120} src="/ewm.png" />} placement="bottom">
          <Avatar size={30} icon={<WechatOutlined />} className="author-info  author-info-wx" />
        </Popover>
        ,
      </div>
    </div>
  )
}

export default Author
