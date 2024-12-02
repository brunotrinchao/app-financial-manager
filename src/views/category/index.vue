<template>
  <div class="Category">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <!-- <b-table
              id="table-categories"
              key="tableCategories"
              ref="table"
              striped
              stacked="sm"
              responsive="sm"
              :items="getItems"
              :fields="fields"
              :per-page="perPage"
              :current-page="currentPage"
              borderless
              @row-clicked="onRowSelected"
              show-empty
              empty-text="Nenhum registro encontrado."
            >
              <template #cell(name)="data">
                <b class="text-info">{{ data.item.name }}</b>
              </template>
            </b-table> -->
            <!-- <b-pagination size="sm" v-model="currentPage" :total-rows="totalPage" :per-page="perPage" @input="fetchCategories" align="center" /> -->

            <Table
              ref="tableCategory"
              table-id="categoriesTable"
              :api-method="fetchCategories"
              :fields="fields"
              :per-page="10"
              @row-selected="onRowSelected"
              :paginationShow="false"
            >
              <!-- Customização de colunas com slots -->
              <template #type="{ item }">
                <b-badge :variant="item.type.color">{{ item.type.name }}</b-badge>
              </template>
              <template #value="{ item }">
                {{ item.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }}
              </template>
            </Table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./category.js" />

<style scoped lang="scss" src="./category.scss" />
