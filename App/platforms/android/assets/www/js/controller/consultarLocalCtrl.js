angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio, buscaArquivos) {

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

      Scopes.setLocal(dados);
      console.log('entrou no buscaLocal, vai fazer o alaSQL');


      // PROMISSE ASYNC?
      var arquivoLocais = Scopes.getArquivoLocais();

      //  alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ WHERE COD_LOCAL == ?', [dir, dados.COD_LOCAL])
      alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM ? WHERE COD_LOCAL == ?', [arquivoLocais, dados.COD_LOCAL])
        .then(function(res) {

          res = FormatarCsv.toString(res); // Verificar se existem line breaks antes de ler suas propriedades

          // ACHOU O LOCAL E PEGOU O PRIMEIRO
          console.log('Encontrou o local com o alaSQL: ' + res.length);
          if (res.length < 1) {

            PopUps.erroConsultar("Local não encontrado!");

          } else {

            console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
            Scopes.setLocal(res[0]);

            console.log('saiu do alaSQL');
            $state.go('app.consultarProduto');
          }


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Local não encontrado!");
        });
    }
  };

  /*/****************************************************************************************/

});
