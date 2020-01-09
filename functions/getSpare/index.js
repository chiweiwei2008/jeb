// 云函数入口文件
const cloud = require('wx-server-sdk')
const MAX_LIMIT = 100
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const countResult = await db.collection('spare').count();
  const total=countResult.total;
  const batchTimes=total/MAX_LIMIT;
  const tasks=[];
  for(let i=0;i<batchTimes;i++){
    const promiseobj= await db.collection('spare').skip(i*MAX_LIMIT).limit(MAX_LIMIT).get();
    tasks.push(promiseobj);
  }
  var ratedlist=[];
  var usedlist=[];
  for(let k=0;k<tasks[0].data.length;k++){
    var spareobj={};
    spareobj.sparename=tasks[0].data[k].sparename;
    spareobj.sparetype=tasks[0].data[k].sparetype;
    if(parseInt(tasks[0].data[k].sparenumber)-parseInt(tasks[0].data[k].ratednumber)<0)ratedlist.push(spareobj);
    if(parseInt(tasks[0].data[k].sparenumber)-parseInt(tasks[0].data[k].usednumber)<0)usedlist.push(spareobj);
  };
  var reslist=[];
  reslist.push(ratedlist);
  reslist.push(usedlist);
  return reslist;
}