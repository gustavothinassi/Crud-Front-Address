<template>
  <q-dialog persistent>
    <q-card style="width: 450px;" class="q-pa-sm">
          <q-card-section>
            <div class="text-h5 text-bold">Cadastrar novo endereço</div>
            <form @submit.prevent.stop="handleSubmit">
              <div class="row q-mt-md">
                <span class="text-h7 text-bold">CEP</span>
                <q-input outlined placeholder="Digite o CEP" dense ref="cepRef" v-model="editedItemDashboard.cep" :rules="cepRules"
                  lazy-rules class="col-md-12 col-sm-12 col-xs-12" />
              </div>
              <div class="row q-mt-sm">
                <span class="text-h7 text-bold">Logradouro</span>
                <q-input outlined placeholder="Digite o logradouro" dense :rules="logradouroRules" ref="logradouroRef" v-model="editedItemDashboard.logradouro" lazy-rules class="col-md-12 col-sm-12 col-xs-12"
                 />
              </div>
              <div class="row q-mt-sm">
                <span class="text-h7 text-bold">Bairro</span>
                <q-input outlined placeholder="Digite o Bairro" dense :rules="bairroRules" ref="bairroRef" v-model="editedItemDashboard.bairro" lazy-rules class="col-md-12 col-sm-12 col-xs-12"
                />
              </div>
              <div class="row q-mt-sm">
                <span class="text-h7 text-bold">UF</span>
                <q-input outlined placeholder="Digite o UF" dense :rules="ufRules" ref="ufRef" v-model="editedItemDashboard.uf" lazy-rules class="col-md-12 col-sm-12 col-xs-12"
                 />
              </div>
              <div class="row q-mt-sm">
                <span class="text-h7 text-bold">Cidade</span>
                <q-input outlined placeholder="Digite a cidade" dense :rules="cidadeRules" ref="ufRef" v-model="editedItemDashboard.cidade" lazy-rules class="col-md-12 col-sm-12 col-xs-12"
                 />
              </div>
              <div class="row q-mt-sm">
                <div class="col-12">
                  <q-btn label="Salvar" dense  size="17px" no-caps type="submited" class="float-right"
                    style="background-color:#10ad4c; color: #fff;">
                  </q-btn>
                  <q-btn label="Cancelar" @click="modal(false)" dense size="17px" no-caps v-close-popup style="background-color:#2F0068; color: #fff;"
                    class="float-right q-mr-sm" />
                </div>
              </div>
            </form>
          </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { defineComponent, ref, reactive, watchEffect } from 'vue'
import postServices from '../../src/services/index'
import { useStore } from '../stores/modal'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { wait } from '../utils/timeout'

export default defineComponent({
  setup () {
    const cepRef = ref(null)
    const logradouroRef = ref(null)
    const bairroRef = ref(null)
    const ufRef = ref(null)
    const cidadeRef = ref(null)

    const $q = useQuasar()

    const state = reactive({
      isLoading: false,
      selected: ''
    })

    const store = useStore()
    const { selectedCard } = storeToRefs(store)

    const { register, update } = postServices()

    const editedItemDashboard = ref({
      cep: '',
      logradouro: '',
      bairro: '',
      cidade: '',
      uf: ''
    })

    watchEffect(() => {
      if (selectedCard.value != null) {
        editedItemDashboard.value = selectedCard.value
      } else {
        editedItemDashboard.value = {}
      }
    })

    const cepRules = ref([
      v => !!v || 'CEP é obrigatório',
      v => (v && /^[0-9]{5}-[0-9]{3}?$/i.test(v)) || 'Email precisa ser valido'
    ])
    const logradouroRules = ref([
      v => !!v || 'Logradouro é obrigatório',
      v => (v && v.length > 3) || 'Logradouro precisa ser valido'
    ])

    const bairroRules = ref([
      v => !!v || 'Bairro é obrigatório',
      v => (v && v.length > 3) || 'Bairro precisa ser valido'
    ])

    const ufRules = ref([
      v => !!v || 'UF é obrigatório',
      v => (v && v.length === 2) || 'UF precisa ser valido'
    ])

    const cidadeRules = ref([
      v => !!v || 'Cidade é obrigatório',
      v => (v && v.length >= 2) || 'Cidade precisa ser valido'
    ])

    // REGISTER
    async function handleSubmit () {
      cepRef.value.validate()
      logradouroRef.value.validate()
      bairroRef.value.validate()
      ufRef.value.validate()

      try {
        if (!cepRef.value.hasError && !logradouroRef.value.hasError && !bairroRef.value.hasError && !ufRef.value.hasError) {
          state.isLoading = true
          if (!selectedCard.value) {
            const { errors } = await register({
              cep: editedItemDashboard.value.cep,
              logradouro: editedItemDashboard.value.logradouro,
              bairro: editedItemDashboard.value.bairro,
              cidade: editedItemDashboard.value.cidade,
              uf: editedItemDashboard.value.uf
            })

            if (!errors) {
              $q.notify({
                color: 'green-6',
                textColor: 'white',
                message: 'Endereço adicionado com sucesso',
                position: 'bottom-right'
              })
              store.closeModal(false)
              await wait(3000)
              window.location.reload()
            }
          } else {
            const { errors } = await update({
              id: editedItemDashboard.value.idAddress,
              cep: editedItemDashboard.value.cep,
              logradouro: editedItemDashboard.value.logradouro,
              bairro: editedItemDashboard.value.bairro,
              cidade: editedItemDashboard.value.cidade,
              uf: editedItemDashboard.value.uf
            })

            if (!errors) {
              $q.notify({
                color: 'green-6',
                textColor: 'white',
                message: 'Endereço editado com sucesso',
                position: 'bottom-right'
              })
              store.closeModal(false)
              await wait(3000)
              window.location.reload()
            }
          }
        }
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: 'Error indesperado aconteceu, tente novamente',
          position: 'bottom-right',
          textColor: 'white'
        })
      }
    }
    return {
      modal: store.closeModal,
      cepRef,
      logradouroRef,
      bairroRef,
      editedItemDashboard,
      cepRules,
      logradouroRules,
      state,
      bairroRules,
      ufRules,
      ufRef,
      handleSubmit,
      card: store.selectedCard,
      selectedCard,
      store,
      cidadeRules,
      cidadeRef
    }
  }
})
</script>
<style lang="scss">
.q-tab__label {
  font-size: 1.3em;
}
</style>
