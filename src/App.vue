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
  #header_section{
    height: 50px;
    background-color: grey;
  }
  #main_section{
    background-color: #6f42c1;
    color: royalblue;
  }
  #footer_section{
    height: 200px;
    background-color: #0b2e13;
  }
  #sidebar_section{
    width: 270px;
    background-color: #37474f;
    float: left;
    height: calc(100vh - 50px);
  }
  #content_section{
    width: 100%;
    min-height: calc(100vh - 250px); /*Учитывая размер хидера, должен отнять*/
    background-color: white;
  }
  .module-wrapper{
    background-color: #eeeeee;
    border: solid 1px;
    border-color: #c1c1c1;
    border-radius: 10px;
    width: 100%;
    padding: 15px;
  }
</style>
