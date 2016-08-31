angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio, FormatarCsv, buscaArquivos) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');


  // listarLocais();

  // var dir = "files/Lista_de_Locais.xlsx";
  var arquivoLocais = Scopes.getArquivoLocais();
  // alasql.promise('SELECT * FROM xlsx(?,{headers:true})', [dir])
  alasql.promise('SELECT * FROM ?', [arquivoLocais])
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o ALQSQL: ' + res[0]);

      $scope.locais = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('locais foi preenchido.');
      $scope.localModificado = false;



      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)



      var bem = Scopes.getBem();
      $scope.bem = bem;

      var dados = Scopes.getLocal();
      $scope.dados = dados;


      $scope.localSelecionado = function(local) {
        console.log('Selecionou o local : ' + local.DESC_LOCAL + ' ' + local.COD_LOCAL);
        $scope.local = local;
        $scope.localModificado = true;
        $scope.hideModal();
      };


      $scope.clearInput = function(input, form) { // NÃO FUNCIONA
        console.log('Entrou no clearSearch');

        $scope.local = null;
        local = null;
        $scope.localModificado = false;

      };


      /*****************************************************************************/

      /////////////////////////////////////
      //// ESCREVER PRODUTO INVÁLIDO /////
      ////////////////////////////////////

      $scope.escreverProdutoEditado = function() {

        dados = Scopes.getLocal();
        bem = Scopes.getBem();
        local = $scope.local;

        if ($scope.localModificado === true) {
          console.log('Novo local foi preenchido. Será atualizado para ele.');
          dados = local;
        } else {
          console.log('Novo local não foi preenchido. Será atualizado para o local atual.');
        }

        // if (window.cordova) { //Só entra por device

        var arquivoBens = Scopes.getArquivo();

        //alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
        alasql.promise('SELECT * FROM ? WHERE CHAPA !== ?', [arquivoBens, bem.CHAPA])
          .then(function(res) {
            // ACHOU
            bem.COD_LOCAL = dados.COD_LOCAL;
            res.push(bem);

            console.log('Primeiro de res ' + res[1].CHAPA);
            // Scopes.setArquivo(res); //MELHOR DEIXAR PRA FAZER ISSO DEPOIS DE SALVAR NO ARQUIVO

            if (window.cordova) { //Só entra por device
              CriarDiretorio.processar($cordovaFile, res);
            }

            console.log('Não está no device então não vai escrever no arquivo.');


          }).catch(function(err) { // NÃO ENCONTROU O bem

            console.log(err);
            PopUps.erroConsultar("Não conseguiu salvar o bem editado!");
          });

      };

      /*****************************************************************************/

      //////////////////////////
      //// MODAL DE LOCAL /////
      /////////////////////////

      ////Funcionando


      $scope.openModal = function() {

        if ($scope.selectlocal !== undefined) { //sempre aparecem undefined? (NÃO PEGA)
          $scope.modalCtrl.$setPristine(); //Esse não é uma função
          $scope.selectlocalradio.$setPristine();
        }

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

      console.log('Criou o modal.');

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


});
