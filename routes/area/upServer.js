var appVersionCtrl = require('../../controller/appVersionCtrl.js');



/**
 * app更新服务路由
 * @param  {[type]} server [description]
 * @return {[type]}        [description]
 */
module.exports = function(server) {


    //====App通信路由====

    //更新检测
    server.post({
        path: '/api/v1/apps/:app_id/updates/check',
        version: '0.0.1'
    }, appVersionCtrl.checkAppVersion);

    //新更新检测
    server.post({
        path: '/update/check/:app_id',
        version: '0.0.1'
    }, appVersionCtrl.checkAppVersion);

}
