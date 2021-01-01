const pagesArr = ["beauty", "fashion", "outdoor", "project", "works"];

export const state = () => ({
  pages: pagesArr,
  currentPage: pagesArr[0],
  nextPage: pagesArr[1],
  previousPage: pagesArr[pagesArr.length - 1],
  direction: "up"
});

export const getters = {
  pagesLength: state => {
    return state.pages.length;
  }
};

export const mutations = {
  updatePages: (state, payload) => {
    state.currentPage = payload.current;
    state.nextPage = payload.next;
    state.previousPage = payload.previous;
  },
  updateDirection: (state, payload) => {
    state.direction = payload;
  }
};

// export const actions = {
//   updateActionValue({ commit }) {
//     commit('updateValue', payload)
//   }
// }
