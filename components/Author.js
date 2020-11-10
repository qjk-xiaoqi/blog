import {Avatar, Divider} from "antd"
import {GithubOutlined,WechatOutlined} from "@ant-design/icons"
import "../styles/components/author.css"
const Author = () => {
    return (
        <div className="author-box comm-box">
            <div> <Avatar size={100} src="https://profile.csdnimg.cn/D/F/F/1_qq_41257129"/></div>
            <div className="author-introduction">
                小柒爱前端
                <Divider>社交账号</Divider>
                <Avatar size={30} icon={<GithubOutlined />} className="account"/>
                <Avatar size={30} icon={<WechatOutlined />} className="account"/>
            </div>
        </div>
    )
}

export default Author;