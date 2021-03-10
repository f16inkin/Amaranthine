<template>
    <div class="p-col-6">
            <div class="p-mb-2">
                <CardPersonalData/>
            </div>
            <div class="p-mb-2">
                <CardDocuments/>
            </div>
        </div>
    <div class="p-col-6">
            <div class="p-mb-2">
                <CardAdditionally/>
            </div>
            <div class="p-mb-2">
                <CardAddresses></CardAddresses>
            </div>
        </div>
    <div id="overlays">
        <Toast position="bottom-right"/>
    </div>
</template>

<script>
import CardPersonalData from './CardPersonalData'
import CardDocuments from './CardDocuments'
import CardAddresses from './CardAddresses'
import CardAdditionally from './CardAdditionally'
import Toast from "primevue/components/toast/Toast";
export default {
  name: 'CardMain',
  components: {Toast, CardAdditionally, CardAddresses, CardDocuments, CardPersonalData }
}
</script>

<style scoped>

</style>
