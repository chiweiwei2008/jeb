// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100

// 云函数入口函数
exports.main = async (event, context) => {

  // 先取出集合记录总数
  const countResult = await db.collection('jxgs').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  // 承载所有读操作的 promise 的数组
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise =await db.collection('jxgs').skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
  //检修周期、大修周期、状态评价、异常工况
  var repairlist=[];
  var mrepairlist=[];
  var evaluationlist=[];
  var abnormallist=[];
  var date= new Date().getFullYear();
  for(let j=0;j<tasks[0].data.length;j++)
{
  let date1 = new Date(tasks[0].data[j].repairtime).getFullYear();
  let date2 = new Date(tasks[0].data[j].mrepairtime).getFullYear();
  let evaluation = tasks[0].data[j].evaluation;
  var abnormal = tasks[0].data[j].abnormal;
  if ((date - date1) > 5) repairlist.push(tasks[0].data[j]);
  if((date - date2) >=10) mrepairlist.push(tasks[0].data[j]);
  if(evaluation==="严重状态" || evaluation==="异常状态") evaluationlist.push(tasks[0].data[j]);
  if(abnormal==="是") abnormallist.push(tasks[0].data[j]); 
}
  var reslist=[];
  reslist.push(repairlist);
  reslist.push(mrepairlist);
  reslist.push(evaluationlist);
  reslist.push(abnormallist);
  return reslist;
}