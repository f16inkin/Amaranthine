<template>
    <div>
        <div class="card-search-panel">
            <Toolbar class="p-p-1">
               <template #left>
                   <Button label="Новая карта" icon="pi pi-plus" class="p-mr-2 p-button-sm" />
                   <Button label="Разблокировать" icon="pi pi-lock-open" class="p-mr-2 p-button-sm" />
                   <Button label="Печать талона" icon="pi pi-print" class="p-mr-2 p-button-sm" @click="getCardAction()" />
                   <SplitButton  icon="pi pi-print" class="p-button-secondary" :model="items"></SplitButton>
               </template>
               <template #right>
                   <div class="p-inputgroup">
                       <InputText class="p-inputtext" placeholder="ФИО, СНИЛС или номер полиса" style="width: 300px;"/>
                       <Button icon="pi pi-search" class="p-button-warning" @click="changeView()"/>
                   </div>
               </template>
            </Toolbar>
        </div>
        <div>
            <component :is="currentView"></component>
        </div>
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
export default {
  name: 'PatientCard',
  components: { SplitButton, InputText, Button, Card, Cards },
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
