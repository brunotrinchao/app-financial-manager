<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div class="Dashboard">
    <div class="row">
      <div class="col-sm-12 col-md-3" v-for="(item, index) in indicatorsArr" :key="index">
        <Indicators :color="item.color" :title="item.title" :total="item.total" :icon="item.icon" :value="item.value" />
      </div>
    </div>

    <div class="row">
      <div class="col-sm-12 col-md-8">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">Últimas transações</h5>

            <div class="legend mb-4">
              <span v-for="(item, index) in getLegends" :key="index" class="mr-3">
                <img :src="item.icon" alt="" width="12" class="mr-2" />
                <small>{{ item.name }}</small>
              </span>
            </div>
            <Table
              ref="tableTansaction"
              table-id="transactionsTable"
              :isSmall="true"
              :api-method="fetchTransactions"
              :fields="fields"
              :paginationShow="false"
            ></Table>
          </div>
        </div>
      </div>

      <div class="col-sm-12 col-md-4">
        <!-- <div class="card">
          <div class="card-body"> -->
        <b-row>
          <b-col md="12" class="mb-4">
            <h6 class="card-title">Categoria</h6>
            <Chart type="pie" :options="chartCategoryOptions.options" :series="chartCategoryOptions.series"></Chart>
          </b-col>
          <b-col md="12">
            <h6 class="card-title">Cartões de crédito</h6>
            <Chart type="pie" :options="chartCreditCardsOptions.options" :series="chartCreditCardsOptions.series"></Chart>
          </b-col>
        </b-row>
        <!-- </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script src="./dashboard.js" />

<style scoped lang="scss" src="./dashboard.scss" />
