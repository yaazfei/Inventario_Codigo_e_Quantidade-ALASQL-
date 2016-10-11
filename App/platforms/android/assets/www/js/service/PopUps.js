angular.module("starter").service('PopUps', function($ionicPopup, $timeout) {




  //// POPUPS
  this.produtoSalvo = function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Sucesso',
      template: msg,

    });
    $timeout(function() {
      alertPopup.close(); //close the popup after 3 seconds for some reason
      document.getElementById("f_1").focus();
   }, 1000);
  };

  this.erroEscrever = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Não foi possivel salvar o produto.'
    });
  };

  this.erroCriarPasta = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Não foi possivel criar pasta interna.'
    });
  };

  this.erroBranco = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Código em branco',
      template: 'Insira o código.'
    });
  };


  //POP UP DE TESTE
  this.testeJson = function(resultsNOK) {
    var alertPopup = $ionicPopup.alert({
      title: 'Teste Json',
      template: 'Resultado:\n' + resultsNOK.value + '\n'
    });
  };


  //POP UP DE TESTE
  this.testeSubstituicao = function(nome, valorAntigo) {
    var alertPopup = $ionicPopup.alert({
      title: 'Teste Subs',
      template: 'Resultado:\n' + nome + valorAntigo
    });
  };



  this.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Finalizar',
      template: 'Tem certeza que deseja finalizar a aplicação?'
    });
    confirmPopup.then(function(res) {
      if (res) {
        console.log('Sim');
        ionic.Platform.exitApp();
      } else {
        console.log('Não');
      }
    });
  };


  this.erroConsultar = function(msg) {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro ao consultar',
      template: msg
    });
  };




});
