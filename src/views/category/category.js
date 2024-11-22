import { Table } from '@/components';

export default {
  name: 'Category',
  components: { Table },
  data() {
    return {
      tableData: [
        { id: 1, name: 'Moradia', icon: 'house-door' },
        { id: 2, name: 'Cartão de crédito', icon: 'credit-card' },
        { id: 3, name: 'Saúde', icon: 'heart' }
      ],
      tableFields: [
        { key: 'icon', label: '' },
        { key: 'name', label: '' }
      ],
      form: {
        name: ''
      },
      icons: [
        'credit-card',
        'cash-stack',
        'house-door',
        'truck',
        'calendar',
        'laptop',
        'heart',
        'people',
        'cash',
        'house',
        'envelope',
        'gift',
        'credit-card-2-back',
        'hand-thumbs-up',
        'bank',
        'battery-charging',
        'wifi',
        'box',
        'printer',
        'bell'
      ]
    };
  },

  methods: {
    handleRowClick(row) {
      console.log('Linha clicada:', row);
      // Lógica adicional ao clicar na linha
    }
  }
};
