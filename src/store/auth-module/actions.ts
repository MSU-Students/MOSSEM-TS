import authService from 'src/services/auth.service';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { IAuthState } from './state';

const actions: ActionTree<IAuthState, StateInterface> = {
  async login (context, payload: {email: string, password: string}) {
    const user = await authService.loginUser(payload.email, payload.password);
    context.commit('setCurrentUser', user);
    return user;
  },
  async logout(context) {
    await authService.logoutUser();
    context.commit('setCurrentUser', undefined);
    localStorage.clear();
  },
  async authUser (context) {
    const response = await authService.getProfile();
    context.commit('setCurrentUser', response);
    return response;
  }
};

export default actions;
