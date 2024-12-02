<template>
  <b-row>
    <!-- Método de Recebimento -->
    <b-col md="6">
      <b-form-group label="Método de recebimento" label-for="method">
        <b-form-select name="method" id="method" v-model="localForm.method" :options="getMethods"></b-form-select>
      </b-form-group>
    </b-col>
    <!-- Fonte -->
    <b-col md="6">
      <b-form-group label="Fonte" label-for="source">
        <b-form-select name="source" id="source" v-model="source" :disabled="!localForm.method">
          <b-form-select-option :value="item.value" v-for="(item, index) in getSourcesAccount" :key="index">
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
  props: ['form', 'getSources', 'getMethods', 'getSourcesAccount'],
  mixins: [StrHelpMixin],
  data() {
    return {
      source: null,
      localForm: {
        source: null,
        method: null,
        amount: null,
        transaction_date: this.$moment().toDate(),
        source_id: null,
        source_type: null
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
    source: {
      handler(newVal) {
        this.updateSource(newVal);
      }
    },
    localForm: {
      handler(val) {
        EventBus.$emit('update-form-transaction', val);
      },
      deep: true
    },
    'localForm.method': {
      handler(newVal, oldVal) {
        if (oldVal != null && newVal != oldVal) {
          this.source = null;
          this.localForm.source_id = null;
          this.localForm.source_type = null;
        }
      }
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
      Object.keys(this.form).forEach((element) => {
        if (Object.prototype.hasOwnProperty.call(this.localForm, element)) {
          this.localForm[element] = this.form[element];
          if (element == 'source_id') {
            this.source = this.form[element];
          }
        }
      });
    },
    updateSource(id) {
      const sourceFiltered = this.getSourcesAccount.find((el) => el?.source_type === this.form.method && el.value === id);

      if (sourceFiltered?.value && sourceFiltered?.source_type) {
        this.localForm.source_id = sourceFiltered.value;
        this.localForm.source_type = sourceFiltered.source_type;
      }
    }
  }
};
</script>
