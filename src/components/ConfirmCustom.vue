<template>
  <q-dialog persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="mdi-close-box" style="color:red; font-size: 5rem;"/>
          <span class="q-ml-sm">Tem certeza de excluir o endereco?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" @click="dialog(false)" style="background-color: #10ad4c; color: white;" />
          <q-btn flat label="Confirmar" @click="deleteAddress" style="background-color: red; color: white;" />
        </q-card-actions>
      </q-card>
    </q-dialog>
</template>
<script>
import { defineComponent } from 'vue'
import { useDialog } from '../stores/dialog'
import { storeToRefs } from 'pinia'
import postServices from '../../src/services/index'
import { useQuasar } from 'quasar'
import { wait } from 'src/utils/timeout'

export default defineComponent({
  setup () {
    const dialog = useDialog()
    const { idDataDialog } = storeToRefs(dialog)

    const { delete_ } = postServices()
    const $q = useQuasar()

    async function deleteAddress () {
      const { errors } = await delete_({
        id: idDataDialog.value
      })
      if (!errors) {
        dialog.openDialog(false)
        $q.notify({
          color: 'green-6',
          textColor: 'white',
          message: 'Endereço excluido com sucesso',
          position: 'bottom-right'
        })
        await wait(2000)
        window.location.reload()
      }
    }
    return {
      dialog: dialog.openDialog,
      deleteAddress
    }
  }

})
</script>
