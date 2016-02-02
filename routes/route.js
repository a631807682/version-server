module.exports = function(server, restify, rootDirName) {

    //公共资源访问
    server.get(/public\/?.*/, restify.serveStatic({
        directory: rootDirName
    }));


    //区域路由
    //版本管理路由
    require('../routes/area/upServer.js')(server);
    //app更新服务路由
    require('../routes/area/vManage.js')(server);



}
