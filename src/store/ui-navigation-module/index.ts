import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { UiNavStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const UiNavStateInterface: Module<UiNavStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default UiNavStateInterface;
