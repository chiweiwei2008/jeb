// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  var userobj={};
  let filterObj = {};
  filterObj.username = event.username;
  filterObj.wxnickname = event.wxnickname;
  userobj = await db.collection('user').where(filterObj).get();
  //console.log(userobj);
  // console.log(event.password);
  if(userobj.data.length!==0){
    if(userobj.data[0].password===event.password){
      var date = new Date();
      await db.collection('user').where(filterObj).update({
        // data 传入需要局部更新的数据
        data: {
          logintimes: userobj.data[0].logintimes+1,
          datalogin:date
        },
        success: function(res) {
          console.log(res.data)
        },
        fail:console.error
      });
      return userobj;
    }
    else{
      return "用户名或者密码错误！"
    }
  }
  else{
    return "用户名或者密码错误！"
  }
}