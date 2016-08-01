angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio) {

console.log('Entrou no controller de Consultar Local ---------------------------------------------------------');
console.log('Códigos de locais válidos: 000053, 000039, 000005');

Scopes.blankItem($scope);

$scope.fecharApp = function() {
  console.log('Apertou o fechar');
  PopUps.showConfirm();

};






  $scope.buscaLocal = function(dados) {

  if (dados.COD_LOCAL === undefined || dados.COD_LOCAL === "") {
    PopUps.erroBranco();

  } else {

  listarLocais(dados);



    if (window.cordova) {

      //CriarDiretorio.processar($cordovaFile, dados);
      //alert("Passou do CriarDiretorio.processar");
    }

    $state.go('app.consultarProduto');


  }
};













  /*/*************************************************************************************************************/
//////// **************************************** LISTA PELO ALASQL


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


//  var promisse;
// $scope.locais = [];
//  promisse = alasql('select COD_LOCAL, DESC_LOCAL from xlsx("js/Lista_de_Locais.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', ["000053"]);
//  promisse.then(function(response) {
//    $scope.locais = response.data;
//    var locais = $scope.locais;
//    console.log('$scope.locais: ' + $scope.locais);
//  });






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
