<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="Dashboard">
    <div class="row">
      <div class="col-sm-12 col-md-3" v-for="(item, index) in indicatorsArr" :key="index">
        <Indicators :color="item.color" :title="item.title" :icon="item.icon" :value="item.value" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Transações</h5>

            <b-table striped stacked="sm" small responsive="sm" :items="items" :fields="fields" :per-page="perPage" :current-page="currentPage" borderless>
              <template #cell(Categoria)="data">
                <b class="text-info">{{ data.item.Categoria.toUpperCase() }}</b>
              </template>

              <template #cell(Tipo)="data">
                <b-icon :icon="data.item.Tipo" :variant="data.item.Tipo == 'arrow-down-circle-fill' ? 'danger' : 'success'" />
              </template>

              <template #cell(Valor)="data">
                {{ data.item.Valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
              </template>
            </b-table>

            <b-pagination size="sm" v-model="currentPage" :total-rows="rows" :per-page="perPage" align="center"></b-pagination>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4">
        <div class="row">
          <div class="col-12 mb-4">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Categoria</h5>
                <apexchart type="pie" :options="chartoptions" :series="series"></apexchart>
              </div>
            </div>
          </div>

          <div class="col-12">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Cartões</h5>
                <apexchart type="bar" :options="chartoptions" :series="series"></apexchart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.js" />

<style scoped lang="scss" src="./dashboard.scss" />
