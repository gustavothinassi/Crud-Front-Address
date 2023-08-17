<template>
  <q-page>
    <div class="row flex q-mt-xl q-px-xl">
      <div class="text-h5 text-bold">Buscar endereço cadastrado</div>
    </div>
    <div class="row q-col-gutter-sm q-px-xl">
      <div class="col-md-8 col-lg-8 col-sm-12 col-xs-12">
        <q-card class="">
          <q-card-section class="text-h8 text-black">
            <LoadingEndereco v-if="state.isLoading" />
            <q-input v-if="!state.isLoading && !state.isNext" outlined placeholder="Digite o CEP ou Logradouro" dense ref="searchRef"
              v-model="editedItemDashboard.search" :rules="searchRules" lazy-rules class="col-md-12 col-sm-12 col-xs-12" />
            <q-card-actions align="right" v-if="!state.isLoading && !state.isNext">
              <q-btn style="background-color: #4B0082;" dense no-caps class="text-white submited" size="17px"
                @click="onSubmit">Buscar</q-btn>
            </q-card-actions>
          </q-card-section>
          <q-card-section class="text-h8 text-black" v-if="state.isNext">
            <q-card-actions align="left" v-if="state.isNext" style="padding: 0;!important">
            <q-btn style="background-color: #4B0082;"  dense no-caps class="text-white" @click="novaBusca" size="17px">Nova
              busca</q-btn>
          </q-card-actions>
            <div class="row q-col-gutter-sm">
              <div class="col-sm-6 col-md-6" v-for="add in state.address" :key="add.idAddress">
                <CardAddress v-bind="add" class="q-mt-md"/>
              </div>
            </div>
          </q-card-section>

        </q-card>
      </div>
      <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 q-mb-xl">
        <q-card class="no-shadow q-px-sm" bordered style="background-color: #FFFFFF;">
          <q-card-section class="text-h8 text-black">
            <div class="text-bold text-h6 row">Siga as instruções</div>
            <q-list>
              <div class="text-h7 text-bold row">Buscar por CEP</div>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-arrow-right-circle" />
                </q-item-section>
                <q-item-section >
                  <div class="text-h7">Inserir um CEP valido. Exemplo: 01153-000</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-arrow-right-circle" />
                </q-item-section>
                <q-item-section >
                  <div class="text-h7">Inserir um Logradouro valido. Exemplo: Rua Vitorino Carmilo</div>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section avatar>
                  <q-icon color="primary" name="mdi-arrow-right-circle" />
                </q-item-section>
                <q-item-section class="text-h7">Finalize o processo</q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import LoadingEndereco from './LoadingEndereco.vue'
import { wait } from '../../utils/timeout'
import CardAddress from '../../components/CardAddress.vue'
import postServices from '../../services/index'
import { useStore } from '../../stores/modal'
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    LoadingEndereco,
    CardAddress
  },
  setup () {
    const searchRef = ref(null)
    const state = reactive({
      cep: '',
      isNext: false,
      isLoading: false,
      address: []
    })

    const editedItemDashboard = ref({
      search: ''
    })

    const searchRules = ref([
      v => !!v || 'CEP ou Logradouro é obrigatório'
    ])

    const store = useStore()
    const { selectedCard } = storeToRefs(store)
    const { getCep } = postServices()

    const $q = useQuasar()

    function novaBusca () {
      state.isLoading = false
      state.isNext = false
      editedItemDashboard.value = {}
    }

    async function onSubmit () {
      searchRef.value.validate()

      if (!searchRef.value.hasError) {
        state.isLoading = true
        const { errors, data } = await getCep({
          search: editedItemDashboard.value.search
        })

        if (!errors) {
          await wait(4000)
          state.isLoading = false
          state.isNext = true
          state.address = []
          state.address = data
          return
        }

        if (errors.status === 401) {
          $q.notify({
            color: 'negative',
            message: 'Cep ou Logradouro invalido, por favor digite novamente',
            position: 'bottom-right',
            textColor: 'white'
          })
          state.isLoading = false
          // editedItemDashboard.value = {}
        }
      }
    }

    return {
      state,
      novaBusca,
      onSubmit,
      searchRef,
      searchRules,
      selectedCard,
      editedItemDashboard
    }
  }
})
</script>
