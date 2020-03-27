const fs = require('fs');
const path = require('path');
const request = require('request');

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
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }
};

const requestUrl = url => {

};

const utils = {
    getLocalFile,
    mkdir,
    requestUrl
};

module.exports = utils;