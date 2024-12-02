<template>
  <b-row>
    <!-- Da Conta -->
    <b-col md="6">
      <b-form-group label="Da conta" label-for="from-account">
        <b-form-select name="from-account" id="from-account" v-model="localForm.from_account">
          <b-form-select-option :value="{ id: item.value, type: item.source_type }" v-for="(item, index) in getSourcesAccount" :key="index">
            {{ item.type }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
    </b-col>

    <!-- Para Conta -->
    <b-col md="6">
      <b-form-group label="Para conta" label-for="to-account">
        <b-form-select name="to-account" id="to-account" v-model="localForm.to_account">
          <b-form-select-option :value="{ id: item.value, type: item.source_type }" v-for="(item, index) in getSourcesAccount" :key="index">
            {{ item.type }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
    </b-col>

    <!-- Valor -->
    <b-col md="6">
      <b-form-group label="Valor" label-for="amount">
        <currency-input class="form-control" v-model="localForm.amount" />
      </b-form-group>
    </b-col>

    <!-- Data -->
    <b-col md="6">
      <b-form-group label="Data da transação" label-for="transaction-date">
        <b-form-datepicker
          id="transaction_date"
          name="transaction_date"
          v-model="localForm.transaction_date"
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
          :min="form.transactionDate"
        />
      </b-form-group>
    </b-col>
  </b-row>
</template>

<script>
import { EventBus } from '@/event-bus';
import StrHelpMixin from '@/mixins/strHelpMixin.js';
export default {
  props: ['form', 'getSourcesAccount'],
  mixins: [StrHelpMixin],
  data() {
    return {
      source: { id: null, type: null },
      localForm: {
        from_account: null,
        to_account: null,
        amount: 1,
        method: 'account',
        transaction_date: this.form.transaction_date
      },
      locale: 'pt-BR',
      hideHeader: true,
      dateFormatOptions: { year: 'numeric', month: 'numeric', day: 'numeric' },
      label: {
        NextMonth: 'Próximo mês',
        NextYear: 'Próximo ano',
        NoDateSelected: 'Data não selecionada',
        PrevMonth: 'Mês anterior',
        PrevYear: 'Ano anterior',
        Selected: 'Selecionado',
        Today: 'Hoje',
        CurrentMonth: 'Mês atual',
        Help: 'Use as teclas para navegar pelas datas do calendário'
      }
    };
  },
  watch: {
    localForm: {
      handler() {
        EventBus.$emit('update-form-transaction', this.localForm);
      },
      deep: true
    }
  },
  beforeMount() {
    this.fillForm();
  },
  methods: {
    getFormData() {
      // Retorna os dados do formulário local
      return this.localForm;
    },
    fillForm() {
      if (this.form.id) {
        Object.keys(this.form).forEach((element) => {
          if (Object.prototype.hasOwnProperty.call(this.localForm, element)) {
            this.localForm[element] = this.form[element];
            if (element == 'source_id') {
              this.source.id = this.form[element];
            }
            if (element == 'source_type') {
              this.source.type = this.form[element];
            }
          }
        });
      }
    }
  }
};
</script>
