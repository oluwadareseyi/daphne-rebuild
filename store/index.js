const pagesArr = ["beauty", "fashion", "outdoor", "project", "works"];

export const state = () => ({
  pages: pagesArr,
  currentPage: pagesArr[0],
  nextPage: pagesArr[1],
  previousPage: pagesArr[pagesArr.length - 1],
  direction: "up",
  collection: {
    beauty: [
      "cream",
      "nude",
      "rose dust",
      "pastel",
      "1,2,3",
      "strawberry flavour"
    ],
    fashion: [
      "flower bud",
      "origami",
      "shade of morning dew",
      "the other",
      "pieces of fabric",
      "girls of the wind",
      "bloom"
    ],
    outdoor: ["blanc de clanc", "ireland", "maisonnettes", "way of life"],
    project: ["Herbarium", "delirium", "chrysalls"],
    works: [
      "Beauty",
      "texture",
      "still life",
      "sport",
      "fashion",
      "culinary",
      "portrait"
    ]
  }
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
