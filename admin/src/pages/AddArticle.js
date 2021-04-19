import React, { useState } from 'react'
import marked from 'marked'
import './AddArticle.css'

import { Row, Col, Input, Select, Button, DatePicker } from 'antd'

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

const AddArticle = () => {
  const [articleId, setArticleId] = useState(0) // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('') //文章标题
  const [articleContent, setArticleContent] = useState('') //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState() //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState() //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  const handleChangeContent = e => {
    const html = marked(e.target.value)
    setArticleContent(e.target.value)
    setMarkdownContent(html)
  }

  const handlePublish = () => {}
  return (
    <Row gutter={5}>
      <Col span={17} className="add-left">
        <Row gutter={10} justify="space-between">
          <Col span={20}>
            <Input placeholder="博客标题" size="large" />
          </Col>
          <Col span={4} className="add-select-box">
            <Select defaultValue="Sign Up" size="large">
              <Option value="Sign Up">视频教程</Option>
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
            <Button size="large" className="add-save-btn">
              保存草稿
            </Button>
            <Button type="primary" size="large" onClick={handlePublish}>
              发布文章
            </Button>
            <br />
          </Col>
          <Col span={24} className="add-introduce">
            <TextArea rows={4} placeholder="文章简介" />
          </Col>
          <Col span={12}>
            <div className="date-select">
              <DatePicker placeholder="发布日期" size="large" />
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AddArticle
