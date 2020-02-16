//获取应用实例
const app = getApp();
Page({
	data: {
		article: {}
	},
	onLoad: function () {
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

			_ts.setData({
				article:obj,
			});
		});
		
	}
})