<template>
  <div class="card-wrapper">
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
</template>

<script>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import CardTablet from './CardTablet'
import SelectButton from 'primevue/components/selectbutton/SelectButton'
import CardMain from './CardMain'
import CardFluorography from './CardFluorography'
import CardVaccinations from './CardVaccinations'
export default {
  name: 'Card',
  components: { CardVaccinations, CardFluorography, CardMain, SelectButton, CardTablet },
  setup () {
    const store = useStore()
    const route = useRoute()
    const sections = [
      { name: 'Карта', icon: '', value: 'CardMain' },
      { name: 'Флюорография', icon: '', value: 'CardFluorography' },
      { name: 'Прививки', icon: '', value: 'CardVaccinations' }
    ]
    const currentSection = ref(sections[0])
    store.dispatch('card/getCardAction', route.params.id)
    return {
      sections,
      currentSection
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
</style>
