<template>
    <Panel>
        <template #header>
            <i class="pi pi-user p-text-bold" style="color: #15cc15"><span class="p-text-bold" style="color: black"> Персональные данные</span></i>
        </template>
        <template #icons>
            <button class="p-panel-header-icon p-link p-mr-2" @click="toggle" v-tooltip.top="'Редактировать'">
                <span class="pi pi-pencil"></span>
            </button>
            <button class="p-panel-header-icon p-link p-mr-2" @click="toggle" v-tooltip.top="'Сохранить'">
                <span class="pi pi-save"></span>
            </button>
        </template>
        <div class="p-grid">
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="surname" class="p-text-bold">Фамилия:<i style="color:red">*</i></label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                    <InputText id="surname" type="text" class="p-inputtext-sm" placeholder="Введите фамилию"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="first-name" class="p-text-bold">Имя:<i style="color:red">*</i></label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                    <i class="pi pi-user"></i>
                    </span>
                    <InputText id="first-name" type="text" class="p-inputtext-sm" placeholder="Введите имя"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="second-name" class="p-text-bold">Отчество:</label>
                </div>
                <div class="p-inputgroup">
                   <span class="p-inputgroup-addon">
                   <i class="pi pi-user"></i>
                    </span>
                    <InputText id="second-name" type="text" class="p-inputtext-sm" placeholder="Введите отчество"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label for="date-birth" class="p-text-bold">Дата рождения<i style="color:red">*</i></label>
                </div>
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-user"></i>
                    </span>
                    <InputText id="second-name" type="date" class="p-inputtext-sm"/>
                </div>
            </div>
            <div class="p-col-4">
                <div class="p-mb-2">
                    <label class="p-text-bold">Пол<i style="color:red">*</i></label>
                </div>
                <div v-for="category of categories" :key="category.key" class="p-field-radiobutton">
                    <RadioButton :id="category.key" name="category" :value="category" v-model="selectedCategory"/>
                    <label :for="category.key">{{category.name}}</label>
                </div>
            </div>
        </div>
    </Panel>
</template>

<script>
export default {
  name: 'CardPersonalData',
  data () {
    return {
      city: null,
      categories: [{ name: 'Мужской', key: 1 }, { name: 'Женский', key: 2 }],
      selectedCategory: null
    }
  },
  created () {
    this.selectedCategory = this.categories[0]
  }
}
</script>

<style scoped>

</style>
