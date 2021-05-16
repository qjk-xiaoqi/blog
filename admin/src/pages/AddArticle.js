import React, { useState, useEffect } from 'react'
import marked from 'marked'
import qs from 'query-string'
import moment from 'moment'
import { Input, Select, Button, DatePicker, message, Row, Col, Upload } from 'antd'
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
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [articleInfo, setArticleInfo] = useState({
    title: '',
    introduce: '',
    time: null,
    typeId: 0,
    typeName: '',
  })

  const handleChangeContent = e => {
    const html = marked(e.target.value)
    setArticleContent(e.target.value)
    setMarkdownContent(html)
  }

  const handleSubmit = isPublish => {
    const { title, introduce, time } = articleInfo
    const addTime = moment(time).valueOf() / 1000 || 0
    const params = {
      type_id: articleInfo.typeId,
      title,
      content: articleContent,
      introduce,
      time: addTime,
      isPublish: isPublish ? 1 : 0,
    }

    // 如果是0就是新增文章
    if (articleId === 0) {
      params.count = Math.ceil(Math.random() * 1000) + 1000
      addArticle(params).then(res => {
        const { data } = res
        if (!data) {
          return
        }
        setArticleId(data.insertId)
        data.isSuccess
          ? message.success(isPublish ? '发布成功！' : '保存成功')
          : message.error(isPublish ? '发布失败！' : '保存失败')
      })
    } else {
      params.id = articleId
      updateArticle(params).then(res => {
        const { data } = res
        if (!data) {
          return
        }
        data.isSuccess
          ? message.success(isPublish ? '修改成功！' : '保存成功!')
          : message.error(isPublish ? '修改失败！' : '保存失败')
      })
    }
  }

  const handlePublish = () => {
    const { title, introduce, time } = articleInfo
    if (!title || !articleContent || !introduce || !time) {
      message.warn('内容不能为空!')
      return
    }
    handleSubmit(true)
  }

  const saveArticle = () => {
    const { title, introduce } = articleInfo
    if (!title && !articleContent && !introduce) {
      message.warn('内容不能为空!')
      return
    }
    handleSubmit(false)
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
      const { id, add_time, article_content, introduce, title, type_id, typeName } = data[0]
      const html = marked(article_content)
      setArticleId(id)
      setMarkdownContent(html)
      setArticleContent(article_content)
      setArticleInfo({ title, introduce, time: moment.unix(add_time), typeId: type_id, typeName })
    })
  }, [props.location.search])

  useEffect(() => {
    getTypeInfo().then(res => {
      const { data } = res
      if (!data || data.length === 0) {
        return
      }
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
    <>
      <div className="add-header">
        <Input
          placeholder="博客标题"
          size="large"
          className="add-title  "
          value={articleInfo.title}
          onChange={e => {
            setArticleInfo({ ...articleInfo, title: e.target.value })
          }}
        />
        <Select
          placeholder="文章类型"
          value={articleInfo.typeName ? articleInfo.typeName : null}
          size="large"
          allowClear
          className="add-btn"
          style={{ width: 130 }}
          onSelect={optionId => {
            setArticleInfo({ ...articleInfo, typeId: optionId, typeName: typeInfo[optionId - 1].typename })
          }}>
          {typeInfo.map(item => {
            return (
              <Option key={item.id} value={item.Id}>
                {item.typename}
              </Option>
            )
          })}
        </Select>
        <DatePicker
          placeholder="发布日期"
          style={{ width: 150 }}
          size="large"
          className="add-btn"
          value={articleInfo.time}
          onChange={date => {
            setArticleInfo({ ...articleInfo, time: date })
          }}
        />
        <Button size="large" className="add-save-btn" onClick={saveArticle}>
          保存草稿
        </Button>
        <Button type="primary" size="large" onClick={handlePublish}>
          发布文章
        </Button>
      </div>
      <Row className="add-introduce">
        {/* <Col> */}
        <TextArea
          rows={3}
          placeholder="文章简介"
          value={articleInfo.introduce}
          onChange={e => {
            setArticleInfo({ ...articleInfo, introduce: e.target.value })
          }}
        />
        {/* </Col> */}
        {/* <Col span={8}>
          <span>上传封面图</span>
        </Col> */}
      </Row>
      <div className="add-editor-box">
        <TextArea
          className="add-editor"
          rows={25}
          placeholder="文章内容"
          value={articleContent}
          onChange={handleChangeContent}
          onPressEnter={handleChangeContent}
        />
        <div className="add-preview" dangerouslySetInnerHTML={{ __html: markdownContent }} />
      </div>
    </>
  )
}

export default AddArticle
