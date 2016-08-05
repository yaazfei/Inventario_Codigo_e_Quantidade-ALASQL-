angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080');


  // listarLocais();

  alasql.promise('SELECT * FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})')
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o alaSQL');
      //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);

      $scope.locais = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('locais foi preenchido.');




      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)

      var local;


      $scope.bem = Scopes.getBem();
      var bem = Scopes.getBem();
      //console.log('Bem: ' + Bem);

      $scope.dados = Scopes.getLocal();
      dados = Scopes.getLocal();

      $scope.teste1 = function(i) {
        console.log('teste1 : ' + i);

      };



      // $scope.localAtual = function() {
      //   console.log('localAtual : ' + dados.COD_LOCAL);
      //   $scope.search = dados.COD_LOCAL;
      //   $scope.local = $scope.search;
      //   $scope.hideModal();
      // };


      $scope.localSelecionado = function(local) {
        console.log('Selecionou o local : ' + local.DESC_LOCAL + ' ' + local.COD_LOCAL);
        $scope.local = local;
        $scope.hideModal();

      };


      $scope.clearInput = function(input, form) { // NÃO FUNCIONA
        console.log('Entrou no clearSearch');

        // console.log (buscaLocalForm + $scope.buscaLocalForm);
        // console.log (search + $scope.search);
        // $scope.form.$setPristine();
        $scope.input = "";
        input = "";


      };





  /*****************************************************************************/
  ////// **********/ LISTA PELO ALASQL /*/ (Não funcionando)

  // function listarLocais() {
  //
  //
  //   alasql.promise('SELECT * FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true}')
  //   .then(function(res) {
  //
  //       // ACHOU
  //       alert('Encontrou com o alaSQL');
  //       //console.log('Resultado do ALQSQL: ' + res[0] + ' ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
  //
  //       $scope.locais = res.data;
  //       var locais = $scope.locais;
  //       console.log('$scope.locais: ' + $scope.locais);
  //
  //
  //     }).catch(function(err) { // NÃO ENCONTROU O LOCAL
  //
  //       PopUps.erroConsultar("Locais não encontrados!");
  //     });
  //
  // }



  /*****************************************************************************/
  /*/ LISTA EM JSON /*/


  /////////////////////////////////// Funcionando, modo melhor?
  // function listarLocais() {
  //   var promisse;
  //   $scope.locais = [];
  //   promisse = $http.get('js/locais.json');
  //   promisse.then(function(response) {
  //     $scope.locais = response.data;
  //     var locais = $scope.locais;
  //     console.log('$scope.locais: ' + $scope.locais);
  //   });
  // }


  /*****************************************************************************/
  /*/ MODAL DE LOCAL /*/ //Funcionando


  $scope.openModal = function() {
    $scope.modalCtrl.show();
  };


  $ionicModal.fromTemplateUrl('templates/modalLocais.html', function(modal) {
    $scope.modalCtrl = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up', //'slide-left-right', 'slide-in-up', 'slide-right-left'
    backdropClickToClose: false,
    focusFirstInput: true
  });

  console.log('modal', $scope);

  $scope.hideModal = function() {
    $scope.modalCtrl.hide();
  };

  $scope.applyModal = function() {
    console.log('modal', $scope);
    $scope.modalCtrl.remove();
  };


  /*****************/
  ////// Termina o controller ainda dentro do alaSQL (porque ele está async?)



  }).catch(function(err) { // NÃO ENCONTROU O LOCAL

  PopUps.erroConsultar("Bens não encontrados!");
  });



  /*****************************************************************************/
  /*/ ESCREVER PRODUTO INVÁLIDO - EDITAR /*/









  //*****************************************************************************//


});
