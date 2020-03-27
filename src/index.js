const path = require('path');
require('./stub');
const config = stub.config;
stub.mkdir(config.outDir, path.resolve(__dirname, '..'));
stub.requestUrl(config.copySite, config.encoding);