const bcrypt = require('bcryptjs');

exports.hashPwd = async function(password) {
  const salt = await bcrypt.genSalt();
  const hashPwd = await bcrypt.hash(password, salt)
  return hashPwd;
}


