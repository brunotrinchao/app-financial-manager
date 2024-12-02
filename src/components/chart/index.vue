<template>
  <div class="Chart">
    <apexchart :type="type" :options="getOptions" :series="getSeries"></apexchart>
  </div>
</template>

<script src="./chart.js" />

<style scoped lang="scss" src="./chart.scss" />
