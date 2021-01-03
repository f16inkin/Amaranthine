<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-home p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Адреса:</span>
            </div>
        </template>
        <div class="p-grid">
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="region" class="p-text-bold">Регион:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="region" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="district" class="p-text-bold">Район:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="district" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="locality" class="p-text-bold">Населенный пункт:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="locality" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="street" class="p-text-bold">Улица:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="street" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-2">
                <div class="p-mb-2">
                    <label for="houseNumber" class="p-text-bold">Дом:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="houseNumber" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-2">
                <div class="p-mb-2">
                    <label for="apartment" class="p-text-bold">Квартира:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-id-card"></i>
                    </span>
                    <InputText id="apartment" type="text" class="p-inputtext-sm"/>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
import Panel from 'primevue/components/panel/Panel'
export default {
  name: 'CardAddresses',
  components: { Panel }
}
</script>

<style scoped>

</style>
