// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngSanitize'])

.run(function($ionicPlatform, $cordovaSQLite, buscaArquivos, $cordovaFile, Scopes) {
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
    if (window.cordova) {
      console.log('window.cordova is available');
      var tabelasJaCriadas = false;



      if (window.cordova) { //Mas já não está dentro de um window.cordova?
        db = $cordovaSQLite.openDB({
          name: 'QueirozGalvao.db',
          location: 2,
          createFromLocation: 1
        }); //device
        //db = window.openDatabase("QueirozGalvao.db", '1', 'QueirozGalvao', 1024 * 1024 * 100); // browser
      } else {
        db = window.openDatabase("QueirozGalvao.db", '1', 'QueirozGalvao', 1024 * 1024 * 100); // browser
      }

      // $cordovaSQLite.execute(db, 'select * from local', null).then(function(res) {
      //   console.log('Não deu erro de table no exists: ' + res);
      // }).catch(function(err) {
      //   console.log('erro de table no exists' + err);

        console.log('Testando refazer sempre as tabelas');
        tabelasJaCriadas = true;

        $cordovaSQLite.execute(db, 'CREATE TABLE local ("COD_LOCAL" STRING PRIMARY KEY, "DESC_LOCAL" STRING)');
        $cordovaSQLite.execute(db, 'CREATE TABLE bem ("COD_BEM" STRING,  "DESC_BEM" STRING, "CHAPA" STRING, "COD_LOCAL" STRING)');



        //
        // var dir = "files/Lista_de_Locais.xlsx";
        //
        // alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ ', [dir])
        //   .then(function(res) {
        //
        //     console.log('Encontrou o local com o alaSQL');
        //     try {
        //       for (i = 0; i < res.length; i++) {
        //         console.log(res[i]);
        //         var query = "INSERT INTO local (COD_LOCAL, DESC_LOCAL) VALUES (?, ? )  ";
        //         $cordovaSQLite.execute(db, query, [res[i].COD_LOCAL, res[i].DESC_LOCAL]);
        //       }
        //     } catch (err) {
        //       console.log('err1' + err);
        //     }
        //
        //   })
        //   .catch(function(err) {
        //     console.log('erro: ' + err);
        //   });
        //
        // var dir2 = "files/Lista_de_Bens.xlsx";
        //
        // alasql.promise('SELECT COD_BEM, DESC_BEM, CHAPA,  COD_LOCAL FROM xlsx(?,{headers:true})\ ', [dir2])
        //   .then(function(res) {
        //
        //     console.log('Encontrou o bem com o alaSQL');
        //     try {
        //       for (i = 0; i < res.length; i++) {
        //         //console.log(res[i]);
        //         var query = "INSERT INTO bem (COD_BEM, DESC_BEM, CHAPA,  COD_LOCAL) VALUES (?, ?, ?, ? ) ";
        //         $cordovaSQLite.execute(db, query, [res[i].COD_BEM, res[i].DESC_BEM, res[i].CHAPA, res[i].COD_LOCAL]);
        //       }
        //     } catch (err) {
        //       console.log('err1' + err);
        //     }
        //   })
        //   .catch(function(err) { // NÃƒO ENCONTROU O LOCAL
        //     console.log('erro: ' + err);
        //   });







        var promise = buscaArquivos.checarArquivo($cordovaFile);
        promise.then(function(response){

          console.log ("Precisa chegar aqui depois de ter COPIADO o arquivo");
          var arquivo = Scopes.getArquivo();
          console.log ("Resultado: Achou");





//////// ***************************** MÉTODO CHECANDO SE EXISTE ARQUIVO NA PASTA

        ///// >>>>>>  (SEMPRE VAI PEGAR A LISTA DE LOCAIS DO XLSX)

        var dir = "files/Lista_de_Locais.xlsx";

        alasql.promise('SELECT COD_LOCAL, DESC_LOCAL FROM xlsx(?,{headers:true})\ ', [dir])
          .then(function(res) {

            console.log('Encontrou os locais com o alaSQL');
            try {
              for (i = 0; i < res.length; i++) {
                //console.log(res[i]);
                var query = "INSERT INTO local ('COD_LOCAL', 'DESC_LOCAL') VALUES ('?', '?' )  ";
                $cordovaSQLite.execute(db, query, '[res[i].COD_LOCAL', 'res[i].DESC_LOCAL]');
              }
            } catch (err) {
              console.log('Erro SQLite: ' + err);
            }

          })
          .catch(function(err) {
            console.log('Erro ALASQL: ' + err);
          });



        //DEVE CHECAR SE HÁ ARQUIVO NA PASTA ANTES

      //   buscaArquivos.checarArquivo($cordovaFile).success(function() {
      //  //NÃO FUNCIONA POIS ESTÁ ASYNC
       //
       //
      //   var arquivo = Scopes.getArquivo();  //// COMENTADO PARA TESTE, ATÉ CONSERTAR O ASYNC






        //var arquivo = "nd"; //Teste


        if (arquivo === "nd") { ///// >>>>>>>>>>>>>>>>>>>>>>>> SE NÃO HOUVER ARQUIVO NA PASTA

          var dir2 = "files/Lista_de_Bens.xlsx";

          alasql.promise('SELECT COD_BEM, DESC_BEM, CHAPA, COD_LOCAL FROM xlsx(?,{headers:true})\ ', [dir2])
            .then(function(res) {

              console.log('Encontrou os bens com o alaSQL');
              try {
                for (i = 0; i < res.length; i++) {
                  //console.log(res[i]);
                  var query = "INSERT INTO bem ('COD_BEM', 'DESC_BEM', 'CHAPA', 'COD_LOCAL') VALUES ('?', '?', '?', '?') ";
                  $cordovaSQLite.execute(db, query, ['res[i].COD_BEM', 'res[i].DESC_BEM', 'res[i].CHAPA', 'res[i].COD_LOCAL']);
                }
              } catch (err) {
                console.log('Erro SQLite: ' + err);
              }
            })
            .catch(function(err) { // NÃƒO ENCONTROU O LOCAL
              console.log('Erro ALASQL: ' + err);
            });


        } else { /////// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> SE HOUVER ARQUIVO NA PASTA

          var dirArquivo = arquivo;

          alasql.promise('SELECT COD_BEM, DESC_BEM, CHAPA, COD_LOCAL FROM ?', [dirArquivo])
            .then(function(res) {

              console.log('Encontrou os bens com o alaSQL');
              try {
                for (i = 0; i < res.length; i++) {
                  //console.log(res[i]);
                  var query = "INSERT INTO bem ('COD_BEM', 'DESC_BEM', 'CHAPA', 'COD_LOCAL') VALUES ('?', '?', '?', '?') ";
                  $cordovaSQLite.execute(db, query, ['res[i].COD_BEM', 'res[i].DESC_BEM', 'res[i].CHAPA', 'res[i].COD_LOCAL']);
                }
              } catch (err) {
                console.log('Erro SQLite: ' + err);
              }
            })
            .catch(function(err) { // NÃƒO ENCONTROU O LOCAL
              console.log('Erro ALASQL: ' + err);
            });

        } /////// >>>>>>>>>>>>>> TERMINOU O IF


      // }, function(err) {
      //     console.log(err);
      //   });




      // }); /// ESTE É DO 'Não deu erro de table no exists: '




      // db = $cordovaSQLite.openDB({name: "Yapp.db", location:"default"}); //device
      // db =  window.sqlitePlugin.openDatabase({name: "Yapp.db", location:'default'});
      //  $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY, nome TEXT, quantidade STRING)");




    }, function(reason){ /////// >>>>>>>>>>>>>> FIM DO PROMISSE ASYNC
    console.log(reason);
    });




    } else {
      console.log('window.cordova NOT available');
    }



    // alasql.promise("SELECT * FROM local  where COD_LOCAL = '000053' ")
    //         .then(function(res) {
    //           console.log('encontrou o local '+ res);
    //         })
    //         .catch(function(err) {
    //                   console.log('erro: '+ err) ;
    //         });

});
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

  .state('app.cadastrarProduto', {
    url: '/cadastrarProduto',
    views: {
      'menuContent': {
        templateUrl: 'templates/cadastrarProduto.html',
        controller: 'cadastrarProdutoCtrl'
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
  })


  .state('app.infoProduto', {
    url: '/infoProduto',
    views: {
      'menuContent': {
        templateUrl: 'templates/infoProduto.html',
        controller: 'validarProdutoCtrl'

      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/consultarLocal');
});
