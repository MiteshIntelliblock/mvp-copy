module.exports.imgNamegenerator = () => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "i";
  for (let i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

module.exports.randomkeygenerator = () => {
  const keys = "0123456789";
  let result = "0";
  for (let i = 0; i < 6; i++) {
    result += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return result;
};
