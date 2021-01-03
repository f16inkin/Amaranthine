<template>
    <div class="p-d-flex p-p-2">
        <div class="p-as-center">
            <Button icon="pi pi-list" class="p-button-rounded p-button-warning" @click="sideBarVisible = true"/>
        </div>
        <div class="p-ml-auto p-mr-2 p-as-center" v-badge.danger="'99+'">
            <Button icon="pi pi-envelope" class="p-button-rounded p-button-warning"/>
        </div>
        <div class="p-ml-1 p-mr-2 p-as-center" v-badge.danger="'99+'">
            <Button icon="pi pi-bell" class="p-button-rounded p-button-warning"/>
        </div>
        <div class="p-ml-1 p-mr-1">
            <Avatar label="V" size="large"/>
        </div>
        <div class="p-ml-1 p-mr-1 p-as-center">
            Коваленко М.Ф.
        </div>
        <div class="p-as-center">
            <Button label="Выход" icon="pi pi-power-off" class="p-button-sm p-button-rounded p-button-secondary"  />
        </div>
    </div>
</template>

<script>
export default {
  name: 'AppUserBar'
}
</script>

<style scoped>

</style>
