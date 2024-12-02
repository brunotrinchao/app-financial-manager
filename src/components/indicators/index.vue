<template>
  <div class="indicators">
    <div class="card text-white order-card" :class="color">
      <div class="card-block">
        <h2 class="d-flex justify-content-between">
          <span>{{ value }}</span>
        </h2>

        <p class="mb-0">{{ title }}: {{ total }}</p>
        <!-- <div class="m-b-0">
          <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script src="./indicators.js" />

<style scoped lang="scss" src="./indicators.scss" />
