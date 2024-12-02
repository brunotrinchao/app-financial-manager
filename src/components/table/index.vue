<template>
  <div class="table-container">
    <div class="table-responsive">
      <table :ref="tableId" class="table table-striped table-hover table-bordered" :class="{ 'table-sm': isSmall }" v-if="items.length > 0">
        <thead>
          <tr>
            <th v-for="field in fields" :key="field.key" style="cursor: pointer">
              {{ field.label }}
              <span v-if="sortBy === field.key">
                <i :class="sortDesc ? 'bi bi-arrow-down' : 'bi bi-arrow-up'"></i>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in items" :key="item.id" @click="onRowSelected(item)" class="row-select">
            <td v-for="(field, index) in fields" :key="field.key">
              <span v-if="field.key === 'status'" class="text-white">
                <span :class="`badge bg-${item.status.color}`">{{ item.status.name }}</span>
              </span>

              <!-- Tipo -->
              <span v-else-if="field.key === 'type'">
                <div v-if="item.type.icon" class="text-center">
                  <img :src="item.type.icon" :alt="item.type.name" class="payment-icon" v-b-tooltip.hover :title="item.type.name" />
                </div>
                <template v-else>
                  <span :class="`badge bg-${item.type.color}`" class="text-white">{{ item.type.name }}</span>
                </template>
              </span>

              <!-- Metodo de pagamento -->
              <span v-else-if="field.key === 'method'">
                <div v-if="item.method.icon" class="text-center">
                  <img :src="item.method.icon" :alt="item.method.name" class="payment-icon" v-b-tooltip.hover :title="item.method.name" />
                </div>
                <template v-else>
                  {{ item.method.name }}
                </template>
              </span>

              <!-- User -->
              <div v-else-if="field.key === 'user'" class="text-center">
                <b-avatar size="sm" :badge="item.user.text" :src="getAvatar(item.user.avatar)"></b-avatar>
              </div>
              <span v-else>
                <span :class="[index == 0 ? 'font-weight-bold' : '']">{{ item[field.key] }}</span>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Pagination -->
    <nav v-if="paginationShow">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }" @click="currentPage > 1 && (currentPage--, fetchData())">
          <a class="page-link" href="#">Anterior</a>
        </li>
        <li
          class="page-item"
          v-for="page in Math.ceil(totalRows / perPage)"
          :key="page"
          :class="{ active: currentPage === page }"
          @click="
            currentPage = page;
            fetchData();
          "
        >
          <a class="page-link" href="#">{{ page }}</a>
        </li>
        <li
          class="page-item"
          :class="{ disabled: currentPage === Math.ceil(totalRows / perPage) }"
          @click="currentPage < Math.ceil(totalRows / perPage) && (currentPage++, fetchData())"
        >
          <a class="page-link" href="#">Próximo</a>
        </li>
      </ul>
    </nav>

    <!-- Vazio -->
    <p v-if="items.length == 0" class="text-center">Nenhum registro encontrado</p>
  </div>
</template>

<script src="./table.js" />

<style scoped lang="scss" src="./table.scss" />
