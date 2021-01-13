<template>
    <div>Главная панель</div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
export default {
  name: 'Desktop',
  components: { Button, Column, DataTable },
  setup () {
    const store = useStore()
    const loadData = () => {
      store.dispatch('card/getCardsAction', { searchString: '', page: 1, offset: 5 })
    }
    const auth = () => store.dispatch('auth/doAuthAction', {payload: 'anotherpayload'})
    const cards = computed(() => store.state.card.patientCards.Cards)
    return {
      count: computed(() => store.state.card.count),
      increment: () => store.dispatch('card/increment'),
      auth,
      loadData,
      cards
    }
  }
}
</script>

<style scoped>

</style>
