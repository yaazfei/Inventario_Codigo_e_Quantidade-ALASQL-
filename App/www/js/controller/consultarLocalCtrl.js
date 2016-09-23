angular.module('starter').controller('consultarLocalCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, Scopes, FormatarCsv, PopUps, CriarDiretorio, buscaArquivos) {

  console.log('Entrou no controller de Consultar Local ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');

  Scopes.blankItem($scope);

  $scope.fecharApp = function() {
    console.log('Apertou o fechar');
    PopUps.showConfirm();

  };

  $scope.form = {};
  $scope.produto = {};

  $scope.setForm = function (form) {
    // console.log(" Entrou no setForm ******************************");

      $scope.form.NovoProduto = form;
      $scope.form.Master = form;
      console.log ($scope.form.NovoProduto);
  };





  $scope.deixarPristine = function () {

      console.log("teste");

      document.getElementById("form.BuscaLocal").reset();
      document.getElementById("f_1").value = "";
      $scope.local = undefined;
      local = undefined;

      $scope.form.BuscaLocal = $scope.form.Master;
      $scope.form.BuscaLocal.$setPristine();

      setTimeout(function ()
      {
        document.getElementById("f_1").focus();
        console.log("entrou no setTimeout");
      }, 100);

};










  /*/*************************************************************************************************************/

  //////////////////////////////////////////////////
  ////// BUSCAR O CÓDIGO DO LOCAL SELECIONADO //////
  /////////////////////////////////////////////////

  $scope.buscaLocal = function(dados) {

    ////// WITH GAMBI
    if (dados === undefined || dados.COD_LOCAL === "" || dados.COD_LOCAL === undefined ||
    $scope.form.BuscaLocal.$pristine || $scope.form.BuscaLocal.codLocalDados.$pristine) {
      PopUps.erroConsultar("Insira os dados corretamente!");


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

            document.getElementById("form.BuscaLocal").reset();
            document.getElementById("f_1").value = "";
            $scope.form.BuscaLocal = $scope.form.Master;
            $scope.form.BuscaLocal.$setPristine();

            $state.go('app.consultarProduto');
          }


        }).catch(function(err) { // NÃO ENCONTROU O LOCAL

          PopUps.erroConsultar("Local não encontrado!");
        });
    }
  };

  /*/****************************************************************************************/

});
