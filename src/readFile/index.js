const fs = require('fs');

/**
 * 读取配置文件
 * @param path
 * @returns {null|any}
 */
const jsonFile = path => {
    const data = fs.readFileSync(path, 'utf-8');
    if(data) return JSON.parse(data.toString());
    return null;
};

module.exports = {
    jsonFile
};