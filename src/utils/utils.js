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
/**
 * @desc 日期格式化
 * @param { object } date 时间对象
 * @param { string } fmt 格式化字符串
 */
export const dateFormat = function (date, fmt) {
  let ret;
  
  if (typeof date !== 'object') {
    date = new Date(date-0)
  }
  fmt = fmt ? fmt : 'YYYY-mm-dd HH:MM:SS'
  const opt = {
      "Y+": date.getFullYear().toString(),        // 年
      "m+": (date.getMonth() + 1).toString(),     // 月
      "d+": date.getDate().toString(),            // 日
      "H+": date.getHours().toString(),           // 时
      "M+": date.getMinutes().toString(),         // 分
      "S+": date.getSeconds().toString()          // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
      };
  };
  return fmt;
}
