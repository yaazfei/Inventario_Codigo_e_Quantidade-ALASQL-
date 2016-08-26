angular.module('starter').controller('editarProdutoCtrl', function($scope, $state, $cordovaFile, $ionicPopup, $ionicModal, $http, $timeout, Scopes, PopUps, CriarDiretorio, FormatarCsv, buscaArquivos) {


  console.log('Entrou no controller de Editar Produto ---------------------------------------------------------');
  console.log('Códigos de locais válidos: 000053, 000039, 000005');
  console.log('Códigos de Bens válidos: 0000000001C, 000180, 000093, 000080, 00518 (duas entradas), 000898 (sem local)');



  // listarLocais();

  var dir = "files/Lista_de_Locais.xlsx";
  alasql.promise('SELECT * FROM xlsx(?,{headers:true})', [dir])
    .then(function(res) {

      // ACHOU
      console.log('Encontrou com o ALQSQL: ' + res[0]);

      $scope.locais = res;
      //var bens = $scope.bens; //Precisa disso?
      console.log('locais foi preenchido.');
      $scope.localModificado = false;



      /*****************/
      ////// Só começa o controller depois que passa pelo alaSQL (porque ele está async?)

      // var local;


      $scope.bem = Scopes.getBem();
      var bem = Scopes.getBem();
      //console.log('Bem: ' + Bem);

      $scope.dados = Scopes.getLocal();
      dados = Scopes.getLocal();

      // $scope.teste1 = function(i) {
      //   console.log('teste1 : ' + i);
      // };


      $scope.localSelecionado = function(local) {
        console.log('Selecionou o local : ' + local.DESC_LOCAL + ' ' + local.COD_LOCAL);
        $scope.local = local;
        $scope.localModificado = true;
        $scope.hideModal();
      };


      $scope.clearInput = function(local) { //// >>>>>>>>>>>>>>>>>>>>>>>>> NÃO FUNCIONA
        console.log('Entrou no clearSearch');

        // search.local.$setPristine();
        // $scope.search.local.$setPristine();

          $scope.local = null;
          local = null;
          $scope.localModificado = false;

        // if ($scope.searchLocal !== undefined){
        //   $scope.searchLocal.$setPristine();
        // }

        //$state.go('app.editarProduto');
      };


      /*****************************************************************************/

      /////////////////////////////////////
      //// ESCREVER PRODUTO INVÁLIDO /////
      ////////////////////////////////////

      /*/ EDITADO (ESTÁ COPIANDO TODOS OS DADOS EXCETO O ESCOLHIDO E REESCREVENDO UM ARQUIVO INTEIRO) /*/


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

        if (window.cordova) { //Só entra por device


////// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> MÉTODO DE UPDATE COM O SQLITE

// UPDATE Cars SET Name='Skoda Octavia' WHERE Id=3;
    db.transaction(function (tx) {

        var query = "UPDATE bem SET COD_LOCAL = ? WHERE CHAPA = ? AND COD_BEM = ?";

        tx.executeSql(query, [dados.COD_LOCAL, bem.CHAPA, bem.COD_BEM], function(tx, res) {
            console.log("COD_LOCAL editado de res: " + res.COD_LOCAL);
            console.log("CHAPA e COD_BEM do bem editado: " + res.CHAPA + ' ' + res.COD_BEM);
        },
        function(tx, error) {
            console.log('UPDATE error: ' + error.message);
        });
    }, function(error) {
        console.log('transaction error: ' + error.message);
    }, function() {
        console.log('transaction ok');
    });


      CriarDiretorio.processar($cordovaFile, res);



}
























// ////// >>>>>>>>>>>>>>>>>>> MÉTODO DE LER TODOS OS ARQUIVOS MENOS O ALVO E DEPOIS COLOCAR ELE NA RESPOSTA JÁ EDITADO
//
//           // buscaArquivos.checarArquivo($cordovaFile);
//           //// .then(function(success) {
//           // var arquivo = Scopes.getArquivo();
//
//             //alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
//              $cordovaSQLite.execute(db, 'SELECT * FROM bem WHERE CHAPA !== ? ',[bem.CHAPA])
//               .then(function(res) {
//                 // ACHOU
//                 bem.COD_LOCAL = dados.COD_LOCAL;
//                 res.push(bem);
//
//                 // console.log('Primeiro de res ' + res[1].CHAPA);
//                 console.log('Primeiro de res ' + res.rows.item(0).CHAPA);
//
//                 if (window.cordova) { //Só entra por device
//                   CriarDiretorio.processar($cordovaFile, res);
//                 }
//
//               }).catch(function(err) { // NÃO ENCONTROU O bem
//
//                 console.log(err);
//                 PopUps.erroConsultar("Bem não encontrado!");
//               });
//
//             }






        //   } else {
        //     if (arquivo === "xslx") {
        //       dir = "<sdcard>/Queiroz Galvão/Lista_de_Bens.xlsx";
        //
        //
        //       alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
        //         .then(function(res) {
        //           // ACHOU
        //           bem.COD_LOCAL = dados.COD_LOCAL;
        //           res.push(bem);
        //
        //           console.log('Primeiro de res ' + res[1].CHAPA);
        //
        //           if (window.cordova) { //Só entra por device
        //             CriarDiretorio.processar($cordovaFile, res);
        //           }
        //
        //         }).catch(function(err) { // NÃO ENCONTROU O bem
        //
        //           console.log(err);
        //           PopUps.erroConsultar("Bem não encontrado!");
        //         });
        //
        //
        //
        //     } else {
        //       if (arquivo === "xls") {
        //         dir = "<sdcard>/Queiroz Galvão/Lista_de_Bens.xls";
        //
        //
        //         alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
        //           .then(function(res) {
        //             // ACHOU
        //             bem.COD_LOCAL = dados.COD_LOCAL;
        //             res.push(bem);
        //
        //             console.log('Primeiro de res ' + res[1].CHAPA);
        //
        //             if (window.cordova) { //Só entra por device
        //               CriarDiretorio.processar($cordovaFile, res);
        //             }
        //
        //           }).catch(function(err) { // NÃO ENCONTROU O bem
        //
        //             console.log(err);
        //             PopUps.erroConsultar("Bem não encontrado!");
        //           });
        //
        //
        //       } else {
        //         dir = "files/Lista_de_Bens.xlsx";
        //
        //
        //         alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
        //           .then(function(res) {
        //             // ACHOU
        //             bem.COD_LOCAL = dados.COD_LOCAL;
        //             res.push(bem);
        //
        //             console.log('Primeiro de res ' + res[1].CHAPA);
        //
        //             if (window.cordova) { //Só entra por device
        //               CriarDiretorio.processar($cordovaFile, res);
        //             }
        //
        //           }).catch(function(err) { // NÃO ENCONTROU O bem
        //
        //             console.log(err);
        //             PopUps.erroConsultar("Bem não encontrado!");
        //           });
        //
        //
        //       }
        //     }
        //   }
        // // }, function(error) {
        // //   console.log("Não fez o checkArquivo" + error);
        // // });
        //
        //
        // } else {
        //   // Se não estiver no device
        //
        //   console.log("Não está no device então pegou o arquivo dentro do app");
        //
        //   dir = "files/Lista_de_Bens.xlsx";
        //   alasql.promise('SELECT * FROM xlsx(?,{headers:true})\ WHERE CHAPA !== ?', [dir, bem.CHAPA])
        //     .then(function(res) {
        //       // ACHOU
        //       //console.log('Encontrou com o ALQSQL: ' + res);
        //
        //       bem.COD_LOCAL = dados.COD_LOCAL;
        //       res.push(bem);
        //
        //       console.log('Primeiro de res ' + res[1].CHAPA);
        //
        //       //// A conversão já está no CriarDiretorio
        //       // resConvertida = FormatarCsv.JSONToCSVConvertor(res, true);
        //       // console.log(resConvertida);
        //
        //       if (window.cordova) { //Só entra por device
        //         CriarDiretorio.processar($cordovaFile, res);
        //       }
        //       console.log("Não está no device então não salvou.");
        //
        //     }).catch(function(err) { // NÃO ENCONTROU O bem
        //       console.log(err);
        //       PopUps.erroConsultar("Bem não encontrado!");
        //     });
        //
        //   }//Se não estiver no device
        //
        //


      };

      /*****************************************************************************/

      //////////////////////////
      //// MODAL DE LOCAL /////
      /////////////////////////

      ////Funcionando


      $scope.openModal = function() {

        if ($scope.selectlocal !== undefined){ //sempre aparecem undefined? (NÃO PEGA)
          $scope.modalCtrl.$setPristine(); //Esse não é uma função
          $scope.selectlocalradio.$setPristine();
        }

        //$scope.localModificado = null;
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

        console.log("Passou uma vez no editarProdutoCtrl.");
});
