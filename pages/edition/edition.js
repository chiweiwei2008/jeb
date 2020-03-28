//获取应用实例
const app = getApp();
Page({
	data: {
		article: {}
	},
	onLoad: function () {
			 // 调用数据库，将数据写入数据库
			 var that=this
				wx.cloud.init()
				const db = wx.cloud.database()
				db.collection('edition').doc('1').get().then(res => {
					//console.log(res.data)
					that.setData({
						article:res.data.article_code
					})
				})
		//手动提取数据		
		if (false){
		const _ts = this;
		app.getText('https://706d-pmis-4c63d-1300406220.tcb.qcloud.la/README.md',res => {
			let obj = app.towxml(res.data,'markdown',{
				// theme:'dark',
				events:{
					tap:e => {
						console.log('tap',e);
					},
					change:e => {
						console.log('todo',e);
					}
				}
			});

			// _ts.setData({
			// 	article:obj,
			// });
			// 调用数据库，将数据写入数据库
				wx.cloud.init()
				const db = wx.cloud.database({
					env: 'pmis-4c63d'
				})
				db.collection('edition').doc('1').set({
					// data 传入需要局部更新的数据
					data: {
						article_code: obj
					}
				})
				.then(console.log)
				.catch(console.error)
			
			console.log(obj)
		});

		
	}
}})