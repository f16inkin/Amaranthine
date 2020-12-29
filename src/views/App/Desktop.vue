<template>
    <div>
        <button @click="increment">+</button>
        <p>App desktop: {{ count }}</p>
    </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Desktop',
  setup () {
    const store = useStore()
    console.log(store)
    return {
      count: computed(() => store.state.card.count),
      increment: () => store.dispatch('card/increment')
    }
  }
}
</script>

<style scoped>

</style>
