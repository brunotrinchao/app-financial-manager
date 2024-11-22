<template>
  <div class="Titlebar mb-4">
    <div class="row py-3">
      <div class="col-md-12 col-lg-4">
        <h4>
          <b-icon :icon="$route.meta.icon" />
          {{ $route.meta.title }}
        </h4>
      </div>
      <div class="col-md-12 col-lg-4 text-center" v-if="dateRangePickerShow">
        <div class="alert alert-warning" role="alert">
          <DateRangePicker ref="dateRangePicker" />
        </div>
      </div>
      <div class="col-md-12 col-lg-4 text-right"></div>
    </div>
  </div>
</template>

<script src="./titlebar.js" />

<style lang="scss" scoped src="./titlebar.scss" />
