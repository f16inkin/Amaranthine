<template>
    <div>
        <div class="card-search-panel"><Search/></div>
        <div><component :is="currentView"/></div>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import Card from '../../components/App/PatientCard/Card'
import Cards from '../../components/App/PatientCard/Cards'
import Search from '../../components/App/PatientCard/Search'
export default {
  name: 'PatientCard',
  components: { Search, Card, Cards },
  setup () {
    const store = useStore()
    return {
      currentView: computed(() => store.state.card.currentView)
    }
  }
}
</script>

<style>
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
