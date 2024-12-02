<template>
  <div class="Transactions">
    <div class="row">
      <div class="col-12">
        <div class="card mb-4">
          <div class="card-body">
            <h5 class="card-title">
              <div class="row">
                <div class="col-sm-12 col-md-10 mb-2">
                  <div class="filterContainer">
                    <span class="mr-3">Filtros:</span>
                    <b-badge class="mr-1" pill variant="warning" v-for="(item, index) in formattedFilters" :key="index">
                      {{ item.text }}: {{ item.value }}
                    </b-badge>
                  </div>
                </div>
                <div class="col-sm-12 col-md-2 text-right">
                  <b-button @click="openFilter">
                    <b-icon icon="funnel" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
              </div>
            </h5>
            <div class="legend mb-4">
              <span v-for="(item, index) in getLegends" :key="index" class="mr-3">
                <img :src="item.icon" alt="" width="12" class="mr-2" />
                <small>{{ item.name }}</small>
              </span>
            </div>
            <Table
              ref="tableTansaction"
              table-id="transactionsTable"
              :api-method="fetchTransactions"
              :fields="fields"
              :per-page="10"
              @row-selected="onRowSelected"
            >
              <!-- Customização de colunas com slots -->
              <template #type="{ item }">
                <b-badge :variant="item.type.color">{{ item.type.name }}</b-badge>
              </template>
              <template #value="{ item }">
                {{ item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
              </template>
            </Table>
            <!-- <b-table
              :id="tableNewId"
              :key="tableNewId"
              ref="tableTransactions"
              striped
              stacked="sm"
              responsive="sm"
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              borderless
              @row-clicked="onRowSelected"
              show-empty
              empty-text="Nenhum registro encontrado."
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
            >
              <template #cell(category)="data">
                <b class="text-info">{{ data.item.category.toUpperCase() }}</b>
              </template>

              <template #cell(type)="data">
                <b-badge :variant="data.item.type.color">{{ data.item.type.name }}</b-badge>
              </template>

              <template #cell(value)="data">
                {{ data.item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
              </template>

              <template #cell(status)="data">
                <b-badge :variant="data.item.status.color">{{ data.item.status.name }}</b-badge>
              </template>

              <template #empty="scope">
                <p class="text-center p-3">{{ scope.emptyText }}</p>
              </template>
            </b-table>

            <b-pagination v-model="currentPage" :total-rows="totalPage" :per-page="perPage" @input="fetchTransactions" align="center" /> -->
          </div>
        </div>
      </div>
    </div>
    <b-sidebar ref="filters-transactions" id="sidebarFilter" title="Filtros" right shadow backdrop-variant="dark" backdrop>
      <div class="px-3 py-2">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="Categoria">
            <b-form-select v-model="filter.category" :options="getCategoriesList" id="filter-category"></b-form-select>
          </b-form-group>
          <b-form-group label="Tipo">
            <b-form-select v-model="filter.type" :options="getTypesList" id="filter-type"></b-form-select>
          </b-form-group>
          <b-form-group label="Método">
            <b-form-select v-model="filter.method" :options="getMethodsList" id="filter-method"></b-form-select>
          </b-form-group>
          <b-form-group label="Status">
            <b-form-select v-model="filter.status" :options="getStatusList" id="filter-status"></b-form-select>
          </b-form-group>
          <div class="row">
            <div class="col">
              <b-button type="submit" block variant="primary">Filtrar</b-button>
            </div>
            <div class="col">
              <b-button type="reset" @click="resetFilters" block variant="danger">Limpar</b-button>
            </div>
          </div>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>

<script src="./transactions.js" />

<style scoped lang="scss" src="./transactions.scss" />
