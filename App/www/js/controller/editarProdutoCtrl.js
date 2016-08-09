angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518');


  // listarLocais();

  alasql.promise('SELECT * FROM xlsx("js/Lista_de_Locais.xlsx",{headers:true})')
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o ALQSQL: ' + res[0]);

      $scope.locais = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('locais foi preenchido.');




      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)

      // var local;


      $scope.bem = Scopes.getBem();
      var bem = Scopes.getBem();
      //console.log('Bem: ' + Bem);

      $scope.dados = Scopes.getLocal();
      dados = Scopes.getLocal();

      $scope.teste1 = function(i) {
        console.log('teste1 : ' + i);

      };


      $scope.localSelecionado = function(local) {
        console.log('Selecionou o local : ' + local.DESC_LOCAL + ' ' + local.COD_LOCAL);
        $scope.local = local;
        // var localSelecionado = true;
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
      /*/ ESCREVER PRODUTO INVÁLIDO - EDITAR /*/


      $scope.escreverProdutoEditado = function(local) {

        dados = Scopes.getLocal();
        bem = Scopes.getBem();


        if (local === undefined || local === '') {


        } else {
          console.log('Novo local foi preenchido. Será atualizado para ele.');
          dados = local;
        }
        console.log('Novo local não foi preenchido. Será atualizado para o local atual.');

        // var data = {
        //   COD_BEM : bem.COD_BEM,
        //   DESC_BEM : bem.DESC_BEM,
        //   CHAPA : bem.CHAPA,
        //   COD_LOCAL : bem.COD_LOCAL};


        // alasql('UPDATE XLSX("js/Lista_de_Bens.xlsx") SET COD_LOCAL = ? WHERE CHAPA == ?', [bem.COD_LOCAL, bem.CHAPA]);
        alasql('UPDATE BensTable SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);
        // alasql('UPDATE ? SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [data, bem.CHAPA]);

        alasql.promise('SELECT * FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE CHAPA == ?', [bem.CHAPA])
          .then(function(res) {
            // ACHOU
            console.log('Encontrou com o ALQSQL: ' + res[0]);





          }).catch(function(err) { // NÃO ENCONTROU O bem

            PopUps.erroConsultar("Bem não encontrado!");
          });


        // // bemEscolhido = bem.CHAPA;
        // //alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx("js/Lista_de_Bens.xlsx",{headers:true})\ WHERE COD_LOCAL == ?', [localCod])
        // alasql('UPDATE BensTable SET COD_LOCAL="23" IN xlsx("js/Lista_de_Bens.xlsx")\ WHERE CHAPA == ?', [bem.CHAPA]);
        //
        //
        //
        //
        //
        //
        //
        //
        //   // .then(function(res) {
        //      //UPDATE CSV('a.csv') SET b=20 WHERE a = 10;
        //     // alasql('UPDATE ? SET ... WHERE ...', [data]);
        //     // alasql('UPDATE RpdAssignments SET Name="id2" WHERE Id=1');
        //     // console.log('Vamos ver o que aparece aqui: ' + res);
        //
        //   // }).catch(function(err) { // NÃO ENCONTROU O LOCAL
        //   //
        //   //   PopUps.erroConsultar("Bens não encontrados!");
        //   // });

      };







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
  /*/ LISTA EM JSON  (NÃO ESTÁ EM USO) /*/


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


});
