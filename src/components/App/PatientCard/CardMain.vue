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
</template>

<script>
import CardPersonalData from './CardPersonalData'
import CardDocuments from './CardDocuments'
import CardAddresses from './CardAddresses'
import CardAdditionally from './CardAdditionally'
export default {
  name: 'CardMain',
  components: { CardAdditionally, CardAddresses, CardDocuments, CardPersonalData }
}
</script>

<style scoped>

</style>
