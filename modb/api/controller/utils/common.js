exports.objToJson = (msg = '成功', code = 200, status = 'success', data = []) => {
    return JSON.stringify({
        msg: msg,
        code: code,
        status: status,
        data: data,
    })
}