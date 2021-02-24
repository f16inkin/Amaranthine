<template>
    <div>
        <div id="card-search-panel">
            <CardControlButtons></CardControlButtons>
        </div>
        <div id="card-wrapper">
            <div class="card-body">
                <div class="p-grid">
                    <div class="p-col-3">
                        <div class="card">
                            <CardTablet></CardTablet>
                        </div>
                    </div>
                    <div class="p-col-9">
                        <div class="card">
                            <div class="p-grid p-fluid">
                                <div class="p-col">
                                    <SelectButton v-model="currentSection" :options="sections" dataKey="value">
                                        <template #option="slotProps">
                                            <i :class="slotProps.option.icon">{{ slotProps.option.name }}</i>
                                        </template>
                                    </SelectButton>
                                </div>
                            </div>
                            <div class="p-grid p-fluid">
                                <component :is="currentSection.value"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import SelectButton from 'primevue/components/selectbutton/SelectButton'
import CardMain from '../../components/App/PatientCard/CardMain'
import CardFluorography from '../../components/App/PatientCard/CardFluorography'
import CardVaccinations from '../../components/App/PatientCard/CardVaccinations'
import CardTablet from '../../components/App/PatientCard/CardTablet'
import InputText from 'primevue/components/inputtext/InputText'
import Button from 'primevue/components/button/Button'
import Toolbar from 'primevue/components/toolbar/Toolbar'
import CardControlButtons from '../../components/App/PatientCard/CardControlButtons'
export default {
  name: 'Card',
  components: { CardControlButtons, Toolbar, Button, InputText, CardTablet, CardVaccinations, CardFluorography, CardMain, SelectButton },
  setup () {
    const store = useStore()
    const route = useRoute()
    const card = computed(() => store.state.card.patientCard)
    const addresses = computed(() => store.state.card.patientCardAddresses)
    const sections = [
      { name: 'Карта', icon: '', value: 'CardMain' },
      { name: 'Флюорография', icon: '', value: 'CardFluorography' },
      { name: 'Прививки', icon: '', value: 'CardVaccinations' }
    ]
    const currentSection = ref(sections[0])
    store.dispatch('card/getCardAction', route.params.id)
    store.dispatch('card/getAddressesAction', route.params.id)
      console.log(store.state.card)
    return {
      sections,
      currentSection,
      card
    }
  }
}
</script>

<style>
    .p-panel .p-panel-header{
        padding: 0.2rem;
    }
    .search-result-container{
        width: 100%;
        border: solid 1px;
        border-color: #dce1e5;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .search-result-area {
        width: 100%;
    }
    .search-result {
        padding: 0.3rem;
        border: solid 1px;
        border-radius: 2px;
        border-color: #e9ecef;
        cursor: pointer
    }
    .search-result:hover{
        background-color: #007bff;
        color: white;
    }
    .card-body{
        min-height: calc(100vh - 250px);
        width: 100%;
        padding: 1rem;
    }
    .card{
        background: var(--surface-e);
        padding: 0.5rem;
        -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        border-radius: 4px;
        margin-bottom: 2rem;
    }
</style>
