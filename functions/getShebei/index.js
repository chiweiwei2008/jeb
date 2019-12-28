// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const sblxtypelist= ["断路器", "隔离开关", "组合电器", "母线", "开关柜", "主变压器", "避雷器", "避雷针", "电抗器", "电力电容器", "电流互感器", "电压互感器", "放电线圈", "接地网", "绝缘子", "熔断器", "所用变", "站内电缆", "阻波器"]
const MAX_LIMIT = 100

exports.main = async (event, context) => {
  //设置条件
  let filterObj = {};
  //返回数据集
  const shebeiObjlist = []
  // const pmslist = {}
  // 先取出集合记录总数
  for(let i=0;i<sblxtypelist.length;i++){
    var shebeiObj = {}
    filterObj.sblxtype = sblxtypelist[i];
    shebeiObj.sbsblx = sblxtypelist[i];
    const countResult = await db.collection('pmis').where(filterObj).count();
    const total = countResult.total
    shebeiObj.total = total;
    shebeiObjlist.push(shebeiObj);
  }
  
  return shebeiObjlist;
}

 
