<template>
  <div class="cpdaterangepicker">
    <b-form inline class="d-flex justify-content-between">
      <!-- <b-form-datepicker
        name="startDate"
        placeholder="De"
        v-model="form.startDate"
        :locale="locale"
        :date-format-options="dateFormatOptions"
        hide-header
        :label-next-month="label.NextMonth"
        :label-next-year="label.NextYear"
        :label-no-date-selected="label.NoDateSelected"
        :label-prev-month="label.PrevMonth"
        :label-prev-year="label.PrevYear"
        :label-selected="label.Selected"
        :label-today="label.Today"
        :label-current-month="label.CurrentMonth"
        :label-help="label.Help"
        :max="form.endDate"
        size="lg"
      />
      <span class="ml-3 mr-3">até</span>
      <b-form-datepicker
        name="endDate"
        placeholder="Até"
        v-model="form.endDate"
        :locale="locale"
        :date-format-options="dateFormatOptions"
        hide-header
        :label-next-month="label.NextMonth"
        :label-next-year="label.NextYear"
        :label-no-date-selected="label.NoDateSelected"
        :label-prev-month="label.PrevMonth"
        :label-prev-year="label.PrevYear"
        :label-selected="label.Selected"
        :label-today="label.Today"
        :label-current-month="label.CurrentMonth"
        :label-help="label.Help"
        :min="form.startDate"
        size="lg"
      /> -->
    </b-form>
    <!-- <date-range-picker v-model="dateRange" @update="updateValues" /> -->
    <date-range-picker
      ref="picker"
      :locale-data="locale"
      :timePicker="false"
      :showDropdowns="true"
      v-model="dateRange"
      :ranges="objRanges"
      @update="updateValues"
    >
      <template v-slot:input="picker" style="min-width: 350px">{{ formatDateRange(picker) }}</template>
    </date-range-picker>
  </div>
</template>

<script src="./daterangepicker.js" />

<style scoped src="./daterangepicker.scss" lang="scss" />

<style>
.reportrange-text {
  height: 100%;
  border: 0 !important;
  background-color: transparent !important;
}
</style>
