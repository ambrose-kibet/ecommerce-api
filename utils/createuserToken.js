const createuserToken = (user) => {
  return {
    userId: user._id,
    name: user.name,
    role: user.roles,
  };
};
module.exports = createuserToken;
