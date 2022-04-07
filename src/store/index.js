import { createStore, useStore as baseUseStore } from "vuex";
import axios from "axios";
// 定义 injection key
export const key = Symbol("storeKey");

export function useStore() {
  return baseUseStore(key);
}

export function createSSRStore() {
  return createStore({
    state: {
      list: [],
    },
    mutations: {
      setList(state, payload) {
        state.list = payload;
      },
    },
    actions: {
      fetchList({ commit }, payload) {
        return new Promise((resolve) => {
          axios
            .get(
              "http://110.42.184.111/api/room/room/getRoomList?cityCode=hz&pageNo=1&pageSize=6"
            )
            .then((res) => {
              commit("setList", res.data.result.orders.data);
              resolve(true)
            });
        });
      },
    },
  });
}
