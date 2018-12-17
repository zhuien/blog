/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate (data, id = '_id', pid = 'pid') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
      temp[data[i][id]] = data[i]
    }
    console.log(temp)
    for (var k = 0; k < data.length; k++) {
      if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
        if (!temp[data[k][pid]]['children']) {
          temp[data[k][pid]]['children'] = []
        }
        if (!temp[data[k][pid]]['_level']) {
          temp[data[k][pid]]['_level'] = 1
        }
        data[k]['_level'] = temp[data[k][pid]]._level + 1
        data[k]['parentName'] = temp[data[k][pid]].name
        temp[data[k][pid]]['children'].push(data[k])
      } else {
        res.push(data[k])
      }
    }
    return res
  }