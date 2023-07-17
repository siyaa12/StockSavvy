
const crypto = require('crypto');
module.exports = {
  md5: (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
  },
  secretKey: 'IAMARANDOMSECRETKEYFORNOTHING',
  defaultCash: "5000.00"
};
