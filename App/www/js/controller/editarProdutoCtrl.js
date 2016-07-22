
angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio) {


  console.log('Entrou no controller de Editar Produto');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');

  // manterDados();

// $scope.preencherVariaveis = function(){
  $scope.local = Scopes.getLocal();
  var local = Scopes.getLocal();
  //console.log('Local: ' + local);

  $scope.bem = Scopes.getBem();
  var bem = Scopes.getBem();
  //console.log('Bem: ' + Bem);


// };
//
//   $scope.preencherVariaveis();


  // Lista em Json
  $scope.locais = [];
  $http.get('js/locais.json').then(function(response) {
    $scope.locais = response.data;
    var locais = $scope.locais;
    console.log($scope.locais);

  });



/*****************************************************************************/
/*/ MODAL DE LOCAL /*/

        //
        // $scope.openModal = function() {
        //   $scope.modalCtrl.show();
        // };


        $scope.onIncludeLoad = function() {
            console.log("onIncludeLoad");
            // Modal 1
            $ionicModal.fromTemplateUrl('modalLocais.html', {
              //id: '1', // We need to use and ID to identify the modal that is firing the event!
              scope: $scope,
              backdropClickToClose: false,
              animation: 'slide-in-up'
            }).then(function(modal) {
              $scope.oModal1 = modal;
            });
          };


            $scope.openModal = function() {
              $scope.oModal1.show();
            };


        // $ionicModal.fromTemplateUrl('modalLocais.html', function(modal) {
        //   $scope.modalCtrl = modal;
        // }, {
        //   scope: $scope,
        //   animation: 'slide-in-up',//'slide-left-right', 'slide-in-left', 'slide-right-left'
        //   focusFirstInput: true
        // });
        //
        //  console.log('modal', $scope);



    // $scope.ModalCtrl = function() {
    //       //app.controller('ModalCtrl', function($scope) {
    //   $scope.hideModal = function() {
    //       $scope.modalCtrl.hide();
    //     };
    //
    //     $scope.applyModal = function() {
    //       console.log('modal', $scope);
    //       $scope.modalCtrl.remove();
    //     };
    //
    //    var data = {1:"Green",2:"Red",4:"Yellow",8:"Purple"};
    //    var resultArray = [];
    //         for (var i in data) {
    //             if (data.hasOwnProperty(i)) {
    //                 resultArray.push({
    //                   id: i,
    //                   name: data[i],
    //                   displayName: data[i]+" Color"
    //                 });
    //             }
    //         }
    //    $scope.resultData = resultArray;




/*****************************************************************************/
































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


      }, 500);
    }
    console.log('Saiu do WriteFile - Arquivo criado:' + results.value + resultsNOK.value);
  };


  //*****************************************************************************//
  //// Copiar logo os dados de Produto para ProdutoNOK

  // $scope.manterDados = function (veiculo, veiculoNOK){
  // function manterDados() {
  //
  //   // $scope.veiculo = Scopes.getItem();
  //
  //   //$scope.veiculoNOK = null;
  //   //$scope.veiculoNOK = Scopes.getItem();
  //   veiculoNOK = Scopes.getItem();
  //   $scope.veiculo = Scopes.getItem();
  //   $scope.veiculoNOK = '';
  //   // $scope.veiculoNOK.ESTADO = veiculoNOK;
  //   console.log('veiculo NOK estado: ' + $scope.veiculoNOK.ESTADO);
  //
  //
  // }

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
