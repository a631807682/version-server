var config = require("../config.js");
/**
 * model层帮助类
 * @type {Object}
 */
module.exports = {

    /**
     * 操作表
     * @param  {[type]} name [description]
     * @return {[type]}      [description]
     */
    collection: function(name) {
        return config.db.collection(name);
    },

    /**
     * 转换objectId
     * @param  {[type]} id [description]
     * @return {[type]}    [description]
     */
    objId: function(id) {
        return config.mongojs.ObjectId(id);
    },

    /**
     * 回调 {status,data/errMsg}
     * @param  {[type]}   err    [description]
     * @param  {[type]}   result [description]
     * @param  {Function} done   [description]
     * @return {Function}        [description]
     */
    callback: function(err, result, done) {
        if (result) {
            done({
                status: true,
                data: result
            })
        } else {
            done({
                status: false,
                errMsg: err
            })
        }
    }

}
