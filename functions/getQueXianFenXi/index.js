// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
// 云函数入口函数
exports.main = async (event, context) => {
 //查询条件
 let filterObj = {};
 if (!(event.sbsblx === '')) filterObj.typename = event.sbsblx;
 // 先取出集合记录总数
 const countResult = await db.collection('quexiantest').where(filterObj).count()
 const total = countResult.total
 // 计算需分几次取
 const batchTimes = Math.ceil(total / MAX_LIMIT)
 // 承载所有读操作的 promise 的数组
 const tasks = []
 for (let i = 0; i < batchTimes; i++) {
   const promise = await db.collection('quexiantest').where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
   tasks.push(promise);
 }
 //获取缺陷按年限分布数据
 var oneflagyear= 0;//1-5年
 var twoflagyear = 0;//6-10年
 var threeflagyear = 0;//11-15年
 var fourflagyear = 0;//15年以上
 var yearObj={};
 var date = new Date().getFullYear();
for(let j=0;j<tasks[0].data.length;j++)
{
  let date1 = new Date(tasks[0].data[j].touyundate).getFullYear();
  if ((date - date1) > 15) fourflagyear = fourflagyear + 1;
  if (((date - date1) >= 11) && ((date - date1) <= 15)) threeflagyear = threeflagyear + 1;
  if (((date - date1) >= 6) && ((date - date1) <= 10)) twoflagyear = twoflagyear + 1;
  if (((date - date1) >= 0) && ((date - date1) <= 5)) oneflagyear = oneflagyear + 1;
}
yearObj.oneflagyear=oneflagyear;
yearObj.twoflagyear=twoflagyear;
yearObj.threeflagyear=threeflagyear;
yearObj.fourflagyear=fourflagyear;

//获取缺陷分类
var quexianlist=[];
var typelist=[];
var defectproperty=[];//获取缺陷性质
for(let j=0;j<tasks[0].data.length;j++)
{
  typelist.push(tasks[0].data[j].qxqxlx);
  defectproperty.push(tasks[0].data[j].qxqxxingzhi);
}
//数据去重
var typelistunique=arrayUnique(typelist);
//获取缺陷类别次数
for(let i=0;i<typelistunique.length;i++){
  let typetotal=0;
  let quexianObj={};
  for(let j=0;j<typelist.length;j++){
    if(typelist[j]===typelistunique[i])typetotal=typetotal+1;
    if(j==typelist.length-1){
      quexianObj.typename=typelistunique[i];
      quexianObj.typetotal=typetotal;
      quexianlist.push(quexianObj);
    };
  }
}

//获取各缺陷性质占比（危急/严重/一般）
var criticalnumber=0;
var seriousnumber=0;
var commonlynumber=0;
for(let j=0;j<defectproperty.length;j++){
  if(defectproperty[j]==="危急")criticalnumber=criticalnumber+1;
  if(defectproperty[j]==="严重")seriousnumber=seriousnumber+1;
  if(defectproperty[j]==="一般")commonlynumber=commonlynumber+1;
  if(j==typelist.length-1){
    defectproperty=[];
    defectproperty.push(criticalnumber);
    defectproperty.push(seriousnumber);
    defectproperty.push(commonlynumber);
  };
}


//获取各数据装入返回数组
  let reslist=[];
  reslist.push(yearObj);
  reslist.push(quexianlist);
  reslist.push(defectproperty);
  return reslist;
}

//数据去重函数
function arrayUnique(arr) {
	var result = [], hash = {};
	for (var i = 0, elem; (elem = arr[i]) != null; i++) {
		if (!hash[elem]) {
			result.push(elem);
			hash[elem] = true;
		}
	}
	return result;
}