<template>
    <div id="application">
        <section id="header-section">
            <AppUserBar></AppUserBar>
        </section>
        <section id="main-section">
            <Sidebar :visible="sideBarVisible" style="background-color: red"></Sidebar>
            <router-view/>
        </section>
        <section id="footer-section"></section>
    </div>
</template>

<script>
import Sidebar from 'primevue/components/sidebar/Sidebar'
import AppUserBar from '../components/App/UserBar/AppUserBar'
export default {
  name: 'AppLayout',
  components: { AppUserBar, Sidebar },
  data () {
    return {
      sideBarVisible: false
    }
  }
}
</script>

<style scoped>
    #header-section{
        /*height: 64px;*/
        background-color: grey;
    }
    #main-section{
        width: 100%;
        min-height: calc(100vh - 164px); /*Учитывая размер хидера, должен отнять*/
        background-color: white;
    }
    #footer-section{
        height: 100px;
        background-color: #0b2e13;
    }
</style>
