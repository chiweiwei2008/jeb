// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

exports.main = async (event, context) => {
  //获取缺陷数据集
  const resquexian = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'getQuexian',
    // 传递给云函数的参数
    data: {
    }
  });
  let quexianlist = resquexian.result.data;

  //获取设备台账数据集
  const resshebei = await cloud.callFunction({
    // 要调用的云函数名称
    name: 'getJxgs',
    // 传递给云函数的参数
    data: {
      sbsblx:event.sbsblx,
    }
  });
  let shebeilist = resshebei.result.data;
 for(let i=0;i<shebeilist.length;i++){
      shebeilist[i].quexianList=[];
   for(let j=0;j<quexianlist.length;j++){
     if (shebeilist[i].bdzname === quexianlist[j].bdzname && shebeilist[i].sbyxbh === quexianlist[j].sbyxbh){
       shebeilist[i].quexianList.push(quexianlist[j]);
     };
   };
 };
 return shebeilist;
  
}
