angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $http, $timeout, Scopes, FormatarCsv, PopUps, CriarDiretorio) {



  // // Plugin xeditable
  // editableOptions.theme = 'bs3';
  // app.controller('Ctrl', function($scope) {
  //   $scope.user = {
  //     name: 'awesome user'
  //   };
  // });



  console.log('Entrou no controller de Editar Produto');

  // console.log('Scopes: ' + Scopes);

  manterDados();


  // console.log('veiculo: ' + $scope.veiculo);
  // console.log('veiculo: ' + veiculo);
  // console.log('veiculoNOK: ' + $scope.veiculoNOK);



  //Definir Placeholder de Estado
  $scope.estadoEscolhido = $scope.veiculo.ESTADO;
  $scope.checkEstado = function(estado) {
    $scope.estadoEscolhido = estado;
  };







  // console.log('Veiculo NOK MODELO: ' + veiculoNOK.MODELO + '\n' + 'Veiculo NOK: ' + veiculoNOK.COR);



  // $scope.estadoEscolhido = {
  //      isPresent : true,
  //      selectedEstado : veiculo.ESTADO // <-- this is the default item
  //    };


  // estadoEscolhido = veiculo.ESTADO;
  // $scope.countAll = function (){
  //   estadoEscolhido = veiculoNOK.ESTADO;
  //   console.log('Estado Escolhido: ' + estadoEscolhido);
  // };


  // $scope.estadoVeiculo = [
  //   {nome :"EXCELENTE"},
  //   {nome :"BOM"},
  //   {nome :"REGULAR"},
  //   {nome :"RUIM"},
  //   {nome :"PÉSSIMO"},
  // ];

  /*****************************************************************************/
  /*/ ESCREVER PRODUTO INVÁLIDO - EDITAR /*/

  $scope.escreverProdutoInvalido = function(veiculoEdit) {

    console.log('Entrou no escrever veiculo inválido');
    console.log('Veiculo: ' + veiculo);
    console.log('Veiculo: ' + $scope.veiculo);



    // manterDados(veiculo, veiculoNOK);
    //console.log('Veiculo NOK MODELO: ' + veiculoNOK.MODELO);

    removeNull(veiculoEdit);
    veiculoNOK = angular.merge({}, veiculoNOK, veiculoEdit); // O MERGE/EXTENDS está mudando quase todos os objetos (como veiculo, $scope.veiculo e ItemSelecionado no service Scopes) WHY, GODS?
    // console.log(angular.merge(veiculoNOK, veiculoNOK, veiculoEdit));
    console.log(veiculoNOK);
    console.log($scope.veiculoNOK);
    console.log($scope.veiculo);


    // angular.merge(veiculoNOK, veiculoEdit);
    // angular.extend(veiculoNOK, veiculoEdit);

    //veiculo.STATUS = '0';

    var data = new Date();
    var dataFormatada = ("0" + data.getDate()).substr(-2) + "/" + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear() + " " + data.getHours() + ":" + data.getMinutes();
    // now.format("dd/MM/yyyy HH:mm:ss");

    // veiculoNOK.DATAENTRADA = '';
    // veiculoNOK.STATUSLEILAO = '';
    // veiculoNOK.LEILAO = '';
    // veiculoNOK.RESTRICAO = '';
    // veiculoNOK.DATALIBERACAO = '';
    veiculoNOK.DATACOLETA = dataFormatada;
    veiculoNOK.USUARIOCOLETA = 'Admin';
    veiculoNOK.STATUS = '0';



    console.log('Data: ' + veiculoNOK.DATACOLETA);


    var resultsNOK = FormatarCsv.iterateObject(veiculoNOK, 0);
    var results = FormatarCsv.iterateObject(veiculo, 1);
    // PopUps.testeJson(resultsNOK);
    console.log('Veiculo: ' + veiculo);


    if (window.cordova) {
      // running on device/emulator

      // Checando se o arquivo existe
      CriarDiretorio.checarDiretorio($cordovaFile, veiculo);
      alert("Saiu do ChecarDiretorio");



      $timeout(function() {
        //Escrevendo
        alert("Vai escrever agora");
        $cordovaFile.writeExistingFile(cordova.file.externalRootDirectory + "L2R", "veiculos.csv", (results.value + resultsNOK.value + '\n'))
          .then(function(success) {
            // $timeout(function() {
            
            alert("Salvou o produto");
            PopUps.produtoSalvo();
            $state.go('app.consultarProduto');
            Scopes.blankItem();

            // }, 1000);

          }, function(error) {

            PopUps.erroEscrever();
          });

        console.log('Arquivo criado');
      }, 500);
    }
  };


  //*****************************************************************************//
  //// Copiar logo os dados de Produto para ProdutoNOK

  // $scope.manterDados = function (veiculo, veiculoNOK){
  function manterDados() {

    // $scope.veiculo = Scopes.getItem();

    //$scope.veiculoNOK = null;
    //$scope.veiculoNOK = Scopes.getItem();
    veiculoNOK = Scopes.getItem();
    $scope.veiculo = Scopes.getItem();
    $scope.veiculoNOK = '';
    // $scope.veiculoNOK.ESTADO = veiculoNOK;
    console.log('veiculo NOK estado: ' + $scope.veiculoNOK.ESTADO);


  }

  //*****************************************************************************//

  //Remover os null antes do merge
  // (baseado em: http://stackoverflow.com/questions/28473889/angularjs-merge-two-objects-ignoring-null-and-missing-values)


  function removeNullIn(prop, obj) {
    var pr = obj[prop];
    if (pr === null || pr === undefined) delete obj[prop];
    else if (typeof pr === 'object')
      for (var i in pr) removeNullIn(i, pr);
  }

  function removeNull(obj) {
    for (var i in obj) {
      removeNullIn(i, obj);
    }
  }



  //****************************************************************************************//

});
