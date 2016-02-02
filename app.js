var restify = require('restify');
var config = require('./config.js');


var server = restify.createServer({
    name: "upload-server"
});

server.pre(restify.pre.sanitizePath());
server.use(restify.queryParser());
server.use(restify.bodyParser());
restify.CORS.ALLOW_HEADERS.push('*');
server.use(restify.CORS());
server.use(restify.fullResponse());

//test
server.use(function(req, res, done) {
    console.log('================')
    console.info('req.params', req.params);
    console.info('req.url', req.url);
    console.info('req.method', req.method);
    console.log('================')
        //console.info('req.headers', req.headers);
    done();
})

server.listen(config.port, config.ip_addr, function() {
    console.log('%s listening at %s ', server.name, server.url);
});

// //公共资源访问
// server.get(/public\/?.*/, restify.serveStatic({
//     directory: __dirname
// }));

//路由
require('./routes/route.js')(server, restify, __dirname);
