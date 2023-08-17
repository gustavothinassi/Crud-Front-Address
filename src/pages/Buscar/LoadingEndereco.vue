<template>
    <div class="flex justify-center">
      <q-card class="no-shadow my-card" style="background-color: #FFFFFF;">
      <q-img src="../../assets/load.png" style="width:300px"></q-img>
      <q-card-section class="q-mt-sm" style="padding-left: 140px; padding-right: 140px;">
          <q-circular-progress
          indeterminate
          rounded
          size="40px"
          color="primary"
          />
        </q-card-section>
    </q-card>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
