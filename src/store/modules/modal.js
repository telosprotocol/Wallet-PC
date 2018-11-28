const modal = {
  state: {
    createModal: false,
    rewardModal: false,
    requestModal: false,
    norewardModal: false
  },
  mutations: {
    setCreateModalShow: (state, status) => {
      state.createModal = status
    },
    setRewardModalShow: (state, status) => {
      state.rewardModal = status
    },
    setRequestModalShow: (state, status) => {
      state.requestModal = status
    },
    setNoRewardModalShow: (state, status) => {
      state.norewardModal = status
    }
  }
}
export default modal
