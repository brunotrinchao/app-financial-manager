<template>
  <div class="Account">
    <div class="row">
      <div class="col">
        <div class="card">
          <div class="card-body">
            <b-table
              id="table-accounts"
              key="tableAccounts"
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
              <template #cell(balance)="data">
                {{ data.item.balance }}
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./account.js" />

<style scoped lang="scss" src="./account.scss" />
