var CryptoJS = require('./AES.js');  //引用AES源码js
var key = CryptoJS.enc.Utf8.parse("!QA2Z@w1sxO*(-8L");//十六位十六进制数作为秘钥
var iv = CryptoJS.enc.Utf8.parse('!WFNZFU_{H%M(S|a');//十六位十六进制数作为秘钥偏移量
//var key = "!QA2Z@w1sxO*(-8L";//十六位十六进制数作为秘钥
//var iv = "!WFNZFU_{H%M(S|a";//十六位十六进制数作为秘钥偏移量
//解密方法
function Decrypt(word) {
  var encryptedHexStr = CryptoJS.enc.Base64.parse(word);
  var srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}
//加密方法
function Encrypt(word) {
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC,      padding: CryptoJS.pad.Pkcs7 });
  return encrypted.toString();
}

//暴露接口
module.exports.Decrypt = Decrypt;
module.exports.Encrypt = Encrypt;

