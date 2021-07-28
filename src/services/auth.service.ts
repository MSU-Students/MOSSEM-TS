import { restApi } from './rest-api.service';

class AuthService {
  async loginUser(username: string, password: string, userType?: string) {
    const response = (await restApi.login(username, password, userType)) as any;
    if (response.status == 201) {
      localStorage.setItem('access-token', response.data.accessToken || 'none');
      localStorage.setItem('refresh-token', String(response.data.refreshToken));
      return (await restApi.getProfile()).data;
    } else {
      return response;
    }
  }

  async logoutUser() {
    localStorage.removeItem('access-token');
    // const response = await restApi.logout();
    // return response;
  }
}

const authService = new AuthService();
export default authService;
