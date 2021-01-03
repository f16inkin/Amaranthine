<template>
  <div class="card-wrapper">
    <div class="card-body">
        <div class="p-grid">
            <div class="p-col-2" style="border: solid 1px">
                <div class="p-d-flex p-p-3 card">
                    <Button type="Button" icon="pi pi-check" class="p-mr-2" />
                    <Button type="Button" icon="pi pi-trash" class="p-button-danger"/>
                    <Button type="Button" icon="pi pi-search" class="p-ml-auto p-button-help"/>
                    <Button type="Button" icon="pi pi-search" class="p-ml-1 p-button-help"/>
                    <Button type="Button" icon="pi pi-search" class="p-ml-1 p-button-help"/>
                </div>
            </div>
            <div class="p-col-10">
                <div class="card">
                    <div class="p-grid p-fluid">
                        <div class="p-col-12">
                            <span class="p-buttonset">
                                <Button label="Карта" icon="pi pi-check" class="p-button-secondary p-button-outlined " />
                                <Button label="Флюорография" icon="pi pi-trash" />
                                <Button label="Прививки" icon="pi pi-times" />
                            </span>
                        </div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>

import CardPersonalData from './CardPersonalData'
import CardDocuments from './CardDocuments'
import CardAddresses from './CardAddresses'
import CardAdditionally from './CardAdditionally'
export default {
  name: 'Card',
  components: { CardAdditionally, CardAddresses, CardDocuments, CardPersonalData }
}
</script>

<style>
    .card-body{
        min-height: calc(100vh - 250px);
        width: 100%;
        padding: 1rem;
    }
    .card{
        background: var(--surface-e);
        padding: 1rem;
        -webkit-box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        box-shadow: 0 2px 1px -1px rgba(0,0,0,.2), 0 1px 1px 0 rgba(0,0,0,.14), 0 1px 3px 0 rgba(0,0,0,.12);
        border-radius: 4px;
        margin-bottom: 2rem;
    }
    .p-panel .p-panel-header{
        padding: 0.2rem;
    }
</style>
