const axios = require('axios');
const crypto = require('crypto');

class dataoke {

  /**初始化
   * @param {String} appKey 在大淘客平台上申请得到的appKey
   * @param {String} appSecret 在大淘客平台上申请得到的appSecret
   */
  constructor(appKey, appSecret) {
    this.appKey = appKey;
    this.appSecret = appSecret;
    this.version = 'v1.0.0'; // API接口版本号
  }

  /**验签sign参数加密
   * @param data
   * @param appSecret
   * @return string
   */
  makeSign(data) {
    let str = '';
    let index = 0;
    let sortPor = [];

    for (let key in data) {
      sortPor.push(`${key}=${data[key]}`);
    }
    // 排序
    sortPor.sort();

    // 转url
    for (let key in sortPor) {
      str = `${str}${index === 0 ? '' : '&'}${sortPor[key]}`;
      index++;
    }

    // md5加密
    const md5 = crypto.createHash('md5');
    const ret = md5.update(`${str}&key=${this.appSecret}`).digest('hex');

    return ret;
  }

  /**请求大淘客获得数据
   * @param api 请求接口 如："tb-service/activity-link"
   * @param options 除公共参数以外的其他参数
   */
  request(api, options) {
    let data = {
      version: this.version, // API接口版本号
      appKey: this.appKey, // 应用分配的appKey
    };
    Object.keys(options).forEach((key) => {
      data[key] = options[key];
    })
    data.sign = this.makeSign(data);

    return new Promise((resolve, reject) => {
      axios({
        url: `https://openapi.dataoke.com/api/${api}`, //请求地址
        method: 'GET',
        params: data
      }).then(({data}) => {
        resolve(data);
      }).catch((err) => {
        resolve({
          code: -1001,
          msg: err || "网络请求失败或者其他错误"
        });
      });
    })
  }
}

module.exports = dataoke;