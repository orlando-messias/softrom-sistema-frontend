const isLogin = () => {
  return localStorage.getItem('user') ? true : false
};

const loggedUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { username: 'O' };
};

const loginValidation = (value) => {
  return (value.length >= 3) ? true : false;
}

module.exports = { isLogin, loggedUser, loginValidation };