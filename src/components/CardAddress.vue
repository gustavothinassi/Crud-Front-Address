<template>
  <q-card class="my-card">
      <q-card-section class="bg-white">
        <div class="row q-col-gutter-xl">
              <div class="col-md-4 col-sm-4 col-lg-4">
                <span class="text-bold" style="font-size: 1rem;">CEP</span>
                <div class="text-h7">{{ cep }}</div>
                <span class="text-bold" style="font-size: 1rem;">Logradouro</span>
                <div class="text-h7">{{ logradouro }}</div>
              </div>
              <div class="col-md-4 col-sm-4 col-lg-4">
                <span class="text-bold" style="font-size: 1rem;">Bairro</span>
                <div class="text-h7">{{ bairro }}</div>
                <span class="text-bold" style="font-size: 1rem;">Cidade</span>
                <div class="text-h7">{{ cidade }}</div>
              </div>
              <div class="col-md-4 col-sm-4 col-lg-4">
                <span class="text-bold" style="font-size: 1rem;">UF</span>
                <div class="text-h7">{{ uf }}</div>
              </div>
            </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn no-caps class="bg-positive text-white"  @click="modal(true, idAddress)" dense>Editar</q-btn>
        <q-btn no-caps class="bg-negative text-white" @click="deleteAddress(idAddress)" dense>Excluir</q-btn>
      </q-card-actions>
    </q-card>
</template>
<script>
import { onMounted } from 'vue'
import { useStore } from '../stores/modal'
import { useDialog } from '../stores/dialog'
/* import postServices from '../../src/services/index'
 */
export default {
  props: {
    cep: {
      type: String,
      required: true
    },
    logradouro: {
      type: String,
      required: true
    },
    bairro: {
      type: String,
      required: true
    },
    cidade: {
      type: String,
      required: true
    },
    uf: {
      type: String,
      required: true
    },
    idAddress: {
      type: Number,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    const dialog = useDialog()
    // const { delete_ } = postServices()
    onMounted(() => {
      store.addData(props.idAddress)
    })

    async function deleteAddress (idAddress) {
      dialog.openDialog(true)
      dialog.addDataDialog(idAddress)
    }

    return {
      modal: store.editModal,
      deleteAddress
    }
  }
}
</script>
<style></style>
