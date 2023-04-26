/**
 AULA 5

 DECIDI QUEBRAR OS ARQUIVOS DAS AULAS PARA FACILITAR, INSTALEI NOVAMENTE OS ARQUIVOS DO node_modules

 PASTA src > VAI GUARDAR TODO ARQUIVO FONTE QUE VAMOS TER, PASTA ONDE O PROGRAMADOR VAI TRABALHAR

 NESSE PROJETO VAMOS USAR O PRÉ-PROCESSADOR LESS, PORTANTO PRECISAMOS INSTALAR O PLUGIN NO MODULO DEV

 VAMOS CRIAR O index.html NA PASTA SRC, DENTRO DELA OUTRAS 2 PASTAS > STYLES E SCRIPTS
 DENTRO DA STYLES TEMOS QUE CRIAR O main.less

 APÓS ISSO TEMOS QUE IR NO gruntfile.js E CONFIGURAR OS CAMINHOS, PODEMOS VERIFICAR QUE O LESS TRABALHA COM 2 AMBIENTES O DE DESENVOLVIMENTO(PROGRAMADOR-MAQUINA/LOCAL) E O DE PRODUÇÃO(CLIENTE-INTERNET)

 NO ARQUIVO gruntfile.js TEMOS OS REGISTROS DE TASK TEMOS QUE INCLUIR EMBAIXO DO DEFAULT O SEGUINTE

  grunt.registerTask("build", ["less"]);

  ESSE TERMO build É O TERMO QUE SE USA PARA PUBLICAR NOSSA APLICAÇÃO NO AMBIENTE PRODUTIVO, ESTAMOS PUBLICANDO NOSSOS TRABALHOS NA VERCEL, DENTRO DO PARAMETRO DESSA FUNÇÃO registerTask()
  TEREMOS O SEGUINTE:

    grunt.registerTask("default", ["less:development"]);
    grunt.registerTask("build", ["less:production"]);
};

AGORA TEMOS QUE CONFIGURAR ESSAS ALTERAÇÕES NO package.json
DE:
 "scripts": {
    "grunt": "grunt",
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  PARA:
   "scripts": {
    "grunt": "grunt",
    "build": "grunt build"
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  PORTANTO A TASK DEFAUT É: "grunt": "grunt",
  E A TASK BUILD É: "build": "grunt build"

  AGORA PRECISAMOS ALTERAR O CAMINHO DOS ARQUIVOS, VER CAMINHOS CRIADOS

  RODAR npm run grunt
CRIOU A PASTA dev/styles/main.css

AGORA TEMOS QUE RODAR npm run build
CRIOU A PASTA dist/styles/main.min.css


ATENÇÃO!!! TEMOS QUE LINKAR O ARQUIVO CSS INICIANDO COM ../ PORQUE O ARQUIVO index.html ESTA DENTRO DA PASTA src PORTANTO TEMOS QUE VOLTAR PARA A RAIZ DO SITE

AULA 6 - OBSERVANDO MUDANÇAS COM O GRUNT

O GRUNT ACOMPANHAR AS AÇÕES DO NOSSO ARQUIVO FONT, PRECISAMOS INSLATAR UM PUGLIN
npm i --save-dev grunt-contrib-watch

TEMOS QUE IR NO gruntfile.js QUE REALIZAR O CARREGAMENTO DO PACOTE
grunt.loadNpmTasks('grunt-contrib-watch');

DEPOIS NO initConfig  TEMOS QUE REALIZAR A CONFIGURAÇÃO DELE, LOGO APÓS O BLOCO DO less

watch:{
  less:{
    files:['src/styles/** / *.less'],
    tasks:['less:development']
  }
}
COLOCAMOS ** PARA ACESSAR QQ PASTA QUE ESTEJA DENTRO DE styles  E DEPOIS QQ ARQUIVO DENTRO DESSAS PASTAS QUE TIVER .less, ESTA COM ESPAAÇO MAS É SEM ESPAÇO

DEPOIS EM:
  grunt.registerTask("default", ["less:development"]);

  PODEMOS TROCAR PARA:
    grunt.registerTask("default", ["watch"]);

    AGORA PODEMOS EXECUTAR npm run grunt DEVE APARECER:
    Running "watch" task
    Waiting...

    JÁ ESTA ACOMPANHANDO, PORTANTO AGORA NÃO PRECISAMOS MAIS FICAR USANDO O mpn run grunt TODA VEZ QUE TIVER UMA ALTERAÇÃO

    
    AULA 7 COMPRIMINDO HTML COM O GRUNT

    TEMOS UM PROBLEMA COM O LINK DO CSS QUE ESTA APONTANDO SOMENTE PARA DEV, TEMOS QUE REALIZAR UM APONTANDO PARA DIST, PARA ISSO VAMOS USAR UM PLUGIN DO GRUNT:
    npm i --save-dev grunt-replace

    VAMOS CARREGAR ESSE PLUGON NO GRUNTFILE.JS
    grunt.loadNpmTasks('grunt-replace')

    VAMOS REALIZAR A CONFIGURAÇÃO DO PLUGIN APÓS watch
    replace:{
      dev:{
        options:{
          patterns:[
            {
              match:"ENDEREÇO_DO_CSS",
              replacement:"./styles/main.css"
            }
          ]
        },
        files:[
          {
            expand:true,
            flatte:true,
            src:['src/index.html'],
            dest: 'dev/'
          }
        ]
      }
    }
    
    TEMOS QUE RODAR 
    npm run grunt replace:dev

    UM NOVO ARQUIVO index.html DEVE SER CRIADO NA PASTA dev

    AGORA VAMOS BAIXAR UM PUTRO PLUGIN npm i --sade-dev grunt-contrib-htmlmin

    TEMOS QUE CARREGAR O PLUGIN
    grunt.loadNpmTasks('grunt-contrib-htmlmin')

    A CONFIGURAÇÃO DEPOIS DO REPLACE
    htmlmin:{
      dist:{
        options:{
          removeComments:true,
          collapseWhitespace: true
        },
        files:{
          'prebuild/index.html': 'src/index.html'
        }
      }
    }

    UMA PASTA PREBUILD DEVE SER CRIADA, COM UM ARQUIVO index.html QUE ESTA MINIFICADO TODO EM UMA LINHA SOMENTE

    PARA VER SE DEU CERTO TODA A CONFIGURAÇÃO TEMOS QUE VERIFICAR SE O index.html DA PASTA DIST ESTÁ FUNCIONANDO CORRETAMENTE COM O CSS

    COMO TODO QUE FIZEMOS ACABOU CRIANDO UMA PASTA TEMPORÁRIA TEMOS QUE ESTALAR UM PLUGIN PARA APAGAR ESSES ARQUIVOS
    npm i --save-dev grunt-contrib-clean

    CARREGAR O PLUGIN
  grunt.loadNpmTasks("grunt-contrib-clean");

  APÓS ISSO TEMOS QUE CONFIGURA-LO
    clean:['prebuild']

    ADICIONAR A TAREFA NO build
    grunt.registerTask("default", ["watch"]);
  grunt.registerTask("build", [
    "less:production",
    "htmlmin:dist",
    "replace:dist",
    "clean",
  ]);
};


AULA 8 - JAVASCRIPT MATH

PARA GERAR UM NUMERO ALEATÓTIO NO JS USAMOS math.random(), QUE VAI GERAR UMA NÚMERO ALEATÓRIO ENTRE 0 E 1, NO NOSSO PROJETO PRECISAMOS PEGAR O NUMERO DIGITADO PELO USUÁRIO COMO NUMERO MÁXIMO E MULTIPLICAR PELO NUMERO GERADO AUTOMATICAMENTE

DENTRO SRC>SCRIPTS VAMOS CRIAR UM ARQUIVO main.js TEMOS QUE CARREGAR O ARQUIVO ARQUIVO JS DEPOIS QUE TODOS OS OUTROS ARQUIVOS DE ESTILO FOREM CARREGADOS PORTANTO DENTRO DE main.js TEMOS:
document.addEventListener('DOMContentLoaded', function())

TEMOS QUE PEGAR O FORMULÁRIO DO HATML E ADICIONAR UM EVENTO DE SUBMIT A ELE, PORTANTO VAMOS EM SRC no index.html E ADICIONAMOS UM ID A TAG FORM

document.addEventListener('DOMContentLoaded', function(){
  document.getElementById('form-sorteador').addEventListener('submit', function(){
    let numeroMaximo = document.getElementById('numero-maximo');
    numeroMaximo = parseInt(numeroMaximo);
    let numeroAleatorio = Math.random()*numeroMaximo;
    alert(numeroAleatorio)
  })
})


AGORA PRECISAMOS FAZER COM QUE O HTML IMPORT ESSE ARQUIVO, VAMOS NO GRUNTFILE.JS DENTRO DO replace TEMOS:

 replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDEREÇO_DO_CSS",
              replacement: "./styles/main.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            {
              match: "ENDEREÇO_DO_CSS",
              replacement: "./styles/main.min.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"],
            dest: "dist/",
          },
        ],
      },
    },

    PARA

     replace: {
      dev: {
        options: {
          patterns: [
            {
              match: "ENDEREÇO_DO_CSS",
              replacement: "./styles/main.css",
            },
            {
              match: "ENDEREÇO_DO_JS",
              replacement: "../src/scripts/main.js",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["src/index.html"],
            dest: "dev/",
          },
        ],
      },
      dist: {
        options: {
          patterns: [
            {
              match: "ENDEREÇO_DO_CSS",
              replacement: "./styles/main.min.css",
            },
          ],
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ["prebuild/index.html"],
            dest: "dist/",
          },
        ],
      },
    },

    AGORA PRECISAMOS INSERIR O ENDEREÇO_DO_JS NO HTML

    <script src="@@ENDEREÇO_DO_JS"></script>

    AGORA PRECISAMOS DAR UM FEEDBACK MAIN BONITO PARA O USUARIO
    APOS O MAIN VAMO:
    <div class="resultado">
    O némuro sorteado foi:<span id="resultado-valor"></span>
    </div>

    APÓS ISSO SUBSTITUIMOS O ALERT POR:
    document.getElemntById('resultado-valor').innerText

    AGORA PRECISAMOS ARREDONDAR O NÚMERO
    Math.round()

 AULA 9 - COMPRIMINDO JS COM O GRUNT

 NO ARQUIVO gruntfile.js TEMOS QUE REALIZAR UMA CONFIGURAÇÃO PARA QUE O ARQUIVO main.js CHEGUE NA PASTA DIST
 PRIMEIRO VAMOS INSTALAR UM PLUGIN
 npm i --save-dev grunt-contrib-uglify

 DEPOIS VAMOS CARREGAR O PLUGIN NO gruntfile.js
  grunt.loadNpmTasks("grunt-contrib-uglify");

DEPOIS TEMOS QUE REALIZAR A CONFIGURAÇÃO DELE APÓS O clean
uglify:{
      target:{
        files:{
          'dist/scripts/main.min.js': 'scr/scripts/main.js'
        }
      }
    }

AGORA TEMOS QUE ADICIONAR A EXECUÇÃO DO uglify
grunt.registerTask("build", [
    "less:production",
    "htmlmin:dist",
    "replace:dist",
    "clean",
    "uglify",
  ]);

DEPOIS EXECUTAR npm run grunt build



VAMOS CRIAR O ARQUIVO .gitignore E COLOCAR DENTRO AS PASTAS:
dev
dist
node_modules
    */
