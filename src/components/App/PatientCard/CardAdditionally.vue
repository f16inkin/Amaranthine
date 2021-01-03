<template>
    <Panel>
        <template #header>
            <div>
                <i class="pi pi-info-circle p-text-bold" style="color: #15cc15"></i><span class="p-text-bold"> Дополнительно</span>
            </div>
        </template>
        <div class="p-grid">
            <div class="p-col-6">
                <div class="p-mb-2">
                    <label for="workplace" class="p-text-bold">Место работы:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-info-circle"></i>
                    </span>
                    <InputText id="workplace" type="text" class="p-inputtext-sm" placeholder="Введите место работы"/>
                </div>
            </div>
            <div class="p-col-6">
                <div class="p-mb-2">
                    <label for="profession" class="p-text-bold">Профессия:</label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-info-circle"></i>
                    </span>
                    <InputText id="profession" type="text" class="p-inputtext-sm" placeholder="Введите профессию"/>
                </div>
            </div>
            <div class="p-col-12">
                <div class="p-mb-2">
                    <label  for="notation" class="p-text-bold">Дополнительно:</label>
                </div>
                <Textarea id="notation" v-model="notation" :autoResize="true" rows="1" cols="30" placeholder="Дополнительная информация"/>
            </div>
        </div>
    </Panel>
</template>

<script>
import Panel from 'primevue/components/panel/Panel'
import Textarea from 'primevue/components/textarea/Textarea'
export default {
  name: 'CardAdditionally',
  components: { Textarea, Panel }
}
</script>

<style scoped>

</style>
