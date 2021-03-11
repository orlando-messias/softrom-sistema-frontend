const isLogin = () => {
  return localStorage.getItem('user') ? true : false
}

export default isLogin;