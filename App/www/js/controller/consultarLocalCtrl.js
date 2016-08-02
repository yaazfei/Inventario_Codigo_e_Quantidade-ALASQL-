angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio) {

  console.log('Entrou no controller de Consultar Local ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');

  Scopes.blankItem($scope);

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();

  };







/*/*************************************************************************************************************/
////// Busca o código do local selecionado

  $scope.buscaLocal = function(dados) {

    if (dados === undefined || dados === "") {
      PopUps.erroBranco();

    } else {


      // listarLocais(dados);
      Scopes.setLocal(dados);

      alert('entrou no buscaLocal, vai fazer o alaSQL');



      // var alasql = require('alasql');
      // alert('passou do require: ' + alasql);

      // PROMISSE ASYNC?
      localCod = dados.COD_LOCAL;
      alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
        .then(function(res) {

          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          alert('Encontrou o local com o alaSQL');
          console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
          Scopes.setLocal(res[0]);


          if (window.cordova) { //Só entra por device

            //CriarDiretorio.processar($cordovaFile, dados);
            //alert("Passou do CriarDiretorio.processar");
          }
          alert('saiu do alaSQL');
          $state.go('app.consultarProduto');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Local não encontrado!");
        });


    }
  };









  /*/*************************************************************************************************************/
  //////// **************************************** LISTA PELO ALASQL (DANDO DUAS VOLTAS)


  function listarLocais(dados) {


    // ESTÁ DANDO DUAS VOLTAS NO CONTROLLER (MELHORAR)
    localCod = dados.COD_LOCAL;
     alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?' , [localCod],function(data){

                  console.log('Dados: ' + dados.COD_LOCAL + ' ' + dados.DESC_LOCAL);
                  console.log('Data do ALQSQL: ' + data[0] + ' ' + data[0].COD_LOCAL + ' ' + data[0].DESC_LOCAL);
                  Scopes.setLocal(data[0]);

              });

    }


  ////// TESTE PARA NÃO DAR DUAS VOLTAS (NÃO FUNCIONANDO)


  // var promisse;
  // localCod = dados.COD_LOCAL;
  // // $scope.locais = [];
  //  promisse = alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?' , [localCod]);
  //  promisse.then(function(response) {
  //    var data = response.data;
  //   //  var locais = $scope.locais;
  //   //console.log('$scope.locais: ' + $scope.locais);
  //
  //   //console.log('Dados: ' + dados.COD_LOCAL + ' ' + dados.DESC_LOCAL);
  //   console.log('Data do ALQSQL: ' + data[0] + ' ' + data[0].COD_LOCAL + ' ' + data[0].DESC_LOCAL);
  //   Scopes.setLocal(data[0]);
  //
  // });
  //
  // }







  //////// ************************************************ LISTA EM JSON
  // function listarLocais() {
  //   var promisse;
  //   $scope.locais = [];
  //   promisse = $http.get('js/locais.json');
  //   promisse.then(function(response) {
  //     $scope.locais = response.data;
  //     var locais = $scope.locais;
  //     console.log('$scope.locais: ' + $scope.locais);
  // });


  // }


  /*/*************************************************************************************************************/



});
