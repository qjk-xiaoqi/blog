import React from 'react'
import { Col, Row, Breadcrumb, Affix, Divider, Avatar, Input, Button } from 'antd'
import moment from 'moment'
import { CalendarOutlined, TagOutlined, UserOutlined, HeartOutlined, CommentOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'
import MarkNav from 'markdown-navbar'
import marked from 'marked'
import highlight from 'highlight.js'
import Header from '../components/Header'
import Author from '../components/Author'
import CommentCom from '../components/Comment'
// import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { getArticleById } from '../util/api'

const Detail = ({ data, params, id }) => {
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer, // 必要 自定义的Renderer渲染出自定义的格式
    gfm: true, // 启动类似Github样式的Markdown,填写true或者false
    pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    sanitize: false, // 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写false
    tables: true, // 支持Github形式的表格，必须打开gfm选项
    breaks: false, // 支持Github换行符，必须打开gfm选项，填写true或者false
    smartLists: true, // 优化列表输出，这个填写true之后，你的样式会好看很多，所以建议设置成true
    smartypants: false,
    highlight: function (code) {
      // 高亮显示规则 ，这里我们将使用highlight.js来完成
      return highlight.highlightAuto(code).value
    },
  })

  // 使用 marked 将文章内容解析
  const html = marked(data.article_content)
  return (
    <>
      <Head>
        <title>博客详情页</title>
      </Head>
      <div className="comm-header">
        <Header />
      </div>
      <div className="comm-content ">
        <Row className="comm-main" type="flex" justify="space-between">
          <Col className="comm-left" xs={24} sm={24} md={16} lg={16} xl={18}>
            <div>
              <div className="bread-box">
                <Breadcrumb>
                  <Breadcrumb.Item>
                    <Link href="/">
                      <a>首页</a>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>
                    <Link href={`/list?type=${params.type_id}`}>
                      <a>{params.type_name}</a>
                    </Link>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{data.title}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
            <div>
              <div className="detail-title">{data.title}</div>
              <div className="list-icon list-center">
                <span>
                  <TagOutlined />
                  {data.typeName}
                </span>
                <span>
                  <UserOutlined />
                  5283人
                </span>
                <span>
                  <CalendarOutlined /> {moment.unix(data.add_time).format('YYYY-MM-DD hh:mm').toString()}
                </span>
              </div>

              <div className="detail-content" dangerouslySetInnerHTML={{ __html: html }}></div>
            </div>
            <div className="detail-comment-box">
              <Divider orientation="left" className="detail-comment-divider">
                评论区
              </Divider>
              <CommentCom id={id} />
            </div>
          </Col>
          <Col className="comm-right" xs={0} sm={0} md={8} lg={8} xl={6}>
            <Author />
            {/* <Advert /> */}
            <Affix offsetTop={5}>
              <div className="detail-nav comm-box">
                <div className="nav-title">文章目录</div>
                <MarkNav className="article-menu" source={data.article_content} ordered={false} />
              </div>
            </Affix>
          </Col>
        </Row>
        <div className="detail-panel-box">
          <div className="detail-panel detail-like detail-with-badge detail-active" data-badge="890">
            <HeartOutlined className="detail-icon  active" />
          </div>
          <div className="detail-panel detail-comment detail-with-badge" data-badge="890">
            <CommentOutlined className="detail-icon" />
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  )
}

// 此函数在构建时被调用
Detail.getInitialProps = async context => {
  const { id, type_id, type_name } = context.query
  const res = await getArticleById({ id })
  if (!res) {
    return
  }
  return {
    data: res.data[0],
    params: {
      type_id,
      type_name,
    },
    id,
  }
}

export default Detail
