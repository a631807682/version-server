var modelHelper = require('./modelHelper.js');

var dbVersion = modelHelper.collection("versionInfo");

var async = require('async');


/**
 * 版本信息
 * appId,appName,version,compatibleBinary(二进制版本兼容),iosUrl,androidUrl
 */
module.exports = {

    /**
     * 获取app版本信息
     * @param  {[type]}   appId  [description]
     * @param  {Function} done   [description]
     * @return {[type]}          [description]
     */
    getByAppId: function(appId, done) {

        dbVersion.findOne({
            appId: appId
        }, function(err, result) {
            modelHelper.callback(err, result, done);
        });
    },
    /**
     * 设置当前app版本信息
     * @param {[type]}   appId            [description]
     * @param {[type]}   appName          [description]
     * @param {[type]}   version          [description]
     * @param {[type]}   compatibleBinary [二进制版本兼容]
     * @param {[type]}   iosUrl           [description]
     * @param {[type]}   androidUrl       [description]
     * @param {Function} done             [description]
     */
    setAppVersion: function(appId, appName, version, compatibleBinary, iosUrl, androidUrl, done) {
        var entity = {
            appId: appId,
            appName: appName,
            version: version,
            compatibleBinary: compatibleBinary,
            iosUrl: iosUrl,
            androidUrl: androidUrl
        };


        dbVersion.update({
                appId: appId
            }, {
                $set: entity
            }, {
                upsert: true
            },//upsert true 如不存在update记录 插入
            function(err, result) {
                modelHelper.callback(err, result, done);
            }); 


    }







}
