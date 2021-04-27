// import App from 'next/app'
import dynamic from 'next/dynamic'
import 'antd/dist/antd.css'
import '../styles/pages/comm.css'
import '../styles/pages/detail.css'
import '../styles/components/sentence.css'
import '../styles/components/author.css'
import '../styles/components/footer.css'
import '../styles/components/header.css'
import '../styles/components/comment.css'
import '../styles/components/user.css'
import '../styles/pages/index.css'
import 'highlight.js/styles/monokai-sublime.css'
import 'antd/dist/antd.css'

const Module = dynamic(import('next/app'), { ssr: false })
export default Module
