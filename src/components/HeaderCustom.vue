<template>
  <q-header reveal elevated style="background-color: #4B0082;">
    <q-toolbar class="q-mt-sm q-pr-xl q-pl-xl q-pb-sm">
      <q-toolbar-title class="text-h5" style="text-transform: uppercase;">
        Crud Endereço
      </q-toolbar-title>
      <div class="gt-sm">
        <q-btn flat round dense icon="mdi-instagram" class="q-mr-sm"></q-btn>
          <q-btn flat round dense icon="mdi-facebook" class="q-mr-sm"></q-btn>
      </div>

      <div class="lt-md">
        <q-btn flat dense icon="menu" aria-label="Menu" @click="() => $emit('menu')"/>
      </div>
    </q-toolbar>
    <div class="text-white shadow-transition gt-sm q-py-sm">
      <q-btn-group class="q-mx-xl" unelevated style="color: white;">
<!--         <q-btn label="Cadastrar Endereço" icon="mdi-open-in-new" dense size="14px" no-caps @click="modal(true)" class="q-mr-md"></q-btn>
 -->        <q-btn label="Listar Endereço" to="/" icon="mdi-format-list-bulleted"  dense size="14px"
          no-caps></q-btn>
        <q-btn label="Buscar Endereço" icon="mdi-magnify" dense size="14px" no-caps to="/endereco/buscar" class="q-mx-md"></q-btn>
      </q-btn-group>
    </div>
  </q-header>
</template>
<script>
import { defineComponent } from 'vue'
import { useStore } from '../stores/modal'

export default defineComponent({
  components: {
  },
  setup () {
    const store = useStore()
    return {
      modal: store.openModal
    }
  }
})
</script>
<style lang="scss" >
.q-field--dense .q-field__after, .q-field--dense .q-field__append {
    padding-left: 0px!important;
}

</style>
