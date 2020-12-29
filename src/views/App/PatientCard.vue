<template>
    <div>
        <button @click="getCardAction">Нажать</button>
        <div>
            <component :is="currentView"></component>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import Card from '../../components/App/PatientCard/Card'

export default {
  name: 'PatientCard',
  components: { Card },
  setup () {
    const store = useStore()
    const route = useRoute()
    console.log(store.state.card.currentView)
    return {
      count: computed(() => store.state.card.count),
      getCardAction: () => store.dispatch('card/getCardAction', route.params.id),
      currentView: computed(() => store.state.card.currentView)
    }
  }
}
</script>

<style>
    #patient-card-menu{
        height: 50px;
        width: 100%;
        background-color: white;
        margin-bottom: 10px;
        padding: 6px;
        border: solid 1px;
        border-radius: 5px;
        border-color: #dce1e5;
    }
    #patient-card-body{
        width: 100%;
        padding: 10px;
    }
</style>
