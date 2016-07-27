// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova', 'ngSanitize', 'ngTouch', 'ui.grid', 'ui.grid.edit'])

.run(function($ionicPlatform) {
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
          //controller: 'geradorCsvCtrl',
          //controller:  'gravaVeiculoY',
          //controller: 'geradorArquivoY'

      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/consultarLocal');
});
