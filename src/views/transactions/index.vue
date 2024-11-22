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
                  <b-button v-b-toggle.sidebar-1>
                    <b-icon icon="funnel" aria-hidden="true"></b-icon>
                  </b-button>
                </div>
              </div>

              <!-- <div>
                <b-dropdown id="dropdown-1" text="Status" class="m-md-2">
                  <b-dropdown-item>Pago</b-dropdown-item>
                  <b-dropdown-item>Agendado</b-dropdown-item>
                  <b-dropdown-item>Não pago</b-dropdown-item>
                </b-dropdown>
              </div> -->
            </h5>
            <b-table
              id="table-transactions"
              ref="table"
              striped
              stacked="sm"
              responsive="sm"
              :items="items"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              borderless
              @row-clicked="onRowSelected"
            >
              <template #cell(category)="data">
                <b class="text-info">{{ data.item.category.toUpperCase() }}</b>
              </template>

              <template #cell(type)="data">
                <b-icon
                  :icon="data.item.type"
                  :variant="data.item.type == 'arrow-down-circle-fill' ? 'danger' : 'success'"
                  v-b-tooltip.hover
                  :title="data.item.typeName"
                />
              </template>

              <template #cell(value)="data">
                {{ data.item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
              </template>

              <template #cell(status)="data">
                <b-badge :variant="data.item.status.color">{{ data.item.status.name }}</b-badge>
              </template>
            </b-table>

            <b-pagination size="sm" :model="currentPage" :total-rows="totalPage" :per-page="perPage" @input="fetchTransactions" align="center" />
          </div>
        </div>
      </div>
    </div>
    <b-sidebar ref="filters-transactions" id="sidebar-1" title="Filtros" right shadow backdrop-variant="dark" backdrop>
      <div class="px-3 py-2">
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group label="Categoria">
            <b-form-select v-model="filter.category" :options="filters.category" id="filter-category"></b-form-select>
          </b-form-group>
          <b-form-group label="Tipo">
            <b-form-select v-model="filter.type" :options="options.type" id="filter-type"></b-form-select>
          </b-form-group>
          <b-form-group label="Método">
            <b-form-select v-model="filter.method" :options="options.method" id="filter-method"></b-form-select>
          </b-form-group>
          <b-form-group label="Status">
            <b-form-select v-model="filter.status" :options="options.status" id="filter-status"></b-form-select>
          </b-form-group>
          <div class="row">
            <div class="col">
              <b-button type="submit" block variant="primary">Filtrar</b-button>
            </div>
            <div class="col">
              <b-button type="reset" block variant="danger">Limpar</b-button>
            </div>
          </div>
        </b-form>
      </div>
    </b-sidebar>
  </div>
</template>

<script src="./transactions.js" />

<style scoped lang="scss" src="./transactions.scss" />
