/**
 * Inventario Base
 * COM ALASQL
 * @author Yasmin de Lima Feitosa
 * @version 1.0
 */

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
   }, 1500);
  };

  this.erroEscrever = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: '<p align="center">Não foi possivel salvar o produto.</p>'
    });
  };

  this.erroCriarPasta = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: '<p align="center">Não foi possivel criar pasta interna.</p>'
    });
  };

  this.erroBranco = function() {
    var alertPopup = $ionicPopup.alert({
      title: 'Erro',
      template: '<p align="center">Insira os dados corretamente.</p>'
    });
  };


  //POP UP DE TESTE
  this.testeJson = function(resultsNOK) {
    var alertPopup = $ionicPopup.alert({
      title: 'Teste Json',
      template: '<p align="center">Resultado:\n' + resultsNOK.value + '\n </p>'
    });
  };


  //POP UP DE TESTE
  this.testeSubstituicao = function(nome, valorAntigo) {
    var alertPopup = $ionicPopup.alert({
      title: 'Teste Subs',
      template: '<p align="center">Resultado:\n' + nome + valorAntigo + '\n</p>'
    });
  };



  this.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Finalizar',
      template: '<p align="center">Tem certeza que deseja finalizar a aplicação?</p>'
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
      title: 'Erro',
      template: msg
    });
  };





});
