import Swal from 'sweetalert2';

export default {
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    translate(str) {
      if (typeof str !== 'string') {
        return 'Método inválido';
      }

      const translations = {
        cash: 'Dinheiro',
        credit_card: 'Cartão de crédito',
        creditCard: 'Cartão de crédito',
        debit_card: 'Cartão de débito',
        pix: 'PIX',
        account: 'Conta',
        daily: 'Diariamente',
        weekly: 'Semanalmente',
        monthly: 'Mensalmente',
        yearly: 'Anualmente',
        income: 'Entrada',
        expense: 'Saída',
        transfer: 'Transferência',
        pending: 'Pendente',
        scheduled: 'Agendado',
        paid: 'Pago',
        canceled: 'Cancelado',
        overdue: 'Vencido'
      };

      return translations[str] || str;
    },
    validateFields(form, fields) {
      const errors = [];

      fields.forEach((field) => {
        const { model, name, condition = true } = field;
        if (condition && (!form[model] || form[model] === '' || form[model] === null)) {
          errors.push(`<b>${name}</b> é obrigatório.`);
        }
      });

      if (errors.length > 0) {
        Swal.fire({
          html: errors.join('<br/>'),
          icon: 'error',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: false
        });
        // this.$bvToast.toast(errors.join('<\n>'), {
        //   title: 'Erro de Validação',
        //   variant: 'danger',
        //   solid: true,
        //   toaster: 'b-toaster-top-right'
        // });
        return false;
      }

      return true;
    },
    abbreviateText: (text, maxLength) => {
      // Verifica se a string é menor ou igual ao tamanho máximo permitido
      if (text && text.length <= maxLength) {
        return text; // Retorna o texto original se não precisar de abreviação
      }

      // Calcula o tamanho máximo da parte visível da string
      const visibleLength = maxLength - 3; // 3 caracteres para "..."

      // Corta a string até o tamanho visível e adiciona "..."
      return text.slice(0, visibleLength) + '...';
    },
    getInitials: (fullName) => {
      const names = fullName.trim().split(' ');

      if (names.length === 1) {
        // Retorna as duas primeiras letras do único nome
        return names[0].slice(0, 2).toUpperCase();
      }

      // Retorna a inicial do primeiro nome e do último nome
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    },
    getIcon(folder, text) {
      let icons;
      try {
        // Tenta carregar a imagem SVG com base no método
        icons = require(`@/assets/imgs/${folder}/${text}.svg`);
      } catch (error) {
        // Se a imagem não for encontrada, usa o texto do método traduzido
        return null;
      }
      return icons;
    },
    showLegendas() {
      return [
        { name: 'Entrada', icon: this.getIcon('type', 'expense') },
        { name: 'Saída', icon: this.getIcon('type', 'income') },
        { name: 'Transferência', icon: this.getIcon('type', 'transfer') },
        { name: 'Conta', icon: this.getIcon('methods', 'account') },
        { name: 'Cartão de crédito', icon: this.getIcon('methods', 'credit_card') },
        { name: 'Cartão de débito', icon: this.getIcon('methods', 'debit_card') }
      ];
    }
  }
};
