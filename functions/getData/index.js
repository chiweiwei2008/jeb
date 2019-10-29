// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  // 先取出集合记录总数
  let filterObj = {};
  if (!(event.bdzname==='')) filterObj.bdzname = event.bdzname;
  if (!(event.sblxtype==='')) filterObj.sblxtype =event.sblxtype;
  if (!(event.searchKeywordyxbhid === '')) filterObj.yxbhid =event.searchKeywordyxbhid;
  if (!(event.searchKeywordtypename === '')) filterObj.typename = event.searchKeywordtypename;
 
  const countResult = await db.collection('pms').where(filterObj).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / 100)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('pms').where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  // 等待所有
  return (await Promise.all(tasks)).reduce((acc, cur) => {
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    }
  })
}
