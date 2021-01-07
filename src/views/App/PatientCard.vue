<template>
    <div>
        <div class="card-search-panel"><Search/></div>
        <div><component :is="currentView"></component> </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Card from '../../components/App/PatientCard/Card'
import Cards from '../../components/App/PatientCard/Cards'
import Button from 'primevue/components/button/Button'
import InputText from 'primevue/components/inputtext/InputText'
import SplitButton from 'primevue/components/splitbutton/SplitButton'
import Search from "../../components/App/PatientCard/Search";
export default {
  name: 'PatientCard',
  components: {Search, SplitButton, InputText, Button, Card, Cards },
  setup () {
    const store = useStore()
    const items = [
      {
        label: 'Амбулаторный',
        icon: 'pi pi-print',
        command: () => {
          this.$toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 })
        }
      },
      {
        label: 'Гинекологический',
        icon: 'pi pi-print',
        command: () => {
          this.$toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 })
        }
      }
    ]
    return {
      changeView: () => store.dispatch('card/changeView'),
      currentView: computed(() => store.state.card.currentView),
      items
    }
  }
}
</script>

<style></style>
