angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');

  //$scope.local = Scopes.getLocal();
  //var local = Scopes.getLocal();
  //console.log('Local: ' + local);

  var local;

  $scope.dados = Scopes.getLocal();
  var dados = Scopes.getLocal();

  $scope.bem = Scopes.getBem();
  var bem = Scopes.getBem();
  //console.log('Bem: ' + Bem);

  listarLocais();









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


  $scope.clearSearch = function(search) { // NÃO FUNCIONA
    console.log('Entrou no clearSearch');
    $scope.search = '';
    console.log('$scope.search =' + $scope.search);
    search = '';
  };


  /*****************************************************************************/
  /*/ LISTA EM JSON /*/



  ///////////////////////////////////// Funcionando, modo melhor?
  function listarLocais() {
    var promisse;
    $scope.locais = [];
    promisse = $http.get('js/locais.json');
      promisse.then(function (response){
        $scope.locais = response.data;
        var locais = $scope.locais;
        console.log('$scope.locais: ' + $scope.locais);
      });
  }




  ///////////////////////////////////// Funcionando, mas ainda dá duas voltas
  // function listarLocais() {
  //   $scope.locais = [];
  //   $http.get('js/locais.json').then(function(response) {
  //     $scope.locais = response.data;
  //     var locais = $scope.locais;
  //     console.log('$scope.locais: ' + $scope.locais);
  //   });
  // }
  //
  //
  //
  // function listarLocaisEspera($scope) {
  //   var promise = listarLocais(); //make rest call
  //   $scope.waitMessage = true;
  //   console.log($scope.waitMessage);
  //
  //   $timeout(function() {
  //     //before resolving the promise, wait a certain number of ms, then
  //     //resolve and display data to user
  //     promise.then(function(response) {
  //
  //       $scope.output = response.data;
  //       $scope.waitMessage = false;
  //       console.log($scope.waitMessage);
  //     });
  //   }, 1000);
  // }






  /*****************************************************************************/










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



  /*****************************************************************************/









  //
  //
  //
  //
  //
  // $scope.oModal1 = '';
  //
  // $scope.onIncludeLoad = function() {
  //    console.log("Entrou no onIncludeLoad");
  //    // Modal 1
  //    $ionicModal.fromTemplateUrl('modalLocais.html', {
  //      id: '1', // We need to use and ID to identify the modal that is firing the event!
  //      scope: $scope,
  //      backdropClickToClose: false,
  //      animation: 'slide-in-up'
  //    }).then(function(modal) {
  //      $scope.oModal1 = modal;
  //    });
  //  };
  //
  //
  //
  //
  // $scope.openModal = function(index) {
  //      if (index == 1)
  //     {  //$scope.oModal1.show();
  //       $timeout(function(){
  //         $scope.oModal1.show();
  //       },0);
  //     }
  //      else
  //       $scope.oModal2.show();
  //    };
  //
  // $scope.closeModal = function(index) {
  //      if (index == 1)
  //       $scope.oModal1.hide();
  //      else
  //       $scope.oModal2.hide();
  //    };
  //
  //    /* Listen for broadcasted messages */
  //
  //    $scope.$on('modal.shown', function(event, modal) {
  //      console.log('Modal ' + modal.id + ' is shown!');
  //    });
  //
  //    $scope.$on('modal.hidden', function(event, modal) {
  //      console.log('Modal ' + modal.id + ' is hidden!');
  //    });
  //
  //    // Cleanup the modals when we're done with them (i.e: state change)
  //    // Angular will broadcast a $destroy event just before tearing down a scope
  //    // and removing the scope from its parent.
  //    $scope.$on('$destroy', function() {
  //      console.log('Destroying modals...');
  //      $scope.oModal1.remove();
  //      $scope.oModal2.remove();
  //    });
  //
  //
  //
  //  function onIncludeLoad() {
  //    console.log("onIncludeLoad");
  //  }
  //
  //
  //
  //



  /*****************************************************************************/









  /*****************************************************************************/
  /*/ ESCREVER PRODUTO INVÁLIDO - EDITAR /*/









  //*****************************************************************************//

  //Remover os null antes do merge
  // (baseado em: http://stackoverflow.com/questions/28473889/angularjs-merge-two-objects-ignoring-null-and-missing-values)


  // function removeNullIn(prop, obj) {
  //   var pr = obj[prop];
  //   if (pr === null || pr === undefined) delete obj[prop];
  //   else if (typeof pr === 'object')
  //     for (var i in pr) removeNullIn(i, pr);
  // }
  //
  // function removeNull(obj) {
  //   for (var i in obj) {
  //     removeNullIn(i, obj);
  //   }
  // }



  //****************************************************************************************//

});
