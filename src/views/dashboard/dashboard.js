import { Indicators } from '@/components';

export default {
  name: 'Dashboard',

  components: {
    Indicators
  },

  data() {
    return {
      indicatorsArr: [
        {
          title: 'Contas em aberto',
          value: 'R$ 234,22',
          color: 'bg-success',
          icon: 'calendar-check'
        },
        {
          title: 'Contas a receber em atraso',
          value: 'R$ 234,22',
          color: 'bg-info',
          icon: 'calendar-x'
        },
        {
          title: 'Contas a pagar em aberto',
          value: 'R$ 34,22',
          color: 'bg-warning',
          icon: 'calendar-plus'
        },
        {
          title: 'Contas a pagar em atraso',
          value: 'R$ 34,22',
          color: 'bg-danger',
          icon: 'calendar-minus'
        }
      ],
      fields: ['Data', 'Categoria', 'Tipo', 'Valor'],
      items: [
        {
          Data: '01/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-down-circle-fill',
          Valor: 120.0
        },
        {
          Data: '02/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 33.2
        },
        {
          Data: '03/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-down-circle-fill',
          Valor: 16.4
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        },
        {
          Data: '04/01/2024',
          Categoria: 'Casa',
          Tipo: 'arrow-up-circle-fill',
          Valor: 1.5
        }
      ],
      perPage: 10,
      currentPage: 1,
      chartoptions: {
        chart: {
          width: 580,
          height: 550,
          type: 'pie'
        },
        labels: [
          'Alimentação',
          'Moradia',
          'Transporte',
          'Educação',
          'Lazer',
          'Saúde',
          'Investimentos',
          'Contas e Serviços',
          'Roupas e Acessórios',
          'Outros Gastos'
        ],
        legend: {
          position: 'bottom',
          horizontalAlign: 'center'
        }
      },

      series: [20, 25, 15, 10, 8, 7, 5, 5, 3, 2]
    };
  },
  computed: {
    rows() {
      return this.items.length;
    }
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    }
  }
};
