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

/**
 * 拷贝以html为结尾的文件
 * @param url
 * @param encoding
 */
const requestUrl = (url, encoding = 'utf-8') => {
    request({url, encoding: null}, (error, response) => {
        if(error) return console.error('获取失败');
        if (response.statusCode === 200) {
            const str = iconv.decode(response.body, encoding).toString();
            const config = stub.config;
            const dir = path.resolve(__dirname, `../../${config.outDir}`);
            const urlMatch = url.match(/(([0-9A-z]+)\.html)/);
            const fileName = urlMatch ? urlMatch[0] : 'index.html';
            writeFile(`${dir}/${fileName}`, str);

            // 下载图片
            uploadImages(str, url, dir);

        }
    })
};

/**
 * 下载图片
 * @param str
 * @param url
 */
const uploadImages = (str, url, dir) => {
    const imgArr = str.match(/<img.*?(?:>|\/>)/gi);
    const srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
    let imgPathArr = [];
    let isHost = false;
    imgPathArr = distinct(imgPathArr);

    if(/\/$/.test(url)) isHost = true;
    for(let key in imgArr) {
        let path = imgArr[key].match(srcReg)[1];
        if(isHost) {
            path = path.substr(1, path.length - 1);
        }
        const fileName = path.match(/([A-z0-9\-_\.]+\.(png|jpg|gif))$/)[0];
        imgPathArr.push({
            path: url + path,
            fileName: fileName,
            folderList: path.split('/').slice(0, -1)
        });
    }
    imgPathArr.forEach(item => {
        let catalog = '';
        (item.folderList || []).forEach(folder => {
            mkdir(folder, dir + catalog);
            catalog = catalog + '/' + folder;
            console.log(folder);
            request({url: item.path, encoding: null}).pipe(fs.createWriteStream(dir + catalog, item.fileName));
        });
    })
};

/**
 * 数组去重
 * @param arr
 * @returns {any[]}
 */
const distinct = arr => {
    return Array.from(new Set(arr));
};

/**
 * 写入到本地文件
 * @param file
 * @param data
 */
const writeFile = (file, data) => {
    try {
        fs.writeFileSync(file, data, {flag: 'w'});
    }catch(e) {
        throw('写入失败');
    }
};

const utils = {
    getLocalFile,
    mkdir,
    requestUrl
};

module.exports = utils;