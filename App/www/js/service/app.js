/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

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
  var arquivo = [];

  if (window.cordova) {
    console.log('Window.cordova is available');

    var data = new Date();
    var dataFormatada = ("0" + data.getDate()).substr(-2) + "-" + ("0" + (data.getMonth() + 1)).substr(-2) + "-" + data.getFullYear();
    var filename = "Inventario" + "_" + dataFormatada;
    console.log("Nome do arquivo: " + filename);


    var promise = buscaArquivos.checarArquivo($cordovaFile, filename);
    promise.then(function(response) {

      console.log("Precisa chegar aqui depois de ter COPIADO o arquivo");
      var arquivo = Scopes.getArquivo();
      console.log('Arquivo: ' + arquivo);
      console.log("Resultado: Achou");


      if (arquivo === "nd") { ///// >>>>>>>>>>>>>>>>>>>>>>>> SE NÃO HOUVER ARQUIVO NA PASTA
        console.log("Não há nenhum arquivo no SDCARD");
        console.log('Arquivo: ' + arquivo);
        arquivo = Scopes.getArquivo();

      } else {
        console.log("Foi encontrado um arquivo para busca");
        console.log('Arquivo: ' + arquivo);
        arquivo = Scopes.getArquivo();

      }


    }, function(reason) { /////// >>>>>>>>>>>>>> FIM DO PROMISSE ASYNC
      console.log(reason);
    });


  } else {
    console.log('window.cordova NOT available');
    console.log(" >>>>>>>>>>   Não está em device. Não vai buscar nada. ");
    Scopes.setArquivo("nd");
    arquivo = Scopes.getArquivo();
    console.log('Arquivo: ' + arquivo);

  }

  });
})




.directive('ngEnter', function() {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if (event.which === 9) { //Enter = 13 e TAB = 9
        scope.$apply(function() {
          scope.$eval(attrs.ngEnter);
        });

        event.preventDefault();

      }
    });
  };
})


.directive('autoFocus', function($timeout) {
  return {
    restrict: 'AC',
    link: function(_scope, _element) {
      $timeout(function() {
        _element[0].focus();
      }, 0);
    }
  };
})



///// PARA IMPEDIR O SCROLL DE BUGAR APÓS O AUTOFOCUS
.config(function($ionicConfigProvider){
  $ionicConfigProvider.scrolling.jsScrolling(false);
})


///// AUTO TAB EM CAMPO AO CHEGAR NO MÁXIMO DE CARACTERES
.directive('autoTabTo', [function () {
  return {
    restrict: "A",
    link: function (scope, el, attrs) {
      el.bind('keyup', function(e) {
        if (this.value.length === this.maxLength) {
          var element = document.getElementById(attrs.autoTabTo);
          if (element)
            element.focus();
        }
      });
    }
  };
}])








.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })


  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('app.novoProduto', {
  url: '/novoProduto',
  views: {
    'menuContent': {
      templateUrl: 'templates/novoProduto.html',
      controller: 'novoProdutoCtrl'
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


;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/novoProduto');
});
