var appVersionCtrl = require('../../controller/appVersionCtrl.js');
var uploadCtrl = require('../../controller/uploadCtrl.js');

/**
 * 版本管理路由
 * @param  {[type]} server [description]
 * @return {[type]}        [description]
 */
module.exports = function(server) {

    //====版本管理路由====

    //获取app版本信息
    server.get({
        path: '/getAppVersion/:appId',
        version: '0.0.1'
    }, appVersionCtrl.getAppVersion);

    //设置app版本信息
    //appId,appName,version,compatibleBinary,iosUrl,androidUrl
    server.post({
        path: '/setAppVersion',
        version: '0.0.1'
    }, appVersionCtrl.setAppVersion);

    //上传app
    //appId,platform,[file]
    server.post({
        path: '/uploadApp',
        version: '0.0.1'
    }, uploadCtrl.uploadApp);

}
