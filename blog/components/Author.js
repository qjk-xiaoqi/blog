import { Avatar, Divider, Popover } from 'antd'
import Image from 'next/image'
import { GithubOutlined, WechatOutlined, CopyrightOutlined } from '@ant-design/icons'

const Author = () => {
  return (
    <div className="author-box comm-box">
      <Divider>
        <span className="author-info-divider">ABOUT ME</span>
      </Divider>
      <Image width={100} height={100} src="/crazy.jpg" className="author-img" />
      <div className="author-introduction">
        <p className="author-name">小柒</p>
        <p className="author-introduce">每天努力一点点~</p>
        <p className="author-introduce">@字节跳动</p>
        <Divider>
          <span className="author-info-divider">FOLLOW ME</span>
        </Divider>
        <a href="https://github.com/qjk-xiaoqi" target="_blank">
          <Avatar size={30} icon={<GithubOutlined />} className="author-info  author-info-github" />
        </a>
        <a href="https://blog.csdn.net/qq_41257129" target="_blank">
          <Avatar size={30} icon={<CopyrightOutlined />} className="author-info author-info-csdn" />
        </a>
        <Popover content={<Image width={120} height={120} src="/ewm.png" />} placement="bottom">
          <Avatar size={30} icon={<WechatOutlined />} className="author-info  author-info-wx" />
        </Popover>
      </div>
    </div>
  )
}

export default Author
