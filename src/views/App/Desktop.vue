<template>
    <DataTable :value="cards" class="p-datatable-sm p-datatable-striped p-datatable-gridlines">
        <template #header>
            <div style="text-align: right">
                Карты найденные по запросу: <Badge severity="success" :value="cardsCount"></Badge>
            </div>
        </template>
        <Column field="cardNumber" header="Карта" headerStyle="width:5%; text-align:center;"  bodyStyle="text-align: center"/>
        <Column field="fullName" header="ФИО" headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
        <Column field="insuranceCertificate" header="СНИЛС"  headerStyle="width:20%; text-align:center;"  bodyStyle="text-align: center"/>
        <Column field="policyNumber" header="Полис" headerStyle="width:20%; text-align:center;" bodyStyle="text-align: center"/>
        <Column header="Управление"  bodyStyle="text-align: center">
            <template #body="slotProps">
                <router-link :to="{name: 'getCard', params: {id: slotProps.data.cardId}}">Click</router-link>
                <Button icon="pi pi-pencil" class="p-button-rounded p-button-success p-mr-2" @click="getCard(slotProps.data.cardId)" />
                <router-link to="/">
                    <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"/>
                </router-link>
            </template>
        </Column>
    </DataTable>
    <Button @click="loadData">Load data</Button>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import DataTable from "primevue/components/datatable/DataTable";
import Column from "primevue/components/column/Column";
import Button from "primevue/components/button/Button";
export default {
  name: 'Desktop',
  components: { Button, Column, DataTable },
  setup () {
    const store = useStore()
    const loadData = () => {
        store.dispatch('card/getCardsAction', { searchString: '', page: 1, offset: 5 })
    }
      const cards = computed(() => store.state.card.patientCards.Cards)
    return {
      count: computed(() => store.state.card.count),
      increment: () => store.dispatch('card/increment'),
        loadData, cards
    }
  }
}
</script>

<style scoped>

</style>
