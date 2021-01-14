<template>
    <div>
        <div id="cards-search-panel">
            <Toolbar class="p-p-1">
                <template #right>
                    <div class="p-inputgroup">
                        <InputText class="p-inputtext" placeholder="ФИО, СНИЛС или номер полиса" style="width: 300px;" v-on:keypress.enter="getCards" v-model="searchString"/>
                        <Button icon="pi pi-search" class="p-button-warning" @click="getCards"/>
                    </div>
                </template>
            </Toolbar>
        </div>
        <div id="cards-wrapper">
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
                        <router-link tag="Button" :to="{name: 'get.card', params: {id: slotProps.data.cardId}}">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button p-mr-2"/>
                        </router-link>
                    </template>
                </Column>
            </DataTable>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import DataTable from 'primevue/components/datatable/DataTable'
import Column from 'primevue/components/column/Column'
import Button from 'primevue/components/button/Button'
import InputText from 'primevue/components/inputtext/InputText'
import Badge from 'primevue/components/badge/Badge'
import Toolbar from 'primevue/components/toolbar/Toolbar'
export default {
  name: 'Cards',
  components: { Toolbar, Badge, InputText, Button, Column, DataTable },
  setup () {
    const store = useStore()
    const searchString = ref('')
    const page = ref(1)
    const offset = ref(5)
    const getCards = () => {
      store.dispatch('card/getCardsAction', { searchString: searchString.value, page: page.value, offset: offset.value })
    }
    const cards = computed(() => store.state.card.patientCards.Cards)
    const cardsCount = computed(() => store.state.card.patientCards.CardsCount || '0')
    return {
      cards,
      cardsCount,
      searchString,
      getCards
    }
  }
}
</script>

<style scoped>
    #cards-wrapper{
        padding: 1rem;
    }
</style>
