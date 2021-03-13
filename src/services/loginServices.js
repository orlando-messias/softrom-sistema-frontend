const isLogin = () => {
  return localStorage.getItem('user') ? true : false
};

const loggedUser = () => {
  return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : { username: 'O' };
};

const loginValidation = (username, password) => {
  return (username.length >= 3 && password.length >= 3) ? true : false; 
}

module.exports = { isLogin, loggedUser, loginValidation };