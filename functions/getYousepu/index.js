// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  //筛选条件
  var filterObj={};
  if(!event.bdzname)event.bdzname="";
  if(!event.typename)event.typename="";
  if(!event.yxbhname)event.yxbhname="";
  // 先取出集合记录总数
  if(event.bdzname===""&&event.typename===""){
    //console.log("a----------------------a");
    const countResult = await db.collection('yousepu').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yousepu').field({
        _id:true,
        bdzname:true
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get();
      tasks.push(promiseobj)
    };
    var bdznamelist=[];
    for(let j=0;j<batchTimes;j++){
    for(let k=0;k<tasks[j].data.length;k++){
      bdznamelist.push(tasks[j].data[k].bdzname);
    }};
    bdznamelist=arrayUnique(bdznamelist);
    var reslist=[];
    reslist.push(bdznamelist);
    return reslist;
  }else if(event.bdzname!==""&&event.typename===""){
    filterObj.bdzname=event.bdzname;
    const countResult = await db.collection('yousepu').where(filterObj).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yousepu').where(filterObj).field({
        _id:true,
        typename:true
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promiseobj)
    };
    var typenamelist=[];
    for(let j=0;j<batchTimes;j++){
    for(let k=0;k<tasks[j].data.length;k++){
      typenamelist.push(tasks[j].data[k].typename);
    }};
    typenamelist=arrayUnique(typenamelist);
    var reslist=[];
    reslist.push(typenamelist);
    return reslist;
  }else if(event.bdzname!==""&&event.typename!==""&&event.yxbhname===""){
    //console.log("33333333333333")
    filterObj.bdzname=event.bdzname;
    filterObj.typename=event.typename;
    const countResult = await db.collection('yousepu').where(filterObj).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yousepu').where(filterObj).field({
        _id:true,
        yxbhname:true
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promiseobj)
    }
    var yxbhnamelist=[];
    for(let j=0;j<batchTimes;j++){
    for(let k=0;k<tasks[j].data.length;k++){
      yxbhnamelist.push(tasks[j].data[k].yxbhname);
    }};
    yxbhnamelist=arrayUnique(yxbhnamelist);
    var reslist=[];
    reslist.push(yxbhnamelist);
    return reslist;

  }else if(event.bdzname!==""&&event.typename!==""&&event.yxbhname!==""){
     //console.log("222222222222")
     filterObj.bdzname=event.bdzname;
     filterObj.typename=event.typename;
     filterObj.yxbhname=event.yxbhname;
     const countResult = await db.collection('yousepu').where(filterObj).count()
     const total = countResult.total
     // 计算需分几次取
     const batchTimes = Math.ceil(total / MAX_LIMIT)
     // 承载所有读操作的 promise 的数组
     const tasks = []
     for (let i = 0; i < batchTimes; i++) {
       const promiseobj = await db.collection('yousepu').where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
       tasks.push(promiseobj)
     }
     var yousepulist=[];
     for(let j=0;j<batchTimes;j++){
      for(let k=0;k<tasks[j].data.length;k++){
        yousepulist.push(tasks[j].data[k]);
      }
    }
     return yousepulist;
  }
  else{
    Console.log("错误！")
  }
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