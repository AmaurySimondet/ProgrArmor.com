const User = require('../../schema/schemaUser.js');

async function getUserSeancesItems(id) {
  await User.findById(id, (err, user) => {
    if (err) {
      throw new Error('User has no seances');
    } else {
      if (user) {
        if (user.seances.length === 0) {
          throw new Error('User has no seances');
        } else {
          return {
            success: true,
            seances: user.seances,
            checkItems: user.checkItems,
          };
        }
      } else {
        throw new Error('User not found');
      }
    }
  });
}

module.exports = { getUserSeancesItems };
