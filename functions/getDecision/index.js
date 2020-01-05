// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
const MAX_LIMIT=100
// 云函数入口函数
exports.main = async (event, context) => {
  //筛选条件
  //let filterObj={};
  //获取满足条件要求的总数
  //filterObj.typename=event.typename;
  const countResult = await db.collection('quexiantest').count();
  const total = countResult.total;
  //计算需要分几次取完
  const batchTimes = Math.ceil(total/MAX_LIMIT);
  //读取所有满足条件的promise对象
  const tasks=[];
  for(let i=0;i<batchTimes;i++){
    const promiseobj = await db.collection("quexiantest").field({
      _id:true,
      bdzname:true,
      yxbhname:true,
      qxqxfsrq:true
    }).skip(i*MAX_LIMIT).limit(MAX_LIMIT).get()
    tasks.push(promiseobj);
  }
  
  var newlist=[];
  for(let j=0;j<tasks[0].data.length;j++){
  var newObj={};
  newObj.bdzname=tasks[0].data[j].bdzname;
  newObj.yxbhname=tasks[0].data[j].yxbhname;
  newlist.push(newObj);
  }
  var uniqlist=[];
  var k=0;
  for(let i=0;i<newlist.length;i++){
    var newObj={};
    newObj.bdzname=newlist[i].bdzname;
    newObj.yxbhname=newlist[i].yxbhname;
    newObj.total=1;
    uniqlist.push(newObj);
    newlist.splice(i, 1);
    var indexlist=[];
    for(let j=0;j<newlist.length;j++){
      if(newObj.bdzname===newlist[j].bdzname&&newObj.yxbhname===newlist[j].yxbhname){
        indexlist.push(j);
        uniqlist[uniqlist.length-1].total=uniqlist[uniqlist.length-1].total+1;
      }
      if(j==(newlist.length-1)){
        i=-1;//注意for循环运算完后+1
        for(let k=0;k<indexlist.length;k++){
          newlist.splice(indexlist[k],1);
        }
      }
    }
  }
  var newuniqlist=[];
  for(let i=0;i<uniqlist.length;i++){
    if(uniqlist[i].total>1)newuniqlist.push(uniqlist[i]);
  }

  return newuniqlist;
}
