import { MutationTree } from 'vuex';
import { IAuthState, IUser } from './state';

const mutation: MutationTree<IAuthState> = {
  setCurrentUser (state,  payload: IUser) {
    state.currentUser = payload;
  }
};

export default mutation;
