const bcrypt = require('bcryptjs');

const comparePassword = async (plainPassword, hashedPassword) => {
  try {
    return await bcrypt.compare(plainPassword, hashedPassword);
  } catch (err) {
    throw new Error('Error while comparing passwords');
  }
};

module.exports = comparePassword;
