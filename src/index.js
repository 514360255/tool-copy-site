const path = require('path');
require('./stub');
const { config: { outDir, copySite } } = stub;
stub.mkdir(outDir, path.resolve(__dirname, '..'));
stub.requestUrl(copySite);