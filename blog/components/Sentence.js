import Image from 'next/image'
const Sentence = () => {
  return (
    <div className="sen-box comm-box">
      <p>每日一句</p>
      <Image src="/sen.png" width={252} height={155} />
      <p className="sen-detail">任何选择都来源于喜欢</p>
    </div>
  )
}
export default Sentence
