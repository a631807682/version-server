var versionModel = require('../model/appVersion.js');
var ctrlHelper = require('../controller/ctrlHelper.js');
var async = require('async');

//app访问 路径
var appDirPath = '/public/';

module.exports = {

    //获取app版本信息
    getAppVersion: function(req, res, done) {
        var appId = req.params.appId;

        versionModel.getByAppId(appId, function(result) {
            ctrlHelper.response(res, result);
        });

    },
    //设置app版本信息
    setAppVersion: function(req, res, done) {

        var appId = req.params.appId;
        var appName = req.params.appName;
        var version = req.params.version;
        var compatibleBinary = req.params.compatibleBinary == 'true' ? true : false;
        var iosUrl = req.params.iosUrl;
        var androidUrl = req.params.androidUrl;

        versionModel.setAppVersion(appId, appName, version, compatibleBinary, iosUrl, androidUrl, function(result) {
            ctrlHelper.response(res, result);
        })

    },
    //检查app版本更新
    checkAppVersion: function(req, res, done) {

        var appId = req.params.app_id;
        var platform = req.params.device_platform;
        var deviceVersion = req.params.device_deploy_uuid;

        versionModel.getByAppId(appId, function(result) {

            if (result.status) {

                var versionInfo = result.data;

                if (versionInfo.version != deviceVersion) {
                    if (versionInfo.compatibleBinary == true) { //兼容更新
                        console.log('compatibleBinary')

                        res.json({
                            compatible_binary: true, //是否兼容
                            update_available: true, //是否有更新
                            update: {
                                uuid: versionInfo.version, //最新版本
                                url: appDirPath + appId + "/" + platform + "/www.zip"
                            }
                        })

                        res.end();

                    } else { //非兼容更新
                        console.log('uncompatibleBinary');
                        var url = '';
                        if (platform == 'ios') {
                            url = versionInfo.iosUrl;
                        } else if (platform == 'android') {
                            url = versionInfo.androidUrl;
                        }

                        res.json({
                            compatible_binary: false, //是否兼容
                            update_available: true, //是否有更新
                            update: {
                                uuid: versionInfo.version, //最新版本
                                url: url
                            }
                        })
                        res.end();

                    }

                } else {
                    console.log('same version');
                    res.json({
                        compatible_binary: false,
                        update_available: false
                    })
                    res.end();
                }


            } else {
                //console.log('no version');
                res.json({
                    compatible_binary: false,
                    update_available: false
                })
                res.end();
            }

        })


    }


}
