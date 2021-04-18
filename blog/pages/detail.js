import React from 'react'
import { Col, Row, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, VideoCameraOutlined, UserOutlined } from '@ant-design/icons'
import Head from 'next/head'
import Link from 'next/link'
import MarkNav from 'markdown-navbar'
import marked from 'marked'
import highlight from 'highlight.js'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import { getArticleById } from '../util/api'
import 'highlight.js/styles/monokai-sublime.css'
import '../styles/pages/detail.css'

const Detail = ({ data, params }) => {
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
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
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
                <CalendarOutlined /> 2020-10-9
              </span>
              <span>
                <VideoCameraOutlined />
                {data.typeName}
              </span>
              <span>
                <UserOutlined />
                5283人
              </span>
            </div>

            <div className="detail-content" dangerouslySetInnerHTML={{ __html: html }}></div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
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
      <Footer />
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
  }
}

export default Detail
