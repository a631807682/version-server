var config = require("../config.js");
/**
 * 控制器帮助类
 * @type {Object}
 */
module.exports = {
	host: 'http://' + config.ip_addr + ':' + config.port,
	/**
	 * 控制器默认返回方法 
	 * @param  {[type]} res    [description]
	 * @param  {[type]} result [db结果]
	 * @param  {[type]} errMsg [特殊错误提示]
	 * @return {[type]}        [description]
	 */
    response: function(res, result, errMsg) {

    	if(result.status)
    	{
    		res.json(result)
    		res.end();
    	}
    	else
    	{
    		if(errMsg)
    		{
    			result.errMsg = errMsg
    		}
    		res.json(result)
    		res.end();
    	}

    }


}
