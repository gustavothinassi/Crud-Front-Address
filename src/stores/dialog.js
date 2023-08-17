import { defineStore } from 'pinia'

export const useDialog = defineStore('dialog', {
  // state
  state: () => ({
    isConfirm: false,
    dialogData: {}
  }),
  getters: {
    isDialog: (state) => state.isConfirm,
    idDataDialog: (state) => state.dialogData
    // return this.dialogData
  },
  actions: {
    closeDialog (value) {
      this.isConfirm = value
    },
    openDialog (value) {
      this.isConfirm = value
    },
    addDataDialog (data) {
      this.dialogData = data
    }
  }
})
