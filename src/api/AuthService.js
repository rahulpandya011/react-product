import client from '../libs/HttpClient';

class AuthService {
  static login(loginData) {
    return client.post('auth/login', loginData);
  }
}
export { AuthService };
