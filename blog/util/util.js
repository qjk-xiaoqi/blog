export const arrayCommentToTree = data => {
  if (!Array.isArray(data)) {
    return
  }
  if (!data.length) {
    return
  }
  const resultTree = []
  const map = {}
  data.forEach(item => {
    map[item.id] = item
  })
  data.forEach(item => {
    const parent = map[item.pid] // 是否存在父级
    if (parent) {
      ;(parent.children || (parent.children = [])).push(item)
    } else if (item.pid === 0) {
      resultTree.push(item)
    }
  })
  return resultTree
}
