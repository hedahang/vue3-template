import { createStore } from "vuex";

import app from "./modules/app";
import user from "./modules/user";
import permission from "./modules/permission";
import tagsView from "./modules/tagsView";

import getters from "./getters";
export default createStore({
  state: {},
  mutations: {},
  getters,
  modules: { app, user, permission, tagsView },
});
