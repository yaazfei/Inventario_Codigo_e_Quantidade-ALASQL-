angular.module("starter").service('PopUps', function($ionicPopup) {



  //// POPUPS
  this.produtoSalvo = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Sucesso',
      template: 'Veículo salvo com sucesso!'
    });
    // alertPopup.then(function(res) {
    //   $state.go('app.consultarProduto');
    //
    // });
  };

  this.erroEscrever = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: 'Não foi possivel salvar o veículo.'
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


  this.erroConsultar = function(erro) {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro ao consultar.',
      template: erro
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









});
