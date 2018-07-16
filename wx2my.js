let fs = require("fs")
let path = require("path")
const notMatch = `fileName !== 'wx2my'`
const currPath = '\\'//linux 下 改为 / windows 改为 \\
const command = process.argv[2] //参数

let root = path.join(__dirname) //根目录

function readDirSync(path) {
    let p = fs.readdirSync(path);
    p.forEach(function (ele, index) {
        let info = fs.statSync(path + currPath + ele)
        if (info.isDirectory()) {
            //遍历的文件夹
            readDirSync(path + currPath + ele);
        } else {
            let temp = ele.split('.')
            let fileName = ele.split('.')[0]//文件名
            let extName = ele.split('.')[1]//扩展名
            if (command == 'wx2my') {
                if (extName == 'wxml' && notMatch) {
                    fs.rename(path + currPath + ele, path + currPath + fileName + '.axml', function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                }
                if (extName == 'wxss' && notMatch) {
                    fs.rename(path + currPath + ele, path + currPath + fileName + '.acss', function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                }
            } else if (command == 'my2wx') {
                if (extName == 'axml' && notMatch) {
                    fs.rename(path + currPath + ele, path + currPath + fileName + '.wxml', function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                }
                if (extName == 'acss' && notMatch) {
                    fs.rename(path + currPath + ele, path + currPath + fileName + '.wxss', function (err) {
                        if (err) {
                            throw err;
                        }
                    })
                }
            }
        }
    })
}
readDirSync(root)
