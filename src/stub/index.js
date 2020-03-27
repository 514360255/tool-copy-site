const utils = require('../utils');
stub = {
    getFile: utils.getLocalFile,
    mkdir: utils.mkdir,
    requestUrl: utils.requestUrl,
    config: utils.getLocalFile('src/config.json')
};

global.stub;