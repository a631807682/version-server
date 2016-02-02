var fs = require('fs');
var async = require('async');
var PATH = './public';

/**
 * 上传
 * @type {Object}
 */
module.exports = {

    //上传app 
    //根据版本兼容情况上传www.zip包或.apk/.ipa
    uploadApp: function(req, res, done) {
    	
    	//其他参数
        var appId = req.params.appId;
        var appName = req.params.appName;
        //文件参数
        var type = getFileType(req.files.file.name);
        var sourcePath = req.files.file.path;

        var dirPath = PATH + '/' + appId;
        var fullPath = dirPath + '/' + appName + '.' + type;

        async.series([
            //创建app文件夹
            function(cb) {
                fs.exists(dirPath, function(exists) {
                    if (!exists) {
                        fs.mkdir(dirPath, 0777, callback);
                    } else {
                        cb();
                    }
                });
            },
            //保存
            function(cb) {

                fs.rename(sourcePath, fullPath + filename, function() {
                    callback();
                });

            }
        ], function(err, results) {

        })


    }




}

/**
 * 获取文件类型
 * @param  {[type]} filename [description]
 * @return {[type]}          [description]
 */
var getFileType = function(filename) {

    var splits = filename.split('.');

    var type = splits[splits.length - 1];

    return type;
}
