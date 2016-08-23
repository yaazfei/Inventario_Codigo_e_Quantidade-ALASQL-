angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio, buscaArquivos, $cordovaSQLite) {

  console.log('Entrou no controller de Consultar Local ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');

  Scopes.blankItem($scope);

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();

  };






/*/*************************************************************************************************************/

//////////////////////////////////////////////////
////// BUSCAR O CÓDIGO DO LOCAL SELECIONADO //////
/////////////////////////////////////////////////

  $scope.buscaLocal = function(dados) {

    if (dados === undefined || dados === "") {
      PopUps.erroBranco();

    } else {


      // listarLocais(dados);
      Scopes.setLocal(dados);
      console.log('entrou no buscaLocal, vai fazer o SQLite');


      // var dir = "files/Lista_de_Locais.xlsx";
      //alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ WHERE COD_LOCAL == ?', [dir, dados.COD_LOCAL])

if (window.cordova) { //Só entra por device
      $cordovaSQLite.execute(db, 'SELECT * FROM local WHERE COD_LOCAL == ? ',[dados.COD_LOCAL])
        .then(function(res) {

          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          console.log('Encontrou o local com o ALASQL');

          // console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
          // Scopes.setLocal(res[0]);

          console.log('Resultado do ALQSQL: ' +   res.rows.item(0) + ' ' +   res.rows.item(0).COD_LOCAL + ' ' + res.rows.item(0).DESC_LOCAL);
          Scopes.setLocal(res[0]);

          console.log('saiu do alaSQL');
          $state.go('app.consultarProduto');


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Local não encontrado!");
        });




      } else {  // TESTE PARA BROWSER

         console.log (" >>>>>>>>>>   Não está em device. Vai testar com o arquivo interno e com > ALaSQL < ");

         var dir = "files/Lista_de_Locais.xlsx";
         alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ WHERE COD_LOCAL == ?', [dir, dados.COD_LOCAL])
           .then(function(res) {

             // ACHOU O LOCAL E PEGOU O PRIMEIRO
             console.log('Encontrou o local com o ALASQL');

             console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
             Scopes.setLocal(res[0]);

             console.log('saiu do alaSQL');
             $state.go('app.consultarProduto');


           }).catch(function(err) { // NÃO ENCONTROU O LOCAL

             PopUps.erroConsultar("Local não encontrado!");
           });

      }
    }
  };









  /*/*************************************************************************************************************/
  //////// **************************************** LISTA PELO ALASQL (DANDO DUAS VOLTAS)


  // function listarLocais(dados) {
  //
  //
  //   // ESTÁ DANDO DUAS VOLTAS NO CONTROLLER (MELHORAR)
  //   localCod = dados.COD_LOCAL;
  //    alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?' , [localCod],function(data){
  //
  //                 console.log('Dados: ' + dados.COD_LOCAL + ' ' + dados.DESC_LOCAL);
  //                 console.log('Data do ALQSQL: ' + data[0] + ' ' + data[0].COD_LOCAL + ' ' + data[0].DESC_LOCAL);
  //                 Scopes.setLocal(data[0]);
  //
  //             });
  //
  //   }


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
