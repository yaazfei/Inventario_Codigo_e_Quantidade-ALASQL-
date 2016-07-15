angular.module('starter').controller('validarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {




  console.log('Entrou no controller de Validar Produto');

  $scope.veiculo = Scopes.getItem();
  $scope.veiculoNOK = null;

  console.log('Scopes: ' + Scopes);
  console.log('veiculo: ' + $scope.veiculo);




  /*****************************************************************************/
  /*/ ESCREVER PRODUTO VÁLIDO /*/



  $scope.escreverProdutoValido = function() {

    veiculo.STATUS = '1';

    console.log('veiculo: ' + $scope.veiculo);
    console.log('item: ' + Scopes.getItem());
    veiculo = Scopes.getItem();



    var results = FormatarCsv.iterateObject(veiculo, 1);
    // PopUps.testeJson('Sem NOK', results);


    if (window.cordova) {
      // running on device/emulator


      /// Checar Diretorio e Pasta
      CriarDiretorio.checarDiretorio($cordovaFile, veiculo);
      alert("Saiu do ChecarDiretorio");


      //$scope.escreverArquivoCSV(veiculo);
      //$cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.txt", $scope.veiculo.PLACA + "+1;")



      $timeout(function() {
        //Escrevendo
        alert("Vai escrever agora");
        $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.value + '\n'))
          .then(function(success) {
            //$timeout(function() {

            alert("Salvou o produto");
            PopUps.produtoSalvo();
            $state.go('app.consultarProduto');
            Scopes.blankItem();


            //  }, 1000);


          }, function(error) {
            PopUps.erroEscrever();
          });

      }, 500);
    }

    console.log('Saiu do WriteFile - Arquivo criado:' + results.value);
  };





  /*****************************************************************************/


  /// Ir para a página de Editar Produto

  $scope.ProdutoInvalido = function() {
    console.log('Veiculo ' + $scope.veiculo);

    $state.go('app.editarProduto');

  };


  /*****************************************************************************/







});
