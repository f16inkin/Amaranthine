<template>
    <div id="application">
        <section id="header_section"></section>
        <section id="main_section">
            <section id="sidebar_section">

            </section>
            <section id="content_section">
                <!--Выводится контент-->
                <router-view/>
            </section>
        </section>
        <section id="footer_section"></section>
    </div>
</template>

<script>
export default {
  name: 'AppLayout'
}
</script>

<style scoped>

</style>
