import React, { useState, useEffect } from 'react'
import marked from 'marked'
import qs from 'query-string'
import moment from 'moment'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import { getTypeInfo, addArticle, updateArticle, getArticleById } from '../util/api'
import './AddArticle.css'

const { Option } = Select
const { TextArea } = Input

marked.setOptions({
  renderer: marked.Renderer(),
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
})

const AddArticle = props => {
  const [articleId, setArticleId] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('') //文章标题
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introduce, setIntroduce] = useState() //简介的markdown内容
  const [introduceHtml, setIntroduceHtml] = useState('等待编辑') //简介的html内容
  const [time, setTime] = useState() //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedTypeInfo, setSelectTypeInfo] = useState({ typeId: 0, typeName: '' }) //选择的文章类别

  const handleChangeContent = e => {
    const html = marked(e.target.value)
    setArticleContent(e.target.value)
    setMarkdownContent(html)
  }

  const handlePublish = () => {
    console.log(articleTitle)
  }

  const saveArticle = () => {
    if (!articleTitle && !articleContent && !introduce) {
      message.warn('内容不能为空!')
    }

    const addTime = moment(time).valueOf() / 1000 || 0
    console.log(selectedTypeInfo.typeId)
    const data = {
      type_id: selectedTypeInfo.typeId,
      title: articleTitle,
      content: articleContent,
      introduce: introduce || '',
      time: addTime,
    }

    // 如果是0就是新增文章
    if (articleId === 0) {
      data.count = Math.ceil(Math.random() * 1000) + 1000
      addArticle(data).then(res => {
        const { data } = res
        if (!data) {
          return
        }
        setArticleId(data.insertId)
        data.isSuccess ? message.success('发布成功！') : message.error('发布失败！')
      })
    } else {
      data.id = articleId
      updateArticle(data).then(res => {
        const { data } = res
        if (!data) {
          return
        }
        data.isSuccess ? message.success('修改成功！') : message.error('修改失败！')
      })
    }
  }

  useEffect(() => {
    const { id } = qs.parse(props.location.search)
    if (!id) {
      return
    }
    getArticleById({ id }).then(res => {
      const { data } = res
      if (!data || data.length === 0) {
        return
      }
      // const { id, add_time, article_content, introduce, title, type_id, typeName } = data[0]
      console.log(data[0], '获取')
      // setArticleTitle(title)
      // setArticleContent(article_content)
      // setArticleId(id)
      // setIntroduce(introduce)
      // setTime(moment.unix(add_time))
      // setSelectTypeInfo({ typeId: type_id, typeName })
    })
  }, [props.location.search])

  useEffect(() => {
    getTypeInfo().then(res => {
      if (localStorage.getItem('openId')) {
        // localStorage.removeItem('openId')
        setTypeInfo(res.data)
      } else {
        props.history.push('/')
        message.error('请登录！')
      }
    })
  }, [props.history])

  return (
    <Row gutter={5}>
      <Col span={17} className="add-left">
        <Row gutter={10} justify="space-between">
          <Col span={20}>
            <Input
              placeholder="博客标题"
              size="large"
              value={articleTitle}
              onChange={e => {
                setArticleTitle(e.target.value)
              }}
            />
          </Col>
          <Col span={4} className="add-select-box">
            <Select
              defaultValue="请选择"
              // value={typeName}
              size="large"
              style={{ width: 110 }}
              onSelect={optionId => {
                setSelectTypeInfo(Number(optionId) + 1)
              }}>
              {typeInfo.map((item, index) => {
                return (
                  <Option key={index} value={item.Id}>
                    {item.typename}
                  </Option>
                )
              })}
            </Select>
          </Col>
        </Row>
        <br />
        <Row gutter={10}>
          <Col span={12}>
            <TextArea
              className="add-editor"
              rows={25}
              placeholder="文章内容"
              value={articleContent}
              onChange={handleChangeContent}
              onPressEnter={handleChangeContent}
            />
          </Col>
          <Col span={12}>
            <div className="add-preview" dangerouslySetInnerHTML={{ __html: markdownContent }} />
          </Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row>
          <Col span={24}>
            <Button size="large" className="add-save-btn" onClick={saveArticle}>
              保存草稿
            </Button>
            <Button type="primary" size="large" onClick={saveArticle}>
              发布文章
            </Button>
            <br />
          </Col>
          <Col span={24} className="add-introduce">
            <TextArea
              rows={4}
              placeholder="文章简介"
              onChange={e => {
                setIntroduce(e.target.value)
              }}
            />
          </Col>
          <Col span={12}>
            <div className="date-select">
              <DatePicker
                placeholder="发布日期"
                size="large"
                value={time}
                onChange={(date, dateString) => {
                  setTime(date)
                }}
              />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AddArticle
