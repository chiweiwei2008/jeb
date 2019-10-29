

module.exports = {
  mtData: mtData,
  searchmtdata: searchmtdata,
}
var mt_data = mtData()
function searchmtdata(id) {
  var result
  for (let i = 0; i < mt_data.list.length; i++) {
    var mt = mt_data.list[i]
    if (mt.id == id) {
      result = mt
    }
  }
  return result || {}
}

function mtData() {
  var arr = {
    list: [
      {
        id: '1',
        MTId: '5011',
        status: '断路器',
        Duration: '西开',
       
      }, {
        id: '2',
        MTId: '5011',
        status: '断路器',
        Duration: '新东北',
      }, {
        id: '3',
        MTId: '5013',
        status: '断路器',
        Duration: '西开',
      }
    ]
  }
  return arr
}