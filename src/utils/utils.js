/**
 * @desc 解析路由参数
 * @param {string} path 路由参数 
 * @returns {object} queryObj 查询参数对象
 */
export const parseQuery = path => {
  let queryStr = path.split('?')[1]
  let queryArr = queryStr.split('&')

  let res = queryArr.reduce((prev, item) => {
    let [key, val] = item.split('=')
    prev[key] = val
    return prev
  }, {})
  return res
}