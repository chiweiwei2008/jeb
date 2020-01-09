// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT = 100
exports.main = async (event, context) => {
  //筛选条件
  var filterObj={};
  if(!event.bdzname)event.bdzname="";
  if(!event.sbsblx)event.sbsblx="";
  if(!event.sbyxbh)event.sbyxbh="";
  // 先取出集合记录总数
  if(event.bdzname===""&&event.sbsblx===""){
    //console.log("a----------------------a");
    const countResult = await db.collection('yali').count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yali').field({
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
  }else if(event.bdzname!==""&&event.sbsblx===""){
    filterObj.bdzname=event.bdzname;
    const countResult = await db.collection('yali').where(filterObj).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yali').where(filterObj).field({
        _id:true,
        sbsblx:true
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promiseobj)
    };
    var sbsblxlist=[];
    for(let j=0;j<batchTimes;j++){
    for(let k=0;k<tasks[j].data.length;k++){
      sbsblxlist.push(tasks[j].data[k].sbsblx);
    }};
    sbsblxlist=arrayUnique(sbsblxlist);
    var reslist=[];
    reslist.push(sbsblxlist);
    return reslist;
  }else if(event.bdzname!==""&&event.sbsblx!==""&&event.sbyxbh===""){
    //console.log("33333333333333")
    filterObj.bdzname=event.bdzname;
    filterObj.sbsblx=event.sbsblx;
    const countResult = await db.collection('yali').where(filterObj).count()
    const total = countResult.total
    // 计算需分几次取
    const batchTimes = Math.ceil(total / MAX_LIMIT)
    // 承载所有读操作的 promise 的数组
    const tasks = []
    for (let i = 0; i < batchTimes; i++) {
      const promiseobj = await db.collection('yali').where(filterObj).field({
        _id:true,
        sbyxbh:true
      }).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
      tasks.push(promiseobj)
    }
    var sbyxbhlist=[];
    for(let j=0;j<batchTimes;j++){
    for(let k=0;k<tasks[j].data.length;k++){
      sbyxbhlist.push(tasks[j].data[k].sbyxbh);
    }};
    sbyxbhlist=arrayUnique(sbyxbhlist);
    var reslist=[];
    reslist.push(sbyxbhlist);
    return reslist;

  }else if(event.bdzname!==""&&event.sbsblx!==""&&event.sbyxbh!==""){
     //console.log("222222222222")
     filterObj.bdzname=event.bdzname;
     filterObj.sbsblx=event.sbsblx;
     filterObj.sbyxbh=event.sbyxbh;
     const countResult = await db.collection('yali').where(filterObj).count()
     const total = countResult.total
     // 计算需分几次取
     const batchTimes = Math.ceil(total / MAX_LIMIT)
     // 承载所有读操作的 promise 的数组
     const tasks = []
     for (let i = 0; i < batchTimes; i++) {
       const promiseobj = await db.collection('yali').where(filterObj).skip(i * MAX_LIMIT).limit(MAX_LIMIT).get()
       tasks.push(promiseobj)
     }
     var yalilist=[];
     for(let j=0;j<batchTimes;j++){
      for(let k=0;k<tasks[j].data.length;k++){
        yalilist.push(tasks[j].data[k]);
      }
    }
     return yalilist;
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