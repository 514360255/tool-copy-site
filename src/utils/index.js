const fs = require('fs');
const path = require('path');
const request = require('request');
const iconv = require('iconv-lite');

/**
 * 读取本地文件
 * @param path
 * @returns {null|any}
 */
const getLocalFile = path => {
    const data = fs.readFileSync(path, 'utf-8');
    if (data) return JSON.parse(data.toString());
    return null;
};

/**
 * 创建文件夹
 * @param file
 */
const mkdir = (file = '', mkPath = __dirname) => {
    const dirPath = path.join(mkPath, file);
    !fs.existsSync(dirPath) && fs.mkdirSync(dirPath);
};

const requestUrl = (url, encoding = 'utf-8') => {
    request({url, encoding: null}, (error, response) => {
        if(error) return console.error('获取失败');
        if (response.statusCode === 200) {
            const str = iconv.decode(response.body, encoding).toString();
            const config = stub.config;
            const file = path.resolve(__dirname, `../../${config.outDir}`);
            console.log(file);
        }
    })
};

const utils = {
    getLocalFile,
    mkdir,
    requestUrl
};

module.exports = utils;