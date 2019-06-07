const state = {
    nm : window.localStorage.getItem('nowNM') || '北京',
    id : window.localStorage.getItem('nowID') || 1
};
const actions = {

};
const mutations = {
    CITY_INFO(state, p){
        state.nm = p.nm;
        state.id = p.id;
    }
};
export default{
    namespaced:true,
    state,
    actions,
    mutations
}