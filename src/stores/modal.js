import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  // state
  state: () => ({
    isOpen: false,
    modalData: [],
    selectedCard: ''
  }),
  getters: {
    isModal: (state) => state.isOpen,
    getCardById: (state) => (id) => {
      return state.modalData.find((x) => x.idAddress === id)
    }
  },
  actions: {
    addData (data) {
      this.selectedCard = this.getCardById(data)
    },
    addressData (data) {
      this.modalData = data
    },
    editModal (value, id) {
      if (!value) {
        this.selectedCard = null
      }
      this.isOpen = value
      this.selectedCard = this.getCardById(id)
    },
    closeModal (value) {
      this.isOpen = value
      this.selectedCard = null
    },
    openModal (value) {
      this.isOpen = value
      this.selectedCard = null
    }
  }
})
