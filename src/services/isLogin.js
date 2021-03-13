const isLogin = () => {
  return localStorage.getItem('user') ? true : false
};

const loggedUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { username: 'O' };
};

module.exports = { isLogin, loggedUser }