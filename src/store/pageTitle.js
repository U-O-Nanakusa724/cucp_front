const pageTitle = ({
    namespaced: true,
    state: {
        pageTitle: 'タイトル',
    },
    actions: {
        changePage({ commit }, title) {
            commit('changePageTitle', title);
        },
    },
    mutations: {
        changePageTitle(state, title) {
            const st = state;
            st.pageTitle = title;
        },
    },
    getters: {
        pageTitle(state) {
            const st = state;
            return st.pageTitle;
        },
    }
})
export default pageTitle