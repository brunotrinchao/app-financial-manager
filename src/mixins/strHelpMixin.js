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
        debit_card: 'Cartão de débito',
        pix: 'PIX',
        account: 'Conta',
        daily: 'Diariamente',
        weekly: 'Semanalmente',
        monthly: 'Mensalmente',
        yearly: 'Anualmente',
        income: 'Entrada',
        expense: 'Saída'
      };

      return translations[str] || 'Método desconhecido';
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
    }
  }
};
