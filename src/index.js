const jsonFile = require('./readFile');

// 获取配置文件
const getJsonFile = jsonFile.jsonFile('src/config.json');

console.log(getJsonFile);