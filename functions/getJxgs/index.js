// 云函数入口文件
//第一次初版
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  //查询条件
  let filterObj = {};
  if (!(event.sbsblx === '')) filterObj.sbsblx = event.sbsblx;
  // 先取出集合记录总数
  const countResult = await db.collection('jxgs').where(filterObj).count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = db.collection('jxgs').where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
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


//第二版
// const cloud = require('wx-server-sdk')
// cloud.init()
// const db = cloud.database()
// const MAX_LIMIT = 100
// exports.main = async (event, context) => {
//   //查询条件
//   let filterObj = {};
//   if (!(event.sbsblx === '')) filterObj.sblxtype = event.sbsblx;
//   // 先取出集合记录总数
//   const countResult = await db.collection('pmis').where(filterObj).count()
//   const total = countResult.total
//   // 计算需分几次取
//   const batchTimes = Math.ceil(total / MAX_LIMIT)
//   // 承载所有读操作的 promise 的数组
//   const tasks = []
//   for (let i = 0; i < batchTimes; i++) {
//     const promise = db.collection('pmis').field({
//       _id:true,
//       sblxtype: true,
//       touyundate: true
//     }).where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
//     tasks.push(promise)
//   }
//   // 等待所有
//   return (await Promise.all(tasks)).reduce((acc, cur) => {
//     return {
//       data: acc.data.concat(cur.data),
//       errMsg: acc.errMsg,
//     }
//   })
// }