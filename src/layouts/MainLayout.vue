<template>
  <div id="#q-app"></div>
  <q-layout view="lHh lpr lff">
    <HeaderCustom
    @menu="toggleLeftDrawer"
    />

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >

        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
     <!--  @open-modal="handleModalIsOpen"
      @edit-modal="editAddress" -->
      <router-view />
      <ModalCustom
      v-model="isModal"
      />
      <ConfirmCustom
      v-model="isDialog"
      />
    </q-page-container>
    <FooterCustom />
  </q-layout>
</template>

<script>
import { defineComponent, ref, reactive } from 'vue'
import EssentialLink from '../components/EssentialLink.vue'
import HeaderCustom from '../components/HeaderCustom.vue'
import ModalCustom from '../components/ModalCustom.vue'
import ConfirmCustom from '../components/ConfirmCustom.vue'
import FooterCustom from '../components/FooterCustom.vue'
import { useStore } from '../stores/modal'
import { useDialog } from '../stores/dialog'
import { storeToRefs } from 'pinia'

const linksList = [
  {
    title: 'Listar Endereço',
    icon: 'mdi-format-list-bulleted',
    link: 'http://localhost:9000'
  },
  {
    title: 'Buscar Endereço',
    icon: 'mdi-magnify',
    link: 'http://localhost:9000/endereco/buscar'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    HeaderCustom,
    FooterCustom,
    ModalCustom,
    ConfirmCustom,
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    // const isOpen = ref(false)
    const state = reactive({
      dados: '',
      openModal: ''
    })

    const store = useStore()
    const dialog = useDialog()
    const { isModal } = storeToRefs(store)
    const { isDialog } = storeToRefs(dialog)

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function editAddress (edit) {
      state.dados = edit
    }

    /*  function openModal () {
      isOpen.value = !isOpen.value
    } */

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      open,
      state,
      editAddress,
      isModal,
      isDialog,
      toggleLeftDrawer
    }
  }
})
</script>
<style scoped lang="scss">
  #q-app {
      padding: 0;
      margin: 0;
      width: 100%;
}
</style>
