// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngSanitize'])

.run(function($ionicPlatform, $cordovaSQLite, buscaArquivos, $cordovaFile, Scopes, PopUps) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }


    /*/ ***********  LER DO ARQUIVO E ARMAZENAR EM UMA VARIÁVEL ********* /*/

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    // var tabelasJaCriadas = false;

    if (window.cordova) {
      console.log('window.cordova is available');


      var promise = buscaArquivos.checarArquivo($cordovaFile);
      promise.then(function(response) {

        console.log("Precisa chegar aqui depois de ter COPIADO o arquivo");
        var arquivo = Scopes.getArquivo();
        console.log("Resultado: Achou");



        //////// ************ MÉTODO CHECANDO SE EXISTE ARQUIVO NA PASTA

        var dir = "files/Lista_de_Locais.xlsx";

        alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ ', [dir])
          .then(function(res) {

            console.log('Encontrou os locais com o alaSQL');
            //console.log('Primeiro de res ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
            Scopes.setArquivoLocais(res);


            // try {
            //   for (i = 0; i < res.length; i++) {
            //     //console.log(res[i]);
            //     var query = "INSERT INTO local ('COD_LOCAL', 'DESC_LOCAL') VALUES ('?', '?' )  ";
            //     $cordovaSQLite.execute(db, query, '[res[i].COD_LOCAL', 'res[i].DESC_LOCAL]');
            //   }
            // } catch (err) {
            //   console.log('Erro SQLite: ' + err);
            // }

          })
          .catch(function(err) {
            console.log('Erro ALASQL: ' + err);
          });


        if (arquivo === "nd") { ///// >>>>>>>>>>>>>>>>>>>>>>>> SE NÃO HOUVER ARQUIVO NA PASTA

          var dir2 = "files/Lista_de_Bens.xlsx";

          alasql.promise('SELECT COD_BEM, DESC_BEM, CHAPA, COD_LOCAL FROM xlsx(?,{headers:true})\ ', [dir2])
            .then(function(res) {

              console.log('Encontrou os bens com o alaSQL');

              //console.log('Primeiro de res ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
              Scopes.setArquivo(res);

              // try {
              //   for (i = 0; i < res.length; i++) {
              //     //console.log(res[i]);
              //     var query = "INSERT INTO bem ('COD_BEM', 'DESC_BEM', 'CHAPA', 'COD_LOCAL') VALUES ('?', '?', '?', '?') ";
              //     $cordovaSQLite.execute(db, query, ['res[i].COD_BEM', 'res[i].DESC_BEM', 'res[i].CHAPA', 'res[i].COD_LOCAL']);
              //   }
              // } catch (err) {
              //   console.log('Erro SQLite: ' + err);
              // }
            })
            .catch(function(err) { // NÃƒO ENCONTROU O LOCAL
              console.log('Erro ALASQL: ' + err);
              PopUps.erroConsultar();
            });
        }


      }, function(reason) { /////// >>>>>>>>>>>>>> FIM DO PROMISSE ASYNC
        console.log(reason);
      });


    } else {
      console.log('window.cordova NOT available');
      console.log(" >>>>>>>>>>   Não está em device. Vai acessar com o arquivo interno XSLX. ");


      var dir = "files/Lista_de_Locais.xlsx";

      alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ ', [dir])
        .then(function(res) {

          console.log('Encontrou os locais com o alaSQL');
          //console.log('Primeiro de res ' + res[0].COD_LOCAL + ' ' + res[0].DESC_LOCAL);
          Scopes.setArquivoLocais(res);


          // try {
          //   for (i = 0; i < res.length; i++) {
          //     //console.log(res[i]);
          //     var query = "INSERT INTO local ('COD_LOCAL', 'DESC_LOCAL') VALUES ('?', '?' )  ";
          //     $cordovaSQLite.execute(db, query, '[res[i].COD_LOCAL', 'res[i].DESC_LOCAL]');
          //   }
          // } catch (err) {
          //   console.log('Erro SQLite: ' + err);
          // }

        })
        .catch(function(err) {
          console.log('Erro ALASQL: ' + err);
        });



      var dir2 = "files/Lista_de_Bens.xlsx";

      alasql.promise('SELECT COD_BEM, DESC_BEM, CHAPA, COD_LOCAL FROM xlsx(?,{headers:true})\ ', [dir2])
        .then(function(res) {

          console.log('Encontrou os bens com o alaSQL');

          //console.log('Primeiro de res ' + res[0].CHAPA + ' ' + res[0].DESC_BEM);
          Scopes.setArquivo(res);

          // try {
          //   for (i = 0; i < res.length; i++) {
          //     //console.log(res[i]);
          //     var query = "INSERT INTO bem ('COD_BEM', 'DESC_BEM', 'CHAPA', 'COD_LOCAL') VALUES ('?', '?', '?', '?') ";
          //     $cordovaSQLite.execute(db, query, ['res[i].COD_BEM', 'res[i].DESC_BEM', 'res[i].CHAPA', 'res[i].COD_LOCAL']);
          //   }
          // } catch (err) {
          //   console.log('Erro SQLite: ' + err);
          // }
        })
        .catch(function(err) { // NÃƒO ENCONTROU O LOCAL
          console.log('Erro ALASQL: ' + err);
        });
    }



  });
})











.directive('autoFocus', function($timeout) {
    return {
        restrict: 'AC',
        link: function(_scope, _element) {
            $timeout(function(){
                _element[0].focus();
            }, 0);
        }
    };
})













.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  // .state('app.galpao', {
  //   url: '/galpao',
  //   views: {
  //     'menuContent': {
  //       templateUrl: 'templates/galpao.html',
  //       controller: 'Controller'
  //     }
  //   }
  // })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('app.editarProduto', {
    url: '/editarProduto',
    //      url: '/editarProduto/:veiculo.PLACA',
    views: {
      'menuContent': {
        templateUrl: 'templates/editarProduto.html',
        controller: 'editarProdutoCtrl'
      }
    }
  })

  .state('app.info', {
    url: '/info',
    views: {
      'menuContent': {
        templateUrl: 'templates/informacoes.html',
        //controller: 'cadastrarProdutoCtrl'
      }
    }
  })

  .state('app.consultarLocal', {
    url: '/consultarLocal',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultarLocal.html',
        controller: 'consultarLocalCtrl'
      }
    }
  })

  .state('app.consultarProduto', {
    url: '/consultarProduto',
    views: {
      'menuContent': {
        templateUrl: 'templates/consultarProduto.html',
        controller: 'consultarProdutoCtrl'
      }
    }
  })


  .state('app.listaLocais', {
    url: '/listaLocais',
    views: {
      'menuContent': {
        templateUrl: 'templates/listaLocais.html',
        controller: 'listaLocaisCtrl'
      }
    }
  })

  .state('app.modalLocais', {
    url: '/modalLocais',
    views: {
      'menuContent': {
        templateUrl: 'templates/modalLocais.html',
        controller: 'editarProdutoCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/consultarLocal');
});
