import axios from 'axios';

const API_URL = 'http://localhost:3000/';

class AuthService {
  login(user) {
    return axios
      .post(API_URL + 'login', {
        username: user.username,
        password: user.password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user) {
    return axios.post(API_URL + 'register', {
      username: user.username,
      email: user.email,
      password: user.password
    }).then(response => {
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      console.log('res', response.data);
      return response.data;
    });
  }

  forgotPassword(user) {
    return axios.post(API_URL + 'passwordResetRequest', {
      email: user.email,
    }).then(response => {

      return response.data;
    });
  }
  resetPassword(user, token) {
    return axios.post(API_URL + 'passwordReset', {
      password: user.password,
      token: token
    }).then(response => {

      return response.data;
    });
  }
}

export default new AuthService();
