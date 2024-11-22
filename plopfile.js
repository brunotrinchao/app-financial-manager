module.exports = function (plop) {
  // Definindo o gerador para componentes
  plop.setGenerator('component', {
    description: 'Criar um novo componente Vue',

    // Pergunta o nome do componente ao usuário
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome do componente?'
      }
    ],

    // Lista de ações para criar arquivos e pastas
    actions: [
      {
        // Cria o diretório do componente e um arquivo Vue
        type: 'add',
        path: 'src/components/{{lowerCase name}}/index.vue',
        templateFile: 'plop-templates/Component.vue.hbs'
      },
      {
        // Cria um arquivo JS associado ao componente
        type: 'add',
        path: 'src/components/{{lowerCase name}}/{{camelCase name}}.js',
        templateFile: 'plop-templates/Component.js.hbs'
      },
      {
        // Cria o arquivo SCSS associado ao componente
        type: 'add',
        path: 'src/components/{{lowerCase name}}/{{camelCase name}}.scss',
        templateFile: 'plop-templates/Component.scss.hbs'
      },
      {
        type: 'modify',
        path: './src/components/index.js',
        pattern: /(\/\/ COMPONENT IMPORTS)/g,
        // eslint-disable-next-line quotes
        template: "import {{pascalCase name}} from './{{lowerCase name}}';\n$1"
      },
      {
        type: 'modify',
        path: './src/components/index.js',
        pattern: /(\/\/ COMPONENT EXPORTS)/g,
        // eslint-disable-next-line quotes
        template: '\t{{pascalCase name}},\n$1'
      }
    ]
  });

  plop.setGenerator('page', {
    description: 'Criar uma nova página Vue',

    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Qual o nome da página?'
      }
    ],

    actions: [
      {
        // Cria o diretório da página e um arquivo Vue
        type: 'add',
        path: 'src/views/{{lowerCase name}}/index.vue',
        templateFile: 'plop-templates/pages/Page.vue.hbs'
      },
      {
        // Cria um arquivo JS associado a página
        type: 'add',
        path: 'src/views/{{lowerCase name}}/{{camelCase name}}.js',
        templateFile: 'plop-templates/pages/Page.js.hbs'
      },
      {
        // Cria o arquivo SCSS associado a página
        type: 'add',
        path: 'src/views/{{lowerCase name}}/{{camelCase name}}.scss',
        templateFile: 'plop-templates/pages/Page.scss.hbs'
      },
      {
        // Cria o arquivo js associado a store da página
        type: 'add',
        path: 'src/store/{{lowerCase name}}/index.js',
        templateFile: 'plop-templates/pages/Store.js.hbs'
      },
      {
        // Cria o arquivo js associado a state do store
        type: 'add',
        path: 'src/store/{{lowerCase name}}/state.js',
        templateFile: 'plop-templates/pages/State.js.hbs'
      },
      {
        type: 'modify',
        path: './src/router/index.js',
        pattern: /(\/\/ PAGE IMPORTS)/g,
        // eslint-disable-next-line quotes
        template: "import {{pascalCase name}} from '@/views/{{lowerCase name}}';\n$1"
      },
      {
        type: 'modify',
        path: './src/router/index.js',
        pattern: /(\/\/ ADD ROUTE)/g,
        // eslint-disable-next-line quotes
        template: `
          {
            path: '/{{lowerCase name}}',
            name: '{{lowerCase name}}',
            component: {{pascalCase name}},
            meta: { title: '{{sentenceCase name}}', icon: 'columns-gap', showDatePicker: true }
          },\n$1
        `
      }
    ]
  });
};
