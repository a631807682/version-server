var mongojs = require("mongojs");
var connection_string = '127.0.0.1:27017/versionManage';
var dbName = mongojs(connection_string, ['upload_server']);

var ip_addr = '192.168.1.154'; //必须为可访问地址
var port = '8100';


module.exports = {
    ip_addr: ip_addr,
    port: port,
    mongojs: mongojs,
    db: dbName

}
