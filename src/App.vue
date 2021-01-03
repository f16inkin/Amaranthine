<template>
  <div id="wrapper">
    <component :is="layout"></component>
  </div>
</template>

<script>
import AppLayout from './layouts/AppLayout'
import { markRaw } from 'vue'
export default {
  name: 'App',
  data: () => ({
    layout: markRaw(AppLayout)
  }),
  watch: {
    $route: {
      immediate: true,
      async handler (route) {
        try {
          const component = await import('@/layouts/' + route.meta.layout + 'Layout.vue')
          this.layout = markRaw(component?.default) || AppLayout
        } catch (e) {
          this.layout = AppLayout
        }
      }
    }
  }
}
</script>

<style>
  html, body {
    margin:0;
    padding:0;
  }
</style>
