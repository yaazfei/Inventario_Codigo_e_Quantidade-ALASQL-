//////////////////////////////////////////////////////////**********************************************************************************************************//
//////////////       TESTE DE CONSULTAR PRODUTO SEM LISTA

angular.module('starter').controller('listaLocaisCtrl', function($scope, $state, $cordovaFile, $stateParams, $q, $ionicPopup, $timeout, $http, $ionicScrollDelegate, filterFilter, $location, Scopes, PopUps, CriarDiretorio, FormatarCsv, buscaArquivos) {

  console.log('Entrou no controller de Consultar Produto TESTE ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');

  $scope.teste = {
    COD_LOCAL: '000053',
    DESC_LOCAL: 'GERENCIAMENTO DE CONTROLER DE HUEHUEBR'
  };


  /*/ Escolher um Bem /*/
  $scope.editarBem = function(bem, dados) {
    // alert('Entrou no editarBem');
    if (bem.COD_LOCAL === dados.COD_LOCAL) {

    } else {

      console.log('Entrou no editarBem, vai fazer o alaSQL');

      ///////////////////// PARA COMPARAR O COD_LOCAL DO BEM COM O COD_LOCAL DO LOCAL
      localCod = bem.COD_LOCAL;
      alasql.promise('SELECT DESC_LOCAL FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
        .then(function(res) {

          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          console.log('Encontrou o local com o alaSQL');
          console.log('Resultado do ALQSQL: ' + res[0]);
          bem.DESC_LOCAL = res[0].DESC_LOCAL;


          if (window.cordova) { //Só entra por device

            //CriarDiretorio.processar($cordovaFile, dados);
            //alert("Passou do CriarDiretorio.processar");
          }


          Scopes.setBem(bem);
          console.log('Bem: ' + bem);

          $state.go('app.editarProduto');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Bem não encontrado!");
        });

    }
  };


  //////////****** CONTROLLER DA PÁGINA SEM LISTA (INCOMPLETO)

  $scope.buscaBem = function(bem) { //funcionando


    //dir = "files/Lista_de_Bens.xlsx";
    //dir = "/Android/data/com.ionicframework.myaoo100387/Lista_de_Bens.csv";
    $scope.teste4();

    var arquivoLido = Scopes.getArquivo();

    if (arquivoLido != "nd") {

      dir = FormatarCsv.CSV2JSON(arquivoLido);

      // var dir = JSON.parse(arquivoLido);
      console.log(dir);

      alasql.promise('SELECT * FROM ? \ WHERE CHAPA == ?', [dir, bem.COD_BEM])
        .then(function(res) {

          //// ACHOU O LOCAL E PEGOU O PRIMEIRO
          //alert('Encontrou o Bem com o alaSQL');

          console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
          Scopes.setBem(res[0]);
          $scope.bemEncontrado = res;
          // $scope.bem = res[0];


          $scope.hideBem = false;
          //return $scope.hideBem;


          console.log('Bem foi encontrado.');
          $state.go('app.listaLocais');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Bem não encontrado!");
        });

    } else { //Se arquivoLido = "nd"


      dir = "js/Lista_de_Bens.xlsx";
      alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [dir, bem.COD_BEM])
        .then(function(res) {

          //// ACHOU O LOCAL E PEGOU O PRIMEIRO
          //alert('Encontrou o Bem com o alaSQL');

          console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
          Scopes.setBem(res[0]);
          $scope.bemEncontrado = res;
          // $scope.bem = res[0];


          $scope.hideBem = false;
          //return $scope.hideBem;


          console.log('Bem foi encontrado.');
          $state.go('app.listaLocais');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Bem não encontrado!");
        });
    }
  };



  $scope.testeCriaArquivo = function() {

    bem = {
      COD_BEM: "000000023",
      DESC_BEM: "Blau blau",
      CHAPA: "0000000062",
      COD_LOCAL: "000093"
    };


    dados = {
      COD_LOCAL: "000053",
      DESC_LOCAL: "Blau Local"
    };

    var arquivoBens = Scopes.getArquivo();


    CriarDiretorio.processar($cordovaFile, arquivoBens);



    //
    // /*/**********************/ // Escrevendo XLSX com o js-xlsx
    //
    //
    // var writeXLSX = function(workbook) {
    //   /* bookType can be 'xlsx' or 'xlsm' or 'xlsb' */
    //   var wopts = {
    //     bookType: 'xlsx',
    //     bookSST: false,
    //     type: 'binary'
    //   };
    //
    //   var wbout = XLSX.write(workbook, wopts);
    //   //console.log(wbout);
    //   CriarDiretorio.processar($cordovaFile, wbout);
    //
    //   function s2ab(s) {
    //     var buf = new ArrayBuffer(s.length);
    //     var view = new Uint8Array(buf);
    //     for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    //
    //
    //     console.log(buf);
    //     return buf;
    //   }
    //   /* the saveAs call downloads a file on the local machine */
    //   // saveAs(new Blob([s2ab(wbout)],{type:""}), "test.xlsx")
    //
    // };




    // ******************************************************************************* //

    dir = "files/Lista_de_Bens.xlsx";
    //dir = "/storage/emulated/0/Teste1/Lista_de_Bens.xlsx";
    var url = dir;
    var oReq = new XMLHttpRequest();
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";

    oReq.onload = function(e) {
      var arraybuffer = oReq.response;

      /* convert data to binary string */
      var data = new Uint8Array(arraybuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      /* Call XLSX */
      var workbook = XLSX.read(bstr, {
        type: "binary"
      });

      /* DO SOMETHING WITH workbook HERE */

      this.to_json = function(workbook) {
        var result = {};
        var sheetName = '';
        var roa = '';
        workbook.SheetNames.forEach(function(sheetName) {
          var roa = XLS.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
          if (roa.length > 0) {
            result[sheetName] = roa;
          }
          Scopes.setArquivo(roa);
          Scopes.setArquivoXLSX(result);
          $scope.workbook = workbook;

        });

        // console.log(roa);
        // console.log(sheetName);
        // var teste1 = Scopes.getArquivo();
        // console.log(result[[]]);

        writeXLSX($scope.workbook);
        return result;

      };
      this.to_json(workbook);


    };
    oReq.send();


    /// ******************************************************************************* //


  };


  $scope.teste2 = function() { //TESTE PARA CRIAR UM NOVO ARQUIVO COM O OBJETO EDITADO SEM USAR UPDATE, DELETE E INSERT DO ALASQL

    bem = {
      COD_BEM: "0000000295",

      CHAPA: "00518",
    };

    dados = {
      COD_LOCAL: "000053",
      DESC_LOCAL: "Blau Local"
    };
    var arquivoBens = Scopes.getArquivo();
    //arquivoBens = FormatarCsv.csvTojs(arquivoBens);
    alasql.promise('SELECT * FROM ? WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
      .then(function(res2) {

        console.log('Resultados encontrados: ' + res2.length);
        // if (res2.length > 1){
        //   resultadosParecidos = res2;
        // }
        alasql.promise('SELECT * FROM ? WHERE CHAPA !== ?', [arquivoBens, bem.CHAPA])
          .then(function(res) {
            console.log('Resultados encontrados: ' + res.length);
            bem.COD_LOCAL = dados.COD_LOCAL;
            res.push(bem);
            $scope.bemEncontrado = res;

            if (res2.length > 1) {
              alasql.promise('SELECT * FROM ? WHERE COD_BEM !== ?', [res2, bem.COD_BEM])
                .then(function(restantes) {

                  console.log('Resultados encontrados: ' + res.length);
                  //res.push(restantes);
                  var resTotal = res.concat(restantes);
                  $scope.bemEncontrado = resTotal;
                  console.log('Bem foi encontrado.');

                }).catch(function(err) { // NÃO ENCONTROU O LOCAL

                  console.log(err);
                });
            }
          }).catch(function(err) { // NÃO ENCONTROU O LOCAL

            console.log(err);
          });

      }).catch(function(err) { // NÃO ENCONTROU O LOCAL

        console.log(err);
      });
  };


  $scope.teste4 = function(res) {

    bem = {
      CHAPA: "00518"
    };

    dados = {
      COD_LOCAL: "000053",
      DESC_LOCAL: "Blau Local"
    };


    var arquivoBens = Scopes.getArquivo();
    dados = FormatarCsv.csvTojs(arquivoBens);
    // alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA == ?', [arquivoBens, bem.CHAPA])
    alasql.promise('SELECT * FROM ? \ WHERE CHAPA == ?', [dados, bem.CHAPA])
      .then(function(res) {

        console.log('Resultados encontrados: ' + res.length);
        $scope.bemEncontrado = res;
        console.log('Bem foi encontrado.');

      }).catch(function(err) { // NÃO ENCONTROU O LOCAL

        PopUps.erroConsultar("Bem não encontrado!");
      });
  };
  $scope.teste5 = function() {
  };

  $scope.teste3 = function(res) { //TESTE PARA CRIAR UM NOVO ARQUIVO COM O OBJETO EDITADO SEM USAR UPDATE, DELETE E INSERT DO ALASQL (BAIXANDO)
    bem = {
      COD_BEM: "000000023",
      DESC_BEM: "Blau blau",
      CHAPA: "000180",
      COD_LOCAL: "000093"
    };


    dados = {
      COD_LOCAL: "000053",
      DESC_LOCAL: "Blau Local"
    };
  };

  $scope.teste1 = function() {
    bem = {
      COD_BEM: "000000023",
      DESC_BEM: "Blau blau",
      CHAPA: "000180",
      COD_LOCAL: "000093"
    };


    dados = {
      COD_LOCAL: "000053",
      DESC_LOCAL: "Blau Local"
    };
  };

  // ******************************************************************************* //


  console.log("Passou uma vez. Esperando o alaSQL. ");
});
