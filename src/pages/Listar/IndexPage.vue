<template>
  <q-page class="q-px-xl q-mt-sm">
      <div class="text-bold text-h4 q-mt-xl">Endereços Cadastrados</div>
      <div><q-btn label="Novo Endereço" icon="mdi-open-in-new" dense size="14px" no-caps @click="modal(true)" class="q-mr-md q-mt-sm" color="dark"></q-btn></div>
      <div class="row q-col-gutter-xl q-mt-sm" v-if="modalData.length > 0">
        <div class="col-sm-6 col-md-4 " v-for="add in modalData" :key="add.idAddress">
            <CardAddress class="q-mb-xl"
            v-bind="add"
            />
        </div>
      </div>
      <div v-else class="row q-col-gutter-xl q-mt-sm">
        <div class="col-sm-6 col-md-4 ">
          <CardAddressVazio />
        </div>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, reactive } from 'vue'
import CardAddress from '../../components/CardAddress.vue'
import CardAddressVazio from '../../components/CardAddressVazio.vue'
import postServices from '../../services/index'
import { useStore } from '../../stores/modal'
import { storeToRefs } from 'pinia'

export default defineComponent({
  components: {
    CardAddress,
    CardAddressVazio
  },
  name: 'IndexPage',
  setup () {
    const { getAll } = postServices()
    const store = useStore()
    const { modalData } = storeToRefs(store)

    const state = reactive({
      address: ''
    })

    onMounted(() => {
      buscarEndereco()
    })

    async function buscarEndereco () {
      const { data, errors } = await getAll()
      if (!errors) {
        store.addressData(data)
      }
    }

    return {
      modalData,
      state,
      address: store.addData,
      modal: store.openModal
    }
  }
})
</script>
