// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
 // var filterObj={};
 // if (!(event.sblxtype === '')) filterObj.sblxtype = event.sblxtype;
   //投运年限分类
  const reslist={};
  var oneflagyear= 0;//1-5年
  var twoflagyear = 0;//6-10年
  var threeflagyear = 0;//11-15年
  var fourflagyear = 0;//15年以上
  var date = new Date().getFullYear();
  const countResult = await db.collection('pmis').count()
  const total = countResult.total
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT)
  const tasks = []
  for (let i = 0; i < batchTimes; i++) {
    const promise = await db.collection('pmis').field({
      _id:true,
      sblxtype: true,
      touyundate: true
    }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promise)
  }
for(let j=0;j<tasks.length;j++){
  for(let k=0;k<tasks[j].data.length;k++){
    let date1 = new Date(tasks[j].data[k].touyundate).getFullYear();
    if ((date - date1) > 15) fourflagyear = fourflagyear + 1;
    if (((date - date1) >= 11) && ((date - date1) <= 15)) threeflagyear = threeflagyear + 1;
    if (((date - date1) >= 6) && ((date - date1) <= 10)) twoflagyear = twoflagyear + 1;
    if (((date - date1) >= 0) && ((date - date1) <= 5)) oneflagyear = oneflagyear + 1;
  }

};
reslist.pmstotal=total;
reslist.oneflagyear = oneflagyear;
reslist.twoflagyear = twoflagyear;
reslist.threeflagyear = threeflagyear;
reslist.fourflagyear = fourflagyear;
  return reslist;
}